import React from "react";
import { getCourses, getCalendarIntakes } from "@/lib/cms";
import CalendarioClient from "./CalendarioClient";

export const revalidate = 3600;

export default async function CalendarioPage() {
  let courses: any[] = [];
  let intakes: any[] = [];
  try {
    courses = await getCourses();
  } catch (err) {
    console.error("Error loading courses in Academic Calendar server page:", err);
  }

  try {
    intakes = await getCalendarIntakes();
  } catch (err) {
    console.error("Error loading calendar intakes in Academic Calendar server page:", err);
  }

  return <CalendarioClient initialCourses={courses} initialIntakes={intakes} />;
}

