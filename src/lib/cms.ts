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
    aboutCards: { title: string; text: string; icon?: string; items?: string[] }[];
    whyTitle: string;
    whyPoints: { title: string; text: string }[];
    whyImage1?: string;
    whyImage2?: string;
    faqs?: { q: string; a: string }[];
    contactPhone: string;
    contactWhatsapp?: string;
    contactWhatsappText?: string;
    showOtherSolutions?: boolean;
    showFaqs?: boolean;
    aboutCardsLayout?: "yellow" | "icon";
  };
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  created_at?: string;
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
    isComplementary?: boolean;
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
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
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
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
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
  sortOrder: number;
};

export type CalendarIntake = {
  id: string;
  title: string;
  courseId: string;
  category: string;
  badgeText: string;
  badgeColor: string;
  dateDisplay: string;
  durationDisplay: string;
  year: number;
  modalityType: string;
  durationType: string;
  isFeatured: boolean;
  brochureUrl: string;
  brochureFileName?: string;
  href: string;
  published: boolean;
  sortOrder: number;
  buttonType?: string;
  brochureSize?: string;
};

export type Setting = {
  key: string;
  value: string;
};

export type DatabaseSchema = {
  services: Service[];
  courses: Course[];
  blogs: Blog[];
  podcasts: Podcast[];
  calendarIntakes: CalendarIntake[];
  settings: Setting[];
};

