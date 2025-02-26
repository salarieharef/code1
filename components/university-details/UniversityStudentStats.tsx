"use client";

// Component imports

// Context imports

// Fetch imports

// Icon imports
import { User } from "lucide-react";

export default function UniversityStudentStats({
  className,
  totalCount,
  maleCount,
  femaleCount,
}: any) {
  return (
    <>
      <div className='flex w-full flex-col items-start justify-center px-4'>
        <span className='text-sm font-medium text-blue-900'>
          آمار دانشجویان حاضر در کاتب
        </span>

        <div className='mt-2 flex w-full flex-row items-center justify-between'>
          <span className='text-xs text-slate-900 dark:text-slate-300'>
            تعداد کلی دانشجویان واحد
          </span>
          <span className='text-xs font-medium text-slate-900 dark:text-slate-300'>
            {totalCount || 0} نفر
          </span>
        </div>

        {maleCount ? (
          <div className='mt-2 flex w-full flex-row items-center justify-between'>
            <span className='flex flex-row items-center gap-x-1 text-xs text-slate-900 dark:text-slate-300'>
              <User className='h-4 w-4 text-blue-500' />
              تعداد دانشجویان آقا
            </span>
            <span className='text-xs font-medium text-slate-900 dark:text-slate-300'>
              {maleCount} نفر
            </span>
          </div>
        ) : null}

        {femaleCount ? (
          <div className='mt-2 flex w-full flex-row items-center justify-between'>
            <span className='flex flex-row items-center gap-x-1 text-xs text-slate-900 dark:text-slate-300'>
              <User className='h-4 w-4 text-blue-500' />
              تعداد دانشجویان خانم
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
