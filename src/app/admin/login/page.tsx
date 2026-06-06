"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const YELLOW = "#FFC107";
const YELLOW_HOVER = "#e6ac00";
const PURPLE = "#700FA3";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-neutral-300" style={{ background: "#700FA3" }}>
          Cargando…
        </div>
      }
    >
      <AdminLoginContent />
    </Suspense>
  );
}

function AdminLoginContent() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get("redirect") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      if (data.session) router.replace(redirectTo);
    });
    return () => {
      mounted = false;
    };
  }, [redirectTo, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    setLoading(false);

    if (error) {
      setErr(error.message || "No se pudo iniciar sesión.");
      return;
    }
    router.replace(redirectTo);
  }

  return (
    <main
      className="admin-white relative min-h-screen  antialiased"
      style={{ background: PURPLE, color: "#fff" }}
      aria-labelledby="login-title"
    >
      {/* Fondo decorativo */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div
          className="absolute -left-40 -top-40 h-96 w-96 rounded-full blur-3xl opacity-20"
          style={{ background: YELLOW }}
        />
        <div
          className="absolute -right-32 bottom-[-80px] h-96 w-96 rounded-full blur-3xl opacity-15"
          style={{ background: YELLOW }}
        />
        {/* Grid sutil */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10">
        <div className="grid w-full max-w-[1040px] grid-cols-1 items-stretch gap-8 lg:grid-cols-2">

          {/* Panel izquierdo */}
          <section className="relative hidden overflow-hidden rounded-2xl border border-white/20 p-10 lg:flex lg:flex-col lg:justify-center" style={{ backgroundColor: "#4a0872", color: "white" }}>
            <div
              className="absolute -left-28 -top-28 h-72 w-72 rounded-full blur-3xl opacity-30"
              style={{ background: PURPLE }}
            />
            <div
              className="absolute -right-24 bottom-[-64px] h-72 w-72 rounded-full blur-3xl opacity-20"
              style={{ background: YELLOW }}
            />

            <header className="relative">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-white hover:text-white transition-colors"
                title="Volver al sitio"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-70">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
                Volver al sitio
              </Link>

              <h1 id="login-title" className="mt-6 font-black leading-tight tracking-tight" style={{ fontSize: "2rem" }}>
                Panel de <span style={{ color: YELLOW, fontSize: "inherit", fontWeight: "inherit" }}>Administración</span>
              </h1>
              <span
                className="mt-4 block h-1 w-20 rounded-full"
                style={{ backgroundColor: YELLOW }}
              />
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white">
                Gestioná contenidos, publicaciones y recursos de la plataforma de forma segura.
              </p>
            </header>

            <ul className="relative mt-10 space-y-4 text-sm text-white">
              {[
                "Acceso exclusivo para el equipo autorizado.",
                "Publicar y ocultar contenido con un click.",
                "Gestión de cursos, servicios y blog.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" className="mt-0.5 shrink-0">
                    <path
                      d="M20 7 9 18l-5-5"
                      stroke={YELLOW}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <footer className="relative mt-10 rounded-xl border border-white/20 p-4 text-sm text-white" style={{ backgroundColor: "#3a0660" }}>
              <strong className="font-semibold text-white">Tip:</strong> Si no recordás tu clave,
              pedí el restablecimiento al administrador.
            </footer>
          </section>

          {/* Panel derecho: formulario */}
          <section className="relative rounded-2xl border border-white/20 p-8 sm:p-10" style={{ backgroundColor: "#4a0872", color: "white" }}>
            {/* Header del form */}
            <div className="mb-8 flex items-center justify-end">
              <Link
                href="/"
                className="hidden rounded-full border border-white/30 px-3 py-1.5 text-xs text-white hover:border-white/60 transition-colors sm:block"
              >
                Ir al sitio
              </Link>
            </div>

            <div className="mb-7">
              <h2 className="text-2xl font-black tracking-tight">Iniciar sesión</h2>
              <p className="mt-1.5 text-sm text-white">Solo personal autorizado.</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              {/* Email */}
              <label className="block text-sm">
                <span className="mb-2 block font-semibold text-white">Email</span>
                <div className="relative">
                  <input
                    type="email"
                    autoComplete="username"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="w-full rounded-lg border border-white/20 px-4 py-3 text-sm outline-none transition placeholder-purple-300"
                    style={{ caretColor: PURPLE, backgroundColor: "#fff", color: "#3b0764" }}
                    onFocus={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 0 2px ${YELLOW}66`;
                      e.currentTarget.style.borderColor = YELLOW;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                    }}
                  />
                </div>
              </label>

              {/* Contraseña */}
              <label className="block text-sm">
                <span className="mb-2 block font-semibold text-white">Contraseña</span>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-white/20 px-4 py-3 pr-12 text-sm outline-none transition placeholder-purple-300"
                    style={{ caretColor: PURPLE, backgroundColor: "#fff", color: "#3b0764" }}
                    onFocus={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 0 2px ${YELLOW}66`;
                      e.currentTarget.style.borderColor = YELLOW;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                    }}
                  />
                  <button
                    type="button"
                    aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                    onClick={() => setShowPass((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 hover:opacity-70 transition-opacity"
                    style={{ color: PURPLE }}
                  >
                    {showPass ? (
                      <svg width="20" height="20" viewBox="0 0 24 24">
                        <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.8" />
                        <path
                          d="M10.58 6.08A8.5 8.5 0 0 1 12 6c5 0 8.5 5 8.5 5s-.65.92-1.84 2.02M6.5 6.5C4.49 7.9 3 11 3 11s3.5 5 9 5c1.07 0 2.08-.2 3-.58"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24">
                        <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
                        <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                    )}
                  </button>
                </div>
              </label>

              {/* Error */}
              {err && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {err}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full px-6 py-3 text-sm font-bold text-black transition-colors disabled:opacity-50"
                style={{ backgroundColor: YELLOW }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.backgroundColor = YELLOW_HOVER)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.backgroundColor = YELLOW)
                }
              >
                {loading ? "Ingresando…" : "Entrar al panel"}
              </button>

              <p className="text-center text-xs text-white">
                ¿Olvidaste tu contraseña? Pedí el reseteo al administrador.
              </p>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
