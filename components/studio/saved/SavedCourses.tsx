"use client";
import { useState } from "react";

// Component imports
import { Pagination, PaginationSkeleton } from "@/components/global/Pagination";
import { ClassCard } from "./class-card";

// Fetch imports
import routes from "@/utils/api/routes";
import useSWR from "swr";

// Icon imports
import { ClassCardSkeletonByOverlay } from "@/components/ui/skeleton-loading/skeletons";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { BookDashed } from "lucide-react";

export default function SavedCourses() {
  const [page, setPage] = useState(1);

  // const {
  //   data: classes,
  //   mutate,
  //   error,
  //   isLoading,
  // } = useSWR(routes.userRoutes.savedCourses({ page: page }), fetcher, {
  //   revalidateOnFocus: false,
  // });
  const {
    data: classes,
    mutate,
    error,
    isLoading,
  } = useSWR(
    routes.userRoutes.savedCourses({ page: page }),
    (url) =>
      nextFetcher({
        url: url,
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
        {isLoading ? (
          <ClassCardSkeletonByOverlay count={6} />
        ) : !classes?.data?.length ? (
          <div className='col-span-full flex h-full w-full flex-col items-center justify-center'>
            <BookDashed className='h-52 w-52 stroke-[.5] text-muted-foreground' />
            <span>شما هنوز درسی ذخیره نکرده اید.</span>
          </div>
        ) : (
          classes?.data?.map((item: any, index: number) => (
            <ClassCard key={index} course={item} mutate={mutate} />
          ))
        )}
      </div>

      {isLoading ? (
        <PaginationSkeleton className='my-4' />
      ) : classes?.page_number > 1 ? (
        <Pagination
          className='my-4'
          total={classes?.page_number}
          current={page}
          setPage={setPage}
        />
      ) : null}
    </>
  );
}
