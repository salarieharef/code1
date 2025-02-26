// Component imports
import { Card, CardContent, CardFooter } from "@/components/ui/card";

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
import { HeartOff, MoreVertical } from "lucide-react";
import Link from "next/link";
import { ClassImageOverlay } from "../classes/class-image-overlay";
import NoImageIcon from "@/static/icons/no-image.svg?url";

export function ClassCard({ mutate, course }: any) {
  const { toast } = useToast();

  const unlikeCourse = async (id: number) => {
    try {
      // const res = await postFetcher(routes.courseRoutes.unlike(id));
      const res = await nextFetcher({
        url: routes.courseRoutes.unlike(id),
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
            <h1 className='pr-3 text-right text-xl font-bold text-slate-800'>
              {course?.name}
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
                  onClick={() => unlikeCourse(course?.id)}
                  className='flex cursor-pointer gap-x-2 text-destructive hover:text-destructive'
                >
                  <HeartOff className='h-4 w-4' />
                  حذف درس از علاقه مندی ها
                </DropdownMenuItem>
                {/* <DropdownMenuSeparator /> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
      <CardFooter className='p-y-0 mt-1 flex flex-row justify-between px-3'>
        <Link href={`/class/${course?.id}`}>
          <span className='flex items-center text-base font-medium text-slate-500'>
            {course?.created_date}
          </span>
          {course?.stats?.viewCount ? (
            <span className='flex items-center text-base font-medium text-slate-500'>
              {course?.stats?.viewCount} بازدید
            </span>
          ) : null}
        </Link>
      </CardFooter>
    </Card>
  );
}
