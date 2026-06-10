import React from "react";
import { getServices } from "@/lib/cms";
import PruebaClient from "./PruebaClient";

export const revalidate = 3600; // Revalidate dynamic content every hour

export default async function Page() {
  let dbData: any = null;
  try {
    const services = await getServices();
    dbData = services.find((s: any) => s.id === "prueba-de-honestidad-etica-y-valores") || null;
  } catch (err) {
    console.error("Error fetching service data in server page:", err);
  }

  return <PruebaClient initialData={dbData} />;
}
