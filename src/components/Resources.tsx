"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface Article {
  title: string;
  image: string;
  link: string;
}

const BlogCard = ({ article, className = "", isWide = false, cardRef }: { article: Article, className?: string, isWide?: boolean, cardRef?: (el: HTMLDivElement | null) => void }) => (
  <div 
    ref={cardRef}
    className={`blog-card flex ${isWide ? 'flex-col md:flex-row' : 'flex-col'} bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-1 group cursor-pointer ${className}`}
    onClick={() => {
      if (typeof window !== "undefined") {
        window.location.href = article.link;
      }
    }}
  >
    {/* Image Container with Label */}
    <div className={`relative overflow-hidden bg-neutral-100 ${isWide ? 'w-full md:w-[45%] min-h-[280px] rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl' : 'w-full aspect-[4/3] rounded-t-2xl'}`}>
      <img
        src={article.image}
        alt={`Imagen representativa del artículo: ${article.title} - One True Ecuador`}
        className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105"
      />
      {/* Blog Badge */}
      <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md text-white text-[10px] font-bold tracking-wider px-4 py-1.5 rounded-full uppercase z-10">
        Blog
      </div>
    </div>

    {/* Content */}
    <div className={`px-6 py-8 flex flex-col flex-1 justify-between gap-6 ${isWide ? 'md:w-[55%]' : ''}`}>
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

export default function Resources() {
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
  }, []);

  const articles: Article[] = [
    {
      title: "¿Verdad o Mentira? Todo lo que debes saber antes de contratar una prueba de Polígrafo.",
      image: "/blog/1.webp",
      link: "#"
    },
    {
      title: "¿Preempleo, Rutina o Investigación? Descubre qué prueba de polígrafo necesitas realmente.",
      image: "/blog/2.webp",
      link: "#"
    },
    {
      title: "Garantiza la Verdad: 10 Requisitos Clave para una Prueba de Polígrafo Confiable y Exitosa.",
      image: "/blog/3.webp",
      link: "#"
    }
  ];

  return (
    <section id="recursos" className="bg-white py-16 md:py-24 scroll-mt-20">
      <style dangerouslySetInnerHTML={{ __html: `
        .blog-card:hover .blog-cta-btn {
          background-color: #700FA3 !important;
          color: #FFC107 !important;
        }
      `}} />
      <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">

        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#48255A] mb-6"
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
            }}
          >
            Aprende con nuestros recursos gratuitos
          </h2>

          <p
            className="text-base sm:text-lg md:text-lg leading-relaxed max-w-4xl text-[#525252]"
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: "500",
            }}
          >
            Eleva la seguridad de tu organización y optimiza decisiones críticas con nuestras soluciones en evaluación de confianza, credibilidad y formación avanzada. Explora nuestro blog, podcast y ebooks exclusivos para adquirir el conocimiento estratégico que necesitas para mitigar riesgos, asegurar el crecimiento de tu negocio, aprender de poligrafía y evaluación de la credibilidad desde un enfoque más accesible y dinámico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          
          {/* First Grid Item: Text & CTA */}
          <div className="flex flex-col items-start justify-center text-left w-full h-full pb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[3px] bg-[#700FA3]" />
              <span
                className="text-sm sm:text-base md:text-[18px]"
                style={{
                  letterSpacing: "0.5px",
                  color: "#700FA3",
                  fontWeight: "600",
                  fontFamily: "var(--font-montserrat), sans-serif",
                }}
              >
                Recursos
              </span>
            </div>
            
            <h2
              className="text-2xl sm:text-3xl lg:text-[32px]"
              style={{
                margin: 0,
                padding: 0,
                fontWeight: "bold",
                lineHeight: "1.25",
                color: "#48255A",
                fontFamily: "var(--font-montserrat), sans-serif",
              }}
            >
              Artículos más recientes
            </h2>
            
            <a
              href="/blog"
              aria-label="Chequea nuestro blog de One True"
              className="inline-block px-6 py-3 bg-[#FFC107] text-[#411A56] font-bold rounded transition-colors duration-300 text-sm hover:bg-[#700FA3] hover:text-[#FFC107] mt-8"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Chequea nuestro blog
            </a>
          </div>

          {/* Remaining 3 Grid Items: Blog Cards */}
          {articles.map((article, idx) => (
            <BlogCard 
              key={idx} 
              article={article} 
              className="w-full h-full flex" 
              cardRef={(el) => { cardsRef.current[idx] = el; }}
            />
          ))}

        </div>
      </div>
    </section>
  );
}
