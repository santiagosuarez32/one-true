import { getServices, getCourses, getServiceBySlug, getCourseBySlug } from "@/lib/cms";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import CoursePageTemplate from "@/components/CoursePageTemplate";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import TecnicasPoligraficasPage from "./components/TecnicasPoligraficas";
import CursoBasicoPage from "./components/CursoBasico";
import EntrevistaPretestPage from "./components/EntrevistaPretest";
import CalificacionGraficasPage from "./components/CalificacionGraficas";
import SistemaCalificacionESSMPage from "./components/SistemaCalificacion";
import ControlDeCalidadEnPoligrafiaPage from "./components/ControlCalidad";

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
    const title = service.seoTitle || `${service.title} | One True Ecuador`;
    const description = service.seoDescription || service.desc;
    const keywords = service.seoKeywords ? service.seoKeywords.split(",").map(k => k.trim()) : undefined;
    return {
      title,
      description,
      keywords,
      openGraph: {
        title,
        description,
        images: [{ url: service.image }],
        url: `https://somosonetrue.com/${slug}`,
        type: "website",
      }
    };
  }

  const course = await getCourseBySlug(slug);
  if (course) {
    const title = course.seoTitle || `${course.title} | Academia One True`;
    const description = course.seoDescription || course.desc;
    const keywords = course.seoKeywords ? course.seoKeywords.split(",").map(k => k.trim()) : undefined;
    return {
      title,
      description,
      keywords,
      openGraph: {
        title,
        description,
        images: [{ url: course.image }],
        url: `https://somosonetrue.com/${slug}`,
        type: "website",
      }
    };
  }

  return {};
}

export const revalidate = 3600;

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
    const template = course.template || course.pageContent?.template || (
      course.id === "curso-avanzado-tecnicas-poligraficas" || course.id === "tecnicas-poligraficas" ? "tecnicas" :
      course.id === "curso-basico-de-poligrafia" || course.id === "curso-basico-en-poligrafia" ? "basico" :
      course.id === "entrevista-pretest-y-postest" || course.id === "entrevista-pretest" ? "pretest" :
      course.id === "calificacion-de-graficas" || course.id === "calificacion-graficas-analisis-datos" || course.id === "evaluacion-forense-de-la-credibilidad" || course.id === "elicitacion-conversacional" || course.id === "modelos-de-entrevista-investigativa" ? "graficas" :
      course.id === "sistema-de-calificacion-ess-m" || course.id === "sistema-calificacion-ess-m" ? "ess-m" :
      course.id === "control-de-calidad-en-poligrafia" ? "control-calidad" :
      "standard"
    );

    if (template === "tecnicas") {
      return <TecnicasPoligraficasPage course={course} />;
    } else if (template === "basico") {
      return <CursoBasicoPage course={course} />;
    } else if (template === "pretest") {
      return <EntrevistaPretestPage course={course} />;
    } else if (template === "graficas") {
      return <CalificacionGraficasPage course={course} />;
    } else if (template === "ess-m") {
      return <SistemaCalificacionESSMPage course={course} />;
    } else if (template === "control-calidad") {
      return <ControlDeCalidadEnPoligrafiaPage course={course} />;
    }
    return <CoursePageTemplate course={course} />;
  }
  
  notFound();
}
