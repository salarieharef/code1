"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

// Component imports
import { Pagination, PaginationSkeleton } from "../global/Pagination";
import { ClassCard, ClassCardSkeleton } from "./class-card";

// Fetch imports
import { useResponsiveLimit } from "@/hooks/ui";
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { BookDashed } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";
import WarningMessageServer from "../warning/warning-message-server";

export default function ClassSearch({ categories }: any) {
  const searchParams = useSearchParams();

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(20); // Default limit

  // Get limit from custom hook
  const responsiveLimit = useResponsiveLimit();

  useEffect(() => {
    setLimit(responsiveLimit);
  }, [responsiveLimit]);

  const {
    data: searchData,
    error,
    isLoading,
  } = useSWR(
    [
      routes.courseRoutes.courses({
        page: page.toString(),
        limit: limit,
      }),
      searchParams.get("q"),
      categories,
    ],
    ([url]) =>
      nextFetcher({
        url,
        method: "POST",
        body: {
          q: searchParams.get("q"),
          categories: categories,
        },
        useToken: true,
      }),
    { revalidateOnFocus: false, dedupingInterval: 60000 }
  );

  const RenderContent = () => {
    if (isLoading) {
      return (
        <>
          <div className='grid w-full gap-1 py-6 sm:grid-cols-2 md:grid-cols-4'>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className='ml-5 flex w-full px-1 pb-4'>
                <div className='flex h-[18.6875rem] w-full justify-center md:h-[23.25rem]'>
                  <ClassCardSkeleton />
                </div>
              </div>
            ))}
          </div>
          <PaginationSkeleton itemClass='bg-slate-200' />
        </>
      );
    }
    if (!isLoading && (error || !searchData || !searchData.success)) {
      return (
        <div className='flex w-full justify-center py-8'>
          <WarningMessageServer>ارتباط با سرور برقرار نشد</WarningMessageServer>
        </div>
      );
    }

    if (searchData?.data?.length === 0) {
      return (
        <div className='flex flex-col items-center justify-center'>
          <BookDashed className='h-28 w-28 stroke-[.5]' />
          <span>هیچ درسی یافت نشد.</span>
        </div>
      );
    }

    return (
      <>
        <div className='mt-2 grid gap-2 sm:w-full sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
          {searchData?.data.map((course: any, index: number) => (
            <Link href={`/class/${course?.id}`} key={index}>
              <ClassCard key={index} data={course} />
            </Link>
          ))}
        </div>
        <div className='my-4'>
          <Pagination
            total={searchData?.page_number}
            current={page}
            setPage={setPage}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <h1 className='w-fit border-b-2 border-blue-400 text-xl font-medium text-blue-900'>
        نتایج جستجو
      </h1>
      <>
        <Suspense>
          <RenderContent />
        </Suspense>
      </>
    </>
  );
}
