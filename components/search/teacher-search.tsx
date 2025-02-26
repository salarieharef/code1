"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

// Component imports
import { Pagination, PaginationSkeleton } from "../global/Pagination";

// Fetch imports
import routes from "@/utils/api/routes";
import useSWR from "swr";

// Icon imports
import { useResponsiveLimit } from "@/hooks/ui";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { BookDashed } from "lucide-react";
import Link from "next/link";
import WarningMessageServer from "../warning/warning-message-server";
import { ClassCardSkeleton } from "./class-card";
import TeacherCard from "./teacher-card";

export default function TeacherSearch({ categories }: any) {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(21); // Default limit

  // Get limit from custom hook
  const responsiveLimit = useResponsiveLimit({ isXLarge: 21, isLarge: 21 });

  useEffect(() => {
    setLimit(responsiveLimit);
  }, [responsiveLimit]);

  const {
    data: searchData,
    error,
    isLoading,
    mutate
  } = useSWR(
    [
      routes.teacherRoutes.teachers({
        page: page.toString(),
        limit: limit, // Use limit state
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
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  const RenderContent = () => {
    if (isLoading) {
      return (
        <>
          <div className='grid w-full gap-2 sm:grid-cols-2 md:grid-cols-3'>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className='my-2 ml-5 flex w-full px-1 pb-4'>
                <div className='flex h-[200px] w-full justify-center md:h-[220px]'>
                  <ClassCardSkeleton />
                </div>
              </div>
            ))}
          </div>
          <PaginationSkeleton className='my-4' />
        </>
      );
    }
    if (error || !searchData || !searchData.success) {
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
          <span>هیچ مدرسی یافت نشد.</span>
        </div>
      );
    }
    return (
      <>
        <Suspense>
          {" "}
          <div className='mt-2 grid w-full gap-2 sm:grid-cols-2 md:grid-cols-3'>
            {searchData?.data.map((teacher: any, index: number) => (
              <Link href={`/profile/${teacher?.id}`} key={index}>
                <TeacherCard data={teacher} mutate={mutate} />
              </Link>
            ))}
          </div>
          {searchData?.page_number > 1 && (
            <Pagination
              className='my-4'
              total={searchData?.page_number}
              current={page}
              setPage={setPage}
            />
          )}
        </Suspense>
      </>
    );
  };

  return (
    <>
      <h1 className='w-fit border-b-2 border-blue-400 text-xl font-medium text-blue-900'>
        نتایج جستجو
      </h1>
      <>
        <RenderContent />
      </>
    </>
  );
}
