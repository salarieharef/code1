"use client";

// Component imports
import { Button } from "@/components/ui/button";

import { Swiper, SwiperSlide } from "swiper/react";

import { useCallback, useRef } from "react";

import "swiper/css";
import "swiper/css/navigation";

import { homeRoutes } from "@/utils/api/routes/home.routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Mousewheel } from "swiper/modules";
import useSWR from "swr";
import { ClassCardSkeleton } from "./class-card";
import { ClassSpecialCard } from "./class-special-card";
// Icon imports
import ClassOriginalImg from "@/static/images/global/class-original.webp";

export default function ClassesSpecialList() {
  const ref = useRef<any>(null);
  const handlePrev = useCallback(() => {
    if (!ref.current) return;
    ref.current?.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!ref.current) return;
    ref.current?.swiper.slideNext();
  }, []);

  const {
    data: courses,
    error,
    isLoading,
  } = useSWR(
    () => homeRoutes.courses().url,
    (url) =>
      nextFetcher({
        url,
        method: homeRoutes.courses().method,
        // useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );
  return (
    <>
      <div className={`relative w-full py-6`}>
        <Button
          size='icon'
          variant='link'
          onClick={handlePrev}
          className='invisible absolute right-0 -mt-4 h-full w-16 md:visible'
        >
          <ChevronRight className='h-8 w-8 rounded-full bg-gradient-to-b from-white to-neutral-200 p-1 pl-[0.5rem] text-slate-800 shadow' />
        </Button>
        <Button
          size='icon'
          variant='link'
          onClick={handleNext}
          className='invisible absolute left-0 -mt-4 h-full w-16 md:visible'
        >
          <ChevronLeft className='h-8 w-8 rounded-full bg-gradient-to-b from-white to-neutral-200 p-1 pr-[0.5rem] text-slate-800 shadow' />
        </Button>
        <div className='md:px-16'>
          <Swiper
            ref={ref}
            dir='rtl'
            slidesPerView={1}
            className='w-full'
            mousewheel={true}
            modules={[Mousewheel]}
          >
            {courses?.data ? (
              courses?.data?.map?.((course: any, index: number) => (
                <SwiperSlide key={`category-special-slider-slide-${index}`}>
                  <div className='flex w-full justify-center'>
                    <ClassSpecialCard
                      image={ClassOriginalImg}
                      title='ریاضی فیزیک ۸'
                      teacher='وحید مرمری'
                      teacherImage='/static/images/avatar/avatar-1.webp'
                      duration='۱ ساعت و ۲۰ دقیقه'
                      studentCount='۲۱۰۰ دانش آموز'
                    />
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className='flex h-full w-full justify-center'>
                  <ClassCardSkeleton className='h-64 xl:h-72' />
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </div>
    </>
  );
}
