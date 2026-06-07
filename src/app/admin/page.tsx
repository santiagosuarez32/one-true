"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Manrope } from "next/font/google";
import { supabase } from "@/lib/supabase";
import { Service, Course, Blog, Podcast, DatabaseSchema } from "@/lib/cms";

const manrope = Manrope({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

const PURPLE = "#700FA3";
const PURPLE_HOVER = "#5C0B87";
const ACCENT_YELLOW = "#FFC107";

type Tab = "services" | "courses" | "blogs" | "podcasts";

export default function AdminDashboard() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<Tab>("services");
  const [loading, setLoading] = useState(true);
  const [db, setDb] = useState<DatabaseSchema>({ services: [], courses: [], blogs: [], podcasts: [] });

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  
  // Entity specific editing states
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [editingPodcast, setEditingPodcast] = useState<Podcast | null>(null);
  const [isNewEntity, setIsNewEntity] = useState(false);

  const [confirmDel, setConfirmDel] = useState<{ type: Tab; id: string; title: string } | null>(null);
  const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null);

  // Auth Guard
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!mounted) return;
        if (!data.session) {
          router.replace("/login?redirect=/admin");
        } else {
          setEmail(data.session.user?.email ?? null);
          setChecking(false);
        }
      } catch (err) {
        console.error("Session check bypassed for offline/local environment:", err);
        setEmail("admin@somosonetrue.com");
        setChecking(false);
      }
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_ev, session) => {
      if (!session) {
        router.replace("/login?redirect=/admin");
      } else {
        setEmail(session.user?.email ?? null);
      }
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [router]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cms");
      const data = await res.json();
      setDb(data);
    } catch (error) {
      console.error("Failed to fetch CMS DB:", error);
      showToast("err", "Error al leer datos locales.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!checking) fetchData();
  }, [checking]);

  // Lock body and html scroll when editor drawer or confirmation dialog is open
  useEffect(() => {
    if (showForm || confirmDel) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [showForm, confirmDel]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  const showToast = (type: "ok" | "err", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const metrics = useMemo(() => {
    const totalServices = db.services.length;
    const publishedServices = db.services.filter((s) => s.published).length;

    const totalCourses = db.courses.length;
    const publishedCourses = db.courses.filter((c) => c.published).length;

    const totalBlogs = db.blogs.length;
    const publishedBlogs = db.blogs.filter((b) => b.published).length;

    const totalPodcasts = db.podcasts?.length || 0;
    const publishedPodcasts = (db.podcasts || []).filter((p) => p.published).length;

    return {
      services: { total: totalServices, published: publishedServices, drafts: totalServices - publishedServices },
      courses: { total: totalCourses, published: publishedCourses, drafts: totalCourses - publishedCourses },
      blogs: { total: totalBlogs, published: publishedBlogs, drafts: totalBlogs - publishedBlogs },
      podcasts: { total: totalPodcasts, published: publishedPodcasts, drafts: totalPodcasts - publishedPodcasts }
    };
  }, [db]);

  const filteredData = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (activeTab === "services") {
      if (!q) return db.services;
      return db.services.filter((s) => s.title.toLowerCase().includes(q) || s.id.toLowerCase().includes(q));
    }
    if (activeTab === "courses") {
      if (!q) return db.courses;
      return db.courses.filter((c) => c.title.toLowerCase().includes(q) || c.id.toLowerCase().includes(q));
    }
    if (activeTab === "blogs") {
      if (!q) return db.blogs;
      return db.blogs.filter((b) => b.title.toLowerCase().includes(q) || b.id.toLowerCase().includes(q));
    }
    if (!q) return db.podcasts || [];
    return (db.podcasts || []).filter((p) => p.title.toLowerCase().includes(q) || p.id.toLowerCase().includes(q));
  }, [db, activeTab, search]);

  const handleAddNew = () => {
    setIsNewEntity(true);
    if (activeTab === "services") {
      setEditingService({
        id: "",
        title: "",
        desc: "",
        image: "",
        cta: "Ver detalles del servicio",
        href: "",
        template: "vetting",
        published: false,
        pageContent: {
          heroTitle: "",
          heroUnderlined: "",
          heroDesc: "",
          heroTagline: "",
          heroImage: "",
          aboutTitle: "",
          aboutDesc: "",
          aboutCards: [],
          whyTitle: "",
          whyPoints: [],
          contactPhone: "0981296179",
          contactWhatsapp: "https://api.whatsapp.com/send?phone=593981296179"
        }
      });
    } else if (activeTab === "courses") {
      setEditingCourse({
        id: "",
        title: "",
        desc: "",
        image: "",
        href: "",
        published: false,
        pageContent: {
          heroTagline: "",
          heroTitle: "",
          heroDesc: "",
          heroImage: "",
          aboutTitle: "Ejes Temáticos:",
          aboutDesc: "",
          focusAreas: [],
          fichaTecnica: [],
          contactPhone: "099371290",
          contactWhatsapp: "https://api.whatsapp.com/send?phone=593099371290"
        }
      });
    } else if (activeTab === "blogs") {
      setEditingBlog({
        id: "",
        title: "",
        image: "",
        link: "",
        published: false,
        publishDate: new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }),
        readTime: "5 min de lectura",
        content: ""
      });
    } else {
      setEditingPodcast({
        id: "",
        title: "",
        description: "",
        image: "",
        audioUrl: "#",
        duration: "30 min",
        date: new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }),
        topic: "General",
        published: false
      });
    }
    setShowForm(true);
  };

  const handleEdit = (item: any) => {
    setIsNewEntity(false);
    if (activeTab === "services") {
      setEditingService(JSON.parse(JSON.stringify(item)));
    } else if (activeTab === "courses") {
      setEditingCourse(JSON.parse(JSON.stringify(item)));
    } else if (activeTab === "blogs") {
      setEditingBlog(JSON.parse(JSON.stringify(item)));
    } else {
      setEditingPodcast(JSON.parse(JSON.stringify(item)));
    }
    setShowForm(true);
  };

  const togglePublishedState = async (type: Tab, item: any) => {
    const updated = { ...item, published: !item.published };
    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, action: "save", data: updated })
      });
      if (res.ok) {
        showToast("ok", updated.published ? "Publicado" : "Pasó a borrador");
        fetchData();
      } else {
        throw new Error();
      }
    } catch {
      showToast("err", "Error al actualizar estado.");
    }
  };

  const handleConfirmDelete = async () => {
    if (!confirmDel) return;
    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: confirmDel.type, action: "delete", id: confirmDel.id })
      });
      if (res.ok) {
        showToast("ok", "Eliminado correctamente");
        setConfirmDel(null);
        fetchData();
      } else {
        throw new Error();
      }
    } catch {
      showToast("err", "Error al eliminar elemento.");
    }
  };

  const handleSaveEntity = async (type: Tab, payload: any) => {
    if (!payload.id) {
      showToast("err", "El identificador (slug) es obligatorio.");
      return;
    }
    if (!payload.title) {
      showToast("err", "El título es obligatorio.");
      return;
    }

    if (type === "services") {
      payload.href = `/${payload.id}`;
    } else if (type === "courses") {
      payload.href = `/${payload.id}`;
    } else if (type === "blogs") {
      payload.link = `/blog/${payload.id}`;
    }

    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, action: "save", data: payload })
      });
      if (res.ok) {
        showToast("ok", "Guardado correctamente");
        setShowForm(false);
        setEditingService(null);
        setEditingCourse(null);
        setEditingBlog(null);
        setEditingPodcast(null);
        fetchData();
      } else {
        throw new Error();
      }
    } catch {
      showToast("err", "Error al guardar el elemento.");
    }
  };

  if (checking) {
    return (
      <main className={`${manrope.className} min-h-screen grid place-items-center bg-white`}>
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-300 border-l-transparent" />
      </main>
    );
  }

  const activeMetrics = activeTab === "services" ? metrics.services : activeTab === "courses" ? metrics.courses : activeTab === "blogs" ? metrics.blogs : metrics.podcasts;

  return (
    <main className={`${manrope.className} min-h-screen bg-neutral-50 text-neutral-800 selection:bg-[#FFC107] selection:text-neutral-900`}>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full text-white font-extrabold text-sm" style={{ backgroundColor: PURPLE }}>
              OT
            </div>
            <div>
              <h1 className="text-base font-extrabold leading-5 text-neutral-900">Panel de administración</h1>
              <p className="text-xs text-neutral-500 leading-4 font-semibold">One True Ecuador</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {email && <span className="hidden text-xs text-neutral-600 sm:block font-medium">{email}</span>}
            <Link href="/" className="rounded-full border px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors">
              Ir al sitio
            </Link>
            <button
              onClick={logout}
              className="rounded-full px-4 py-2 text-xs font-semibold text-white transition-colors"
              style={{ backgroundColor: PURPLE }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = PURPLE_HOVER)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = PURPLE)}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Grid Content */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-8 lg:grid-cols-12">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3">
          <nav className="rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm flex flex-col gap-1">
            <button
              onClick={() => { setActiveTab("services"); setSearch(""); }}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                activeTab === "services" ? "bg-neutral-100 text-neutral-900 border-l-4 pl-2" : "text-neutral-600 hover:bg-neutral-50"
              }`}
              style={activeTab === "services" ? { borderLeftColor: PURPLE } : undefined}
            >
              <span>Servicios</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-neutral-200 text-neutral-700">{db.services.length}</span>
            </button>
            <button
              onClick={() => { setActiveTab("courses"); setSearch(""); }}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                activeTab === "courses" ? "bg-neutral-100 text-neutral-900 border-l-4 pl-2" : "text-neutral-600 hover:bg-neutral-50"
              }`}
              style={activeTab === "courses" ? { borderLeftColor: PURPLE } : undefined}
            >
              <span>Cursos Avanzados</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-neutral-200 text-neutral-700">{db.courses.length}</span>
            </button>
            <button
              onClick={() => { setActiveTab("blogs"); setSearch(""); }}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                activeTab === "blogs" ? "bg-neutral-100 text-neutral-900 border-l-4 pl-2" : "text-neutral-600 hover:bg-neutral-50"
              }`}
              style={activeTab === "blogs" ? { borderLeftColor: PURPLE } : undefined}
            >
              <span>Blog & Artículos</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-neutral-200 text-neutral-700">{db.blogs.length}</span>
            </button>
            <button
              onClick={() => { setActiveTab("podcasts"); setSearch(""); }}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                activeTab === "podcasts" ? "bg-neutral-100 text-neutral-900 border-l-4 pl-2" : "text-neutral-600 hover:bg-neutral-50"
              }`}
              style={activeTab === "podcasts" ? { borderLeftColor: PURPLE } : undefined}
            >
              <span>Podcasts</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-neutral-200 text-neutral-700">{db.podcasts?.length || 0}</span>
            </button>
          </nav>
        </aside>

        {/* Dashboard Main Workspace */}
        <section className="space-y-6 lg:col-span-9">
          {/* Dashboard Metrics */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <MetricCard title={`Total ${activeTab === "services" ? "Servicios" : activeTab === "courses" ? "Cursos" : activeTab === "blogs" ? "Artículos" : "Episodios"}`} value={activeMetrics.total} />
            <MetricCard title="Publicados" value={activeMetrics.published} accent />
            <MetricCard title="Borradores" value={activeMetrics.drafts} />
          </div>

          {/* Action Row */}
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-80">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por título o identificador..."
                className="w-full bg-white border border-neutral-300 rounded-full px-4 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2 transition-all"
                onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px ${PURPLE}22`)}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              />
              {search && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded px-2 text-xs text-neutral-500 hover:bg-neutral-100"
                  onClick={() => setSearch("")}
                >
                  Limpiar
                </button>
              )}
            </div>

            <button
              onClick={handleAddNew}
              className="rounded-full px-5 py-2.5 font-semibold text-white transition-colors"
              style={{ backgroundColor: PURPLE }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = PURPLE_HOVER)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = PURPLE)}
            >
              + Nuevo {activeTab === "services" ? "Servicio" : activeTab === "courses" ? "Curso" : activeTab === "blogs" ? "Artículo" : "Episodio"}
            </button>
          </div>

          {/* Records Table List */}
          <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm">
            <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4 bg-white">
              <h2 className="text-base font-extrabold text-neutral-850">
                {activeTab === "services" ? "Servicios" : activeTab === "courses" ? "Cursos Avanzados" : activeTab === "blogs" ? "Blog & Artículos" : "Episodios de Podcast"}
              </h2>
              <span className="text-xs text-neutral-500 font-semibold">{filteredData.length} resultados</span>
            </div>

            {loading ? (
              <TableSkeleton />
            ) : filteredData.length === 0 ? (
              <p className="px-5 py-12 text-center text-sm text-neutral-500 font-semibold">No se encontraron elementos.</p>
            ) : (
              <ul className="divide-y divide-neutral-100">
                {filteredData.map((item: any) => {
                  const imageSrc = item.image || "/blog/1.webp";
                  const badge = item.published ? (
                    <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">Publicado</span>
                  ) : (
                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">Borrador</span>
                  );

                  return (
                    <li key={item.id} className="flex items-center gap-4 px-5 py-4 hover:bg-neutral-50 transition-colors duration-150">
                      {/* Thumbnail Cover */}
                      <div className="h-12 w-16 overflow-hidden rounded bg-neutral-100 shrink-0 border border-neutral-200">
                        <img src={imageSrc} alt="" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.src = "/blog/1.webp"; }} />
                      </div>

                      {/* Details */}
                      <div className="min-w-0 grow">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-sm text-neutral-850 truncate" title={item.title}>
                            {item.title}
                          </span>
                          {badge}
                        </div>
                        <p className="text-xs text-neutral-500 font-semibold mt-0.5">
                          ID: <code className="text-[#700FA3] font-mono">{item.id}</code>
                          {activeTab === "services" && ` — Plantilla: ${item.template}`}
                          {activeTab === "podcasts" && ` — Duración: ${item.duration} | Tema: ${item.topic}`}
                        </p>
                      </div>

                      {/* Table Controls */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => togglePublishedState(activeTab, item)}
                          className={`rounded-full px-3 py-1 text-xs font-semibold border transition ${
                            item.published
                              ? "text-neutral-600 border-neutral-200 hover:bg-neutral-50"
                              : "text-amber-700 border-amber-200 hover:bg-amber-50"
                          }`}
                        >
                          {item.published ? "Ocultar" : "Publicar"}
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-700 hover:bg-neutral-50 transition"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => setConfirmDel({ type: activeTab, id: item.id, title: item.title })}
                          className="rounded-full border border-red-200 px-3 py-1 text-xs text-red-700 hover:bg-red-50 transition"
                        >
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

      {/* Editor Drawer */}
      {showForm && (
        <SideEditorForm
          type={activeTab}
          isNew={isNewEntity}
          data={activeTab === "services" ? editingService : activeTab === "courses" ? editingCourse : activeTab === "blogs" ? editingBlog : editingPodcast}
          onClose={() => {
            setShowForm(false);
            setEditingService(null);
            setEditingCourse(null);
            setEditingBlog(null);
            setEditingPodcast(null);
          }}
          onSave={(payload) => handleSaveEntity(activeTab, payload)}
        />
      )}

      {/* Confirm Deletion Alert */}
      {confirmDel && (
        <ConfirmDialog
          title="Eliminar elemento"
          text={`¿Seguro que querés eliminar “${confirmDel.title}”? Esta acción no se puede deshacer y borrará el elemento permanentemente.`}
          confirmLabel="Eliminar"
          onCancel={() => setConfirmDel(null)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* Dynamic Toast Alert */}
      {toast && (
        <div
          className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full px-5 py-2 text-sm font-semibold shadow-lg border flex items-center gap-2 ${
            toast.type === "ok" ? "bg-green-600 text-white border-green-700" : "bg-red-600 text-white border-red-700"
          }`}
        >
          {toast.msg}
        </div>
      )}
    </main>
  );
}

