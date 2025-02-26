"use client";

// Component imports
import "swiper/css";
import "swiper/css/navigation";
import { UniversityDetailCard } from "../detail-card/UniversityDetailCard";
import { UniversityDetailSkeleton } from "@/components/ui/skeleton-loading/skeletons";
import PhdIcon from "@/static/icons/category/phd.svg?url";

// Fetch imports

export default function UniversityDepartments({ categories, isLoading }: any) {
  return (
    <>
      <span className='my-2 px-4 text-sm font-medium text-blue-900'>
        دانشکدگان واحد
      </span>
      <div className='flex w-full flex-wrap items-start justify-center gap-x-1 gap-y-2'>
        {/* isLoading */}
        {/* this section is not going to  be shown anyway, we have a conditional rendering from the parent  */}
        {isLoading ? (
          <>
            <UniversityDetailSkeleton count={8} />
          </>
        ) : (
          categories?.map((category: any, i: number) => (
            <UniversityDetailCard
              courseCount={category?.course_count || 0}
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
