"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CookieConsent() {
  const pathname = usePathname();
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return;

    // Check if consent has already been saved in localStorage
    const consent = localStorage.getItem("onetrue_cookies_accepted");
    if (!consent) {
      // Delay display slightly for a smoother micro-animation feel
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const handleAccept = () => {
    localStorage.setItem("onetrue_cookies_accepted", "true");
    setShowConsent(false);
  };

  const handleDecline = () => {
    localStorage.setItem("onetrue_cookies_accepted", "false");
    setShowConsent(false);
  };

  if (pathname !== "/") return null;
  if (!showConsent) return null;

  return (
    <div 
      className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 max-w-md bg-white/95 backdrop-blur-md border border-neutral-200/80 p-5 sm:p-6 rounded-2xl shadow-[0_20px_50px_rgba(72,37,90,0.15)] z-50 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-5 duration-500"
      style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
    >
      <div className="text-left">
        <h4 className="text-base font-bold text-[#48255A] mb-1">
          Uso de Cookies
        </h4>
        <p className="text-xs sm:text-sm text-[#525252] leading-relaxed font-medium">
          Utilizamos cookies propias y de terceros para optimizar tu navegación, analizar el rendimiento del sitio y personalizar ofertas comerciales. Conoce más detalles en nuestra{" "}
          <Link href="/politica-de-privacidad" className="text-[#700FA3] hover:underline font-bold">
            Política de Privacidad
          </Link>.
        </p>
      </div>

      <div className="flex items-center gap-3 justify-end mt-2">
        <button 
          onClick={handleDecline} 
          className="px-4 py-2 text-xs font-bold text-neutral-500 hover:text-[#700FA3] bg-transparent hover:bg-neutral-100 transition-colors duration-200 rounded-lg cursor-pointer"
        >
          Rechazar
        </button>
        <button 
          onClick={handleAccept} 
          className="px-5 py-2.5 text-xs font-bold text-[#5F0091] bg-[#FFC107] hover:brightness-105 transition-all duration-200 rounded-lg shadow-sm hover:shadow cursor-pointer"
        >
          Aceptar cookies
        </button>
      </div>
    </div>
  );
}
