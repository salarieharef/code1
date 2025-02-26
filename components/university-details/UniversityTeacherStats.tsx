"use client";

// Component imports
import { Separator } from "@/components/ui/separator";

// Context imports

// Fetch imports

// Icon imports
import Teaching from "../global/icons/Teaching";
import Link from "next/link";
import { Button } from "../ui/button";

export default function UniversityTeacherStats({
  className,
  totalCount,
  maleCount,
  femaleCount,
  id,
}: any) {
  return (
    <>
      <div className='flex w-full flex-col items-start justify-center px-4'>
        <div className='flex w-full items-center justify-between'>
          <span className='text-sm font-medium text-blue-900'>
            آمار اساتید حاضر در کاتب
          </span>
          <Link href={`/category?university=${id}&type=teachers`}>
            <Button size='sm' className='p-0 text-xs' variant='link'>
              مشاهده تمام اساتید
            </Button>
          </Link>
        </div>

        <div className='mt-2 flex w-full flex-row items-center justify-between'>
          <span className='text-xs text-slate-900 dark:text-slate-300'>
            تعداد کلی اساتید واحد
          </span>
          <span className='text-xs font-medium text-slate-900 dark:text-slate-300'>
            {totalCount} نفر
          </span>
        </div>

        {maleCount ? (
          <div className='mt-2 flex w-full flex-row items-center justify-between'>
            <span className='flex flex-row items-center gap-x-1 text-xs text-slate-900 dark:text-slate-300'>
              <Teaching
                color='rgb(59 130 246 / var(--tw-text-opacity))'
                width='14'
                height='14'
              />
              تعداد اساتید آقا
            </span>
            <span className='text-xs font-medium text-slate-900 dark:text-slate-300'>
              {maleCount} نفر
            </span>
          </div>
        ) : null}

        {femaleCount ? (
          <div className='mt-2 flex w-full flex-row items-center justify-between'>
            <span className='flex flex-row items-center gap-x-1 text-xs text-slate-900 dark:text-slate-300'>
              <Teaching
                color='rgb(59 130 246 / var(--tw-text-opacity))'
                width='14'
                height='14'
              />
              تعداد اساتید خانم
            </span>
            <span className='text-xs font-medium text-slate-900 dark:text-slate-300'>
              {femaleCount} نفر
            </span>
          </div>
        ) : null}
      </div>
    </>
  );
}
