import { getBlogs, getBlogBySlug } from "@/lib/cms";
import BlogPageTemplate from "@/components/BlogPageTemplate";
import { notFound } from "next/navigation";
import { Metadata } from "next";

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
    return {
      title: `${blog.title} | Blog One True`,
      description: blog.content.substring(0, 160),
      openGraph: {
        title: `${blog.title} | Blog One True`,
        description: blog.content.substring(0, 160),
        images: [{ url: blog.image }],
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
