"use client";
import { useState } from "react";

// Component imports
import {
  CommentCard,
  CommentCardSkeleton,
} from "@/components/comments/comment-card";
import { Pagination, PaginationSkeleton } from "@/components/global/Pagination";
import SortFilter from "@/components/global/filters/sort-filter";
import { Separator } from "@/components/ui/separator";

// Icon imports
import { MessageSquareDashed } from "lucide-react";
import ClassOriginalImg from "@/static/images/global/class-original.webp";

// Auth imports
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import useSWR from "swr";

export default function FieldCommentList() {
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");

  // const { data: comments, isLoading } = useSWR(
  //   [routes.teacherRoutes.comments({ page: page }), q],
  //   // defining field api with this type in the body
  //   ([url]) => postFetcher(url, { q: q, course_type: "field_introducer" }),
  //   {
  //     revalidateOnFocus: false,
  //   }
  // );

  const { data: comments, isLoading } = useSWR(
    [routes.teacherRoutes.comments({ page: page }), q],
    // defining field api with this type in the body
    ([url]) =>
      nextFetcher({
        url,
        method: "POST",
        body: { q: q, course_type: "field_introducer" },
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  // const comments = Array.from(Array(10).keys());

  return (
    <>
      <SortFilter
        searchPlaceHolder='جستجو کنید...'
        disableSort={true}
        onSearch={setQ}
      />

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
                username={comment?.user?.name}
                comment={comment?.msg}
                classVideosCount={5}
                date='پنج شنبه - ۲۰ مهر ۱۴۰۲'
              />
              <Separator orientation='horizontal' className='my-2 h-[2px]' />
            </>
          ))
        ) : (
          <div className='flex flex-col items-center justify-center'>
            <MessageSquareDashed className='h-52 w-52 stroke-[.5] text-muted-foreground' />
            <span>هنوز نظری ثبت نشده است.</span>
          </div>
        )}
      </div>

      {isLoading ? (
        <PaginationSkeleton className='my-4' />
      ) : comments?.page_number > 1 ? (
        <Pagination
          className='my-4'
          total={comments?.page_number}
          current={page || 1}
          setPage={setPage}
        />
      ) : null}
    </>
  );
}
