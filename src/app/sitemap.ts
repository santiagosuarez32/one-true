import { MetadataRoute } from "next";
import { getServices, getCourses, getBlogs } from "@/lib/cms";

function parseSpanishDate(dateStr: string): Date {
  if (!dateStr) return new Date();
  
  const months: Record<string, string> = {
    enero: "january",
    febrero: "february",
    marzo: "march",
    abril: "april",
    mayo: "may",
    junio: "june",
    julio: "july",
    agosto: "august",
    septiembre: "september",
    octubre: "october",
    noviembre: "november",
    diciembre: "december"
  };

  try {
    let cleanStr = dateStr.toLowerCase().replace(/\bde\b/g, "").replace(/\s+/g, " ").trim();
    
    for (const [es, en] of Object.entries(months)) {
      if (cleanStr.includes(es)) {
        cleanStr = cleanStr.replace(es, en);
        break;
      }
    }

    const parsed = new Date(cleanStr);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  } catch {
    return new Date();
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://somosonetrue.com";
  
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/cursos-avanzados-en-poligrafia`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/formaciones-complementarias`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/podcast`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calendario-academico`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/comunidad`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/cotiza`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ebook`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/prueba-de-honestidad-etica-y-valores`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/404`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.2,
    },
  ];

  let servicePages: MetadataRoute.Sitemap = [];
  let coursePages: MetadataRoute.Sitemap = [];
  let blogPages: MetadataRoute.Sitemap = [];

  try {
    const services = await getServices();
    servicePages = services
      .filter(s => s.published)
      .map(s => ({
        url: `${baseUrl}/${s.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      }));
  } catch (err) {
    console.error("Error generating sitemap services:", err);
  }

  try {
    const courses = await getCourses();
    coursePages = courses
      .filter(c => c.published)
      .map(c => ({
        url: `${baseUrl}/${c.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      }));
  } catch (err) {
    console.error("Error generating sitemap courses:", err);
  }

  try {
    const blogs = await getBlogs();
    blogPages = blogs
      .filter(b => b.published)
      .map(b => ({
        url: `${baseUrl}/blog/${b.id}`,
        lastModified: parseSpanishDate(b.publishDate),
        changeFrequency: "monthly",
        priority: 0.6,
      }));
  } catch (err) {
    console.error("Error generating sitemap blogs:", err);
  }

  return [...staticPages, ...servicePages, ...coursePages, ...blogPages];
}
