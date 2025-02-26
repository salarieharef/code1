import { Skeleton } from "@/components/ui/skeleton-loading";

export default function GroupSkeletonLoading() {
  return (
    <div className='container mx-auto p-4'>
      <div className='grid grid-cols-2 gap-px bg-slate-200 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className='flex h-full w-full flex-col items-center justify-center gap-4 rounded-none bg-white p-4'
          >
            <Skeleton className='h-7 w-7 rounded-full' />
            <Skeleton className='h-4 w-20' />
          </div>
        ))}
      </div>
    </div>
  );
}
