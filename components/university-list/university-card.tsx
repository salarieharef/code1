"use client";

// Component imports
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ClassCardSkeleton } from "../home/class-card";

// Icon imports
import { university_context } from "@/context/university";
import { useContext } from "react";
import ResponsiveImage from "../responsive-image/ResponsiveImage";
import { Ratings } from "../ui/Ratings";
import NoImageIcon from "@/static/icons/no-image.svg?url";

export default function UniversityCard({
  className,
  data,
  showUniversityDetails,
}: any) {
  const {
    setUniversityIdForDetail,
    setShowUniversityDetail,
    universityIdForDetail,
    isImageDetailOpen,
    setIsImageDetailOpen,
    setSelectedImage,
  }: any = useContext(university_context);

  return (
    <div className='w-full'>
      <div className='flex w-full flex-row justify-between px-4'>
        <Button
          variant={"ghost"}
          className='h-fit w-fit p-0 hover:bg-transparent'
          onClick={() => showUniversityDetails(data?.id)}
        >
          <span className='text-md font-bold text-blue-900'>{data?.name}</span>
        </Button>

        <div className='flex flex-row items-center justify-start'>
          <div className='flex flex-row justify-center'>
            <Ratings
              rating={data?.stats?.avg_rate || 0}
              variant='yellow'
              size={16}
            />
          </div>
        </div>
      </div>
      <div className='mt-2 flex w-full flex-row gap-x-2 px-4 py-0'>
        <span className='flex items-center gap-x-1 text-xs text-slate-500 dark:text-slate-300'>
          {data?.stats?.teachers_counts || 0} استاد
        </span>
        <span className='flex items-center gap-1 text-xs text-slate-500 dark:text-slate-300'>
          {data?.stats?.student_counts || 0} دانشجو
        </span>
      </div>
      <Carousel
        opts={{
          align: "start",
          direction: "rtl",
        }}
        className={`mb-2 mt-4 w-full px-4 ${false ? "overflow-x-scroll" : ""}`}
      >
        <CarouselContent>
          {/* isloading */}
          {false
            ? Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className='basis-2/5'>
                  <ClassCardSkeleton className='h-96' />
                </CarouselItem>
              ))
            : data?.contents.map((content: any, key: number) => (
                <CarouselItem key={key} className='basis-2/5'>
                  <Card
                    className={`w-full rounded-2xl border-0 shadow-none ${className} cursor-pointer`}
                    onClick={() => {
                      setUniversityIdForDetail(data?.id);
                      setSelectedImage(key);
                      setShowUniversityDetail(true);
                      setIsImageDetailOpen(true);
                    }}
                  >
                    <CardContent className='flex flex-col items-center justify-center p-2'>
                      <ResponsiveImage
                        src={
                          content?.image?.endsWith(".m3u8")
                            ? NoImageIcon
                            : content?.image || NoImageIcon
                        }
                        alt={"test image"}
                        imageClassName='aspect-[16/10] w-full rounded-2xl object-fill'
                        containerClassName='w-full md:h-24 h-36 rounded-2xl'
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
        </CarouselContent>
        {/* <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" /> */}
      </Carousel>
    </div>
  );
}
