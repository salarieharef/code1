"use client";
import { useState } from "react";

// Component imports
import {
  CommentCard,
  CommentCardSkeleton,
} from "@/components/comments/comment-card";
import SortFilter from "@/components/global/filters/sort-filter";
import { Pagination, PaginationSkeleton } from "@/components/global/Pagination";
import { Separator } from "@/components/ui/separator";

// Fetch imports
import routes from "@/utils/api/routes";
import useSWR from "swr";

import { nextFetcher } from "@/utils/api/next-fetcher";
// Icon imports
import ClassOriginalImg from "@/static/images/global/class-original.webp";

import { Edit2, MessageSquareDashed } from "lucide-react";

export default function StudioClassComments({
  params,
}: {
  params: { classId: string };
}) {
  const [page, setPage] = useState(1);

  // const { data: comments, isLoading } = useSWR(
  //   routes.courseRoutes.comments(params?.classId, page),
  //   fetcher,
  //   {
  //     revalidateOnFocus: false,
  //   }
  // );
  const { data: comments, isLoading } = useSWR(
    routes.courseRoutes.comments(params?.classId, page),
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
    <div className='mb-10 w-full rounded-md bg-white p-4 shadow-xl sm:mt-10 sm:px-12 sm:py-8'>
      <h1 className='flex gap-x-2 text-xl font-medium text-blue-900 sm:text-3xl'>
        <Edit2 className='text-blue-400 sm:h-10 sm:w-10' />
        نظرات این درس
      </h1>

      <Separator orientation='horizontal' className='my-4' />

      <SortFilter searchPlaceHolder='جستجو کنید...' />

      <div className='space-between mt-6 flex w-full flex-col gap-x-8 gap-y-4'>
        {isLoading ? (
          <>
            <CommentCardSkeleton />
            <CommentCardSkeleton />
            <CommentCardSkeleton />
            <CommentCardSkeleton />
            <CommentCardSkeleton />
            <CommentCardSkeleton />
            <CommentCardSkeleton />
            <CommentCardSkeleton />
          </>
        ) : comments?.data?.length ? (
          comments?.data?.map((comment: any, i: number) => (
            <>
              <CommentCard
                key={i}
                title={comment?.title}
                image={ClassOriginalImg}
                comment={comment?.msg}
                username={comment?.user?.name}
                classVideosCount={5}
                date='پنج شنبه - ۲۰ مهر ۱۴۰۲'
              />
              <Separator orientation='horizontal' className='my-2 h-[2px]' />
            </>
          ))
        ) : (
          <div className='flex flex-col items-center justify-center'>
            <MessageSquareDashed className='h-52 w-52 stroke-[.5] text-muted-foreground' />
            <span>هنوز نظری برای این درس ثبت نشده است.</span>
          </div>
        )}
      </div>

      {isLoading ? (
        <PaginationSkeleton className='my-4' />
      ) : comments?.page_number > 1 ? (
        <Pagination
          className='my-4'
          total={comments?.page_number}
          setPage={setPage}
          current={page}
        />
      ) : null}
    </div>
  );
}
