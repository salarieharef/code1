"use client";
// Component imports
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";

// Icon imports
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { HeartOff, MoreVertical, Play } from "lucide-react";
import Image from "next/image";
import NoImageIcon from "@/static/icons/no-image.svg?url";

import Link from "next/link";

export function LessonCard({ mutate, lesson }: any) {
  const { toast } = useToast();

  const unLike = async (id: number) => {
    try {
      const res = await nextFetcher({
        url: routes.lessonRoutes.unlike(id),
        method: "POST",
        useToken: true,
      });
      if (res.success) {
        toast({
          variant: "success",
          title: res.msg,
        });
        mutate();
      } else if (res.error) {
        throw Error(res.error);
      }
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: e.message,
      });
    }
  };

  return (
    <Card className='w-full overflow-hidden border-0 shadow-none'>
      <CardContent className='relative flex flex-col p-0'>
        <Link href={`/class/${lesson?.course}?lesson=${lesson?.id}`}>
          <div className='relative overflow-hidden rounded-md'>
            <Image
              src={lesson?.image || NoImageIcon}
              alt='Class Image'
              className='aspect-video w-full object-cover'
              width={250}
              height={250}
            />

            <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center bg-slate-900/20'>
              <div className='rounded bg-gradient-to-r from-blue-400 to-blue-500 p-2 text-white'>
                <Play className='h-8 w-8 fill-current' />
              </div>
            </div>
          </div>
        </Link>
        <div className='mt-3 flex flex-row items-center justify-between'>
          <Link href={`/class/${lesson?.course}?lesson=${lesson?.id}`}>
            <h1 className='pr-3 text-right text-xl font-medium text-slate-800'>
              {lesson?.name}
            </h1>
          </Link>
          <div>
            <DropdownMenu dir='rtl'>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-8 w-8 p-0'>
                  <span className='sr-only'>Open menu</span>
                  <MoreVertical className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel className='text-muted-foreground'>
                  عملیات ها
                </DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => unLike(lesson?.id)}
                  className='flex cursor-pointer gap-x-2 text-destructive hover:text-destructive'
                >
                  <HeartOff className='h-4 w-4' />
                  حذف درس از علاقه مندی ها
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
      <CardFooter className='p-y-0 mt-1 flex flex-row justify-between px-3'>
        <Link href={`/studio/class/${lesson?.id}/details`}>
          <span className='flex items-center text-sm text-muted-foreground'>
            {lesson?.created_date}
          </span>
          {lesson?.viewCount ? (
            <span className='flex items-center text-sm text-muted-foreground'>
              {lesson?.viewCount} بازدید
            </span>
          ) : null}
        </Link>
      </CardFooter>
    </Card>
  );
}

export function LessonCardSkeleton() {
  return (
    <div className='flex flex-col justify-start'>
      <Skeleton className='aspect-video w-full overflow-hidden rounded-md shadow-sm' />
      <Skeleton className='mt-4 h-6 w-full overflow-hidden rounded-[7px] border-0 shadow-sm' />
      <Skeleton className='mt-2 h-4 w-full overflow-hidden rounded-[7px] border-0 shadow-sm' />
    </div>
  );
}
