"use client";

import { Pagination, PaginationSkeleton } from "@/components/global/Pagination";
import { CategoryContext } from "@/context/CategoryContext";
import { useResponsiveLimit } from "@/hooks/ui";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { courseRoutes } from "@/utils/api/routes/course/course.routes";
import { convertDecimalSecondsToHMS } from "@/utils/time-formatter";
import { cn } from "@/utils/cn";
import { BookDashed } from "lucide-react";
import NoImageIcon from "@/static/icons/no-image.svg?url";
import { useSearchParams } from "next/navigation";
import { Suspense, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { ClassCard, ClassCardSkeleton } from "./class-card";

export default function ClassesList({
  searchQuery,
  sort,
  // categories,
  section,
  onLoad,
  university,
  className,
}: any) {
  const searchParams = useSearchParams();
  const teacherParam = searchParams.get("teacher");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20); // Default limit

  const { categoryTags, categoryIntroducers, categories }: any =
    useContext(CategoryContext);
  //

  // Get limit from custom hook
  const responsiveLimit = useResponsiveLimit();

  useEffect(() => {
    setLimit(responsiveLimit);
  }, [responsiveLimit]);

  // const {
  //   data: courses,
  //   error,
  //   isLoading,
  //   mutate,
  // } = useSWR(
  //   [
  //     courseRoutes.courses({
  //       page: page.toString(),
  //       limit: limit.toString(),
  //       sort: sort,
  //     }),
  //     searchQuery,
  //     sort?.field,
  //     section,
  //     ...categories,
  //     teacherParam,
  //     university,
  //     categoryTags,
  //     categoryIntroducers,
  //   ],
  //   ([url]) =>
  //     postFetcher(url, {
  //       categories,
  //       q: searchQuery,
  //       level: "",
  //       teacher: teacherParam || "",
  //       section: section && section !== "teaching_assistants" ? section : "",
  //       // is_college: section == "college",
  //       exclude_teaching_assistant:
  //         section == "teaching_assistants" ? false : true,
  //       exclude_field_introducers: section !== "field_introducer",
  //       teacher_organ_type:
  //         section == "teaching_assistants"
  //           ? "researchers_club"
  //           : "-researchers_club",
  //       university_id: university,
  //       tags: categoryTags,
  //       introducers: categoryIntroducers,
  //     }),
  //   {
  //     revalidateOnFocus: false,
  //     dedupingInterval: 60000,
  //   }
  // );

  const {
    data: courses,
    error,
    isLoading,
    mutate,
  } = useSWR(
    [
      courseRoutes.courses({
        page: page.toString(),
        limit: limit.toString(),
        sort: sort,
      }),
      searchQuery,
      sort?.field,
      section,
      ...categories,
      teacherParam,
      university,
      categoryTags,
      categoryIntroducers,
    ],
    ([url]) =>
      nextFetcher({
        url,
        method: "POST",
        body: {
          categories,
          q: searchQuery,
          level: "",
          teacher: teacherParam || "",
          section: section && section !== "teaching_assistants" ? section : "",
          exclude_teaching_assistant:
            section === "teaching_assistants" ? false : true,
          exclude_field_introducers: section !== "field_introducer",
          teacher_organ_type:
            section === "teaching_assistants"
              ? "researchers_club"
              : "-researchers_club",
          university_id: university,
          tags: categoryTags,
          introducers: categoryIntroducers,
        },
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  useEffect(() => {
    if (courses) {
      onLoad();
    }
  }, [courses, onLoad]);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <>
      <Suspense>
        <div
          className={cn(
            "grid gap-2 pb-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4",
            className
          )}
        >
          {isLoading ? (
            <>
              {Array.from({ length: limit }).map((_, index) => (
                <div key={index} className='ml-5 flex w-full px-1 pb-4'>
                  <div className='flex h-[18.6875rem] w-full justify-center md:h-[23.25rem]'>
                    <ClassCardSkeleton />
                  </div>
                </div>
              ))}
            </>
          ) : courses?.data?.length ? (
            courses?.data?.map?.((course: any, index: number) => (
              <div
                key={`category-class-${index}`}
                className='flex justify-center px-1 pb-4 sm:ml-5 sm:w-full'
              >
                <ClassCard
                  link={`/class/${course.id}`}
                  image={course.image || NoImageIcon}
                  title={course.name}
                  teacher={course.teacher?.name}
                  duration={
                    convertDecimalSecondsToHMS(
                      course.lesson_details?.lessons_seconds
                    ) || "-"
                  }
                  section={section}
                  likesCount={course?.stats?.likes_count}
                  viewsCount={course?.stats?.views_count}
                  introducers={course?.introducers}
                  studentCount={course.students_count || "-"}
                  lessonCount={course?.lesson_details?.lessons_count}
                />
              </div>
            ))
          ) : null}
        </div>
        {!courses?.data?.length ? (
          <div className='flex flex-col items-center justify-center'>
            <BookDashed className='h-28 w-28 stroke-[.5]' />
            <span>هیچ درسی یافت نشد.</span>
          </div>
        ) : null}
        {/* Pagination */}
        {isLoading ? (
          <PaginationSkeleton className='my-4' />
        ) : courses?.page_number > 1 ? (
          <Pagination
            className='my-4'
            total={courses?.page_number}
            current={page}
            setPage={handlePageChange}
          />
        ) : null}
      </Suspense>
    </>
  );
}
