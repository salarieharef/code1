"use client";

import { Pagination, PaginationSkeleton } from "@/components/global/Pagination";
import { useResponsiveLimit } from "@/hooks/ui";
import { nextFetcher } from "@/utils/api/next-fetcher";
import routes from "@/utils/api/routes";
import { cn } from "@/utils/cn";
import { BookDashed } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import useSWR from "swr";
import { ClassCardSkeleton } from "./class-card";
import TeacherCard from "./teacher-card";

export default function TeachersList({
  searchQuery,
  sort,
  categories,
  section,
  onLoad,
  university,
  className,
}: any) {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20); // Default limit

  // Get limit from custom hook
  const responsiveLimit = useResponsiveLimit();

  useEffect(() => {
    setLimit(responsiveLimit);
  }, [responsiveLimit]);

  const {
    data: teachers,
    error,
    isLoading,
    mutate,
  } = useSWR(
    [
      routes.teacherRoutes.teachers({
        page: page.toString(),
        limit: limit, // Use limit state
        sort: sort,
      }),
      searchQuery,
      sort?.field,
      section,
      ...categories,
      university,
    ],
    ([url]) =>
      nextFetcher({
        url,
        method: "POST",
        body: {
          categories: categories,
          q: searchQuery,
          section: section && section !== "teaching_assistants" ? section : "",
          with_courses: true,
          exclude_teaching_assistant:
            section === "teaching_assistants" ? false : true,
          university_id: university,
        },
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  useEffect(() => {
    if (teachers) {
      onLoad();
    }
  }, [teachers, onLoad]);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <>
      <Suspense>
        <div
          className={cn(
            "grid w-full flex-wrap gap-2 pb-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
            className
          )}
        >
          {isLoading ? (
            <>
              {Array.from({ length: limit }).map((_, index) => (
                <div key={index} className='ml-5 flex w-full px-1 pb-4'>
                  <div className='flex h-[18.6875rem] w-full justify-center md:h-[23.25rem]'>
                    <ClassCardSkeleton />
                  </div>
                </div>
              ))}
            </>
          ) : teachers?.data?.length ? (
            teachers?.data?.map?.((teacher: any, index: number) => (
              <div
                key={`category-class-${index}`}
                className='ml-5 flex w-full justify-center px-1 pb-4'
              >
                <TeacherCard
                  link={`/profile/${teacher.id}`}
                  data={teacher}
                  mutate={mutate}
                />
              </div>
            ))
          ) : null}
        </div>
        {!teachers?.data?.length ? (
          <div className='flex flex-col items-center justify-center'>
            <BookDashed className='h-28 w-28 stroke-[.5]' />
            <span>هیچ مدرسی یافت نشد.</span>
          </div>
        ) : null}
        {/* Pagination */}
        {isLoading ? (
          <PaginationSkeleton className='my-4' />
        ) : teachers?.page_number > 1 ? (
          <Pagination
            className='my-4'
            total={teachers?.page_number}
            current={page}
            setPage={handlePageChange}
          />
        ) : null}
      </Suspense>
    </>
  );
}
