"use client";

import Link from "next/link";
import { Button } from "../ui/button";

export default function UniversityCourseStats({
  className,
  totalCount,
  universityCourseCount,
  schoolCourseCount,
  skillCourseCount,
  collegeCourseCount,
  id,
}: any) {
  return (
    <>
      <div className='flex w-full flex-col items-start justify-center px-4'>
        <div className='flex w-full items-center justify-between'>
          <span className='text-sm font-medium text-blue-900'>آمار درس‌ها</span>
          <Link href={`/category?university=${id}`}>
            <Button size='sm' className='p-0 text-xs' variant='link'>
              مشاهده تمام دروس
            </Button>
          </Link>
        </div>

        <div className='mt-2 flex w-full flex-row items-center justify-between'>
          <span className='text-xs text-slate-900 dark:text-slate-300'>
            تعداد کلی درس‌ها
          </span>
          <span className='text-xs font-medium text-slate-900 dark:text-slate-300'>
            {totalCount || 0} درس
          </span>
        </div>

        {universityCourseCount ? (
          <div className='mt-2 flex w-full flex-row items-center justify-between pr-4'>
            <span className='flex flex-row items-center gap-x-1 text-xs text-slate-900 dark:text-slate-300'>
              تعداد درس‌های دانشگاهی
            </span>
            <span className='text-xs font-medium text-slate-900 dark:text-slate-300'>
              {universityCourseCount} درس
            </span>
          </div>
        ) : null}

        {schoolCourseCount ? (
          <div className='mt-2 flex w-full flex-row items-center justify-between pr-4'>
            <span className='flex flex-row items-center gap-x-1 text-xs text-slate-900 dark:text-slate-300'>
              تعداد درس‌های مدارس سما
            </span>
            <span className='text-xs font-medium text-slate-900 dark:text-slate-300'>
              {schoolCourseCount} درس
            </span>
          </div>
        ) : null}

        {skillCourseCount ? (
          <div className='mt-2 flex w-full flex-row items-center justify-between pr-4'>
            <span className='flex flex-row items-center gap-x-1 text-xs text-slate-900 dark:text-slate-300'>
              تعداد درس‌ها مهارتی
            </span>
            <span className='text-xs font-medium text-slate-900 dark:text-slate-300'>
              {skillCourseCount} درس
            </span>
          </div>
        ) : null}

        {collegeCourseCount ? (
          <div className='mt-2 flex w-full flex-row items-center justify-between pr-4'>
            <span className='flex flex-row items-center gap-x-1 text-xs text-slate-900 dark:text-slate-300'>
              تعداد درس‌های دانشکدگان
            </span>
            <span className='text-xs font-medium text-slate-900 dark:text-slate-300'>
              {collegeCourseCount} درس
            </span>
          </div>
        ) : null}
      </div>
    </>
  );
}
