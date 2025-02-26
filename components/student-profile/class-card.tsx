import Image from "next/image";

// Component imports
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";

// Icon imports
import { Clock, Users } from "lucide-react";

export function ClassCard({
  image,
  title,
  teacher,
  duration,
  studentCount,
}: any) {
  return (
    <Card className='w-fit rounded-2xl border-0 shadow-lg'>
      <CardContent className='flex flex-col items-center justify-center p-2'>
        {image && (
          <Image
            src={image}
            alt={title}
            className='rounded-md object-cover'
            width={250}
            height={250}
          />
        )}
        <h1 className='mt-1 text-center text-xl lg:mt-3 lg:text-3xl'>
          {title}
        </h1>
        <h3 className='text-center text-base lg:text-lg'>{teacher}</h3>
      </CardContent>
      <CardFooter className='flex flex-col justify-between pb-2 2xl:flex-row'>
        <span className='flex items-center gap-1 text-xs lg:text-sm'>
          <Users className='h-3 w-3 text-slate-500' />
          {studentCount}
        </span>
        <span className='flex items-center gap-1 text-xs lg:text-sm'>
          <Clock className='h-3 w-3 text-slate-500' />
          {duration}
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
