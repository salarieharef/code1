"use client";

import { Separator } from "../ui/separator";

const SkeletonPaymentInfo = () => {
  return (
    <div className='basis-3/12 animate-pulse'>
      <div className='flex w-full flex-col space-y-5 rounded-lg p-4 ring-1 ring-slate-300'>
        <div className='h-6 w-1/3 rounded bg-slate-200'></div>
        <div className='flex flex-col space-y-3 pt-2 md:pt-0'>
          <div className='h-4 w-full rounded bg-slate-200'></div>
          <div className='h-4 w-full rounded bg-slate-200'></div>
        </div>
        <Separator
          orientation='horizontal'
          className='my-3 block h-px bg-slate-300'
        />
        <div className='flex flex-col space-y-3'>
          <div className='h-4 w-full rounded bg-slate-200'></div>
        </div>
        <div className='h-6 w-3/4 rounded bg-slate-200'></div>
      </div>

      <div className='mt-5 flex w-full flex-col space-y-5 rounded-lg p-4 ring-1 ring-slate-300'>
        <div className='h-4 w-1/2 rounded bg-slate-200'></div>
        <div className='relative mt-2 flex gap-2'>
          <div className='h-10 w-full rounded bg-slate-200'></div>
          <div className='h-10 w-20 rounded bg-slate-200'></div>
        </div>
      </div>

      <div className='relative mt-5 hidden w-full md:flex'>
        <div className='h-10 w-full rounded bg-slate-200'></div>
      </div>

      <div className='fixed bottom-16 right-0 z-10 flex h-32 w-full items-start justify-between space-y-3 border-t-2 bg-slate-100 px-3 pt-2 md:hidden md:pt-0'>
        <div className='h-6 w-1/3 rounded bg-slate-200'></div>
        <div className='h-10 w-1/2 rounded bg-slate-200'></div>
      </div>
    </div>
  );
};

export default SkeletonPaymentInfo;
