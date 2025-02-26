import { times } from "lodash-es";
import { ClassImageOverlaySkeleton } from "@/components/studio/classes/class-image-overlay";
import { Skeleton } from "./skeleton";

export const CarouselItemSkeleton = () => (
  <Skeleton className='aspect-[16/8] bg-slate-300' />
);

export const CarouselItemClassSkeleton = ({ count = 1 }: any) => {
  return (
    <div className='mt-6 grid w-full grid-cols-3-auto justify-between gap-4'>
      {times(count, (index) => (
        <Skeleton
          key={index}
          className='aspect-square h-72 w-full bg-slate-300'
        />
      ))}
    </div>
  );
};

export const UniversityDetailSkeleton = ({ count = 1 }: any) => (
  <>
    {times(count, (index) => (
      <div
        key={index}
        className='flex basis-1/6 flex-col items-center justify-center sm:basis-1/12 lg:basis-1/6'
      >
        <Skeleton className='h-10 w-10 rounded-full' />
        <Skeleton className='mt-2 h-4 w-full md:w-1/2' />
      </div>
    ))}
  </>
);

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
    {times(count, (index:any) => (
      <div className='flex flex-col justify-start' key={index}>
        <ClassImageOverlaySkeleton />
        <Skeleton className='mt-4 h-6 w-full overflow-hidden rounded-[7px] border-0 shadow-sm' />
        <Skeleton className='mt-2 h-4 w-full overflow-hidden rounded-[7px] border-0 shadow-sm' />
      </div>
    ))}
  </>
);

// export const ClassCardSkeleton = ({ className = "", count }: any) => (
//   <>
//     {times(count, (index) => (

//     ))}
//   </>
// );


export function TeacherCardSkeleton({ className }: any) {
  return (
    <Skeleton
      className={`w-full overflow-hidden rounded-2xl border-0 ${className}`}
    />
  );
}
