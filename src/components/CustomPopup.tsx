"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function CustomPopup() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [ctaUrl, setCtaUrl] = useState("");
  const [delay, setDelay] = useState(3);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Fetch popup settings
    (async () => {
      try {
        const res = await fetch("/api/cms");
        if (res.ok) {
          const data = await res.json();
          if (data.settings) {
            const foundEnabled = data.settings.find((s: any) => s.key === "popup_enabled");
            const isEnabled = foundEnabled?.value === "true";
            
            if (isEnabled) {
              const foundTitle = data.settings.find((s: any) => s.key === "popup_title");
              const foundDesc = data.settings.find((s: any) => s.key === "popup_description");
              const foundImage = data.settings.find((s: any) => s.key === "popup_image");
              const foundCtaText = data.settings.find((s: any) => s.key === "popup_cta_text");
              const foundCtaUrl = data.settings.find((s: any) => s.key === "popup_cta_url");
              const foundDelay = data.settings.find((s: any) => s.key === "popup_delay");

              setEnabled(true);
              setTitle(foundTitle?.value || "");
              setDescription(foundDesc?.value || "");
              setImage(foundImage?.value || "");
              setCtaText(foundCtaText?.value || "");
              setCtaUrl(foundCtaUrl?.value || "");
              
              const parsedDelay = parseInt(foundDelay?.value || "3", 10);
              setDelay(isNaN(parsedDelay) ? 3 : parsedDelay);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load popup settings:", err);
      }
    })();
  }, []);

  useEffect(() => {
    if (!enabled || !mounted) return;

    // Check if dismissed in sessionStorage
    const dismissed = sessionStorage.getItem("one_true_popup_dismissed");
    if (dismissed === "true") return;

    const timer = setTimeout(() => {
      setVisible(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [enabled, delay, mounted]);

  const handleClose = () => {
    setVisible(false);
    sessionStorage.setItem("one_true_popup_dismissed", "true");
  };

  // Don't render on admin dashboard or login page
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/login")) {
    return null;
  }

  if (!visible || !mounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs transition-opacity duration-300 ease-out">
      <div 
        className="relative bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl w-full max-w-[420px] overflow-hidden flex flex-col transition-all duration-300 transform scale-100 opacity-100"
        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
      >
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 text-white bg-black/50 hover:bg-black/75 p-2 rounded-full transition-all z-20 cursor-pointer shadow-md border-0"
          aria-label="Cerrar anuncio"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Promo Image (Widescreen / Banner style on top) */}
        {image && (
          <div className="w-full aspect-video relative shrink-0 overflow-hidden bg-neutral-900">
            {/* Skeleton / Pulse effect while loading */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-neutral-800 animate-pulse flex items-center justify-center">
                <svg className="w-8 h-8 text-neutral-700 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}
            <img 
              src={image} 
              alt={title || "Anuncio importante"} 
              className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              fetchPriority="high"
              loading="eager"
              onLoad={() => setImageLoaded(true)}
            />
            {/* Soft gradient overlay blending image into card background */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/10 to-transparent pointer-events-none" />
          </div>
        )}

        {/* Text Content Column */}
        <div className="p-6 md:p-8 flex flex-col justify-center text-center relative z-10 bg-neutral-900">
          {title && (
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight font-montserrat">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-neutral-300 leading-relaxed mb-6 font-montserrat font-medium">
              {description}
            </p>
          )}
          
          {ctaText && ctaUrl && (
            <div className="flex justify-center">
              <a 
                href={ctaUrl}
                onClick={handleClose}
                className="px-6 py-2.5 bg-[#FFC107] hover:brightness-110 text-[#5F0091] font-bold rounded-lg transition-all shadow-md hover:shadow-lg inline-block text-center text-sm font-montserrat cursor-pointer no-underline border-0"
              >
                {ctaText}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
