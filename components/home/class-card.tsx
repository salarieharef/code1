// Component imports
import { Card, CardContent, CardFooter } from "@/components/ui/card";

// Icon imports
import NoImageIcon from "@/static/icons/no-image.svg?url";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";
import { Clock, Eye, Heart, PlayCircle, Users } from "lucide-react";
import { useState } from "react";
import ResponsiveImage from "../responsive-image/ResponsiveImage";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export function ClassCard({
  className,
  image,
  title,
  teacher,
  duration,
  likesCount,
  lessonCount,
  viewsCount,
  section,
  introducers,
  placeholderSrc,
}: any) {
  return (
    <Card
      className={`w-full rounded-2xl border-0 shadow-none ${className}`}
      title={title}
    >
      <CardContent className='flex flex-col items-start justify-center p-2'>
        <ResponsiveImage
          src={image || NoImageIcon}
          alt={title}
          containerClassName='aspect-[5/4] w-full rounded-2xl object-cover md:aspect-square'
          imageClassName='aspect-[5/4] w-full rounded-xl object-cover md:aspect-square'
        />

        <h1 className='md:text-md mt-1 w-full max-w-32 overflow-hidden truncate whitespace-nowrap text-right text-sm font-bold text-blue-400 md:max-w-full lg:mt-3 lg:text-xl'>
          {title}
        </h1>
        {/* {section !== "field_introducer" && teacher ? (
          <h3 className='md:text-md mt-1 w-full max-w-28 overflow-hidden truncate whitespace-nowrap text-right text-xs  font-medium text-slate-700 dark:text-slate-200 md:max-w-full lg:text-lg '>
            مدرس:{teacher}
          </h3>
        ) : null} */}
        {teacher ? (
          <div className='mt-1 w-full max-w-28 text-right md:max-w-44'>
            <h3 className='md:text-md overflow-hidden truncate whitespace-nowrap text-xs font-medium text-slate-700 dark:text-slate-200 md:max-w-full lg:text-lg'>
              مدرس: {teacher || ""}
            </h3>
          </div>
        ) : null}

        {section == "field_introducer" ? (
          <h3 className='mt-1  w-full max-w-28 overflow-hidden truncate whitespace-nowrap text-right  text-sm font-medium text-slate-700 dark:text-slate-200 md:max-w-full'>
            معرفی کنندگان: {introducers || ""}
          </h3>
        ) : null}
        {/* {section == "field_introducer" && introducers ? (
          <h3 className='mt-1  w-full max-w-28 overflow-hidden truncate whitespace-nowrap text-right  text-sm font-medium text-slate-700 dark:text-slate-200 md:max-w-full'>
            معرفی کنندگان: {introducers}
          </h3>
        ) : null} */}
        <div className='mt-2 hidden w-full flex-row justify-between px-2 py-0 md:flex'>
          {/* <span className="flex items-center gap-1 text-xs lg:text-sm text-slate-500">
            <Users className="h-3 w-3 text-slate-500" />
            {studentCount} کاربر
          </span> */}
          {lessonCount ? (
            <span className='flex items-center gap-1 text-xs text-slate-500 dark:text-slate-300 lg:text-sm'>
              <PlayCircle className='h-3 w-3 text-current' />
              {lessonCount} جلسه
            </span>
          ) : null}
          {duration ? (
            <span className='flex items-center gap-1 text-xs text-slate-500 dark:text-slate-300 lg:text-sm'>
              <Clock className='h-3 w-3 text-current' />
              {duration}
            </span>
          ) : null}
        </div>
        <div className='mt-2 flex w-full flex-row justify-between px-0.5 py-0  md:px-2'>
          {likesCount !== undefined ? (
            <div className='flex flex-row justify-between'>
              <span className='flex max-w-14 flex-nowrap items-center gap-0.5 truncate text-xs  text-slate-500  dark:text-slate-300 md:max-w-full md:gap-1'>
                <Heart className='h-3 w-3 text-current' />
                {likesCount || 0} پسندیدن
              </span>
            </div>
          ) : null}
          {viewsCount !== undefined ? (
            <div className='flex flex-row justify-between'>
              <span className='flex max-w-14 flex-nowrap items-center gap-0.5 truncate text-xs text-slate-500 dark:text-slate-300 md:max-w-full md:gap-1 lg:text-sm'>
                <Eye className='h-3 w-3 text-current' />
                {viewsCount || 0} بازدید
              </span>
            </div>
          ) : null}
        </div>
      </CardContent>
      <CardFooter className='flex flex-col p-0'>
        <Separator className='md:hidden' />
        <div className='flex w-full flex-row items-center justify-between px-2 py-0 md:hidden'>
          <div className='flex flex-col sm:flex-row sm:gap-2'>
            {/* <span className="flex items-center gap-1 text-xs lg:text-sm text-slate-500">
              <Users className="h-3 w-3 text-slate-500" />
              {studentCount} کاربر
            </span> */}
            <span className='flex items-center gap-1 text-xs text-slate-500 lg:text-sm'>
              <Users className='h-3 w-3 text-slate-500' />
              {lessonCount} جلسه
            </span>
            <span className='flex items-center gap-1 text-xs text-slate-500 lg:text-sm'>
              <Clock className='h-3 w-3 text-slate-500' />
              {duration}
            </span>
          </div>
          <Button
            variant='link'
            className='m-0 p-0 text-center text-xs font-bold text-sky-500'
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
