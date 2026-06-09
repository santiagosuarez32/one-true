import { promises as fs } from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const dbPath = path.join(process.cwd(), "src/data/db.json");

// Initialize a server-side Supabase client.
// We use the service_role key if available to bypass RLS and safely sync admin changes on the server.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export type Service = {
  id: string;
  title: string;
  desc: string;
  image: string;
  cta: string;
  href: string;
  template: "vetting" | "standard" | "poligrafo";
  published: boolean;
  pageContent: {
    heroTitle: string;
    heroUnderlined: string;
    heroDesc: string;
    heroTagline: string;
    heroImage: string;
    aboutTitle: string;
    aboutDesc: string;
    aboutCards: { title: string; text: string }[];
    whyTitle: string;
    whyPoints: { title: string; text: string }[];
    whyImage1?: string;
    whyImage2?: string;
    faqs?: { q: string; a: string }[];
    contactPhone: string;
    contactWhatsapp?: string;
    showOtherSolutions?: boolean;
    showFaqs?: boolean;
  };
};

export type FocusArea = {
  title: string;
  description: string;
};

export type Course = {
  id: string;
  title: string;
  desc: string;
  image: string;
  href: string;
  published: boolean;
  template?: "tecnicas" | "basico" | "pretest" | "graficas" | "ess-m" | "control-calidad" | "standard";
  pageContent: {
    heroTagline: string;
    heroTitle: string;
    heroDesc: string;
    heroImage: string;
    aboutTitle: string;
    aboutDesc: string;
    focusAreas: FocusArea[];
    svgFocusAreas?: {
      title: string;
      description?: string;
      iconViewBox?: string;
      iconPaths?: string[];
    }[];
    customCards?: {
      title: string;
      description?: string;
      items?: string[];
      icon: string;
    }[];
    fichaTecnica: { title: string; description: string }[];
    contactPhone: string;
    contactWhatsapp: string;
    contactWhatsappText?: string;
    template?: string;
  };
};

export type Blog = {
  id: string;
  title: string;
  image: string;
  link: string;
  published: boolean;
  publishDate: string;
  readTime: string;
  content: string;
};

export type Podcast = {
  id: string;
  title: string;
  description: string;
  image: string;
  audioUrl: string;
  duration: string;
  date: string;
  topic: string;
  published: boolean;
};

export type DatabaseSchema = {
  services: Service[];
  courses: Course[];
  blogs: Blog[];
  podcasts: Podcast[];
};

export async function getDb(): Promise<DatabaseSchema> {
  try {
    const [servicesRes, coursesRes, blogsRes, podcastsRes] = await Promise.all([
      supabase.from("services").select("*"),
      supabase.from("courses").select("*"),
      supabase.from("blogs").select("*"),
      supabase.from("podcasts").select("*")
    ]);
    
    // Check if we retrieved data without schema cache/missing table errors
    if (!servicesRes.error && !coursesRes.error && !blogsRes.error && !podcastsRes.error) {
      const dbCourses = (coursesRes.data || []).map(c => ({
        ...c,
        template: c.template || c.pageContent?.template
      }));
      const db = {
        services: servicesRes.data || [],
        courses: dbCourses,
        blogs: blogsRes.data || [],
        podcasts: podcastsRes.data || []
      };
      // Save locally as backup cache
      await fs.writeFile(dbPath, JSON.stringify(db, null, 2), "utf8");
      return db;
    } else {
      console.warn("Supabase returned table errors, using local db.json cache:", {
        servicesError: servicesRes.error?.message,
        coursesError: coursesRes.error?.message,
        blogsError: blogsRes.error?.message,
        podcastsError: podcastsRes.error?.message
      });
    }
  } catch (error) {
    console.error("Failed to fetch from Supabase. Falling back to local db.json:", error);
  }

  // Local file fallback
  try {
    const data = await fs.readFile(dbPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading db.json, returning empty structure:", error);
    return { services: [], courses: [], blogs: [], podcasts: [] };
  }
}

export async function writeDb(data: DatabaseSchema): Promise<void> {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf8");
}

/* ==================== Services API ==================== */
export async function getServices(): Promise<Service[]> {
  const db = await getDb();
  return db.services || [];
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  const services = await getServices();
  return services.find(s => s.id === slug);
}

export async function saveService(service: Service): Promise<void> {
  const db = await getDb();
  const idx = db.services.findIndex(s => s.id === service.id);
  if (idx !== -1) {
    db.services[idx] = service;
  } else {
    db.services.push(service);
  }
  await writeDb(db);

  // Sync to Supabase table
  try {
    const { error } = await supabase.from("services").upsert(service);
    if (error) {
      console.error(`Supabase sync failed for service ${service.id}:`, error.message);
    }
  } catch (err) {
    console.error(`Failed to push service ${service.id} to Supabase:`, err);
  }
}

export async function deleteService(id: string): Promise<void> {
  const db = await getDb();
  db.services = db.services.filter(s => s.id !== id);
  await writeDb(db);

  // Sync delete to Supabase
  try {
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) {
      console.error(`Supabase delete failed for service ${id}:`, error.message);
    }
  } catch (err) {
    console.error(`Failed to delete service ${id} from Supabase:`, err);
  }
}

