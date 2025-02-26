import { ClassImageOverlaySkeleton } from "@/components/studio/classes/class-image-overlay";
import { times } from "lodash-es";
import { Skeleton } from ".";

export const ClassCardSkeleton = ({ className = "", count }: any) => (
  <>
    {times(count, (index) => (
      <Skeleton
        key={index}
        className={`h-full w-full overflow-hidden rounded-2xl border-0 bg-slate-300 ${className}`}
      />
    ))}
  </>
);

export const ClassCardSkeletonByOverlay = ({ count = 1 }: any) => (
  <>
    {times(count, (index) => (
      <div className='flex flex-col justify-start'>
        <ClassImageOverlaySkeleton />
        <Skeleton className='mt-4 h-6 w-full overflow-hidden rounded-[7px] border-0 shadow-sm' />
        <Skeleton className='mt-2 h-4 w-full overflow-hidden rounded-[7px] border-0 shadow-sm' />
      </div>
    ))}
  </>
);


