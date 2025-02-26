"use client";
import { useState } from "react";

// Fetch imports
import routes from "@/utils/api/routes";
import useSWR from "swr";

// Component imports
import { Pagination, PaginationSkeleton } from "@/components/global/Pagination";
import { LessonCard, LessonCardSkeleton } from "./Lesson-card";

// Icon imports
import { nextFetcher } from "@/utils/api/next-fetcher";
import { BoxSelect } from "lucide-react";

export default function LikedLessons() {
  const [page, setPage] = useState(1);

  // const {
  // data: lessons,
  // mutate,
  // error,
  // isLoading,
  // } = useSWR(routes.userRoutes.likedLessons({ page: page }), fetcher, {
  // 	revalidateOnFocus: false,
  // });
  const {
    data: lessons,
    mutate,
    error,
    isLoading,
  } = useSWR(
    routes.userRoutes.likedLessons({ page: page }),
    (url) =>
      nextFetcher({
        url,
        method: "GET",
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <>
      <div className='space-between mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 md:grid-cols-3'>
        {isLoading || error ? (
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
        ) : !lessons?.data?.length ? (
          <div className='col-span-full flex h-full w-full flex-col items-center justify-center'>
            <BoxSelect className='h-52 w-52 stroke-[.5] text-muted-foreground' />
            <span>شما هنوز درس مورد علاقه خود را مشخص نکرده اید.</span>
          </div>
        ) : (
          lessons?.data.map((item: any, index: number) => (
            <LessonCard key={index} lesson={item} mutate={mutate} />
          ))
        )}
      </div>

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