/* ==================== Courses API ==================== */
export async function getCourses(): Promise<Course[]> {
  const db = await getDb();
  return db.courses || [];
}

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  const courses = await getCourses();
  return courses.find(c => c.id === slug);
}

export async function saveCourse(course: Course): Promise<void> {
  const db = await getDb();
  const idx = db.courses.findIndex(c => c.id === course.id);
  if (idx !== -1) {
    db.courses[idx] = course;
  } else {
    db.courses.push(course);
  }
  await writeDb(db);

  // Sync to Supabase by omitting template from root and adding to pageContent
  const { template, ...supabaseCourse } = course;
  if (supabaseCourse.pageContent) {
    supabaseCourse.pageContent = {
      ...supabaseCourse.pageContent,
      template: template
    };
  }

  // Sync to Supabase
  try {
    const { error } = await supabase.from("courses").upsert(supabaseCourse);
    if (error) {
      console.error(`Supabase sync failed for course ${course.id}:`, error.message);
    }
  } catch (err) {
    console.error(`Failed to push course ${course.id} to Supabase:`, err);
  }
}

export async function deleteCourse(id: string): Promise<void> {
  const db = await getDb();
  db.courses = db.courses.filter(c => c.id !== id);
  await writeDb(db);

  // Sync delete
  try {
    const { error } = await supabase.from("courses").delete().eq("id", id);
    if (error) {
      console.error(`Supabase delete failed for course ${id}:`, error.message);
    }
  } catch (err) {
    console.error(`Failed to delete course ${id} from Supabase:`, err);
  }
}

/* ==================== Blogs API ==================== */
export async function getBlogs(): Promise<Blog[]> {
  const db = await getDb();
  return db.blogs || [];
}

export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
  const blogs = await getBlogs();
  return blogs.find(b => b.id === slug);
}

export async function saveBlog(blog: Blog): Promise<void> {
  const db = await getDb();
  const idx = db.blogs.findIndex(b => b.id === blog.id);
  if (idx !== -1) {
    db.blogs[idx] = blog;
  } else {
    db.blogs.push(blog);
  }
  await writeDb(db);

  // Sync to Supabase
  try {
    const { error } = await supabase.from("blogs").upsert(blog);
    if (error) {
      console.error(`Supabase sync failed for blog ${blog.id}:`, error.message);
    }
  } catch (err) {
    console.error(`Failed to push blog ${blog.id} to Supabase:`, err);
  }
}

export async function deleteBlog(id: string): Promise<void> {
  const db = await getDb();
  db.blogs = db.blogs.filter(b => b.id !== id);
  await writeDb(db);

  // Sync delete
  try {
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) {
      console.error(`Supabase delete failed for blog ${id}:`, error.message);
    }
  } catch (err) {
    console.error(`Failed to delete blog ${id} from Supabase:`, err);
  }
}

/* ==================== Podcasts API ==================== */
export async function getPodcasts(): Promise<Podcast[]> {
  const db = await getDb();
  return db.podcasts || [];
}

export async function getPodcastBySlug(slug: string): Promise<Podcast | undefined> {
  const podcasts = await getPodcasts();
  return podcasts.find(p => p.id === slug);
}

export async function savePodcast(podcast: Podcast): Promise<void> {
  const db = await getDb();
  const idx = db.podcasts.findIndex(p => p.id === podcast.id);
  if (idx !== -1) {
    db.podcasts[idx] = podcast;
  } else {
    db.podcasts.push(podcast);
  }
  await writeDb(db);

  // Sync to Supabase
  try {
    const { error } = await supabase.from("podcasts").upsert(podcast);
    if (error) {
      console.error(`Supabase sync failed for podcast ${podcast.id}:`, error.message);
    }
  } catch (err) {
    console.error(`Failed to push podcast ${podcast.id} to Supabase:`, err);
  }
}

export async function deletePodcast(id: string): Promise<void> {
  const db = await getDb();
  db.podcasts = db.podcasts.filter(p => p.id !== id);
  await writeDb(db);

  // Sync delete
  try {
    const { error } = await supabase.from("podcasts").delete().eq("id", id);
    if (error) {
      console.error(`Supabase delete failed for podcast ${id}:`, error.message);
    }
  } catch (err) {
    console.error(`Failed to delete podcast ${id} from Supabase:`, err);
  }
}
