import Image from "next/image";

// Component imports
import { Card, CardContent, CardFooter } from "@/components/ui/card";

// Icon imports
import { Clock, Eye, Heart, PlayCircle, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";
import { convertDecimalSecondsToHMS } from "@/utils/time-formatter";
import NoImageIcon from "@/static/icons/no-image.svg?url";

export function ClassCard({ className, data }: any) {
  return (
    <Card className={`w-full rounded-2xl border-0 shadow-none ${className}`}>
      <Link href={`/class/${data?.id}`} title={data?.name}>
        <CardContent className='flex flex-col items-center justify-center p-2'>
          <Image
            src={data?.image || NoImageIcon}
            alt={data?.name}
            className='aspect-[5/4] w-full rounded-2xl object-cover md:aspect-square'
            width={500}
            height={500}
          />
          <h1 className='mt-1 w-full overflow-hidden text-right text-lg font-bold text-blue-400 sm:truncate sm:whitespace-nowrap lg:mt-3 lg:text-xl'>
            {data?.name}
          </h1>
          {/* {section !== "field_introducer" && teacher ? ( */}
          <h3 className='mt-1 w-full overflow-hidden text-right text-base font-medium text-slate-700 dark:text-slate-200 sm:truncate sm:whitespace-nowrap lg:text-lg'>
            مدرس:{data?.teacher?.name}
          </h3>
          {/* ) : null} */}

          {/* {section == "field_introducer" && introducers ? (
						<h3 className="mt-1 w-full overflow-hidden text-right text-sm font-medium text-slate-700 dark:text-slate-200 sm:truncate sm:whitespace-nowrap">
							معرفی کنندگان: {introducers}
						</h3>
					) : null} */}

          <div className='mt-2 hidden w-full flex-row flex-wrap justify-between px-2 py-0 md:flex'>
            {/* <span className="flex items-center gap-1 text-xs lg:text-sm overflow-hidden truncate whitespace-nowrap text-slate-500">
              <Users className=" h-3 w-3 min-h-[0.75rem] min-w-[0.75rem] text-slate-500" />
              {studentCount} کاربر
            </span> */}
            <span className='flex items-center gap-1 text-xs text-slate-500 lg:text-sm'>
              <PlayCircle className='h-3 w-3 text-slate-500' />
              {data?.lesson_details?.lessons_count} جلسه
            </span>
            <span className='flex items-center gap-1 overflow-hidden whitespace-nowrap text-xs text-slate-500 sm:truncate lg:text-sm'>
              <Clock className='h-3 min-h-[0.75rem] w-3 min-w-[0.75rem] text-slate-500' />
              {convertDecimalSecondsToHMS(
                data?.lesson_details?.lessons_seconds
              ) || "-"}
            </span>
          </div>
          <div className='mt-2 flex w-full flex-row justify-between px-2 py-0'>
            {data?.stats?.likes_count !== undefined ? (
              <div className='flex flex-row justify-between'>
                <span className='flex items-center gap-1 text-xs text-slate-500 dark:text-slate-300 lg:text-sm'>
                  <Heart className='h-3 w-3 text-current' />
                  {data?.stats?.likes_count || 0} پسندیدن
                </span>
              </div>
            ) : null}
            {data?.stats?.views_count !== undefined ? (
              <div className='flex flex-row justify-between'>
                <span className='flex items-center gap-1 text-xs text-slate-500 dark:text-slate-300 lg:text-sm'>
                  <Eye className='h-3 w-3 text-current' />
                  {data?.stats?.views_count || 0} بازدید
                </span>
              </div>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className='flex flex-col p-0'>
          <Separator className='md:hidden' />
          <div className='flex w-full flex-row justify-between px-2 py-0 md:hidden'>
            <div className='flex flex-row flex-wrap gap-x-2 py-1'>
              {/* <span className="flex items-center gap-1 text-xs lg:text-sm text-slate-500 overflow-hidden truncate whitespace-nowrap">
                <Users className="h-3 w-3 text-slate-500" />
                {studentCount} کاربر
              </span> */}
              <span className='flex items-center gap-1 text-xs text-slate-500 lg:text-sm'>
                <PlayCircle className='h-3 w-3 text-slate-500' />
                {data?.lesson_details?.lessons_count} جلسه
              </span>
              <span className='flex items-center gap-1 overflow-hidden truncate whitespace-nowrap text-xs text-slate-500 lg:text-sm'>
                <Clock className='h-3 w-3 text-slate-500' />
                {convertDecimalSecondsToHMS(
                  data.lesson_details?.lessons_seconds
                ) || "-"}
              </span>
            </div>
            <Button
              variant='link'
              className='m-0 p-0 text-center text-xs font-bold text-sky-500'
            >
              مشاهده
            </Button>
          </div>
          <Button className='hidden h-10 w-full items-center justify-center rounded-b-2xl rounded-t-none bg-blue-400 p-0 text-center text-xl font-extrabold text-white md:flex'>
            مشاهده
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
