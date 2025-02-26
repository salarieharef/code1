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
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { useRef } from "react";
import useSWR from "swr";
import TitleSection from "./TitleSection";
import SwiperBanner from "./swiper-banner";
import TeacherCard from "../category/teacher-card";
import { TeacherCardSkeleton } from "../ui/skeleton-loading/skeletons";

export default function TopTeachers({
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
}: any) {
  const ref = useRef<HTMLDivElement>(null);
  const hasFetched = useFetchOnIntersect(ref);
  const url = routes.teacherRoutes?.teachers({ sort: "teacher_most_score" });

  const { data, error, isLoading, mutate } = useSWR(
    hasFetched ? url : null,
    (url) =>
      nextFetcher({
        url,
        method: "POST",
        body: {
          with_courses: true,
          exclude_teaching_assistant: true,
          access_to_field_introduce: false,
        },
      }),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  const RenderContent = () => {
    return (
      <ErrorBoundary
        loadingComponent={Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem
            key={index}
            className='h-full max-w-[200px] basis-9/12 scale-95 md:max-w-full md:basis-1/3 md:scale-100 lg:basis-1/4 xl:basis-1/5'
          >
            <TeacherCardSkeleton className='h-64' />
          </CarouselItem>
        ))}
        data={data}
        isLoading={isLoading}
        error={error}
      >
        {data?.data?.map((teacher: any, key: number) => (
          <CarouselItem
            key={key}
            className='h-full max-w-[200px] basis-9/12 scale-95 md:max-w-full md:basis-1/3 md:scale-100 lg:basis-1/4 xl:basis-1/5'
          >
            {/* <TeacherCard
              avatar={
                teacher.image || "/static/images/avatar/teacher-avatar.webp"
              }
              name={teacher.name}
              first_name={teacher?.first_name}
              last_name={teacher?.last_name}
              vote='5.5 از 136 رای'
              followers={teacher?.stats?.followers}
              likes={teacher?.stats?.likes_count}
              views={teacher?.stats?.views_count}
              data={teacher}
              className='w-48 sm:w-full'
            /> */}
            <TeacherCard
              link={`/profile/${teacher.id}`}
              data={teacher}
              mutate={mutate}
              className='w-48 sm:w-full'
              // Pass a static key like teacherList
            />
          </CarouselItem>
        ))}
      </ErrorBoundary>
    );
  };

  return (
    <>
      {!isLoading && data?.data?.length !== 0 && (
        <TitleSection
          title={titleSection}
          linkHref={linkSection}
          linkText={linkText}
        />
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
