"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useFetchOnIntersect } from "@/hooks/api";
import ErrorBoundary from "@/components/ErrorBoundary";
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { convertDecimalSecondsToHMS } from "@/utils/time-formatter";
import Link from "next/link";
import { useRef } from "react";
import useSWR from "swr";
import WarningMessageServer from "../warning/warning-message-server";
import { ClassCard, ClassCardSkeleton } from "./class-card";
import SwiperBanner from "./swiper-banner";
import TitleSection from "./TitleSection";

export default function TopClasses({
  className,
  title,
  subtitle,
  imageSrc,
  section,
  mobileView = false,
  placeholderSrc,
  titleSection,
  linkSection,
  linkText,
  linkHref,
}: any) {
  const ref = useRef<HTMLDivElement>(null);
  const hasFetched = useFetchOnIntersect(ref);
  const url = routes.courseRoutes.courses({ sort: "most_score" });

  // const { data, error, isLoading } = useSWR(
  //   hasFetched ? [url, section] : null,
  //   ([url]) =>
  //     postFetcher(url, {
  //       section: section || "",
  //       exclude_field_introducers: section !== "field_introducer",
  //       exclude_teaching_assistant:
  //         section == "teaching_assistants" ? false : true,
  //       teacher_organ_type:
  //         section == "teaching_assistants"
  //           ? "researchers_club"
  //           : "-researchers_club",
  //     }),
  //   { revalidateOnFocus: false }
  // );

  const { data, error, isLoading } = useSWR(
    hasFetched ? [url, section] : null,
    ([url]) =>
      nextFetcher({
        url,
        method: "POST",
        body: {
          section: section || "",
          exclude_field_introducers: section !== "field_introducer",
          exclude_teaching_assistant:
            section === "teaching_assistants" ? false : true,
          teacher_organ_type:
            section === "teaching_assistants"
              ? "researchers_club"
              : "-researchers_club",
        },
      }),
    { revalidateOnFocus: false }
  );

  const RenderContent = () => {
    return (
      <ErrorBoundary
        loadingComponent={Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem
            key={index}
            className='h-full max-w-[200px] basis-9/12 md:max-w-full md:basis-1/3 md:scale-100 lg:basis-1/4 xl:basis-1/5'
          >
            <ClassCardSkeleton className='h-60 md:h-96' />
          </CarouselItem>
        ))}
        errorComponent={
          <div className='flex w-full justify-center py-8'>
            <WarningMessageServer className='text-slate-100'>
              ارتباط با سرور برقرار نشد
            </WarningMessageServer>
          </div>
        }
        noDataComponent={
          <div className='flex w-full justify-center py-8'>
            <WarningMessageServer className='text-slate-100'>
              داده‌ای یافت نشد
            </WarningMessageServer>
          </div>
        }
        data={data}
        isLoading={isLoading}
        error={error}
      >
        {data?.data?.map((course: any, key: number) => (
          <CarouselItem
            key={key}
            className='h-full max-w-[200px] basis-9/12 scale-95 md:max-w-full md:basis-1/3 md:scale-100 lg:basis-1/4 xl:basis-1/5'
          >
            <Link href={`class/${course?.id}`}>
              <ClassCard
                className='min-w-full sm:min-h-[17rem]'
                image={course?.image}
                placeholderSrc={placeholderSrc}
                title={course?.name}
                teacher={
                  section == "field_introducer" ? null : course?.teacher?.name
                }
                duration={convertDecimalSecondsToHMS(
                  course?.lesson_details?.lessons_seconds
                )}
                studentCount={`${course?.students_count}`}
                lessonCount={course?.lesson_details?.lessons_count}
                likesCount={course?.stats?.likes_count}
                viewsCount={course?.stats?.views_count}
                section={section}
                introducers={course?.introducers}
              />
            </Link>
          </CarouselItem>
        ))}
      </ErrorBoundary>
    );
  };

  return (
    <>
      {data?.data?.length !== 0 && (titleSection || linkHref) ? (
        <TitleSection
          title={titleSection}
          linkHref={linkSection}
          linkText={linkText}
        />
      ) : (
        <></>
      )}

      <div
        ref={ref}
        className={`flex justify-between bg-blue-400 sm:justify-center md:bg-transparent ${className} overflow-hidden`}
      >
        {mobileView && (
          <SwiperBanner
            subtitle={subtitle}
            title={title}
            imageSrc={imageSrc}
            className='mx-2 md:hidden'
            section={section}
          />
        )}

        <Carousel
          opts={{ align: "start", direction: "rtl" }}
          className={`mx-2 mb-2 mt-4 w-full sm:w-4/5 ${
            mobileView ? "overflow-x-scroll" : ""
          }`}
        >
          <CarouselContent>
            <RenderContent />
          </CarouselContent>
          <CarouselPrevious className='hidden md:flex' />
          <CarouselNext className='hidden md:flex' />
        </Carousel>
      </div>
    </>
  );
}
