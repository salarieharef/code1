import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function CategoryCard({
  image,
  title,
  link,
  courseCount,
  section,
}: any) {
  const CardContent = (
    <>
      <div
        className={`${section === "deep_learn" ? "custom-dark-blue-gradient-center" : "bg-white"} rounded-full p-4 ring-1 ring-slate-50 ring-offset-2 ring-offset-primary`}
      >
        {image && (
          <Image
            width={100}
            height={100}
            src={image}
            alt={title}
            className='h-12 w-12 lg:h-18 lg:w-18'
          />
        )}
      </div>
      <div
        className={`mt-2 text-center text-xs font-bold text-white md:text-base lg:text-lg`}
      >
        {title}
      </div>
      {/* {section === "deep_learn" && (
        <div className={`text-xs text-white text-center`}>یادگیری عمیق</div>
      )} */}

      <div className={`text-center text-xs text-white`}>
        ({courseCount} درس)
      </div>
    </>
  );

  return courseCount === 0 ? (
    <Tooltip>
      <Tooltip>
        <TooltipTrigger
          className={`xl:basis-1/7 flex basis-1/4 flex-col items-center justify-center opacity-70 md:basis-1/5 lg:basis-1/6`}
        >
          {CardContent}
        </TooltipTrigger>
        <TooltipContent>
          در حال حاضر، در این دسته‌بندی، درسی وجود ندارد
        </TooltipContent>
      </Tooltip>
    </Tooltip>
  ) : (
    <Link
      href={link||""}
      className={`xl:basis-1/7 flex basis-1/4 flex-col items-center justify-center md:basis-1/5 lg:basis-1/6`}
    >
      {CardContent}
    </Link>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className='flex basis-1/4 flex-col items-center justify-center md:basis-1/5 lg:basis-1/6'>
      <Skeleton className='lg:h-34 lg:w-34 h-20 w-20 rounded-full' />
      <Skeleton className='mt-2 h-4 w-full md:w-1/2' />
    </div>
  );
}
