"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Disable smooth scroll on admin dashboard to prevent conflicts with drawers/modals/forms
    if (pathname?.startsWith("/admin")) {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    if (lenisRef.current) {
      lenisRef.current.destroy();
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Listen to Lenis scroll events to dispatch custom event
    lenis.on("scroll", () => {
      const event = new Event("lenis-scroll", { bubbles: true });
      window.dispatchEvent(event);
    });

    // Restore scroll position on page load
    const handleLoad = () => {
      if (window.history.state?.scrollY !== undefined) {
        lenis.scrollTo(window.history.state.scrollY, { immediate: true });
      }
    };
    window.addEventListener("load", handleLoad);

    // Save scroll position before unloading
    const handleBeforeUnload = () => {
      window.history.replaceState(
        { ...window.history.state, scrollY: window.scrollY },
        ""
      );
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    const raf = (time: number) => {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };

    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, [pathname]);

  return <>{children}</>;
}