/* Metric Display Card */
function MetricCard({ title, value, accent = false }: { title: string; value: number; accent?: boolean }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">{title}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-neutral-850">{value}</span>
        {accent && <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: PURPLE }} />}
      </div>
    </div>
  );
}

/* Table Loading Placeholder skeleton */
function TableSkeleton() {
  return (
    <ul className="divide-y divide-neutral-100 animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i} className="flex items-center gap-4 px-5 py-4">
          <div className="h-12 w-16 rounded bg-neutral-200" />
          <div className="min-w-0 grow space-y-2">
            <div className="h-3 w-1/3 rounded bg-neutral-200" />
            <div className="h-2.5 w-1/4 rounded bg-neutral-200" />
          </div>
          <div className="h-6 w-14 rounded-full bg-neutral-200" />
        </li>
      ))}
    </ul>
  );
}

/* Slide Editor Form Component */
function SideEditorForm({
  type,
  isNew,
  data,
  onClose,
  onSave
}: {
  type: Tab;
  isNew: boolean;
  data: any;
  onClose: () => void;
  onSave: (payload: any) => void;
}) {
  const [form, setForm] = useState<any>(data);

  useEffect(() => {
    setForm(data);
  }, [data]);

  const updateField = (key: string, val: any) => {
    setForm((prev: any) => ({ ...prev, [key]: val }));
  };

  const updateNestedContentField = (key: string, val: any) => {
    setForm((prev: any) => ({
      ...prev,
      pageContent: {
        ...(prev?.pageContent || {}),
        [key]: val
      }
    }));
  };

  const handleAddListItem = (arrayKey: string, initialItem: any) => {
    const list = [...(form?.pageContent?.[arrayKey] || [])];
    list.push(initialItem);
    updateNestedContentField(arrayKey, list);
  };

  const handleRemoveListItem = (arrayKey: string, index: number) => {
    const list = [...(form?.pageContent?.[arrayKey] || [])];
    list.splice(index, 1);
    updateNestedContentField(arrayKey, list);
  };

  const handleUpdateListItem = (arrayKey: string, index: number, field: string, value: any) => {
    const list = [...(form?.pageContent?.[arrayKey] || [])];
    list[index] = { ...list[index], [field]: value };
    updateNestedContentField(arrayKey, list);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />
      
      {/* Container Drawer Panel */}
      <div 
        data-lenis-prevent
        className="relative flex h-full w-full max-w-3xl flex-col bg-white border-l border-neutral-250 shadow-2xl overflow-y-auto p-6 md:p-8"
      >
        <div className="mb-6 flex items-center justify-between border-b border-neutral-200 pb-4 shrink-0">
          <div>
            <h3 className="text-lg font-extrabold text-neutral-850">
              {isNew ? "Crear" : "Editar"} {type === "services" ? "Servicio" : type === "courses" ? "Curso" : type === "blogs" ? "Artículo" : type === "podcasts" ? "Episodio" : "Elemento"}
            </h3>
            <p className="text-xs text-neutral-500 font-semibold mt-0.5">Complete todos los detalles del contenido editable</p>
          </div>
          <button onClick={onClose} className="rounded-full border border-neutral-300 px-3.5 py-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50 transition">
            Cerrar
          </button>
        </div>

        {form && (
          <div className="space-y-6 flex-1 pr-1 text-neutral-800">
            {/* Base Settings */}
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                Identificador (slug) *
                <input
                  disabled={!isNew}
                  value={form.id || ""}
                  onChange={(e) => updateField("id", e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ""))}
                  placeholder="ej: pruebas-psicometricas"
                  className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2 font-mono"
                  onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                />
              </label>

              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                Título del listado *
                <input
                  value={form.title || ""}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="ej: Evaluaciones Psicométricas"
                  className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2"
                  onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                />
              </label>
            </div>

            {/* Description (List card) */}
            {type !== "blogs" && (
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                {type === "podcasts" ? "Descripción del Episodio" : "Descripción en listado de Inicio"}
                <textarea
                  rows={3}
                  value={type === "podcasts" ? (form.description || "") : (form.desc || "")}
                  onChange={(e) => updateField(type === "podcasts" ? "description" : "desc", e.target.value)}
                  placeholder={type === "podcasts" ? "Sinopsis del episodio de podcast..." : "Texto resumido para la tarjeta en la página de inicio..."}
                  className="mt-1.5 w-full bg-white border border-neutral-355 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2 resize-y"
                  onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                />
              </label>
            )}

            {/* Template Selector & Toggle */}
            <div className="grid gap-4 sm:grid-cols-2">
              {type === "services" && (
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                  Estilo / Plantilla
                  <select
                    value={form.template || "vetting"}
                    onChange={(e) => updateField("template", e.target.value)}
                    className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 outline-none focus:ring-2"
                    onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  >
                    <option value="vetting">Vetting (Con imágenes laterales)</option>
                    <option value="standard">Estándar (Con cuadrícula simple)</option>
                    <option value="poligrafo">Polígrafo (Con contador de estadísticas y FAQs)</option>
                  </select>
                </label>
              )}

              <div className="flex items-center justify-between rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3">
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-neutral-600">Publicado</span>
                  <span className="text-[10px] text-neutral-500 font-semibold">Habilitar visibilidad en la web</span>
                </div>
                <button
                  type="button"
                  onClick={() => updateField("published", !form.published)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${form.published ? "bg-green-500" : "bg-neutral-300"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${form.published ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>
            </div>

            {/* Cover Image URL & Drag-Drop Uploader */}
            <ImageUploadBox
              label="Imagen representativa (URL de imagen)"
              value={form.image || ""}
              onChange={(val) => updateField("image", val)}
              pathPrefix={type}
            />

            {/* SERVICES FIELDS SECTION */}
            {type === "services" && (
              <div className="border-t border-neutral-200 pt-6 space-y-6">
                <h4 className="text-xs font-bold text-[#700FA3] uppercase tracking-wider">Contenido de la Página</h4>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Título Hero Principal
                    <input
                      value={form.pageContent?.heroTitle || ""}
                      onChange={(e) => updateNestedContentField("heroTitle", e.target.value)}
                      placeholder="ej: Verificación Integral de"
                      className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>

                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Palabra Subrayada en Hero
                    <input
                      value={form.pageContent?.heroUnderlined || ""}
                      onChange={(e) => updateNestedContentField("heroUnderlined", e.target.value)}
                      placeholder="ej: Candidatos"
                      className="mt-1.5 w-full bg-white border border-neutral-355 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Tagline de Sección Hero
                    <input
                      value={form.pageContent?.heroTagline || ""}
                      onChange={(e) => updateNestedContentField("heroTagline", e.target.value)}
                      placeholder="ej: Transformamos la incertidumbre en decisiones seguras"
                      className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>

                  <ImageUploadBox
                    label="Imagen de Fondo en Hero (URL)"
                    value={form.pageContent?.heroImage || ""}
                    onChange={(val) => updateNestedContentField("heroImage", val)}
                    pathPrefix={`${type}-hero`}
                  />
                </div>

                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                  Descripción Hero
                  <textarea
                    rows={3}
                    value={form.pageContent?.heroDesc || ""}
                    onChange={(e) => updateNestedContentField("heroDesc", e.target.value)}
                    placeholder="Descripción larga que aparece en la cabecera de la página..."
                    className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2 resize-y"
                    onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  />
                </label>

                {/* About Section */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Título Sección 'Sobre el Servicio'
                    <input
                      value={form.pageContent?.aboutTitle || ""}
                      onChange={(e) => updateNestedContentField("aboutTitle", e.target.value)}
                      placeholder="ej: ¿Qué analizamos?"
                      className="mt-1.5 w-full bg-white border border-neutral-355 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>

                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Subtítulo Sección 'Sobre el Servicio'
                    <input
                      value={form.pageContent?.aboutDesc || ""}
                      onChange={(e) => updateNestedContentField("aboutDesc", e.target.value)}
                      placeholder="ej: Cruzamos información en tiempo real en..."
                      className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>
                </div>

                {/* About Cards Builder */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                    <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Tarjetas de Análisis</span>
                    <button
                      type="button"
                      onClick={() => handleAddListItem("aboutCards", { title: "", text: "" })}
                      className="rounded-full bg-neutral-50 border border-neutral-300 px-3.5 py-1 text-2xs text-[#700FA3] hover:bg-neutral-100 font-bold"
                    >
                      + Agregar Tarjeta
                    </button>
                  </div>

                  {(!form.pageContent?.aboutCards || form.pageContent.aboutCards.length === 0) ? (
                    <p className="text-xs text-neutral-400 italic font-semibold">No hay tarjetas registradas.</p>
                  ) : (
                    <div className="space-y-3">
                      {form.pageContent.aboutCards.map((card: any, idx: number) => (
                        <div key={idx} className="relative rounded-xl border border-neutral-200 bg-neutral-50 p-3 flex gap-3 flex-col sm:flex-row">
                          <input
                            value={card.title || ""}
                            onChange={(e) => handleUpdateListItem("aboutCards", idx, "title", e.target.value)}
                            placeholder="Título"
                            className="bg-white border border-neutral-300 rounded px-2.5 py-1 text-xs text-neutral-800 placeholder-neutral-400 flex-1 outline-none"
                          />
                          <input
                            value={card.text || ""}
                            onChange={(e) => handleUpdateListItem("aboutCards", idx, "text", e.target.value)}
                            placeholder="Detalle o descripción"
                            className="bg-white border border-neutral-300 rounded px-2.5 py-1 text-xs text-neutral-800 placeholder-neutral-400 flex-[2] outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveListItem("aboutCards", idx)}
                            className="text-red-600 hover:text-red-500 text-xs shrink-0 self-center font-bold"
                          >
                            Eliminar
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Why Section */}
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                  Título Sección 'Por qué / Beneficios'
                  <input
                    value={form.pageContent?.whyTitle || ""}
                    onChange={(e) => updateNestedContentField("whyTitle", e.target.value)}
                    placeholder="ej: El Valor para su Empresa"
                    className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2"
                    onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  />
                </label>

                {/* Why Points Builder */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                    <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Puntos o Beneficios</span>
                    <button
                      type="button"
                      onClick={() => handleAddListItem("whyPoints", { title: "", text: "" })}
                      className="rounded-full bg-neutral-50 border border-neutral-300 px-3.5 py-1 text-2xs text-[#700FA3] hover:bg-neutral-100 font-bold"
                    >
                      + Agregar Beneficio
                    </button>
                  </div>

                  {(!form.pageContent?.whyPoints || form.pageContent.whyPoints.length === 0) ? (
                    <p className="text-xs text-neutral-400 italic font-semibold">No hay beneficios registrados.</p>
                  ) : (
                    <div className="space-y-3">
                      {form.pageContent.whyPoints.map((point: any, idx: number) => (
                        <div key={idx} className="relative rounded-xl border border-neutral-200 bg-neutral-50 p-3 flex gap-3 flex-col sm:flex-row">
                          <input
                            value={point.title || ""}
                            onChange={(e) => handleUpdateListItem("whyPoints", idx, "title", e.target.value)}
                            placeholder="Ej: Reducción de Riesgos"
                            className="bg-white border border-neutral-300 rounded px-2.5 py-1 text-xs text-neutral-800 placeholder-neutral-400 flex-1 outline-none font-bold"
                          />
                          <input
                            value={point.text || ""}
                            onChange={(e) => handleUpdateListItem("whyPoints", idx, "text", e.target.value)}
                            placeholder="Detalle largo del beneficio..."
                            className="bg-white border border-neutral-300 rounded px-2.5 py-1 text-xs text-neutral-800 placeholder-neutral-400 flex-[2] outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveListItem("whyPoints", idx)}
                            className="text-red-600 hover:text-red-500 text-xs shrink-0 self-center font-bold"
                          >
                            Eliminar
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Contacts */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Teléfono de Contacto
                    <input
                      value={form.pageContent?.contactPhone || ""}
                      onChange={(e) => updateNestedContentField("contactPhone", e.target.value)}
                      placeholder="ej: 0981296179"
                      className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2 font-mono"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>

                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    WhatsApp URL
                    <input
                      value={form.pageContent?.contactWhatsapp || ""}
                      onChange={(e) => updateNestedContentField("contactWhatsapp", e.target.value)}
                      placeholder="Enlace API de WhatsApp..."
                      className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2 font-mono"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>
                </div>
              </div>
            )}

            {/* COURSES FIELDS SECTION */}
            {type === "courses" && (
              <div className="border-t border-neutral-200 pt-6 space-y-6">
                <h4 className="text-xs font-bold text-[#700FA3] uppercase tracking-wider">Contenido de la Página</h4>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Título de Cabecera Hero
                    <input
                      value={form.pageContent?.heroTitle || ""}
                      onChange={(e) => updateNestedContentField("heroTitle", e.target.value)}
                      placeholder="ej: Curso Avanzado: Entrevista Pretest"
                      className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>

                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Tagline de Cabecera
                    <input
                      value={form.pageContent?.heroTagline || ""}
                      onChange={(e) => updateNestedContentField("heroTagline", e.target.value)}
                      placeholder="ej: Especialización avanzada..."
                      className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <ImageUploadBox
                    label="Imagen Hero Curso (URL)"
                    value={form.pageContent?.heroImage || ""}
                    onChange={(val) => updateNestedContentField("heroImage", val)}
                    pathPrefix={`${type}-hero`}
                  />

                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Título Sección Ejes
                    <input
                      value={form.pageContent?.aboutTitle || ""}
                      onChange={(e) => updateNestedContentField("aboutTitle", e.target.value)}
                      placeholder="ej: Ejes Temáticos:"
                      className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>
                </div>

                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                  Descripción Hero
                  <textarea
                    rows={3}
                    value={form.pageContent?.heroDesc || ""}
                    onChange={(e) => updateNestedContentField("heroDesc", e.target.value)}
                    placeholder="Descripción introductoria del curso..."
                    className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2 resize-y"
                    onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  />
                </label>

                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                  Descripción de los Ejes Temáticos
                  <textarea
                    rows={2}
                    value={form.pageContent?.aboutDesc || ""}
                    onChange={(e) => updateNestedContentField("aboutDesc", e.target.value)}
                    placeholder="Subtítulo de ejes..."
                    className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2 resize-y"
                    onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  />
                </label>

                {/* Focus Areas (Ejes) Builder */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                    <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Ejes Temáticos</span>
                    <button
                      type="button"
                      onClick={() => handleAddListItem("focusAreas", { title: "", description: "" })}
                      className="rounded-full bg-neutral-50 border border-neutral-300 px-3.5 py-1 text-2xs text-[#700FA3] hover:bg-neutral-100 font-bold"
                    >
                      + Agregar Eje
                    </button>
                  </div>

                  {(!form.pageContent?.focusAreas || form.pageContent.focusAreas.length === 0) ? (
                    <p className="text-xs text-neutral-400 italic font-semibold">No hay ejes temáticos registrados.</p>
                  ) : (
                    <div className="space-y-3">
                      {form.pageContent.focusAreas.map((area: any, idx: number) => (
                        <div key={idx} className="relative rounded-xl border border-neutral-200 bg-neutral-50 p-3 flex gap-3 flex-col">
                          <div className="flex gap-3 items-center">
                            <input
                              value={area.title || ""}
                              onChange={(e) => handleUpdateListItem("focusAreas", idx, "title", e.target.value)}
                              placeholder="Título del eje"
                              className="bg-white border border-neutral-300 rounded px-2.5 py-1 text-xs text-neutral-800 placeholder-neutral-400 flex-1 outline-none font-bold"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveListItem("focusAreas", idx)}
                              className="text-red-600 hover:text-red-500 text-xs font-bold"
                            >
                              Eliminar
                            </button>
                          </div>
                          <textarea
                            rows={2}
                            value={area.description || ""}
                            onChange={(e) => handleUpdateListItem("focusAreas", idx, "description", e.target.value)}
                            placeholder="Detalle o temario del eje..."
                            className="bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs text-neutral-800 placeholder-neutral-400 outline-none resize-y"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Ficha Tecnica Builder */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                    <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Ficha Técnica / Características</span>
                    <button
                      type="button"
                      onClick={() => handleAddListItem("fichaTecnica", { title: "", description: "" })}
                      className="rounded-full bg-neutral-50 border border-neutral-300 px-3.5 py-1 text-2xs text-[#700FA3] hover:bg-neutral-100 font-bold"
                    >
                      + Agregar Ficha
                    </button>
                  </div>

                  {(!form.pageContent?.fichaTecnica || form.pageContent.fichaTecnica.length === 0) ? (
                    <p className="text-xs text-neutral-400 italic font-semibold">No hay características de ficha técnica registradas.</p>
                  ) : (
                    <div className="space-y-3">
                      {form.pageContent.fichaTecnica.map((feat: any, idx: number) => (
                        <div key={idx} className="relative rounded-xl border border-neutral-200 bg-neutral-50 p-3 flex gap-3 flex-col sm:flex-row">
                          <input
                            value={feat.title || ""}
                            onChange={(e) => handleUpdateListItem("fichaTecnica", idx, "title", e.target.value)}
                            placeholder="Ej: ⏱️ 15 horas de duración"
                            className="bg-white border border-neutral-300 rounded px-2.5 py-1 text-xs text-neutral-800 placeholder-neutral-400 flex-1 outline-none font-bold"
                          />
                          <input
                            value={feat.description || ""}
                            onChange={(e) => handleUpdateListItem("fichaTecnica", idx, "description", e.target.value)}
                            placeholder="Detalle (ej: Formación intensiva)"
                            className="bg-white border border-neutral-300 rounded px-2.5 py-1 text-xs text-neutral-800 placeholder-neutral-400 flex-[2] outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveListItem("fichaTecnica", idx)}
                            className="text-red-600 hover:text-red-500 text-xs shrink-0 self-center font-bold"
                          >
                            Eliminar
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Contact phone/whatsapp */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Teléfono Contacto Curso
                    <input
                      value={form.pageContent?.contactPhone || ""}
                      onChange={(e) => updateNestedContentField("contactPhone", e.target.value)}
                      placeholder="ej: 099371290"
                      className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2 font-mono"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>

                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Enlace WhatsApp Curso
                    <input
                      value={form.pageContent?.contactWhatsapp || ""}
                      onChange={(e) => updateNestedContentField("contactWhatsapp", e.target.value)}
                      placeholder="Enlace completo..."
                      className="mt-1.5 w-full bg-white border border-neutral-355 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2 font-mono"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>
                </div>
              </div>
            )}

            {/* BLOGS FIELDS SECTION */}
            {type === "blogs" && (
              <div className="border-t border-neutral-200 pt-6 space-y-6">
                <h4 className="text-xs font-bold text-[#700FA3] uppercase tracking-wider">Contenido del Artículo</h4>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Fecha de Publicación
                    <input
                      value={form.publishDate || ""}
                      onChange={(e) => updateField("publishDate", e.target.value)}
                      placeholder="ej: 15 de Noviembre, 2024"
                      className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>

                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Tiempo de Lectura
                    <input
                      value={form.readTime || ""}
                      onChange={(e) => updateField("readTime", e.target.value)}
                      placeholder="ej: 5 min de lectura"
                      className="mt-1.5 w-full bg-white border border-neutral-355 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>
                </div>

                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                  Cuerpo del Artículo
                  <textarea
                    rows={12}
                    value={form.content || ""}
                    onChange={(e) => updateField("content", e.target.value)}
                    placeholder="Escriba el artículo. Para subtítulos use '# Título' o '## Título'..."
                    className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-3 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2 resize-y font-sans leading-relaxed"
                    onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  />
                </label>
              </div>
            )}

            {/* PODCASTS FIELDS SECTION */}
            {type === "podcasts" && (
              <div className="border-t border-neutral-200 pt-6 space-y-6">
                <h4 className="text-xs font-bold text-[#700FA3] uppercase tracking-wider">Detalles del Episodio</h4>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Duración (ej: "32 min")
                    <input
                      value={form.duration || ""}
                      onChange={(e) => updateField("duration", e.target.value)}
                      placeholder="ej: 30 min"
                      className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>

                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Tema / Categoría (ej: "Negocios")
                    <input
                      value={form.topic || ""}
                      onChange={(e) => updateField("topic", e.target.value)}
                      placeholder="ej: RRHH"
                      className="mt-1.5 w-full bg-white border border-neutral-355 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Fecha de Publicación (ej: "15 de Junio, 2024")
                    <input
                      value={form.date || ""}
                      onChange={(e) => updateField("date", e.target.value)}
                      placeholder="ej: 15 de Junio, 2024"
                      className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>

                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Enlace de Audio / Spotify
                    <input
                      value={form.audioUrl || ""}
                      onChange={(e) => updateField("audioUrl", e.target.value)}
                      placeholder="https://open.spotify.com/..."
                      className="mt-1.5 w-full bg-white border border-neutral-355 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2 font-mono"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t border-neutral-200 shrink-0">
              <button onClick={onClose} className="rounded-full border border-neutral-300 px-5 py-2.5 text-xs font-bold text-neutral-650 hover:text-neutral-800 hover:bg-neutral-50 transition">
                Cancelar
              </button>
              <button
                onClick={() => onSave(form)}
                className="rounded-full px-6 py-2.5 text-xs font-bold text-white transition-all shadow-md"
                style={{ backgroundColor: "#700FA3" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#5C0B87")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#700FA3")}
              >
                Guardar cambios
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* --- helper function to compress and upload image to Supabase Storage --- */
const compressAndUploadImage = async (file: File, pathPrefix: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        
        // Downscale large files client side to reduce server optimization loads
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          if (width > height) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          } else {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("No se pudo obtener el contexto 2D del lienzo."));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        
        // Export to WebP and compress with 75% quality
        canvas.toBlob(
          async (blob) => {
            if (!blob) {
              reject(new Error("No se pudo generar el Blob WebP."));
              return;
            }
            
            try {
              const filename = file.name.replace(/\.[^/.]+$/, ""); // remove extension
              const safeName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 30);
              const rand = Math.random().toString(36).substring(2, 8);
              const filePath = `${pathPrefix}/${Date.now()}-${safeName}-${rand}.webp`;
              
              const { error: uploadError } = await supabase.storage
                .from("imagenes")
                .upload(filePath, blob, {
                  contentType: "image/webp",
                  cacheControl: "3600",
                  upsert: false
                });
                
              if (uploadError) {
                reject(uploadError);
                return;
              }
              
              const { data } = supabase.storage
                .from("imagenes")
                .getPublicUrl(filePath);
                
              resolve(data.publicUrl);
            } catch (err) {
              reject(err);
            }
          },
          "image/webp",
          0.75
        );
      };
      img.onerror = () => reject(new Error("Error al cargar la imagen."));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Error al leer el archivo."));
    reader.readAsDataURL(file);
  });
};

/* --- Dashed File Uploader Box Component --- */
function ImageUploadBox({
  label,
  value,
  onChange,
  pathPrefix = "images"
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  pathPrefix?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    await processUpload(files[0]);
  };

  const processUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("El archivo seleccionado debe ser una imagen válida.");
      return;
    }
    setUploading(true);
    setError(null);
    try {
      const url = await compressAndUploadImage(file, pathPrefix);
      onChange(url);
    } catch (err: any) {
      console.error("Image upload failed:", err);
      setError(err.message || "Error al subir e integrar la imagen.");
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await processUpload(files[0]);
    }
  };

  return (
    <div className="space-y-1.5 w-full">
      <div className="flex justify-between items-baseline">
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
          {label}
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-[10px] font-bold text-red-600 hover:underline"
          >
            Quitar
          </button>
        )}
      </div>

      {/* Input URL */}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ej: /servicios/2.webp o pegar URL absoluta"
        className="w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2 font-mono"
        onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
        onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
      />

      {/* Dashed Drag/Upload Box */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-350 bg-neutral-50 px-4 py-5 hover:bg-neutral-100 hover:border-neutral-400 transition cursor-pointer group"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {uploading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-400 border-l-transparent" />
            <span className="text-xs font-semibold text-neutral-500">Comprimiendo y subiendo...</span>
          </div>
        ) : value ? (
          <div className="flex flex-col items-center gap-1.5">
            <img src={value} alt="Previsualización" className="max-h-20 max-w-[200px] object-contain rounded border border-neutral-200 shadow-sm" onError={(e) => { e.currentTarget.style.display = "none"; }} />
            <span className="text-[10px] font-bold text-neutral-400 group-hover:text-neutral-600">Hacé clic para reemplazar la imagen</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <svg
              className="mx-auto h-7 w-7 text-neutral-400 group-hover:text-neutral-500 transition-colors"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xs font-semibold text-neutral-500 group-hover:text-neutral-700">
              Subir desde tu computadora
            </span>
          </div>
        )}
      </div>
      {error && <p className="text-[10px] font-bold text-red-650">{error}</p>}
    </div>
  );
}

/* Deletion Confirmation Modal Dialog */
function ConfirmDialog({
  title,
  text,
  confirmLabel = "Confirmar",
  onCancel,
  onConfirm
}: {
  title: string;
  text: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl">
        <h4 className="text-base font-extrabold text-neutral-800">{title}</h4>
        <p className="mt-2 text-xs text-neutral-600 leading-relaxed font-semibold">{text}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="rounded-full border border-neutral-300 px-5 py-2.5 text-xs text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50 transition font-bold">
            Cancelar
          </button>
          <button onClick={onConfirm} className="rounded-full px-5 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition">
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
