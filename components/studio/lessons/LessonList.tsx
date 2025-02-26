"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

// Component imports
import { Pagination, PaginationSkeleton } from "@/components/global/Pagination";
import { Button } from "@/components/ui/button";
import { LessonCard, LessonCardSkeleton } from "./LessonCard";

// Icon imports
import { BookDashed, BoxSelect } from "lucide-react";

// Fetch imports
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import useSWR from "swr";

export default function LessonList({ q, sort }: any) {
  const params = useParams();
  const [page, setPage] = useState(1);

  const {
    data: lessons,
    error,
    isLoading,
    mutate,
  } = useSWR(
    params.classId || params.fieldId
      ? [
          routes.teacherRoutes.courseLessons({
            id: params.classId || params.fieldId,
            page: page,
          }),
          q,
        ]
      : [routes.teacherRoutes.lessons({ page: page, sort: sort }), q],
    ([url]) =>
      nextFetcher({
        url,
        method: "POST",
        body: { q: q },
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <>
      {!error && lessons?.success && !lessons?.data?.length ? (
        <div className='flex flex-col items-center justify-center gap-4'>
          <BookDashed className='h-52 w-52 stroke-[.5] text-muted-foreground' />
          <span>شما هیچ جلسه‌ای برای این درس ایجاد نکرده اید.</span>
        </div>
      ) : (
        <div className='space-between mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 md:grid-cols-3'>
          {isLoading ? (
            <>
              <LessonCardSkeleton />
              <LessonCardSkeleton />
              <LessonCardSkeleton />
              <LessonCardSkeleton />
              <LessonCardSkeleton />
              <LessonCardSkeleton />
              <LessonCardSkeleton />
              <LessonCardSkeleton />
              <LessonCardSkeleton />
            </>
          ) : (
            lessons?.data.map((item: any, index: number) => (
              <LessonCard key={index} mutate={mutate} data={item} />
            ))
          )}
        </div>
      )}

      {isLoading ? (
        <PaginationSkeleton className='my-4' />
      ) : lessons?.page_number > 1 ? (
        <Pagination
          className='my-4'
          total={lessons?.page_number}
          current={page}
          setPage={setPage}
        />
      ) : null}
    </>
  );
}
