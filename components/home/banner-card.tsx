"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";
import Link from "next/link";
import { cn } from "@/utils/cn";
import ResponsiveImage from "../responsive-image/ResponsiveImage";

export default function BannerCard({ data, color, className }: any) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div
      className={cn(
        `flex items-center ${color} aspect-[16/4] text-white`,
        className
      )}
    >
      {data?.title ? (
        <div className='w-1/2 p-4 md:p-14'>
          <h1 className='text-lg font-bold md:text-5xl xl:text-6xl 2xl:text-8xl'>
            {data?.title}
          </h1>
          <p className='mt-4 text-base md:text-3xl xl:text-5xl'>
            {data?.description}
          </p>

          {data?.link ? (
            <Link href={data?.link || ""}>
              <Button
                variant='link'
                className='justify-right mt-4 flex items-center gap-x-2 pr-0 text-sm text-white md:mt-36 md:gap-x-4 md:text-2xl lg:mt-52 xl:text-4xl'
              >
                <span>همین حالا شروع کنید</span>
                <i className='rounded-full border-1 p-1 md:border-2 md:p-2'>
                  <MoveLeft className='h-3 w-3 md:h-8 md:w-8 xl:h-10 xl:w-10' />
                </i>
              </Button>
            </Link>
          ) : null}
        </div>
      ) : null}

      {data?.image && (
        <div
          className={`${data?.title ? "w-1/2" : "w-full"} h-full overflow-hidden`}
        >
          <>
            <Skeleton
              className={`${!imageLoading ? "hidden" : ""} w-full rounded-none bg-blue-900`}
            />
            <ResponsiveImage
              src={data?.image}
              alt='توضیحات تصویر'
              blur={20}
              imageClassName={`${data?.title ? "object-cover" : "object-fill"}`}
              sizes='(max-width: 400px) 300px,(max-width: 640px) 500px, (max-width: 1024px) 1000px, 1000px'
            />
          </>
        </div>
      )}
    </div>
  );
}

export function BannerCardSkeleton({ className }: any) {
  return (
    <div
      className={cn(`flex aspect-[16/4] items-center bg-blue-950`, className)}
    >
      <div className='basis-1/2 p-4 md:p-14'>
        <Skeleton className='mb-4 h-8 w-2/3 bg-blue-900 md:h-12 xl:mb-8 xl:h-20' />
        <Skeleton className='mb-2 h-4 w-3/4 bg-blue-900 md:h-6 xl:mb-4 xl:h-8' />
        <Skeleton className='mb-2 h-4 w-3/4 bg-blue-900 md:h-6 xl:mb-4 xl:h-8' />
        <Skeleton className='mt-8 h-6 w-1/2 bg-blue-900 md:mt-20 md:h-8 xl:h-10' />
      </div>
      <div className='basis-1/2 overflow-hidden md:relative'>
        <Skeleton className='h-full w-full bg-blue-900' />
      </div>
    </div>
  );
}
