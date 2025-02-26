// Component imports
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";
import {
  ClassImageOverlay,
  ClassImageOverlaySkeleton,
} from "../classes/class-image-overlay";

// Icon imports
import NoImageIcon from "@/static/icons/no-image.svg?url";

import Link from "next/link";

export function ClassCard({ course }: any) {
  return (
    <Card className='w-full border-0 shadow-none'>
      <CardContent className='relative flex flex-col p-0'>
        <Link href={`/class/${course?.id}`}>
          <ClassImageOverlay
            image={course?.image || NoImageIcon}
            lessonsCount={course?.lesson_details?.lessons_count}
          />
        </Link>
        <div className='mt-3 flex flex-row items-center justify-between'>
          <Link href={`/class/${course?.id}`}>
            <h1 className='pr-3 text-right text-lg font-medium text-slate-800'>
              {course?.name}
            </h1>
          </Link>
        </div>
      </CardContent>
      <CardFooter className='p-y-0 mt-1 flex flex-row justify-between px-3'>
        <Link href={`/class/${course?.id}`}>
          <span className='flex items-center text-sm text-slate-500'>
            {course?.created_date}
          </span>
          {course?.stats?.viewCount ? (
            <span className='flex items-center text-sm text-slate-500'>
              {course?.stats?.viewCount} بازدید
            </span>
          ) : null}
        </Link>
      </CardFooter>
    </Card>
  );
}
