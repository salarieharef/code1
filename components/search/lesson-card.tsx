import Image from "next/image";

// Component imports
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";

// Icon imports
import { Bookmark, Clock, PlayCircle, Users } from "lucide-react";
import NoImageIcon from "@/static/icons/no-image.svg?url";

import { convertDecimalSecondsToHMS } from "@/utils/time-formatter";

export function LessonCard({ data }: any) {
  return (
    <Card className='h-full w-full overflow-hidden rounded-xl border-0 pb-0 shadow-lg'>
      <CardContent className='flex flex-col px-4 py-2'>
        <Image
          src={data?.image || NoImageIcon}
          alt={data?.title}
          className='aspect-square w-full rounded-lg object-cover'
          width={250}
          height={250}
        />
        {data?.course?.name ? (
          <span className='mt-1 text-slate-700 sm:truncate'>
            درس: {data?.course?.name}
          </span>
        ) : null}
        <h1 className='mt-1 w-full max-w-72 overflow-hidden truncate whitespace-nowrap text-right text-lg font-medium text-blue-400 md:max-w-full lg:text-xl'>
          {data?.title ? `${data?.title} - ` : null} {data?.name}
        </h1>
        <h3 className='mt-1 w-full overflow-hidden truncate whitespace-nowrap text-right text-base text-slate-700 lg:text-lg'>
          مدرس: {data?.teacher?.name}
        </h3>
      </CardContent>
      <CardFooter className='flex flex-col px-0 pb-0'>
        <div className='flex w-full flex-row flex-wrap justify-between px-4 pb-2'>
          <span className='flex items-center gap-1 text-xs lg:text-sm'>
            <Clock className='h-3 w-3 text-slate-500' />
            {convertDecimalSecondsToHMS(data?.lessons_seconds) || "-"}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}

export function LessonCardSkeleton() {
  return (
    <Card className='m-4 w-full rounded-xl border-0 shadow-lg'>
      <CardContent className='flex flex-col px-4 py-2'>
        <Skeleton className='aspect-square w-full rounded-lg' />
        <Skeleton className='mt-4 h-6 w-full' />
        <Skeleton className='mt-4 h-4 w-full' />
      </CardContent>
      <CardFooter className='flex gap-2'>
        <Skeleton className='mt-4 h-4 w-1/2' />
        <Skeleton className='mt-4 h-4 w-1/2' />
      </CardFooter>
    </Card>
  );
}
