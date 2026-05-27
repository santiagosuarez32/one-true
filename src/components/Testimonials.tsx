"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Testimonials() {
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
  const testimonials = [
    {
      text: "Excelente servicio y muy profesional, de gran ayuda para tener un mejor conocimiento de los perfiles a contratar.",
      author: "Carmen Lalaleo",
      company: "BFS Ecuador",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
    },
    {
      text: "Informes técnicos impecables y me entregaron en el tiempo que me ofrecieron. Tuvimos un incidente crítico, su intervención mediante la prueba de polígrafo de investigación fue determinante para el esclarecimiento de los hechos.",
      author: "Fausto Luna",
      company: "Cliente Corporativo",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
    },
    {
      text: "El nivel profesional de One True marca una diferencia clara en el sector de la formación. Gracias a su metodología y actualización técnica, he logrado elevar mi estándar de calidad para realizar un trabajo impecable y de alta precisión.",
      author: "Ingrid Ponce",
      company: "México",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop"
    },
    {
      text: "La actualización en poligrafía con One True ha sido una experiencia enriquecedora que me ha permitido crecer como profesional y mejorar mis habilidades en esta área tan importante, quiero invitar a todos los colegas en poligrafía a unirse a la comunidad de One True y a participar en todas las capacitaciones que ofrecen.",
      author: "Paola Andrea Alzate Mazo",
      company: "Colombia",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop"
    },
    {
      text: "La implementación de pruebas de polígrafo de rutina ha sido clave para reducir la rotación y fortalecer la integridad de nuestro equipo. Hemos consolidado una cultura organizacional sólida, basada en la transparencia y la confianza profesional.",
      author: "Eduardo Sanchez",
      company: "Novexia SAS",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=100&auto=format&fit=crop"
    }
  ];

  return (
    <section className="bg-[#fcfafc] py-24 border-t border-neutral-100">
      <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-8 md:px-12 lg:px-16 text-center">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-16 text-center">
          {/* Label Prefix */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[3px] bg-[#700FA3]" />
            <span
              style={{
                letterSpacing: "0.5px",
                fontSize: "18px",
                color: "#700FA3",
                fontWeight: "600",
                fontFamily: "var(--font-montserrat), sans-serif",
              }}
            >
              Testimonios
            </span>
          </div>

          <h2
            style={{
              margin: 0,
              padding: 0,
              fontSize: "40px",
              fontWeight: "bold",
              lineHeight: "52px",
              color: "#48255A",
              fontFamily: "var(--font-montserrat), sans-serif",
              maxWidth: "850px",
            }}
          >
            La confianza de nuestros clientes es nuestro mayor respaldo técnico.
          </h2>
        </div>

        {/* Testimonials Flex Container */}
        <div className="flex flex-wrap justify-center gap-6 mt-16 text-left">
          {testimonials.map((testimonial, idx) => (
            <div 
              key={idx}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className="w-full md:w-[350px] flex flex-col items-start border border-neutral-200 p-6 rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Quote Icon */}
              <svg width="36" height="32" viewBox="0 0 44 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M33.172 5.469q2.555 0 4.547 1.547a7.4 7.4 0 0 1 2.695 4.007q.47 1.711.469 3.61 0 2.883-1.125 5.86a22.8 22.8 0 0 1-3.094 5.577 33 33 0 0 1-4.57 4.922A35 35 0 0 1 26.539 35l-3.398-3.398q5.296-4.243 7.218-6.563 1.946-2.32 2.016-4.617-2.86-.329-4.781-2.461-1.923-2.133-1.922-4.992 0-3.117 2.18-5.297 2.202-2.203 5.32-2.203m-20.625 0q2.555 0 4.547 1.547a7.4 7.4 0 0 1 2.695 4.007q.47 1.711.469 3.61 0 2.883-1.125 5.86a22.8 22.8 0 0 1-3.094 5.577 33 33 0 0 1-4.57 4.922A35 35 0 0 1 5.914 35l-3.398-3.398q5.296-4.243 7.218-6.563 1.946-2.32 2.016-4.617-2.86-.329-4.781-2.461-1.922-2.133-1.922-4.992 0-3.117 2.18-5.297 2.202-2.203 5.32-2.203" fill="#FFC107"/>
              </svg>
              
              {/* 5 Stars */}
              <div className="flex items-center justify-center mt-4 gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.524.464a.5.5 0 0 1 .952 0l1.432 4.41a.5.5 0 0 0 .476.345h4.637a.5.5 0 0 1 .294.904L11.563 8.85a.5.5 0 0 0-.181.559l1.433 4.41a.5.5 0 0 1-.77.559L8.294 11.65a.5.5 0 0 0-.588 0l-3.751 2.726a.5.5 0 0 1-.77-.56l1.433-4.41a.5.5 0 0 0-.181-.558L.685 6.123A.5.5 0 0 1 .98 5.22h4.637a.5.5 0 0 0 .476-.346z" fill="#FFC107"/>
                  </svg>
                ))}
              </div>
              
              <p className="text-sm mt-4 text-[#525252] leading-relaxed flex-1" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                &ldquo;{testimonial.text}&rdquo;
              </p>
              
              <div className="flex items-center mt-6">
                <div>
                  <h2 className="text-[15px] text-[#48255A] font-bold" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>{testimonial.author}</h2>
                  <p className="text-[13px] text-[#700FA3] font-medium">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
