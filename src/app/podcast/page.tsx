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
    className={`podcast-card flex flex-col bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 group cursor-pointer ${className}`}
  >
    {/* Image Container */}
    <div className="relative overflow-hidden bg-neutral-100 w-full aspect-video">
      <img
        src={episode.image}
        alt={episode.title}
        className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>

      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          className="w-16 h-16 bg-[#FFC107] rounded-full flex items-center justify-center text-black transition-transform duration-300 group-hover:scale-110 group-hover:shadow-2xl"
          aria-label="Reproducir episodio"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="ml-1"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>

      {/* Topic Badge */}
      <div className="absolute top-4 left-4 bg-[#700FA3] text-white text-[10px] font-bold tracking-wider px-3 py-1 rounded-full uppercase z-10">
        {episode.topic}
      </div>

      {/* Duration Badge */}
      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full z-10">
        {episode.duration}
      </div>
    </div>

    {/* Content */}
    <div className="px-6 py-6 flex flex-col flex-1 justify-between gap-4">
      <div>
        <p className="text-xs text-gray-400 mb-2" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
          {episode.date}
        </p>
        <h3
          className="text-lg font-bold text-[#48255A] group-hover:text-[#700FA3] transition-colors duration-300 leading-[1.4] mb-3"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          {episode.title}
        </h3>
        <p className="text-sm text-[#525252] leading-relaxed" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
          {episode.description}
        </p>
      </div>

      <button
        className="podcast-cta-btn px-4 py-2 bg-[#FFC107] text-[#411A56] font-bold rounded transition-all duration-300 text-xs whitespace-nowrap w-auto self-start flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105"
        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
      >
        Escuchar
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
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      </button>
    </div>
  </div>
);

export default function PodcastPage() {
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

  const episodes: PodcastEpisode[] = [
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

  return (
    <main className="min-h-screen bg-white text-[#525252] selection:bg-[#FFC107] selection:text-[#411A56]">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ backgroundImage: "url('/blog/podcast-hero.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 md:px-12 py-20" ref={heroRef}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left content */}
            <div className="flex flex-col justify-center">
              {/* Logo */}
              <div className="mb-8">
                <img
                  src="/logo-podcast.png"
                  alt="DETECTAR Podcast Logo"
                  className="h-20 md:h-24 w-auto object-contain mb-6"
                />
              </div>

              {/* Title with styled boxes */}
              <div className="mb-8 flex flex-col gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="bg-[#700FA3] text-white px-4 py-2 rounded-full text-2xl md:text-3xl font-black" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    ¿Cómo
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="bg-[#FFC107] text-[#411A56] px-6 py-3 rounded-full text-4xl md:text-5xl font-black" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    FUNCIONA
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="bg-cyan-400 text-white px-4 py-2 rounded-full text-2xl md:text-3xl font-black" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    tu
                  </div>
                  <div className="bg-[#A855F7] text-white px-6 py-3 rounded-full text-4xl md:text-5xl font-black" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    NEGOCIO?
                  </div>
                </div>
              </div>

              {/* Presenter */}
              <p className="text-white text-xl md:text-2xl font-bold mb-8" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                con <span className="text-[#FFC107]">DAVID COLI</span>
              </p>

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
                <a href="#" className="px-8 py-3 bg-[#FFC107] text-[#411A56] font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                  Ir a YouTube
                </a>
                <a href="#" className="px-8 py-3 bg-[#A855F7] text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                  Ir a Spotify
                </a>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden">
                <img
                  src="/blog/podcast-hero.png"
                  alt="David Coli - Podcast DETECTAR"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Episodes Grid */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-8 md:px-12 py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-0.75 bg-[#700FA3]" />
          <h2
            className="text-3xl md:text-4xl font-bold text-[#48255A]"
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
            }}
          >
            Últimos Episodios
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {episodes.map((episode, index) => (
            <PodcastCard
              key={episode.id}
              episode={episode}
              cardRef={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
            />
          ))}
        </div>
      </section>

      {/* Featured Episode */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-8 md:px-12 py-20 border-t border-neutral-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative rounded-2xl overflow-hidden aspect-square">
            <img
              src="/podcast/featured.jpg"
              alt="Episodio destacado"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <button className="absolute inset-0 flex items-center justify-center group">
              <div className="w-20 h-20 bg-[#FFC107] rounded-full flex items-center justify-center text-black transition-transform duration-300 group-hover:scale-110">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-1"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          </div>

          <div>
            <span
              className="text-xs uppercase tracking-widest text-[#700FA3] font-bold mb-4 block"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Episodio Destacado
            </span>

            <h2
              className="text-4xl font-bold text-[#48255A] mb-4 leading-tight"
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
              }}
            >
              Cómo Funciona tu Negocio: Fundamentos de la Confianza Corporativa
            </h2>

            <p
              className="text-[#525252] text-lg leading-relaxed mb-6"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              En este episodio especial, exploramos cómo la confianza es el pilar fundamental de cualquier negocio exitoso. Analizamos casos reales de empresas que han transformado su cultura organizacional a través de procesos rigurosos de evaluación y selección de personal.
            </p>

            <div className="flex gap-4 mb-8">
              <div>
                <p className="text-gray-500 text-sm" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                  Duración
                </p>
                <p className="text-[#48255A] font-bold text-lg" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                  32 minutos
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                  Publicado
                </p>
                <p className="text-[#48255A] font-bold text-lg" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                  15 Jun, 2024
                </p>
              </div>
            </div>

            <button
              className="px-8 py-3 bg-[#FFC107] text-[#411A56] font-bold rounded hover:shadow-lg transition-all duration-300 hover:scale-105"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Escuchar Ahora
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-8 md:px-12 py-20">
        <div className="bg-[#700FA3] rounded-2xl p-12 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
            }}
          >
            No te pierdas ningún episodio
          </h2>

          <p
            className="text-white text-lg mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Suscríbete a nuestro podcast para recibir notificaciones de nuevos episodios directamente en tu app favorita.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-8 py-3 bg-[#FFC107] text-[#411A56] font-bold rounded hover:shadow-lg transition-all duration-300 hover:scale-105"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Spotify
            </button>
            <button
              className="px-8 py-3 bg-white text-[#700FA3] font-bold rounded hover:shadow-lg transition-all duration-300 hover:scale-105"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Apple Podcasts
            </button>
            <button
              className="px-8 py-3 bg-white text-[#700FA3] font-bold rounded hover:shadow-lg transition-all duration-300 hover:scale-105"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Google Podcasts
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
