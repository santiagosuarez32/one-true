import React from "react";
import AdminAuthWrapper from "./AdminAuthWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel | One True",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminAuthWrapper>{children}</AdminAuthWrapper>;
}
