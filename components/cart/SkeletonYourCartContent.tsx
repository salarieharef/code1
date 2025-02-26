"use client";

import React from "react";

const SkeletonYourCartContent = () => {
  return (
    <div className='mt-4 flex w-full animate-pulse flex-col space-y-6 rounded-lg p-4 ring-1 ring-slate-300'>
      <div className='flex flex-col items-start justify-between md:flex-row md:items-center'>
        <div className='flex w-full justify-start gap-2 md:w-1/2'>
          <div className='h-24 w-32 rounded bg-slate-200'></div>
          <div className='flex w-full flex-col justify-center space-y-2'>
            <div className='h-4 w-3/4 rounded bg-slate-200'></div>
            <div className='h-4 w-1/2 rounded bg-slate-200'></div>
            <div className='mt-2 h-3 w-1/3 rounded bg-slate-200'></div>
          </div>
        </div>
        <div className='flex w-full items-baseline justify-between gap-1 pt-3 md:w-1/2 md:items-start md:pt-0'>
          <div className='h-4 w-1/3 rounded bg-slate-200'></div>
          <div className='flex flex-col items-center'>
            <div className='flex w-32 items-center rounded-lg'>
              <div className='h-6 w-full rounded bg-slate-200'></div>
            </div>
            <div className='mt-2 h-4 w-1/2 rounded bg-slate-200'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonYourCartContent;
