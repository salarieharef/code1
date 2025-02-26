"use client";
import { useSearchParams } from "next/navigation";

// Component imports
import ClassSearch from "./class-search";
import LessonSearch from "./lesson-search";
import TeacherSearch from "./teacher-search";

// Hook imports
import { Suspense } from "react";

export default function SearchResults({ className, categories }: any) {
  const searchParams = useSearchParams();

  return (
    <>
      <Suspense>
        <div className={`w-full min-w-0 ${className}`}>
          {searchParams?.get("topic") == "courses" ? (
            <ClassSearch categories={categories} />
          ) : null}

          {searchParams?.get("topic") == "lessons" ? (
            <LessonSearch categories={categories} />
          ) : null}

          {searchParams?.get("topic") == "teachers" ? (
            <TeacherSearch categories={categories} />
          ) : null}
        </div>
      </Suspense>
    </>
  );
}
