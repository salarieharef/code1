"use client";
import Link from "next/link";

// Component imports
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ClassCardSkeleton } from "./class-card";
import SwiperBanner from "./swiper-banner";

// Fetch imports
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import useSWR from "swr";
import { UniversityUnitCard } from "./university-unit-card";

export default function TopUniversities({
  className,
  title,
  subtitle,
  imageSrc,
  mobileView = false,
  placeholderSrc,
}: any) {
  // const { data, error, isLoading } = useSWR(
  // 	[routes.homeRoutes.universities()?.url],
  // 	([url]) => apiFetcher(url, routes.homeRoutes.universities()?.method),
  // 	{ revalidateOnFocus: false }
  // );

  const { data, error, isLoading } = useSWR(
    () => [
      routes.homeRoutes.universities({ sort: "university_most_score" })?.url,
    ],
    ([url]) =>
      nextFetcher({
        url,
        method: routes.homeRoutes.universities()?.method,
        // useToken: true,
      }),
    { revalidateOnFocus: false }
  );
  return (
    <>
      <div
        className={`flex justify-between bg-blue-400 sm:justify-center md:bg-transparent ${className} overflow-hidden`}
      >
        {title && (
          <SwiperBanner
            subtitle={subtitle}
            title={title}
            imageSrc={imageSrc}
            className='mx-2 md:hidden'
          />
        )}

        <Carousel
          opts={{
            align: "start",
            direction: "rtl",
          }}
          className={`mx-2 mb-2 w-full sm:w-4/5 md:mt-4 ${mobileView ? "overflow-x-scroll" : ""}`}
        >
          <CarouselContent>
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className='h-full max-w-[200px] basis-9/12 md:max-w-full md:basis-1/3 md:scale-100 lg:basis-1/4 xl:basis-1/5'
                  >
                    <ClassCardSkeleton className='h-60 md:h-96' />
                  </CarouselItem>
                ))
              : data?.data?.map((university: any, key: number) => (
                  <CarouselItem
                    key={key}
                    className='h-full max-w-[200px] basis-9/12 scale-95 md:max-w-full md:basis-1/3 md:scale-100 lg:basis-1/4 xl:basis-1/5'
                  >
                    <Link href={`universities?id=${university?.id}`}>
                      <UniversityUnitCard
                        className='min-w-full sm:min-h-[17rem]'
                        placeholderSrc={placeholderSrc}
                        data={university}
                      />
                    </Link>
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious className='hidden md:flex' />
          <CarouselNext className='hidden md:flex' />
        </Carousel>
      </div>
    </>
  );
}
