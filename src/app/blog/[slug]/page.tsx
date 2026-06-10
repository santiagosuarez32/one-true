import { getBlogs, getBlogBySlug } from "@/lib/cms";
import BlogPageTemplate from "@/components/BlogPageTemplate";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map(b => ({ slug: b.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (blog) {
    const title = blog.seoTitle || `${blog.title} | Blog One True`;
    const cleanDescription = blog.seoDescription || blog.content.replace(/<[^>]*>/g, "").trim().substring(0, 160);
    const keywords = blog.seoKeywords ? blog.seoKeywords.split(",").map(k => k.trim()) : undefined;
    return {
      title,
      description: cleanDescription,
      keywords,
      openGraph: {
        title,
        description: cleanDescription,
        images: [{ url: blog.image }],
        url: `https://somosonetrue.com/blog/${slug}`,
        type: "article",
      }
    };
  }
  return {};
}

export default async function DynamicBlogPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  
  if (!blog || !blog.published) {
    notFound();
  }

  const allBlogs = await getBlogs();
  return <BlogPageTemplate blog={blog} allBlogs={allBlogs} />;
}
