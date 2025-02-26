"use client";

// Component imports
import "swiper/css";
import "swiper/css/navigation";
import { UniversityDetailCard } from "./detail-card/UniversityDetailCard";

import { UniversityDetailSkeleton } from "@/components/ui/skeleton-loading/skeletons";
import PhdIcon from "@/static/icons/category/phd.svg?url";

// Fetch imports

export default function UniversitySchools({ section, type }: any) {
  return (
    <>
      <span className='my-2 px-4 text-sm font-medium text-blue-900'>مدرسه</span>
      <div className='flex w-full flex-wrap items-start justify-center gap-x-1 gap-y-2'>
        {/* isLoading */}
        {false ? (
          <>
            <UniversityDetailSkeleton count={8} />
          </>
        ) : (
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((category: any, i: number) => (
            <UniversityDetailCard
              courseCount={category?.course_count}
              image={category?.image || PhdIcon}
              link={``}
              key={`${i}`}
            />
          ))
        )}
      </div>
    </>
  );
}
