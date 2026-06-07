"use client";

import React, { useState, Suspense } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setErrorMsg(error.message);
      } else {
        router.push(redirect);
      }
    } catch (err: any) {
      setErrorMsg("Ocurrió un error inesperado al iniciar sesión.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md bg-white border border-neutral-200 rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
      {/* Branding header */}
      <div className="flex flex-col items-center mb-8">
        <Link href="/" className="inline-block mb-3">
          <img src="/footer.webp" alt="One True Logo" className="h-16 w-auto object-contain" />
        </Link>
        <h1 className="text-xl font-extrabold text-neutral-850 tracking-wide mt-2">Iniciar Sesión</h1>
        <p className="text-neutral-500 text-2xs mt-1 uppercase tracking-wider font-bold">Panel de Administración</p>
      </div>

      {/* Error notification */}
      {errorMsg && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-xs text-red-700 flex items-start gap-2">
          <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
          Email Corporativo
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ej: administrador@somosonetrue.com"
            required
            className="mt-1.5 w-full bg-white border border-neutral-300 rounded-lg px-4 py-2.5 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:border-[#700FA3] focus:ring-2 focus:ring-[#700FA3]/15 transition-all"
          />
        </label>

        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            required
            className="mt-1.5 w-full bg-white border border-neutral-300 rounded-lg px-4 py-2.5 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:border-[#700FA3] focus:ring-2 focus:ring-[#700FA3]/15 transition-all"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-[#700FA3] hover:bg-[#5C0B87] text-white font-bold rounded-lg py-3 transition-all shadow-lg text-sm flex items-center justify-center gap-2 border-none cursor-pointer disabled:opacity-60"
        >
          {loading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-l-transparent" />
              <span>Autenticando...</span>
            </>
          ) : (
            <span>Ingresar al panel</span>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-neutral-200 flex items-center justify-between text-2xs font-semibold">
        <Link href="/" className="text-neutral-500 hover:text-[#700FA3] transition-colors">
          ← Volver a inicio
        </Link>
        <span className="text-neutral-400">One True © 2026</span>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div 
      className="flex min-h-screen items-center justify-center px-4 sm:px-6 relative overflow-hidden bg-neutral-50 text-neutral-800 select-none selection:bg-[#FFC107] selection:text-neutral-900"
      style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
    >
      {/* Subtle decorative color accents */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#700FA3]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#FFC107]/5 blur-[150px] pointer-events-none" />

      <Suspense fallback={
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-300 border-l-[#700FA3]" />
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
