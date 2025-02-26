"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useFetchOnIntersect } from "@/hooks/api";
import { nextFetcher } from "@/utils/api/next-fetcher";
import routes from "@/utils/api/routes";
import { convertDecimalSecondsToHMS } from "@/utils/time-formatter";
import Link from "next/link";
import { useRef } from "react";
import useSWR from "swr";
import WarningMessageServer from "../warning/warning-message-server";
import { ClassCard, ClassCardSkeleton } from "./class-card";
import SwiperBanner from "./swiper-banner";

export default function RecommendedClasses({
  className,
  title,
  subtitle,
  imageSrc,
  section,
  placeholderSrc,
  sectionTitle,
}: any) {
  const ref = useRef<HTMLDivElement>(null);
  const hasFetched = useFetchOnIntersect(ref);
  const url = routes.userRoutes.recommendationCourses({});

  // const { data, error, isLoading } = useSWR(
  //   hasFetched ? [url] : null,
  //   ([url]) => fetcher(url),
  //   { revalidateOnFocus: false, shouldRetryOnError: false }
  // );
  const { data, error, isLoading } = useSWR(
    hasFetched ? [url] : null,
    ([url]) =>
      nextFetcher({
        url,
        method: "GET",
        useToken: true,
      }),
    { revalidateOnFocus: false, shouldRetryOnError: false }
  );

  const RenderContent = () => {
    return (
      <ErrorBoundary
        loadingComponent={Array?.from({ length: 5 })?.map((_, index) => (
          <CarouselItem
            key={index}
            className='h-full max-w-[200px] basis-9/12 md:max-w-full md:basis-1/3 md:scale-100 lg:basis-1/4 xl:basis-1/5'
          >
            <ClassCardSkeleton className='h-60 bg-slate-300 md:h-96' />
          </CarouselItem>
        ))}
        data={data}
        isLoading={isLoading}
        error={error}
        errorComponent={
          <div className='flex w-full justify-center py-8'>
            <WarningMessageServer className='text-slate-700'>
              ارتباط با سرور برقرار نشد
            </WarningMessageServer>
          </div>
        }
      >
        {data?.data?.length &&
          data?.data?.map((course: any, key: number) => (
            <CarouselItem
              key={key}
              className='h-full max-w-[200px] basis-9/12 scale-95 md:max-w-full md:basis-1/3 md:scale-100 lg:basis-1/4 xl:basis-1/5'
            >
              <Link href={`class/${course?.id}`}>
                <ClassCard
                  className='min-h-[14rem] min-w-full'
                  image={course?.image}
                  placeholderSrc={placeholderSrc}
                  title={course?.name}
                  teacher={course?.teacher?.name}
                  duration={convertDecimalSecondsToHMS(
                    course?.lesson_details?.lessons_seconds
                  )}
                  studentCount={`${course?.students_count}`}
                  lessonCount={course?.lesson_details?.lessons_count}
                />
              </Link>
            </CarouselItem>
          ))}
      </ErrorBoundary>
    );
  };

  return (
    <div ref={ref}>
      {/* Top Classes */}
      {sectionTitle ? (
        <h1 className=' hidden py-2 text-right text-xl font-bold text-slate-900 md:flex md:px-20 md:py-4 md:text-2xl lg:text-3xl lg:tracking-[-0.03rem] xl:text-4xl 2xl:text-5xl'>
          کلاس‌های مورد علاقه شما
        </h1>
      ) : (
        <></>
      )}
      <div
        className={`flex justify-between bg-blue-400 sm:justify-center md:bg-transparent md:px-20 ${className} overflow-hidden`}
      >
        {title && (
          <SwiperBanner
            subtitle={subtitle}
            title={title}
            imageSrc={imageSrc}
            className='mx-2 md:hidden'
            section={section}
          />
        )}

        <Carousel
          opts={{
            align: "start",
            direction: "rtl",
          }}
          // when data is empty, we must center the elements.
          className={`mb-2 mt-4 w-full overflow-x-scroll sm:overflow-x-visible ${
            data?.data?.length === 0 ? "flex items-center justify-center" : ""
          }`}
        >
          <CarouselContent className={data?.data?.length === 0 ? "w-full" : ""}>
            <RenderContent />
          </CarouselContent>

          <CarouselPrevious className='hidden md:flex' />
          <CarouselNext className='hidden md:flex' />
        </Carousel>
      </div>
    </div>
  );
}
