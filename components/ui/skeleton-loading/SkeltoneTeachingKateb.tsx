import { BookOpen, Loader2 } from "lucide-react";
import { Skeleton } from ".";

export const FormSkeletonBasic = () => {
  return (
    <div className='mx-auto w-full max-w-7xl space-y-6 p-8'>
      {/* Profile Photo Skeleton */}
      <div className='flex justify-center'>
        <Skeleton className='h-32 w-32 rounded-full' />
      </div>

      {/* Radio Group Skeleton */}
      <div className='flex items-center justify-end gap-4'>
        <Skeleton className='h-5 w-20' />
        <Skeleton className='h-5 w-20' />
        <Skeleton className='h-5 w-32' />
      </div>

      {/* Form Fields Grid */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {/* Activity Area */}
        <div className='md:col-span-2'>
          <Skeleton className='mb-2 h-4 w-24' />
          <Skeleton className='h-10 w-full' />
        </div>

        {/* Name Fields */}
        <div className='space-y-2'>
          <Skeleton className='h-4 w-16' />
          <Skeleton className='h-10 w-full' />
        </div>

        <div className='space-y-2'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-10 w-full' />
        </div>

        {/* Contact Info */}
        <div className='space-y-2'>
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-10 w-full' />
        </div>

        <div className='space-y-2'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-10 w-full' />
        </div>

        {/* University Info */}
        <div className='space-y-2'>
          <Skeleton className='h-4 w-32' />
          <Skeleton className='h-10 w-full' />
        </div>

        <div className='space-y-2'>
          <Skeleton className='h-4 w-28' />
          <Skeleton className='h-10 w-full' />
        </div>

        {/* Education Details */}
        <div className='space-y-2'>
          <Skeleton className='h-4 w-36' />
          <Skeleton className='h-10 w-full' />
        </div>

        <div className='space-y-2'>
          <Skeleton className='h-4 w-32' />
          <Skeleton className='h-10 w-full' />
        </div>

        {/* Document Upload */}
        <div className='space-y-2 md:col-span-2'>
          <Skeleton className='h-4 w-28' />
          <Skeleton className='h-32 w-full rounded-lg' />
        </div>
      </div>

      {/* Submit Button */}
      <div className='pt-4'>
        <Skeleton className='h-12 w-full' />
      </div>
    </div>
  );
};
export const CourseFormSkeletonBasic = () => {
  return (
    <div className='mx-auto w-full max-w-7xl space-y-6 p-8' dir='rtl'>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        {/* Left Column - File Upload */}
        <div className='md:col-span-1'>
          <div className='flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed p-6'>
            <div className='mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100'>
              <Skeleton className='h-6 w-6' />
            </div>
            <Skeleton className='mb-2 h-4 w-32' />
            <Skeleton className='h-4 w-48' />
          </div>
        </div>

        {/* Middle and Right Columns - Form Fields */}
        <div className='space-y-6 md:col-span-2'>
          {/* Section & Course Title */}
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <Skeleton className='h-4 w-16' />
                <Skeleton className='h-4 w-4 rounded-full' />
              </div>
              <Skeleton className='h-10 w-full rounded-md bg-slate-100' />
            </div>
            <div className='space-y-2'>
              <div className='flex items-center gap-1'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-3 w-3' />
              </div>
              <Skeleton className='h-10 w-full rounded-md bg-slate-100' />
            </div>
          </div>

          {/* Prerequisites */}
          <div className='space-y-2'>
            <Skeleton className='h-4 w-32' />
            <div className='flex gap-2'>
              <Skeleton className='h-10 flex-1 rounded-md bg-slate-100' />
              <Skeleton className='h-10 w-24 rounded-md bg-slate-100' />
            </div>
          </div>

          {/* Duration & Weeks */}
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='space-y-2'>
              <div className='flex items-center gap-1'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-3 w-3' />
              </div>
              <div className='flex gap-2'>
                <Skeleton className='h-10 w-20 rounded-md bg-slate-100' />
                <Skeleton className='h-10 w-20 rounded-md bg-slate-100' />
              </div>
            </div>
            <div className='space-y-2'>
              <div className='flex items-center gap-1'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-3 w-3' />
              </div>
              <Skeleton className='h-10 w-full rounded-md bg-slate-100' />
            </div>
          </div>

          {/* Academic Groups & Branch */}
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='space-y-2'>
              <div className='flex items-center gap-1'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-3 w-3' />
              </div>
              <Skeleton className='h-10 w-full rounded-md bg-slate-100' />
            </div>
            <div className='space-y-2'>
              <div className='flex items-center gap-1'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-3 w-3' />
              </div>
              <Skeleton className='h-10 w-full rounded-md bg-slate-100' />
            </div>
          </div>

          {/* Radio Group */}
          <div className='flex items-center justify-end gap-4'>
            <Skeleton className='h-4 w-32' />
            <div className='flex gap-4'>
              <Skeleton className='h-4 w-12' />
              <Skeleton className='h-4 w-12' />
            </div>
          </div>

          {/* Academic Fields */}
          <div className='space-y-2'>
            <div className='flex items-center gap-1'>
              <Skeleton className='h-4 w-32' />
              <Skeleton className='h-3 w-3' />
            </div>
            <Skeleton className='h-10 w-full rounded-md bg-slate-100' />
          </div>
        </div>
      </div>

      {/* Credits Section */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-32' />
          <Skeleton className='h-10 w-full rounded-md bg-slate-100' />
        </div>
        <div className='space-y-2'>
          <div className='flex items-center gap-1'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-3 w-3' />
          </div>
          <Skeleton className='h-10 w-full rounded-md bg-slate-100' />
        </div>
        <div className='space-y-2'>
          <div className='flex items-center gap-1'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-3 w-3' />
          </div>
          <Skeleton className='h-10 w-full rounded-md bg-slate-100' />
        </div>
      </div>

      {/* Course Description */}
      <div className='space-y-2'>
        <div className='flex items-center gap-1'>
          <Skeleton className='h-4 w-64' />
          <Skeleton className='h-3 w-3' />
        </div>
        <Skeleton className='h-32 w-full rounded-md bg-slate-100' />
      </div>
    </div>
  );
};

export const HeadlineSkeletonBasic = () => {
  return (
    <div dir='rtl' className='w-full max-w-7xl space-y-8 p-8'>
      {/* Duration Inputs */}
      <div className='flex flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
        <div className='flex-1'>
          <div className='mb-2 flex items-center gap-1'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-3 w-3' />
          </div>
          <div className='flex gap-4'>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-16' />
              <Skeleton className='h-10 w-24 rounded-md bg-slate-100' />
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-16' />
              <Skeleton className='h-10 w-24 rounded-md bg-slate-100' />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className='rounded-md border'>
        {/* Table Header */}
        <div className='grid grid-cols-12 gap-4 border-b bg-slate-50 p-4'>
          <div className='col-span-1'>
            <Skeleton className='h-4 w-8' />
          </div>
          <div className='col-span-3'>
            <Skeleton className='h-4 w-16' />
          </div>
          <div className='col-span-8'>
            <Skeleton className='h-4 w-32' />
          </div>
        </div>

        {/* Table Rows */}
        {[1, 2, 3, 4].map((week) => (
          <div
            key={week}
            className='grid grid-cols-12 gap-4 border-b p-4 last:border-0'
          >
            <div className='col-span-1'>
              <Skeleton className='h-4 w-6' />
            </div>
            <div className='col-span-3'>
              <Skeleton className='h-4 w-24' />
            </div>
            <div className='col-span-8'>
              <Skeleton className='h-10 w-full rounded-md bg-slate-100' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export const SkeletonSampleVideo = () => {
  return (
    <div className='mx-auto w-full max-w-7xl p-8'>
      <div
        dir='rtl'
        className='flex min-h-[400px] flex-col items-center justify-center space-y-6 p-6'
      >
        <div className='mx-auto w-full space-y-4 p-4 text-center'>
          <Skeleton className='mx-auto aspect-video w-5/6 bg-slate-100' />
          <Skeleton className='h-4 w-full bg-slate-100' />
          <Skeleton className='h-4 w-full bg-slate-100' />
        </div>
      </div>
    </div>
  );
};

export const PaymentPlansSkeleton = () => {
  return (
    <div className='mx-auto w-full max-w-7xl p-8'>
      <div
        dir='rtl'
        className='flex min-h-[400px] flex-col items-center justify-center space-y-6 p-6'
      >
        {[...Array(3)].map((_, index) => (
          <div key={index} className='w-full space-y-2 p-4'>
            <Skeleton className='h-6 w-48 bg-slate-100' />
            <Skeleton className='h-4 w-full bg-slate-100' />
            <Skeleton className='h-4 w-5/6 bg-slate-100' />
            <Skeleton className='h-4 w-24 bg-slate-100' />
          </div>
        ))}
      </div>
    </div>
  );
};

export const UploadLessonsSkeleton = () => {
  return (
    <div className='w-full' dir='rtl'>
      <div className='rounded-lg bg-white'>
        {/* Header Skeleton */}
        <div className='grid grid-cols-[1fr,200px,120px,80px,40px] gap-4 border-b p-4'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-4 w-32' />
          <Skeleton className='h-4 w-16' />
          <Skeleton className='h-4 w-12' />
          <div></div>
        </div>

        {/* Skeleton Rows */}
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className='grid grid-cols-[1fr,200px,120px,80px,40px] items-center gap-4 border-b p-4'
          >
            <div className='flex items-center gap-3'>
              <Skeleton className='h-16 w-24 rounded-lg' />
              <Skeleton className='h-4 w-48' />
            </div>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-8 w-24 rounded-full' />
            <Skeleton className='h-4 w-8' />
            <Skeleton className='h-8 w-8 rounded-full' />
          </div>
        ))}
      </div>
    </div>
  );
};

export const SkeletonDataTeachingInKateb = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='w-full max-w-md space-y-6 rounded-xl p-8 text-center'>
        <div className='relative'>
          <BookOpen className='mx-auto h-16 w-16 text-primary' />
        </div>
        <h2 className='text-xl font-bold text-primary'>در حال بارگذاری</h2>
        <p className='text-muted-foreground'>
          شکیبا باشید، در حال بارگذاری اطلاعات شما هستیم
        </p>
        <div className='flex justify-center space-x-2 rtl:space-x-reverse'>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className='h-3 w-3 animate-bounce rounded-full bg-muted-foreground'
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
