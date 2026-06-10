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
  metadataBase: new URL("https://somosonetrue.com"),
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
        url: "/og-image.webp",
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
      <head>
        {/*
          Back/forward navigation serves a server-rendered page that does not
          re-hydrate, leaving client components (e.g. the scroll-aware Navbar)
          stuck in their initial state. This inline script runs during HTML
          parsing — independent of React hydration — and forces a single clean
          reload when the page is reached via the back/forward button, which
          restores full hydration. A reload reports navigation type "reload",
          so this never loops.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function () {
  try {
    var entries = performance.getEntriesByType && performance.getEntriesByType('navigation');
    var navType = entries && entries[0] ? entries[0].type
      : (performance.navigation && performance.navigation.type === 2 ? 'back_forward' : '');
    if (navType === 'back_forward') {
      window.location.reload();
    }
  } catch (e) {}
  // bfcache restore (some browsers): re-show without re-running scripts.
  window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
      window.location.reload();
    }
  });
})();`,
          }}
        />
      </head>
      <body className={`${montserrat.className} antialiased bg-black text-white`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
