"use client";
import { useState } from "react";

// Component imports
import { Pagination, PaginationSkeleton } from "@/components/global/Pagination";
import {
  CertificationCard,
  CertificationCardSkeleton,
} from "./certification-card";

// Icon imports
import { BookA } from "lucide-react";

// Fetch imports
import routes from "@/utils/api/routes";
import useSWR from "swr";

// Auth imports
import { nextFetcher } from "@/utils/api/next-fetcher";
import { useSession } from "next-auth/react";

// Fetch imports
export default function CertificationList() {
  const { data: session }: any = useSession();
  const [page, setPage] = useState(1);

  // const {
  // 	data: certifications,
  // 	mutate: certificationsMutate,
  // 	error,
  // 	isLoading,
  // } = useSWR(
  // 	session?.user?.id
  // 		? routes.userRoutes.certificates(session?.user?.id, page)
  // 		: null,
  // 	fetcher,
  // 	{
  // 		revalidateOnFocus: false,
  // 	}
  // );
  const {
    data: certifications,
    mutate: certificationsMutate,
    error,
    isLoading,
  } = useSWR(
    session?.user?.id
      ? routes.userRoutes.certificates(session?.user?.id, page)
      : null,
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
        {!session?.user?.id || isLoading ? (
          <>
            <CertificationCardSkeleton />
            <CertificationCardSkeleton />
            <CertificationCardSkeleton />
            <CertificationCardSkeleton />
            <CertificationCardSkeleton />
            <CertificationCardSkeleton />
            <CertificationCardSkeleton />
            <CertificationCardSkeleton />
            <CertificationCardSkeleton />
          </>
        ) : certifications?.data?.length ? (
          certifications?.data?.map((item: any, index: number) => (
            <CertificationCard
              key={index}
              data={item}
              mutate={certificationsMutate}
            />
          ))
        ) : (
          <div className='col-span-full flex h-full w-full flex-col items-center justify-center'>
            <BookA className='h-52 w-52 stroke-[.5] text-muted-foreground' />
            <span>شما هنوز گواهینامه های خود را وارد نکرده اید.</span>
          </div>
        )}
      </div>

      {isLoading ? (
        <PaginationSkeleton className='my-4' />
      ) : certifications?.page_number > 1 ? (
        <Pagination
          className='my-4'
          total={certifications?.page_number}
          current={page}
          setPage={setPage}
        />
      ) : null}
    </>
  );
}
