import { useEffect, useRef } from "react";

// Component imports
import { ClassCardSkeleton } from "./class-card";
import { RecommendedClassCard } from "./recommended-class-card";

// Fetch imports
import routes from "@/utils/api/routes";
import useSWRInfinite from "swr/infinite";

// Util imports
import { flatten, get, map } from "lodash-es";
import { BookDashed, Loader2 } from "lucide-react";

// Hook imports
import { nextFetcher } from "@/utils/api/next-fetcher";
import { useIntersection } from "@mantine/hooks";

export default function RecommendedClasses({ courseDetails }: any) {
  const { data, isLoading, isValidating, setSize, size } = useSWRInfinite(
    (index) =>
      routes.courseRoutes.coursesRelatedCourses(courseDetails.id, index + 1),
    (url) =>
      nextFetcher({
        url: url,
        method: "GET",
        useToken: true,
      }),
    { revalidateOnFocus: false }
  );

  const lastClass = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastClass.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting && size !== get(data, "[0].page_number", 0)) {
      setSize(size + 1);
    }
  }, [entry]);

  const classes = flatten(map(data, "data"));

  return (
    <>
      {isLoading ? (
        <div className='mt-4 flex flex-col gap-y-2'>
          <ClassCardSkeleton />
          <ClassCardSkeleton />
          <ClassCardSkeleton />
          <ClassCardSkeleton />
          <ClassCardSkeleton />
        </div>
      ) : classes?.length ? (
        <div className='mt-4 flex flex-col gap-y-2'>
          {classes?.map((classItem: any, i: number) => {
            if (i + 1 == classes?.length) {
              return (
                <div ref={ref} key={i}>
                  <RecommendedClassCard classDetails={classItem} />
                </div>
              );
            }
            return <RecommendedClassCard key={i} classDetails={classItem} />;
          })}

          {isValidating ? (
            <div className='mt-2 flex justify-center'>
              <Loader2 className='animate-spin text-white' />
            </div>
          ) : null}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center text-white'>
          <BookDashed className='h-28 w-28 stroke-[.5]' />
          <span>هیچ درسی یافت نشد.</span>
        </div>
      )}
    </>
  );
}
