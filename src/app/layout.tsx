import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CookieConsent from "@/components/CookieConsent";


const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://somosonetrue.com"),
  title: "One True | Servicios Profesionales de Polígrafo en Ecuador",
  description: "Expertos en evaluación de confianza y poligrafía forense en Ecuador. Servicios de vetting de antecedentes, estudios de confiabilidad 360° y visitas domiciliarias en Quito y Guayaquil para proteger la seguridad de su empresa.",
  keywords: ["poligrafo ecuador", "vetting ecuador", "pruebas de poligrafo quito", "verificacion de antecedentes guayaquil", "estudios de confiabilidad", "seleccion de personal", "seguridad corporativa", "evaluacion de confianza", "One True"],
  openGraph: {
    title: "One True | Servicios Profesionales de Polígrafo en Ecuador",
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
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5FM8TG92');`}
        </Script>
        {/* End Google Tag Manager */}
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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5FM8TG92"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <CookieConsent />
      </body>
    </html>
  );
}
