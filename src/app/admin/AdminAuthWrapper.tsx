"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminAuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session && pathname !== "/admin/login") {
        router.replace(`/admin/login?redirect=${encodeURIComponent(pathname)}`);
      } else {
        setChecking(false);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && pathname !== "/admin/login") {
        router.replace("/admin/login");
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [pathname, router]);

  if (checking && pathname !== "/admin/login") {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: "#700FA3" }}>
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-yellow-400"
          aria-label="Cargando"
        />
      </div>
    );
  }

  return <>{children}</>;
}
