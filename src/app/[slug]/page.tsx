import { getServices, getCourses, getServiceBySlug, getCourseBySlug } from "@/lib/cms";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import CoursePageTemplate from "@/components/CoursePageTemplate";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const [services, courses] = await Promise.all([getServices(), getCourses()]);
  const serviceSlugs = services.map(s => ({ slug: s.id }));
  const courseSlugs = courses.map(c => ({ slug: c.id }));
  return [...serviceSlugs, ...courseSlugs];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  const service = await getServiceBySlug(slug);
  if (service) {
    return {
      title: `${service.title} | One True Ecuador`,
      description: service.desc,
      openGraph: {
        title: `${service.title} | One True Ecuador`,
        description: service.desc,
        images: [{ url: service.image }],
      }
    };
  }

  const course = await getCourseBySlug(slug);
  if (course) {
    return {
      title: `${course.title} | Academia One True`,
      description: course.desc,
      openGraph: {
        title: `${course.title} | Academia One True`,
        description: course.desc,
        images: [{ url: course.image }],
      }
    };
  }

  return {};
}

export default async function DynamicSlugPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Try to find as service
  const service = await getServiceBySlug(slug);
  if (service && service.published) {
    const allServices = await getServices();
    return <ServicePageTemplate service={service} allServices={allServices} />;
  }
  
  // Try to find as course
  const course = await getCourseBySlug(slug);
  if (course && course.published) {
    return <CoursePageTemplate course={course} />;
  }
  
  notFound();
}
