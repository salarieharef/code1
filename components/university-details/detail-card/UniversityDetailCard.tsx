import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import Link from "next/link";

export function UniversityDetailCard({ image, link, courseCount }: any) {
  const CardContent = (
    <>
      <div
        className={`rounded-full bg-blue-800 p-2 ring-1 ring-slate-50 ring-offset-2 ring-offset-primary`}
      >
        {image && (
          <Image
            width={100}
            height={100}
            src={image}
            alt={image}
            className='h-8 w-8 sm:h-10 sm:w-10 lg:h-6 lg:w-6'
          />
        )}
      </div>
    </>
  );

  return courseCount === 0 ? (
    <Tooltip>
      <Tooltip>
        <TooltipTrigger
          className={`flex basis-1/6 flex-col items-center justify-center opacity-70 sm:basis-1/12  lg:basis-1/6`}
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
      className={`flex basis-1/6 flex-col items-center justify-center sm:basis-1/12 lg:basis-1/6 `}
    >
      {CardContent}
    </Link>
  );
}


