import Image from "next/image";
import Link from "next/link";

// Component imports
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Eye, Heart, PlayCircle, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";

export function RecommendedClassCard({ classDetails }: any) {
  return (
    <Link href={`/class/${classDetails?.id}`}>
      <Card className='rounded-2xl border-0 shadow'>
        <CardContent className='flex gap-2 p-2'>
          {classDetails?.image ? (
            <Image
              src={classDetails?.image}
              alt={classDetails?.name}
              className='aspect-square h-32 w-32 rounded-xl object-cover'
              width={250}
              height={250}
            />
          ) : null}

          <div className='my-2 flex flex-col justify-between'>
            <div>
              <h1 className='text-xl text-blue-500 lg:text-2xl'>
                {classDetails?.name}
              </h1>
              {classDetails?.section == "field_introducer" ? (
                <>
                  {classDetails?.introducers ? (
                    <h3 className='text-sm lg:whitespace-normal lg:text-lg'>
                      <span>معرفی کنندگان: </span>
                      {classDetails?.introducers}
                    </h3>
                  ) : null}
                </>
              ) : (
                <h3 className='truncate whitespace-normal text-sm'>
                  <span>مدرس: </span>
                  {classDetails?.teacher?.name}
                </h3>
              )}
            </div>

            <div className='flex flex-col gap-1'>
              <div className='flex w-full flex-row gap-x-2'>
                {classDetails?.stats?.likes_count !== undefined ? (
                  <span className='flex items-center gap-1 text-xs text-slate-500 dark:text-slate-300 lg:text-sm'>
                    <Heart className='h-3 w-3 text-current' />
                    {classDetails?.stats?.likes_count || 0} پسندیدن
                  </span>
                ) : null}
                {classDetails?.stats?.views_count !== undefined ? (
                  <span className='flex items-center gap-1 text-xs text-slate-500 dark:text-slate-300 lg:text-sm'>
                    <Eye className='h-3 w-3 text-current' />
                    {classDetails?.stats?.views_count || 0} بازدید
                  </span>
                ) : null}
              </div>

              <div className='flex w-max flex-row gap-x-2'>
                {classDetails?.lesson_details?.lessons_count ? (
                  <span className='flex items-center gap-1 text-xs text-slate-500'>
                    <PlayCircle className='h-3 w-3 text-slate-500' />
                    {classDetails?.lesson_details?.lessons_count} جلسه
                  </span>
                ) : null}
                {classDetails?.lesson_details?.lessons_time ? (
                  <span className='flex items-center gap-1 overflow-hidden truncate whitespace-nowrap text-xs text-slate-500'>
                    <Clock className='h-3 w-3 text-slate-500' />
                    {classDetails?.lesson_details?.lessons_time}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function ClassCardSkeleton() {
  return (
    <Skeleton className='h-28 w-full overflow-hidden rounded-2xl border-0 shadow-lg' />
  );
}