export async function getDb(): Promise<DatabaseSchema> {
  const safeSettingsQuery = async () => {
    try {
      return await supabase.from("settings").select("*");
    } catch (err: any) {
      return { data: [], error: err };
    }
  };

  try {
    const [servicesRes, coursesRes, blogsRes, podcastsRes, calendarRes, settingsRes] = await Promise.all([
      supabase.from("services").select("*"),
      supabase.from("courses").select("*"),
      supabase.from("blogs").select("*"),
      supabase.from("podcasts").select("*"),
      supabase.from("calendar_intakes").select("*"),
      safeSettingsQuery()
    ]);
    
    // Check if we retrieved data without schema cache/missing table errors
    if (!servicesRes.error && !coursesRes.error && !blogsRes.error && !podcastsRes.error) {
      const dbCourses = (coursesRes.data || []).map(c => ({
        ...c,
        template: c.template || c.pageContent?.template
      }));
      const sortedServices = [...(servicesRes.data || [])].sort((a, b) => {
        const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return timeA - timeB;
      });
      const db: DatabaseSchema = {
        services: sortedServices,
        courses: dbCourses,
        blogs: blogsRes.data || [],
        podcasts: podcastsRes.data || [],
        calendarIntakes: calendarRes.data || [],
        settings: settingsRes.data || []
      };
      // Save locally as backup cache
      try {
        await fs.writeFile(dbPath, JSON.stringify(db, null, 2), "utf8");
      } catch (writeErr) {
        console.warn("Could not write local db.json cache (expected on Vercel):", writeErr);
      }
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
    const parsed = JSON.parse(data);
    const sortedServices = [...(parsed.services || [])].sort((a, b) => {
      const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return timeA - timeB;
    });
    return {
      services: sortedServices,
      courses: parsed.courses || [],
      blogs: parsed.blogs || [],
      podcasts: parsed.podcasts || [],
      calendarIntakes: parsed.calendarIntakes || [],
      settings: parsed.settings || []
    };
  } catch (error) {
    console.error("Error reading db.json, returning empty structure:", error);
    return { services: [], courses: [], blogs: [], podcasts: [], calendarIntakes: [], settings: [] };
  }
}

export async function writeDb(data: DatabaseSchema): Promise<void> {
  try {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf8");
  } catch (writeErr) {
    console.warn("Could not write local db.json cache (expected on Vercel):", writeErr);
  }
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
  return (db.podcasts || []).sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
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

/* ==================== Calendar Intakes API ==================== */
export async function getCalendarIntakes(): Promise<CalendarIntake[]> {
  const db = await getDb();
  return (db.calendarIntakes || []).sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export async function saveCalendarIntake(intake: CalendarIntake): Promise<void> {
  const db = await getDb();
  const idx = db.calendarIntakes.findIndex(i => i.id === intake.id);
  if (idx !== -1) {
    db.calendarIntakes[idx] = intake;
  } else {
    db.calendarIntakes.push(intake);
  }
  await writeDb(db);

  // Sync to Supabase
  try {
    const { error } = await supabase.from("calendar_intakes").upsert(intake);
    if (error) {
      console.error(`Supabase sync failed for calendar intake ${intake.id}:`, error.message);
      throw new Error(`Error de base de datos Supabase: ${error.message}`);
    }
  } catch (err: any) {
    console.error(`Failed to push calendar intake ${intake.id} to Supabase:`, err);
    throw err;
  }
}

export async function deleteCalendarIntake(id: string): Promise<void> {
  const db = await getDb();
  db.calendarIntakes = db.calendarIntakes.filter(i => i.id !== id);
  await writeDb(db);

  // Sync delete
  try {
    const { error } = await supabase.from("calendar_intakes").delete().eq("id", id);
    if (error) {
      console.error(`Supabase delete failed for calendar intake ${id}:`, error.message);
      throw new Error(`Error de base de datos Supabase al eliminar: ${error.message}`);
    }
  } catch (err: any) {
    console.error(`Failed to delete calendar intake ${id} from Supabase:`, err);
    throw err;
  }
}

/* ==================== Settings API ==================== */
export async function getSettings(): Promise<Setting[]> {
  const db = await getDb();
  return db.settings || [];
}

export async function saveSetting(key: string, value: string): Promise<void> {
  const db = await getDb();
  if (!db.settings) db.settings = [];
  const idx = db.settings.findIndex(s => s.key === key);
  if (idx !== -1) {
    db.settings[idx].value = value;
  } else {
    db.settings.push({ key, value });
  }
  await writeDb(db);

  // Sync to Supabase
  try {
    const { error } = await supabase
      .from("settings")
      .upsert({ key, value });
    if (error) {
      console.error(`Supabase settings sync failed for setting ${key}:`, error.message);
      throw new Error(`Error de base de datos Supabase al guardar configuración: ${error.message}`);
    }
  } catch (err: any) {
    console.error(`Failed to push setting ${key} to Supabase:`, err);
    throw err;
  }
}

/* ==================== Backups API ==================== */
const backupsDir = path.join(process.cwd(), "backups");

export async function createBackup(isAuto: boolean = false): Promise<string> {
  const db = await getDb();
  await fs.mkdir(backupsDir, { recursive: true });
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const prefix = isAuto ? "auto-backup" : "manual-backup";
  const filename = `${prefix}-${timestamp}.json`;
  const filePath = path.join(backupsDir, filename);
  
  await fs.writeFile(filePath, JSON.stringify(db, null, 2), "utf8");
  
  if (isAuto) {
    await rotateAutoBackups();
  }
  return filename;
}

export async function rotateAutoBackups(): Promise<void> {
  try {
    await fs.mkdir(backupsDir, { recursive: true });
    const files = await fs.readdir(backupsDir);
    
    // Filter automatic backups
    const autoBackups = files
      .filter(f => f.startsWith("auto-backup-") && f.endsWith(".json"))
      .map(f => ({
        name: f,
        path: path.join(backupsDir, f),
        time: 0
      }));
      
    for (const b of autoBackups) {
      const stats = await fs.stat(b.path);
      b.time = stats.mtimeMs;
    }
    
    // Sort oldest to newest
    autoBackups.sort((a, b) => a.time - b.time);
    
    // Keep only the last 15. Delete the rest.
    if (autoBackups.length > 15) {
      const toDelete = autoBackups.slice(0, autoBackups.length - 15);
      for (const file of toDelete) {
        try {
          await fs.unlink(file.path);
        } catch (unlinkErr: any) {
          if (unlinkErr.code !== "ENOENT") {
            throw unlinkErr;
          }
        }
      }
    }
  } catch (err) {
    console.error("Failed to rotate auto backups:", err);
  }
}

export async function listBackups(): Promise<any[]> {
  try {
    await fs.mkdir(backupsDir, { recursive: true });
    const files = await fs.readdir(backupsDir);
    
    const backups = [];
    for (const file of files) {
      if ((file.startsWith("auto-backup-") || file.startsWith("manual-backup-")) && file.endsWith(".json")) {
        const filePath = path.join(backupsDir, file);
        const stats = await fs.stat(filePath);
        backups.push({
          id: file,
          name: file,
          type: file.startsWith("auto-backup-") ? "auto" : "manual",
          date: stats.mtime.toISOString(),
          size: stats.size
        });
      }
    }
    
    // Sort newest first
    return backups.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (err) {
    console.error("Failed to list backups:", err);
    return [];
  }
}

export async function deleteBackupFile(filename: string): Promise<void> {
  const resolvedPath = path.resolve(backupsDir, filename);
  if (!resolvedPath.startsWith(backupsDir)) {
    throw new Error("Acceso no autorizado al archivo de backup.");
  }
  await fs.unlink(resolvedPath);
}

export async function restoreBackup(backupData: DatabaseSchema): Promise<void> {
  if (!backupData || typeof backupData !== "object") {
    throw new Error("El archivo de copia de seguridad no es válido.");
  }
  const requiredKeys: (keyof DatabaseSchema)[] = ["services", "courses", "blogs", "podcasts", "calendarIntakes", "settings"];
  for (const key of requiredKeys) {
    if (!Array.isArray(backupData[key])) {
      throw new Error(`Falta la colección '${key}' en la copia de seguridad.`);
    }
  }

  // Clear all data in Supabase tables
  console.log("Restoring backup: clearing Supabase tables...");
  
  const clearServices = supabase.from("services").delete().neq("id", "_non_existent_id_");
  const clearCourses = supabase.from("courses").delete().neq("id", "_non_existent_id_");
  const clearBlogs = supabase.from("blogs").delete().neq("id", "_non_existent_id_");
  const clearPodcasts = supabase.from("podcasts").delete().neq("id", "_non_existent_id_");
  const clearCalendar = supabase.from("calendar_intakes").delete().neq("id", "_non_existent_id_");
  const clearSettings = supabase.from("settings").delete().neq("key", "_non_existent_key_");

  const clearResults = await Promise.all([
    clearServices,
    clearCourses,
    clearBlogs,
    clearPodcasts,
    clearCalendar,
    clearSettings
  ]);

  for (const res of clearResults) {
    if (res.error) {
      console.error("Clear table failed during restore:", res.error.message);
      throw new Error(`Fallo al vaciar tabla en Supabase: ${res.error.message}`);
    }
  }

  // Insert records back
  console.log("Restoring backup: inserting data into Supabase...");

  const insertPromises = [];

  if (backupData.services.length > 0) {
    insertPromises.push(supabase.from("services").insert(backupData.services));
  }
  if (backupData.courses.length > 0) {
    const coursesToInsert = backupData.courses.map(c => {
      const { template, ...supCourse } = c;
      if (supCourse.pageContent) {
        supCourse.pageContent = {
          ...supCourse.pageContent,
          template: template
        };
      }
      return supCourse;
    });
    insertPromises.push(supabase.from("courses").insert(coursesToInsert));
  }
  if (backupData.blogs.length > 0) {
    insertPromises.push(supabase.from("blogs").insert(backupData.blogs));
  }
  if (backupData.podcasts.length > 0) {
    insertPromises.push(supabase.from("podcasts").insert(backupData.podcasts));
  }
  if (backupData.calendarIntakes.length > 0) {
    insertPromises.push(supabase.from("calendar_intakes").insert(backupData.calendarIntakes));
  }
  if (backupData.settings.length > 0) {
    insertPromises.push(supabase.from("settings").insert(backupData.settings));
  }

  const insertResults = await Promise.all(insertPromises);
  for (const res of insertResults) {
    if (res.error) {
      console.error("Insert failed during restore:", res.error.message);
      throw new Error(`Fallo al repoblar tabla en Supabase: ${res.error.message}`);
    }
  }

  // Update local db.json cache
  console.log("Restoring backup: updating local cache db.json...");
  await writeDb(backupData);
}

export async function restoreBackupFromFile(filename: string): Promise<void> {
  const resolvedPath = path.resolve(backupsDir, filename);
  if (!resolvedPath.startsWith(backupsDir)) {
    throw new Error("Acceso no autorizado al archivo de backup.");
  }
  const data = await fs.readFile(resolvedPath, "utf8");
  const backupData = JSON.parse(data) as DatabaseSchema;
  await restoreBackup(backupData);
}

