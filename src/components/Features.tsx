"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll Animation for Cards
      if (cardsRef.current) {
        const cards = gsap.utils.toArray(".feature-card");
        gsap.fromTo(
          cards,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, cardsRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <section className="py-32 px-4 md:px-8 bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white">
            Elevate Your Vision
          </h2>
          <div className="h-1 w-20 bg-white"></div>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Dynamic Design",
              desc: "Fluid layouts and interactive elements that bring your digital presence to life.",
            },
            {
              title: "Performance First",
              desc: "Lightning-fast load times with optimized assets and state-of-the-art frameworks.",
            },
            {
              title: "Seamless Motion",
              desc: "Silky smooth animations powered by GSAP and Lenis for an unforgettable feel.",
            },
          ].map((feature, i) => (
            <div 
              key={i}
              className="feature-card bg-neutral-900 border border-neutral-800 p-8 rounded-2xl hover:bg-neutral-800 transition-colors duration-500 group"
            >
              <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform duration-500">
                {i + 1}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
              <p className="text-neutral-400 leading-relaxed font-light">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
