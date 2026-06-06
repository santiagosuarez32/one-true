"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const YELLOW = "#FFC107";
const YELLOW_HOVER = "#e6ac00";
const PURPLE = "#700FA3";
const TEXT_DARK = "#3b0764";

function cx(...cn: Array<string | false | undefined>) {
  return cn.filter(Boolean).join(" ");
}

/* Datos de ejemplo: reemplazar al conectar la tabla real */
type Item = {
  id: string;
  titulo: string;
  categoria: string;
  fecha: string;
  published: boolean;
};

const DEMO: Item[] = [
  { id: "1", titulo: "Curso básico en poligrafía", categoria: "Cursos", fecha: "2026-05-12", published: true },
  { id: "2", titulo: "Técnicas poligráficas avanzadas", categoria: "Cursos", fecha: "2026-04-28", published: true },
  { id: "3", titulo: "Calificación de gráficas y análisis", categoria: "Cursos", fecha: "2026-03-15", published: false },
  { id: "4", titulo: "Sistema de calificación ESS-M", categoria: "Cursos", fecha: "2026-02-02", published: false },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [rows] = useState<Item[]>(DEMO);

  const total = rows.length;
  const published = rows.filter((r) => r.published).length;
  const draft = Math.max(total - published, 0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      if (!data.session) {
        router.replace("/admin/login?redirect=/admin");
      } else {
        setEmail(data.session.user?.email ?? null);
        setChecking(false);
      }
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_ev, session) => {
      if (!session) router.replace("/admin/login?redirect=/admin");
      else setEmail(session.user?.email ?? null);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [router]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login?redirect=/admin");
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return rows;
    const q = search.toLowerCase();
    return rows.filter((p) =>
      `${p.titulo} ${p.categoria}`.toLowerCase().includes(q)
    );
  }, [rows, search]);

  if (checking) {
    return (
      <main className="grid min-h-screen place-items-center" style={{ background: PURPLE }}>
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-yellow-400" />
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={{ background: PURPLE, color: "#fff" }}>
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-white/10 backdrop-blur" style={{ backgroundColor: "rgba(74,8,114,0.9)" }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-black text-sm" style={{ backgroundColor: YELLOW, color: TEXT_DARK }}>
              OT
            </div>
            <div>
              <h1 className="text-lg font-black leading-tight" style={{ color: "#fff" }}>Panel de administración</h1>
              <p className="text-xs leading-tight" style={{ color: "#fff" }}>One True Ecuador</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {email && <span className="hidden text-sm sm:block" style={{ color: "#fff" }}>{email}</span>}
            <Link
              href="/"
              className="rounded-full border border-white/40 px-4 py-2 text-sm hover:border-white transition-colors"
              style={{ color: "#fff" }}
            >
              Ir al sitio
            </Link>
            <button
              onClick={logout}
              className="rounded-full px-4 py-2 text-sm font-bold transition-colors"
              style={{ backgroundColor: YELLOW, color: TEXT_DARK }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = YELLOW_HOVER)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = YELLOW)}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-8 lg:grid-cols-12">
        {/* Sidebar */}
        <aside className="lg:col-span-3">
          <nav className="rounded-2xl bg-white p-3 shadow-sm">
            <Link href="/admin" className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold hover:bg-purple-50 transition-colors" style={{ color: TEXT_DARK }}>
              Resumen <span className="text-xs text-purple-400">Inicio</span>
            </Link>
            <Link href="/" className="mt-1 flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-purple-50 transition-colors" style={{ color: TEXT_DARK }}>
              Ver sitio <span className="text-xs text-purple-400">Público</span>
            </Link>
          </nav>
        </aside>

        {/* Main */}
        <section className="space-y-6 lg:col-span-9">
          {/* Métricas */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <MetricCard title="Contenidos" value={total} />
            <MetricCard title="Publicados" value={published} accent />
            <MetricCard title="Borradores" value={draft} />
          </div>

          {/* Acciones */}
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-80">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por título o categoría…"
                className="w-full rounded-full border border-white/20 px-4 py-2.5 text-sm outline-none transition placeholder-purple-300"
                style={{ backgroundColor: "#fff", color: TEXT_DARK, caretColor: PURPLE }}
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 2px ${YELLOW}66`;
                  e.currentTarget.style.borderColor = YELLOW;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                }}
              />
              {search && (
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 text-xs font-semibold hover:opacity-70"
                  style={{ color: PURPLE }}
                  onClick={() => setSearch("")}
                >
                  Limpiar
                </button>
              )}
            </div>

            <button
              className="rounded-full px-5 py-2.5 text-sm font-bold transition-colors"
              style={{ backgroundColor: YELLOW, color: TEXT_DARK }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = YELLOW_HOVER)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = YELLOW)}
            >
              + Nuevo contenido
            </button>
          </div>

          {/* Lista */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
              <h2 className="text-base font-black" style={{ color: TEXT_DARK }}>Contenidos</h2>
              <span className="text-xs text-neutral-500">{filtered.length} resultados</span>
            </div>

            {filtered.length === 0 ? (
              <p className="px-5 py-8 text-sm text-neutral-500">No hay contenidos para mostrar.</p>
            ) : (
              <ul className="divide-y divide-neutral-200">
                {filtered.map((p) => {
                  const badge = p.published ? (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">Publicado</span>
                  ) : (
                    <span className="rounded-full px-2 py-0.5 text-xs font-semibold" style={{ backgroundColor: `${YELLOW}33`, color: "#92600a" }}>Borrador</span>
                  );

                  return (
                    <li key={p.id} className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-purple-50/50">
                      <div className="min-w-0 grow">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="truncate font-semibold" style={{ color: TEXT_DARK }} title={p.titulo}>{p.titulo}</span>
                          {badge}
                        </div>
                        <p className="truncate text-xs text-neutral-500">{p.categoria}</p>
                      </div>

                      <div className="hidden text-right text-xs text-neutral-500 sm:block">
                        {new Date(p.fecha).toLocaleDateString("es-EC")}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          className={cx(
                            "rounded-full px-3 py-1.5 text-xs font-semibold border transition",
                            p.published
                              ? "text-green-700 border-green-200 hover:bg-green-50"
                              : "text-amber-700 border-amber-200 hover:bg-amber-50"
                          )}
                        >
                          {p.published ? "Ocultar" : "Publicar"}
                        </button>
                        <button className="rounded-full border border-neutral-200 px-3 py-1.5 text-sm hover:bg-neutral-50 transition" style={{ color: TEXT_DARK }}>
                          Editar
                        </button>
                        <button className="rounded-full border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 transition">
                          Borrar
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function MetricCard({ title, value, accent = false }: { title: string; value: number; accent?: boolean }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">{title}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-black" style={{ color: TEXT_DARK }}>{value}</span>
        {accent && <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: YELLOW }} />}
      </div>
    </div>
  );
}
