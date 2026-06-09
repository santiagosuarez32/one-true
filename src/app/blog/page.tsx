import BlogClient from "./BlogClient";
import { getBlogs } from "@/lib/cms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | One True Academia",
  description: "Artículos más recientes sobre poligrafía, seguridad corporativa y evaluaciones de confiabilidad.",
};

export default async function BlogPage() {
  const blogs = await getBlogs();
  const publishedBlogs = blogs
    .filter((b: any) => b.published)
    .map((b: any) => ({
      title: b.title,
      image: b.image || "/blog/1.webp",
      link: b.link || `/blog/${b.id}`
    }));
  return <BlogClient initialArticles={publishedBlogs} />;
}
