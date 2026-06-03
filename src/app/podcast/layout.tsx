import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Podcast - Cómo Funciona tu Negocio | One True Ecuador",
  description: "Conversaciones profundas sobre confianza, seguridad empresarial y evaluación de personal. Descubre cómo proteger tu negocio desde adentro con nuestro podcast.",
  keywords: ["podcast", "confianza empresarial", "seguridad", "recursos humanos", "evaluación", "One True"],
  openGraph: {
    title: "Podcast - Cómo Funciona tu Negocio | One True Ecuador",
    description: "Conversaciones profundas sobre confianza, seguridad empresarial y evaluación de personal.",
    url: "https://somosonetrue.com/podcast",
    siteName: "One True Ecuador",
    type: "website",
  },
};

export default function PodcastLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
