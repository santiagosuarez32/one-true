"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function CotizaPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [country, setCountry] = useState("ec");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    empresa: "",
    servicio: "",
    mensaje: "",
    aceptar: false,
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!formData.apellido.trim()) newErrors.apellido = "El apellido es requerido";
    if (!formData.email.trim()) newErrors.email = "El email es requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Email inválido";
    if (!formData.telefono.trim()) newErrors.telefono = "El teléfono es requerido";
    if (!formData.empresa.trim()) newErrors.empresa = "La empresa es requerida";
    if (!formData.servicio) newErrors.servicio = "Selecciona un servicio";
    if (!formData.mensaje.trim()) newErrors.mensaje = "El mensaje es requerido";
    if (!formData.aceptar) newErrors.aceptar = "Debes aceptar los términos";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setFormSubmitted(true);
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#525252] selection:bg-[#FFC107] selection:text-[#411A56]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#700FA3]">
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #700FA3 0%, #700FA3 35%, rgba(112, 15, 163, 0.9) 48%, rgba(112, 15, 163, 0.6) 60%, rgba(112, 15, 163, 0.3) 72%, rgba(112, 15, 163, 0.05) 86%, transparent 100%)",
          }}
        />

        <img
          src="/psicometricas/hero.png"
          alt="Cotiza Gratis - One True"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-right-top z-0 opacity-45 mix-blend-overlay pointer-events-none -scale-x-100"
        />

        <div className="w-full max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-[#FFC107]" />
                <span
                  className="text-sm md:text-base font-semibold"
                  style={{
                    letterSpacing: "0.5px",
                    color: "#FFC107",
                    fontFamily: "var(--font-montserrat), sans-serif",
                  }}
                >
                  Solicita tu cotización
                </span>
              </div>

              <h1
                className="mb-6 !text-3xl sm:!text-4xl md:!text-5xl font-bold"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  color: "#FFFFFF",
                  lineHeight: "1.2",
                }}
              >
                Cotiza gratis tu servicio
              </h1>

              <p
                className="mb-8 opacity-95 text-base md:text-lg leading-relaxed"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  color: "#FFFFFF",
                }}
              >
                Completa el formulario y nuestro equipo se pondrá en contacto contigo para brindarte una cotización personalizada según tus necesidades.
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: "48px", fontWeight: "900", color: "#FFC107", fontFamily: "var(--font-montserrat), sans-serif" }}>95%</span>
                  <span style={{ fontSize: "16px", fontWeight: "600", color: "#FFFFFF", fontFamily: "var(--font-montserrat), sans-serif" }}>Exactitud en nuestros servicios</span>
                </div>
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: "48px", fontWeight: "900", color: "#FFC107", fontFamily: "var(--font-montserrat), sans-serif" }}>24H</span>
                  <span style={{ fontSize: "16px", fontWeight: "600", color: "#FFFFFF", fontFamily: "var(--font-montserrat), sans-serif" }}>Respuesta garantizada</span>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="bg-white rounded p-4 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-neutral-100 relative overflow-hidden transition-all duration-500">
              {!formSubmitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-2"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex flex-col gap-0.5">
                      <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Nombre *</label>
                      <input
                        type="text"
                        placeholder="Tu nombre"
                        value={formData.nombre}
                        onChange={(e) => { setFormData({...formData, nombre: e.target.value}); if(errors.nombre) setErrors({...errors, nombre: ""})}}
                        className={`px-4 py-2.5 rounded border-0 bg-neutral-50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:bg-white focus:shadow-md transition-all w-full text-sm font-medium ${errors.nombre ? 'focus:ring-red-400 ring-2 ring-red-200' : 'focus:ring-[#700FA3]/20'}`}
                        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                      />
                      {errors.nombre && <span className="text-xs text-red-500 mt-1">{errors.nombre}</span>}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Apellido *</label>
                      <input
                        type="text"
                        placeholder="Tu apellido"
                        value={formData.apellido}
                        onChange={(e) => { setFormData({...formData, apellido: e.target.value}); if(errors.apellido) setErrors({...errors, apellido: ""})}}
                        className={`px-4 py-2.5 rounded border-0 bg-neutral-50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:bg-white focus:shadow-md transition-all w-full text-sm font-medium ${errors.apellido ? 'focus:ring-red-400 ring-2 ring-red-200' : 'focus:ring-[#700FA3]/20'}`}
                        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                      />
                      {errors.apellido && <span className="text-xs text-red-500 mt-1">{errors.apellido}</span>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Correo electrónico *</label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="correo@empresa.com"
                        value={formData.email}
                        onChange={(e) => { setFormData({...formData, email: e.target.value}); if(errors.email) setErrors({...errors, email: ""})}}
                        className={`px-4 py-2.5 pr-10 rounded border-0 bg-neutral-50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:bg-white focus:shadow-md transition-all w-full text-sm font-medium ${errors.email ? 'focus:ring-red-400 ring-2 ring-red-200' : 'focus:ring-[#700FA3]/20'}`}
                        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#700FA3]">
                        <svg className="w-5 h-5 text-[#700FA3]" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                    </div>
                    {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Número de teléfono *</label>
                    <div className="relative flex items-center border-0 rounded bg-neutral-50 focus-within:ring-2 focus-within:ring-[#700FA3]/20 focus-within:bg-white focus-within:shadow-md transition-all overflow-hidden">
                      <div className="flex items-center gap-2 pl-3 pr-2 border-r border-neutral-200/60 bg-transparent shrink-0">
                        <img src={`https://flagcdn.com/w20/${country}.png`} alt={country} className="w-5 h-auto object-contain select-none" />
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="bg-transparent border-0 py-2.5 px-1 text-sm font-semibold text-neutral-700 outline-none focus:ring-0 cursor-pointer appearance-none"
                          style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                            backgroundPosition: "right 0.1rem center",
                            backgroundSize: "1.1em 1.1em",
                            backgroundRepeat: "no-repeat",
                            paddingRight: "1.2rem"
                          }}
                        >
                          <option value="ec">+593</option>
                          <option value="co">+57</option>
                          <option value="pe">+51</option>
                          <option value="cl">+56</option>
                          <option value="ar">+54</option>
                          <option value="mx">+52</option>
                          <option value="es">+34</option>
                          <option value="us">+1</option>
                        </select>
                      </div>
                      <input
                        type="tel"
                        placeholder="098 129 6179"
                        value={formData.telefono}
                        onChange={(e) => { setFormData({...formData, telefono: e.target.value}); if(errors.telefono) setErrors({...errors, telefono: ""})}}
                        className={`flex-1 px-4 py-2.5 bg-transparent border-none text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-0 text-sm font-medium ${errors.telefono ? 'outline-red-500 outline-1' : ''}`}
                        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                      />
                      <div className="pr-3 text-[#700FA3] pointer-events-none">
                        <svg className="w-5 h-5 text-[#700FA3]" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                    </div>
                    {errors.telefono && <span className="text-xs text-red-500 mt-1">{errors.telefono}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Empresa *</label>
                    <input
                      type="text"
                      placeholder="Tu empresa"
                      value={formData.empresa}
                      onChange={(e) => { setFormData({...formData, empresa: e.target.value}); if(errors.empresa) setErrors({...errors, empresa: ""})}}
                      className={`px-4 py-2.5 rounded border-0 bg-neutral-50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:bg-white focus:shadow-md transition-all w-full text-sm font-medium ${errors.empresa ? 'focus:ring-red-400 ring-2 ring-red-200' : 'focus:ring-[#700FA3]/20'}`}
                      style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                    />
                    {errors.empresa && <span className="text-xs text-red-500 mt-1">{errors.empresa}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Servicio de interés *</label>
                    <select
                      value={formData.servicio}
                      onChange={(e) => { setFormData({...formData, servicio: e.target.value}); if(errors.servicio) setErrors({...errors, servicio: ""})}}
                      className={`px-4 py-2.5 rounded border-0 bg-neutral-50 text-neutral-800 focus:outline-none focus:ring-2 focus:bg-white focus:shadow-md transition-all w-full text-sm font-medium ${errors.servicio ? 'focus:ring-red-400 ring-2 ring-red-200' : 'focus:ring-[#700FA3]/20'}`}
                      style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                    >
                      <option value="">Selecciona un servicio</option>
                      <option value="poligrafo">Pruebas de Polígrafo</option>
                      <option value="vetting">Vetting</option>
                      <option value="confiabilidad">Estudio de Confiabilidad 360°</option>
                      <option value="visitas">Visitas Domiciliarias</option>
                      <option value="toxicologicas">Pruebas Toxicológicas</option>
                      <option value="psicometricas">Evaluaciones Psicométricas</option>
                      <option value="honestidad">Prueba de Honestidad, Ética y Valores</option>
                      <option value="curso-basico">Curso Básico en Poligrafía 400 H</option>
                      <option value="cursos-avanzados">Cursos Avanzados de Poligrafía</option>
                      <option value="formaciones">Formaciones Complementarias</option>
                    </select>
                    {errors.servicio && <span className="text-xs text-red-500 mt-1">{errors.servicio}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Mensaje *</label>
                    <textarea
                      placeholder="Cuéntanos qué necesitas..."
                      rows={2}
                      value={formData.mensaje}
                      onChange={(e) => { setFormData({...formData, mensaje: e.target.value}); if(errors.mensaje) setErrors({...errors, mensaje: ""})}}
                      className={`px-4 py-2.5 rounded border-0 bg-neutral-50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:bg-white focus:shadow-md transition-all w-full text-sm font-medium resize-none ${errors.mensaje ? 'focus:ring-red-400 ring-2 ring-red-200' : 'focus:ring-[#700FA3]/20'}`}
                      style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                    />
                    {errors.mensaje && <span className="text-xs text-red-500 mt-1">{errors.mensaje}</span>}
                  </div>

                  <div className="flex flex-col gap-3 mt-2">
                    <p className="text-[11px] text-neutral-500 leading-relaxed font-light" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      Al enviar este formulario, acepto que mis datos personales sean tratados de acuerdo con la{" "}
                      <a href="#" className="text-[#700FA3] hover:underline font-bold" style={{ fontSize: "inherit" }}>
                        Política de tratamiento de datos personales
                      </a>{" "}
                      y los{" "}
                      <a href="#" className="text-[#700FA3] hover:underline font-bold" style={{ fontSize: "inherit" }}>
                        términos
                      </a>.
                    </p>
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="aceptar-cotiza"
                        checked={formData.aceptar}
                        onChange={(e) => { setFormData({...formData, aceptar: e.target.checked}); if(errors.aceptar) setErrors({...errors, aceptar: ""})}}
                        className={`w-4 h-4 rounded border-neutral-300 text-[#700FA3] focus:ring-[#700FA3] cursor-pointer mt-1 ${errors.aceptar ? 'ring-2 ring-red-200' : ''}`}
                      />
                      <label htmlFor="aceptar-cotiza" className="text-xs font-bold text-neutral-700 cursor-pointer select-none" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                        Aceptar
                      </label>
                    </div>
                    {errors.aceptar && <span className="text-xs text-red-500">{errors.aceptar}</span>}
                  </div>

                  <button type="submit" className="mt-2 px-8 py-3.5 bg-[#700FA3] hover:bg-[#5C0B87] text-white font-bold rounded transition-all duration-300 w-full shadow-lg shadow-[#700FA3]/25 hover:scale-[1.01] active:scale-[0.99] text-base" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    Solicitar cotización
                  </button>

                  <div className="flex flex-col items-center gap-1.5 mt-5 pt-4 border-t border-neutral-100 w-full">
                    <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "13px", fontWeight: "bold", color: "#48255A" }}>
                      O escribenos
                    </span>
                    <a
                      className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#00C233] hover:bg-[#00a82c] text-white font-bold transition-all duration-300 rounded text-sm hover:shadow hover:scale-[1.02]"
                      href="https://api.whatsapp.com/send?phone=593981296179&text=Hola!%20Deseo%20cotizar%20un%20servicio%20de%20One%20True."
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontFamily: "var(--font-montserrat), sans-serif", color: "#ffffff" }}
                    >
                      <svg aria-hidden="true" className="w-4 h-4 fill-current" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L3 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                      </svg>
                      +593 98 129 6179
                    </a>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col items-center text-center py-10">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-extrabold text-[#48255A] mb-3" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    ¡Cotización Recibida!
                  </h3>
                  <p className="text-neutral-500 text-sm font-light max-w-sm mb-8 leading-relaxed" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    Gracias por tu interés. Un asesor de One True se comunicará contigo pronto.
                  </p>
                  <button onClick={() => setFormSubmitted(false)} className="px-6 py-3 border-2 border-[#700FA3] text-[#700FA3] hover:bg-[#700FA3] hover:text-white font-bold rounded transition-all duration-300 text-sm" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    Volver al formulario
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
