import Image from "next/image";

// Component imports
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";

// Icon imports
import { Clock, Play, Users } from "lucide-react";

export function VideoCard({ image, title, date, viewCount }: any) {
  return (
    <Card className='w-full  border-0 shadow-none'>
      <CardContent className='relative flex flex-col p-0'>
        <div className='relative'>
          <div
            className='
                        absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]
                        rounded-sm bg-gradient-to-r from-blue-300 to-blue-500 p-4'
          >
            <Play className='h-8 w-8 fill-white stroke-white' />
          </div>
          {image && (
            <Image
              src={image}
              alt={title}
              className='aspect-video w-full rounded-md object-cover'
              width={250}
              height={250}
            />
          )}
        </div>
        <h1 className='mt-3 pr-3 text-right text-xl font-bold text-slate-800'>
          {title}
        </h1>
      </CardContent>
      <CardFooter className='p-y-0 mt-1 flex flex-row justify-between px-3'>
        <span className='flex items-center text-base font-medium text-slate-500'>
          {date}
        </span>
        <span className='flex items-center text-base font-medium text-slate-500'>
          {viewCount} بازدید
        </span>
      </CardFooter>
    </Card>
  );
}

export function ClassCardSkeleton() {
  return (
    <Skeleton className='h-96 w-full overflow-hidden rounded-2xl border-0 shadow-lg' />
  );
}
