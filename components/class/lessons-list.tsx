"use client";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useContext, useEffect, useRef } from "react";

// Context imports
import { video_context } from "@/context/video";

// Component imports
import { Accordion } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";
import LessonItem from "./lesson-item";

// Icon imports
import { ListVideo, Loader2 } from "lucide-react";

// Fetch imports
import routes from "@/utils/api/routes";
import useSWRInfinite from "swr/infinite";

// Util imports
import { find, flatten, get, map } from "lodash-es";

// Hook imports
import { nextFetcher } from "@/utils/api/next-fetcher";
import { useIntersection } from "@mantine/hooks";

export default function LessonsList() {
  const { selectedLesson, setSelectedLesson }: any = useContext(video_context);
  const searchParams = useSearchParams();
  const params = useParams();

  function onLessonSelected(lesson: any) {
    setSelectedLesson(lesson);
  }

  // fetch course lessons
  // const {
  //   data,
  //   isLoading,
  //   isValidating,
  //   mutate: mutateLessons,
  //   setSize,
  //   size,
  // } = useSWRInfinite(
  //   (index) => routes.courseRoutes.courseLessons(params?.id, index + 1),
  //   postFetcher,
  //   {
  //     revalidateOnFocus: false,
  //   }
  // );

  const {
    data,
    isLoading,
    isValidating,
    mutate: mutateLessons,
    setSize,
    size,
  } = useSWRInfinite(
    (index) => routes.courseRoutes.courseLessons(params?.id, index + 1),
    (url) =>
      nextFetcher({
        url,
        method: "POST",
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );
  const lessons = flatten(map(data, "data"));

  useEffect(() => {
    const lessonId = searchParams.get("lesson");

    if (!selectedLesson) {
      if (lessonId) {
        onLessonSelected(find(lessons, { id: Number(lessonId) }));
      } else {
        onLessonSelected(lessons?.[0]);
      }
    }
  }, [lessons, searchParams]);

  const lastLesson = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastLesson.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting && size !== get(data, "[0].page_number", 0)) {
      setSize(size + 1);
    }
  }, [entry]);

  return (
    <>
      {isLoading ? (
        <>
          <Skeleton className='my-2 h-14 w-full rounded bg-white' />
          <Skeleton className='my-2 h-14 w-full rounded bg-white' />
          <Skeleton className='my-2 h-14 w-full rounded bg-white' />
          <Skeleton className='my-2 h-14 w-full rounded bg-white' />
          <Skeleton className='my-2 h-14 w-full rounded bg-white' />
        </>
      ) : lessons?.length ? (
        <Suspense>
          {" "}
          <Accordion
            type='single'
            onValueChange={(e) => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
              onLessonSelected(find(lessons, { id: e }));
            }}
            className='mt-2'
            value={selectedLesson?.id || lessons?.[0]?.id}
          >
            {lessons?.map((lesson: any, i: number) => {
              if (i + 1 == lessons?.length) {
                return (
                  <div ref={ref} key={i}>
                    <LessonItem
                      item={lesson}
                      key={i}
                      mutateLessons={mutateLessons}
                    />
                  </div>
                );
              }

              return (
                <LessonItem
                  item={lesson}
                  key={i}
                  mutateLessons={mutateLessons}
                />
              );
            })}
          </Accordion>
        </Suspense>
      ) : (
        <div className='flex flex-col items-center justify-center'>
          <ListVideo className='h-14 w-14 stroke-1' />
          <p className='text-lg'>سرفصلی هنوز برای این درس ثبت نشده است.</p>
        </div>
      )}

      {isValidating ? (
        <div className='mt-2 flex justify-center'>
          <Loader2 className='animate-spin' />
        </div>
      ) : null}
    </>
  );
}
