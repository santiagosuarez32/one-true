import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión | One True",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
