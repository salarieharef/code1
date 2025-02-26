"use client";
// Context imports
import CourseFormContextProvider from "@/context/course/form.context";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CourseFormContextProvider>{children}</CourseFormContextProvider>;
}
