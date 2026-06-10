"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Blog } from "@/lib/cms";

export default function BlogPageTemplate({ blog, allBlogs }: { blog: Blog; allBlogs: Blog[] }) {
  // Filter out the current article to show other related articles
  const relatedArticles = allBlogs
    .filter((b) => b.id !== blog.id && b.published)
    .slice(0, 2);

  // Format content body to support rich text html or basic text with newlines
  const renderContent = () => {
    if (
      blog.content.includes("<p") ||
      blog.content.includes("<h2") ||
      blog.content.includes("<h3") ||
      blog.content.includes("<ul")
    ) {
      return <div dangerouslySetInnerHTML={{ __html: blog.content }} />;
    }
    // If it's plain text, convert double newlines to paragraphs and support headers
    return blog.content.split("\n\n").map((para, index) => {
      const trimmed = para.trim();
      if (!trimmed) return null;
      
      // Basic check for headers
      if (trimmed.startsWith("### ")) {
        return (
          <h4 key={index} className="text-lg font-bold mt-8 mb-4 text-[#700FA3]">
            {trimmed.replace("### ", "")}
          </h4>
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h3 key={index} className="text-xl font-bold mt-8 mb-4" style={{ color: '#700FA3' }}>
            {trimmed.replace("## ", "")}
          </h3>
        );
      }
      if (trimmed.startsWith("# ")) {
        return (
          <h2 key={index} className="text-2xl font-bold mt-12 mb-6" style={{ color: "#48255A" }}>
            {trimmed.replace("# ", "")}
          </h2>
        );
      }
      
      return (
        <p key={index} className="text-lg leading-relaxed mb-6 text-gray-700">
          {para}
        </p>
      );
    });
  };

  return (
    <main className="min-h-screen bg-white text-[#525252] selection:bg-[#FFC107] selection:text-[#411A56]">
      <Navbar />

      {/* Hero Section with Image - Extended */}
      <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-neutral-900 pt-20">
        <img
          src={blog.image || "/blog/1.webp"}
          alt={blog.title}
          className="w-full h-full object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </section>

      {/* Article Content */}
      <article className="w-full max-w-4xl mx-auto px-4 sm:px-8 md:px-12 py-16">

        {/* Article Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[3px] bg-[#700FA3]" />
            <span
              className="text-sm md:text-base"
              style={{
                letterSpacing: "0.5px",
                color: "#700FA3",
                fontWeight: "600",
                fontFamily: "var(--font-montserrat), sans-serif",
              }}
            >
              Blog
            </span>
          </div>

          <h1
            className="max-md:text-2xl! text-3xl md:text-5xl font-bold mb-6"
            style={{
              color: "#48255A",
              fontFamily: "var(--font-montserrat), sans-serif",
              lineHeight: "1.2",
            }}
          >
            {blog.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            <span>Publicado el {blog.publishDate}</span>
            <span>•</span>
            <span>{blog.readTime || "5 min de lectura"}</span>
          </div>
        </div>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
          {renderContent()}
        </div>

        {/* CTA Section */}
        <div className="mt-16 p-8 bg-[#700FA3]/10 rounded-2xl border border-[#700FA3]/20">
          <h3
            className="text-2xl font-bold mb-4"
            style={{ color: "#48255A", fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            ¿Necesitas una Prueba de Polígrafo o Evaluación de Confianza?
          </h3>
          <p className="text-lg mb-6 text-gray-700" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            Contáctanos para conocer nuestros servicios y obtener más información sobre cómo podemos ayudarte.
          </p>
          <a
            href="/cotiza"
            className="inline-block px-8 py-3 rounded transition-all hover:brightness-110 shadow-lg text-sm"
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              lineHeight: "1",
              textAlign: "center",
              fontWeight: "600",
              fill: "#5F0091",
              color: "#5F0091",
              backgroundColor: "#FFC107",
              textDecoration: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Cotizar Evaluación
          </a>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-20 pt-12 border-t border-gray-200">
            <h3
              className="text-2xl font-bold mb-8"
              style={{ color: "#48255A", fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Artículos Relacionados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedArticles.map((article) => (
                <a key={article.id} href={article.link} className="group">
                  <div className="mb-4 overflow-hidden rounded-lg h-48 bg-gray-200">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="text-lg font-bold text-[#48255A] group-hover:text-[#700FA3] transition-colors" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    {article.title}
                  </h4>
                </a>
              ))}
            </div>
          </div>
        )}
      </article>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
