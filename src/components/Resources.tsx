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
    className={`flex ${isWide ? 'flex-col md:flex-row' : 'flex-col'} bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-1 group cursor-pointer ${className}`}
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
        className="px-4 py-2 bg-[#700FA3] text-[#FFC107] hover:bg-[#FFC107] hover:text-[#48255A] font-bold rounded transition-colors duration-300 text-xs whitespace-nowrap w-auto self-start flex items-center gap-1 uppercase"
        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
      >
        LEER MÁS 
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
    <section id="recursos" className="bg-[#fcfafc] py-24 border-t border-neutral-100 scroll-mt-20">
      <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          
          {/* First Grid Item: Text & CTA */}
          <div className="flex flex-col items-start text-left w-full h-full justify-between pb-4">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[3px] bg-[#700FA3]" />
                <span
                  style={{
                    letterSpacing: "0.5px",
                    fontSize: "18px",
                    color: "#700FA3",
                    fontWeight: "600",
                    fontFamily: "var(--font-montserrat), sans-serif",
                  }}
                >
                  Recursos
                </span>
              </div>
              
              <h2
                className="text-3xl lg:text-[32px]"
                style={{
                  margin: 0,
                  padding: 0,
                  fontWeight: "bold",
                  lineHeight: "1.25",
                  color: "#48255A",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  marginBottom: "48px",
                }}
              >
                Información de valor para evaluación forense de la credibilidad y gestión de riesgos
              </h2>
            </div>
            
            <button
              aria-label="Conocer más recursos y artículos del blog de One True"
              className="px-6 py-3 bg-[#FFC107] text-[#411A56] font-bold rounded transition-colors duration-300 text-sm hover:bg-[#700FA3] hover:text-white"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Conoce más
            </button>
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
