import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "One True Ecuador | Pruebas de Polígrafo y Vetting de Antecedentes",
  description: "Expertos en evaluación de confianza y poligrafía forense en Ecuador. Servicios de vetting de antecedentes, estudios de confiabilidad 360° y visitas domiciliarias en Quito y Guayaquil para proteger la seguridad de su empresa.",
  keywords: ["poligrafo ecuador", "vetting ecuador", "pruebas de poligrafo quito", "verificacion de antecedentes guayaquil", "estudios de confiabilidad", "seleccion de personal", "seguridad corporativa", "evaluacion de confianza", "One True"],
  openGraph: {
    title: "One True Ecuador | Pruebas de Polígrafo y Vetting de Antecedentes",
    description: "Expertos en evaluación de confianza y poligrafía forense en Ecuador. Servicios de vetting de antecedentes, estudios de confiabilidad 360° y visitas domiciliarias en Quito y Guayaquil para proteger la seguridad de su empresa.",
    url: "https://somosonetrue.com",
    siteName: "One True Ecuador",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "One True Ecuador - Soluciones de Confianza y Seguridad",
      },
    ],
    locale: "es_EC",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${montserrat.className} antialiased bg-black text-white`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
