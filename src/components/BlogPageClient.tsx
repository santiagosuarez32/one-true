"use client";

import React, { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Blog } from "@/lib/cms";

interface Article {
  title: string;
  image: string;
  link: string;
}

const BlogCard = ({ article, className = "", cardRef }: { article: Article, className?: string, cardRef?: (el: HTMLDivElement | null) => void }) => (
  <div
    ref={cardRef}
    className={`blog-card flex flex-col bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-1 group cursor-pointer ${className}`}
    onClick={() => {
      if (typeof window !== "undefined") {
        window.location.href = article.link;
      }
    }}
  >
    {/* Image Container with Label */}
    <div className="relative overflow-hidden bg-neutral-100 w-full aspect-[4/3] rounded-t-2xl">
      <img
        src={article.image || "/blog/1.webp"}
        alt={`Imagen representativa del artículo: ${article.title} - One True Ecuador`}
        className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105"
      />
      {/* Blog Badge */}
      <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md text-white text-[10px] font-bold tracking-wider px-4 py-1.5 rounded-full uppercase z-10">
        Blog
      </div>
    </div>

    {/* Content */}
    <div className="px-6 py-8 flex flex-col flex-1 justify-between gap-6">
      <h3
        className="text-[14px] font-bold text-[#48255A] group-hover:text-[#700FA3] transition-colors duration-300 leading-[1.4]"
        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
      >
        <a href={article.link} className="hover:underline focus:outline-none">
          {article.title}
        </a>
      </h3>

      <a
        href={article.link}
        aria-label={`Leer artículo completo: ${article.title}`}
        className="blog-cta-btn px-4 py-2 bg-[#FFC107] text-[#411A56] font-bold rounded transition-colors duration-300 text-xs whitespace-nowrap w-auto self-start flex items-center justify-center gap-1"
        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
      >
        Leer más
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  </div>
);

export default function BlogPageClient({ initialBlogs }: { initialBlogs: Blog[] }) {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        if (card) {
          gsap.fromTo(
            card,
            { x: -80, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );
        }
      });
    });
    return () => ctx.revert();
  }, [initialBlogs]);

  return (
    <main className="min-h-screen bg-white text-[#525252] selection:bg-[#FFC107] selection:text-[#411A56]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-32 pb-24 bg-[#700FA3]">
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #700FA3 0%, #700FA3 35%, rgba(112, 15, 163, 0.9) 48%, rgba(112, 15, 163, 0.6) 60%, rgba(112, 15, 163, 0.3) 72%, rgba(112, 15, 163, 0.05) 86%, transparent 100%)"
          }}
        />

        <img
          src="/blog/1.webp"
          alt="Blog One True"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-right-top z-0 opacity-40 mix-blend-overlay pointer-events-none"
        />

        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 z-10 flex justify-start items-center">
          <div className="max-w-3xl text-left">

            {/* Tag Prefix */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[3px] bg-[#FFC107]" />
              <span
                className="text-xs sm:text-sm md:text-base font-semibold"
                style={{
                  letterSpacing: "0.5px",
                  color: "#FFC107",
                  fontFamily: "var(--font-montserrat), sans-serif",
                }}
              >
                Conocimiento y Recursos
              </span>
            </div>

            <h1
              className="mb-6 text-3xl! sm:text-4xl! md:text-5xl! lg:text-6xl! font-semibold"
              style={{
                textAlign: "start",
                fontFamily: "var(--font-montserrat), sans-serif",
                lineHeight: "1.1",
                color: "#FFFFFF",
                textShadow: "0 2px 4px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.18)"
              }}
            >
              Blog y Recursos
            </h1>

            <p
              className="text-base! md:text-lg! opacity-95 font-medium"
              style={{
                textAlign: "start",
                fontFamily: "var(--font-montserrat), sans-serif",
                color: "#FFFFFF"
              }}
            >
              Artículos, guías y recursos sobre Poligrafía, Vetting, Evaluaciones Forenses y más.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Cards Section */}
      <section className="bg-white py-16 md:py-24">
        <style dangerouslySetInnerHTML={{ __html: `
          .blog-card:hover .blog-cta-btn {
            background-color: #700FA3 !important;
            color: #FFC107 !important;
          }
        `}} />
        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {initialBlogs.map((article, idx) => (
              <BlogCard
                key={article.id}
                article={article}
                className="w-full h-full flex"
                cardRef={(el) => { cardsRef.current[idx] = el; }}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
