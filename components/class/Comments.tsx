"use client";
import { useEffect, useRef } from "react";

// Icon imports
import { Loader2, MessageSquareDashed } from "lucide-react";

// Fetch imports
import routes from "@/utils/api/routes";
import useSWRInfinite from "swr/infinite";
import CommentCard from "./comment-card";
import CommentForm from "./comment-form";

// Util imports
import { flatten, get, map } from "lodash-es";

// Hook imports
import { nextFetcher } from "@/utils/api/next-fetcher";
import { ClassServices } from "@/security/permissions";
import { useIntersection } from "@mantine/hooks";

export default function Comments({ courseDetails }: any) {
  // const { data, isLoading, isValidating, mutate, setSize, size } =
  //   useSWRInfinite(
  //     (index) => routes.courseRoutes.comments(courseDetails.id, index + 1),
  //     fetcher,
  //     {
  //       revalidateOnFocus: false,
  //     }
  //   );
  const { data, isLoading, isValidating, mutate, setSize, size } =
    useSWRInfinite(
      (index) => routes.courseRoutes.comments(courseDetails.id, index + 1),
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
  const lastComment = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastComment.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting && size !== get(data, "[0].page_number", 0)) {
      setSize(size + 1);
    }
  }, [entry]);

  const comments = flatten(map(data, "data"));

  return (
    <section className='mt-4' id='comments'>
      {!isLoading && !comments?.length ? (
        <div className='flex flex-col items-center justify-center py-4'>
          <MessageSquareDashed className='h-14 w-14' />
          <p className='text-lg'>نظری هنوز برای این درس ثبت نشده است.</p>
        </div>
      ) : null}

      {/* <InfiniteScroll
        dataLength={size(flatten(map(data, "data")))}
        next={() => setSize(size + 1)}
        hasMore={size + 1 != get(data, "[0].page_number", 0)}
        loader={
          <div className="flex justify-center mt-2">
            <Loader2 className="animate-spin" />
          </div>
        }
        endMessage={
          <p className="flex justify-center mt-2">
            همه نظرات را مشاهده کرده اید.
          </p>
        }
      >
        <div className="flex flex-col gap-y-2">
          {data?.map((comments, i) => {
            return comments?.data?.map((comment: any, index: number) => (
              <CommentCard key={index} comment={comment} />
            ));
          })}
        </div>
      </InfiniteScroll> */}

      <div className='mt-4 flex flex-col gap-y-2'>
        {comments?.map((comment: any, i: number) => {
          if (i + 1 == comments?.length) {
            return (
              <div ref={ref} key={i}>
                <CommentCard comment={comment} />
              </div>
            );
          }
          return <CommentCard key={i} comment={comment} />;
        })}

        {isValidating ? (
          <div className='mt-2 flex justify-center'>
            <Loader2 className='animate-spin' />
          </div>
        ) : null}
      </div>
      {ClassServices.comment.can_comment ? (
        <CommentForm commentMutate={mutate} />
      ) : null}
    </section>
  );
}
