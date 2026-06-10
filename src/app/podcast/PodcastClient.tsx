"use client";

import React, { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  image: string;
  audioUrl: string;
  duration: string;
  date: string;
  topic: string;
}

const PodcastCard = ({ episode, className = "", cardRef }: { episode: PodcastEpisode; className?: string; cardRef?: (el: HTMLDivElement | null) => void }) => (
  <div
    ref={cardRef}
    className={`podcast-card flex flex-col bg-white border border-neutral-100 rounded overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 group cursor-pointer ${className}`}
  >
    {/* Image Container */}
    <div className="relative overflow-hidden bg-neutral-100 w-full aspect-video">
      <img
        src="/podcast-fondo.webp"
        alt={episode.title}
        className="w-full h-full object-cover absolute inset-0"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>

      {/* Play Button */}
      <a href="https://open.spotify.com/show/0IFnAb2T0WTWKCHEDceAIa?si=RPGdRbVvTn-CzMywI4qSpA" target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center">
        <button
          className="w-16 h-16 bg-[#FFC107] rounded-full flex items-center justify-center text-[#5F0091] transition-transform duration-300 group-hover:scale-110 group-hover:shadow-2xl shadow-lg"
          aria-label="Reproducir episodio"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="-ml-0.5"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </a>

    </div>

    {/* Content */}
    <div className="px-6 py-6 flex flex-col flex-1 justify-between gap-4">
      <h3
        className="text-lg font-bold text-[#48255A] group-hover:text-[#700FA3] transition-colors duration-300 leading-[1.4]"
        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
      >
        {episode.title}
      </h3>
    </div>

  </div>
);

export default function PodcastPage({ initialEpisodes = [] }: { initialEpisodes?: PodcastEpisode[] }) {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Hero animation
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          }
        );
      }

      // Card animations
      cardsRef.current.forEach((card) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const staticEpisodes: PodcastEpisode[] = [
    {
      id: "1",
      title: "Cómo Funciona tu Negocio: Fundamentos de la Confianza Corporativa",
      description: "En este episodio exploramos cómo los procesos de verificación y evaluación de confianza son fundamentales para el crecimiento sostenible de tu empresa. Descubre cómo proteger tu negocio desde adentro.",
      image: "/podcast/episode-1.jpg",
      audioUrl: "#",
      duration: "32 min",
      date: "15 de Junio, 2024",
      topic: "Negocios",
    },
    {
      id: "2",
      title: "Seguridad en la Selección de Personal: Evita Riesgos",
      description: "¿Sabes quién realmente es tu equipo? En este episodio analizamos cómo las pruebas de vetting previo a la contratación pueden ahorrarte problemas y pérdidas significativas.",
      image: "/podcast/episode-2.jpg",
      audioUrl: "#",
      duration: "28 min",
      date: "8 de Junio, 2024",
      topic: "RRHH",
    },
    {
      id: "3",
      title: "Cumplimiento Normativo y Transparencia: El Camino Seguro",
      description: "La regulación y el cumplimiento normativo son pilares de la confianza. Conoce las mejores prácticas para mantener tu empresa en línea con los estándares internacionales.",
      image: "/podcast/episode-3.jpg",
      audioUrl: "#",
      duration: "35 min",
      date: "1 de Junio, 2024",
      topic: "Legal",
    },
    {
      id: "4",
      title: "Estudios de Confiabilidad 360°: Visión Integral del Equipo",
      description: "Más allá de un simple polígrafo. Descubre cómo los estudios integrales de confiabilidad ofrecen una perspectiva completa de tu personal y cultura organizacional.",
      image: "/podcast/episode-4.jpg",
      audioUrl: "#",
      duration: "31 min",
      date: "25 de Mayo, 2024",
      topic: "Evaluación",
    },
    {
      id: "5",
      title: "Honestidad y Ética: La Base de Relaciones Duraderas",
      description: "¿Por qué es importante medir la honestidad en el ámbito empresarial? Te compartimos historias reales y lecciones aprendidas de empresas que priorizan la ética.",
      image: "/podcast/episode-5.jpg",
      audioUrl: "#",
      duration: "29 min",
      date: "18 de Mayo, 2024",
      topic: "Valores",
    },
    {
      id: "6",
      title: "Transformación Digital: Confianza en la Era Tecnológica",
      description: "Los riesgos cibernéticos requieren nuevas estrategias de confianza. Exploram cómo adaptar tus procesos de evaluación al mundo digital.",
      image: "/podcast/episode-6.jpg",
      audioUrl: "#",
      duration: "33 min",
      date: "11 de Mayo, 2024",
      topic: "Tecnología",
    },
  ];



  const displayEpisodes = initialEpisodes.length > 0 ? initialEpisodes : staticEpisodes;

  return (
    <main className="min-h-screen bg-white text-[#525252] selection:bg-[#FFC107] selection:text-[#411A56]">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ backgroundImage: "url('/podcast-fondo.webp')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 md:px-12 py-20" ref={heroRef}>
          <div className="max-w-2xl">
            {/* Left content */}
            <div className="flex flex-col justify-between h-full">
              {/* Logo at top */}
              <div className="mt-16 flex-grow-0">
                <img
                  src="/logo-podcast.webp"
                  alt="DETECTAR Podcast Logo"
                  className="h-64 md:h-80 w-auto object-contain mb-0"
                />
              </div>

              {/* Content at bottom */}
              <div className="mt-0">
                {/* Description */}
                <p
                  className="text-base md:text-lg leading-relaxed mb-6"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif", color: "#FFFFFF", fontWeight: "700" }}
                >
                  Este podcast auspiciado por ONE TRUE y creado por nuestro gerente general David Coli, tiene la intención de pensar, aprender juntos, resolver dudas y tener nuevas respuestas ante el maravilloso mundo de la detección de mentiras.
                </p>

                <p
                  className="text-base md:text-lg leading-relaxed mb-8"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif", color: "#FFFFFF", fontWeight: "700" }}
                >
                  Disfruta todos los episodios y descubre el maravilloso mundo de la evaluación forense de la credibilidad y la detección de mentiras. Escucha todos los capítulos de la primera temporada en Spotify.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <a href="https://open.spotify.com/show/0IFnAb2T0WTWKCHEDceAIa?si=RPGdRbVvTn-CzMywI4qSpA" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-[#1DB954] text-white font-bold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    Escuchar en Spotify
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Episodes Section */}
      <section className="bg-white py-20">
        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-[3px] bg-[#FFC107]" />
              <span
                style={{
                  letterSpacing: "0.5px",
                  fontSize: "16px",
                  color: "#FFC107",
                  fontWeight: "600",
                  fontFamily: "var(--font-montserrat), sans-serif",
                }}
              >
                Podcast
              </span>
            </div>
            <h2
              className="text-3xl md:text-5xl font-bold mb-4"
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                color: "#48255A",
              }}
            >
              ¡Escucha mi podcast y aprende de los mejores!
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayEpisodes.map((episode, idx) => (
              <PodcastCard
                key={episode.id}
                episode={episode}
                cardRef={(el) => {
                  if (el) cardsRef.current[idx] = el;
                }}
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
