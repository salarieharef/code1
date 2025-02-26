"use client";
import Image from "next/image";

// Component imports
import { TabsTrigger } from "@/components/ui/tabs";

// Icon imports
import { ArrowLeft } from "lucide-react";

// Fetch imports
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";

export default function CategoryCard({ group }: any) {
  return (
    <TabsTrigger
      value={group?.id}
      className='group flex w-full items-center justify-between rounded-lg bg-white p-6 shadow-lg data-[state=active]:bg-blue-300 data-[state=active]:text-white'
    >
      <div className='flex items-center gap-x-4'>
        <Image
          width={100}
          height={100}
          alt=''
          className='h-12 w-12'
          src={group?.image}
        />
        <h2 className='text-xl font-medium'>{group?.title}</h2>
      </div>

      <ArrowLeft className='text-blue-500 group-data-[state=active]:text-inherit' />
    </TabsTrigger>
  );
}

export function CategoryCardSkeleton() {
  return (
    <>
      <Skeleton className='h-24 w-full rounded-lg bg-slate-200' />
      <Skeleton className='h-24 w-full rounded-lg bg-slate-200' />
      <Skeleton className='h-24 w-full rounded-lg bg-slate-200' />
      <Skeleton className='h-24 w-full rounded-lg bg-slate-200' />
      <Skeleton className='h-24 w-full rounded-lg bg-slate-200' />
      <Skeleton className='h-24 w-full rounded-lg bg-slate-200' />
    </>
  );
}
