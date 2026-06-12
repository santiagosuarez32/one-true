import React from "react";
import NotFound from "../not-found";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada | One True",
  description: "Lo sentimos, el enlace al que intentas acceder no está disponible.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return <NotFound />;
}
