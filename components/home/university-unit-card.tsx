import Image from "next/image";

// Component imports
import { Card, CardContent, CardFooter } from "@/components/ui/card";

// Icon imports
import { Gift, Star } from "lucide-react";
import Teaching from "../global/icons/Teaching";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import ResponsiveImage from "../responsive-image/ResponsiveImage";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton-loading/skeleton";

export function UniversityUnitCard({ className, data, placeholderSrc }: any) {
  const [imageLoading, setImageLoading] = useState(true);

  // Find the first content item with format 'image' returns imageContent which is the object
  const imageContent = data?.contents?.find(
    (content: any) => content.format === "image"
  );

  return (
    <Card
      className={`w-full rounded-2xl border-0 shadow-none ${className}`}
      title={data?.name}
    >
      <CardContent className='flex flex-col items-center justify-center p-2'>
        <ResponsiveImage
          src={imageContent?.image || placeholderSrc}
          alt={data?.name}
          imageClassName='aspect-[5/4] w-full rounded-2xl object-cover md:aspect-square'
          containerClassName='aspect-[5/4] w-full h-full md:aspect-square'
        />
        <h1 className='mt-1 w-full overflow-hidden truncate whitespace-nowrap text-right text-sm font-bold text-blue-400 lg:mt-3 lg:text-xl'>
          {data?.name || ""}
        </h1>

        <div className='flex w-full flex-row items-center justify-start'>
          <div className='flex flex-row justify-center'>
            {Array.from(Array(5).keys()).map((i) => (
              <Star
                className={
                  0 > i
                    ? "h-4 w-4 fill-amber-400 text-amber-400"
                    : "h-4 w-4 fill-slate-300 text-slate-300"
                }
                key={i}
              />
            ))}
            {/* <span className="text-slate-500 gap-x-1 text-[0.6rem] mr-1 flex items-center">
              {0}
              <span className="">(۴۵۰ رای)</span>
            </span> */}
          </div>
        </div>
        <div className='mt-2 hidden w-full flex-row gap-x-2 px-2 py-0 md:flex'>
          {/* <span className="flex items-center gap-1 text-xs lg:text-sm text-slate-500">
            <Users className="h-3 w-3 text-slate-500" />
            {studentCount} کاربر
          </span> */}

          <span className='flex items-center gap-x-1 text-xs text-slate-500 dark:text-slate-300'>
            <Teaching
              width='16'
              height='16'
              color='rgb(100 116 139 / var(--tw-text-opacity))'
            />
            {data?.stats?.teachers_counts || 0} استاد
          </span>
          <span className='flex items-center gap-1 text-nowrap text-xs text-slate-500 dark:text-slate-300'>
            <Gift className='h-3 w-3 text-current' />
            {data?.stats?.student_counts || 0} دانشجو
          </span>
        </div>
        {/* {likesCount !== undefined ? (
          <div className="hidden md:flex flex-row w-full justify-between px-2 py-0 mt-2">
            <span className="flex items-center gap-1 text-xs lg:text-sm text-slate-500 dark:text-slate-300">
              <Heart className="h-3 w-3 text-current" />
              {likesCount || 0} پسندیدن
            </span>
          </div>
        ) : null} */}
      </CardContent>
      <CardFooter className='flex flex-col p-0'>
        <Separator className='md:hidden' />
        <div className='flex w-full flex-row items-center justify-between px-2 py-0 md:hidden'>
          <div className='flex flex-col sm:gap-2 md:flex-row'>
            {/* <span className="flex items-center gap-1 text-xs lg:text-sm text-slate-500">
              <Users className="h-3 w-3 text-slate-500" />
              {studentCount} کاربر
            </span> */}
            {data?.stats?.teachers_counts ? (
              <span className='flex items-center gap-x-1 text-nowrap text-xs text-slate-500 dark:text-slate-300'>
                <Teaching
                  width='12'
                  height='12'
                  color='rgb(100 116 139 / var(--tw-text-opacity))'
                />
                {data?.stats?.teachers_counts} استاد
              </span>
            ) : null}
            {data?.stats?.student_counts ? (
              <span className='flex items-center gap-1 text-nowrap text-xs text-slate-500 dark:text-slate-300'>
                <Gift className='h-3 w-3 text-current' />
                {data?.stats?.student_counts} دانشجو
              </span>
            ) : null}
          </div>
          <Button
            variant='link'
            className='z-10 m-0 p-0 text-center text-xs font-bold text-sky-500'
          >
            مشاهده
          </Button>
        </div>
        <Button className='hidden h-10 w-full items-center justify-center rounded-b-2xl rounded-t-none bg-blue-400 p-0 text-center text-xl font-extrabold text-white dark:bg-blue-600 md:flex'>
          مشاهده
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ClassCardSkeleton({ className }: any) {
  return (
    <Skeleton
      className={`w-full overflow-hidden rounded-2xl border-0 ${className}`}
    />
  );
}
