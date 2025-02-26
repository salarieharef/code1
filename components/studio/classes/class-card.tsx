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
import {
  Edit2,
  Expand,
  Eye,
  EyeOff,
  FilePlus,
  MoreVertical,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { ClassImageOverlay } from "./class-image-overlay";

export function ClassCard({
  id = null,
  isOwned = false,
  mutate = () => {},
  image,
  title,
  videosCount,
  date,
  viewCount,
  data,
  link = `/studio/class/${id}/details`,
  handleApprovalDetails,
}: any) {
  const { toast } = useToast();

  const deleteLesson = async (id: number) => {
    try {
      // const res = await postFetcher(routes.courseRoutes.delete(id));
      const res = await nextFetcher({
        url: routes.courseRoutes.delete(id),
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

  const toggleStatus = async (id: number) => {
    try {
      const res = await nextFetcher({
        url: routes.courseRoutes.toggleStatus(id),
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
    <Card className='w-full  border-0 shadow-none'>
      <CardContent className='relative flex flex-col p-0'>
        <Link href={link}>
          <ClassImageOverlay image={image} lessonsCount={videosCount} />
        </Link>
        <div className='mt-3 flex flex-row items-center justify-between '>
          <div>
            <Link href={link}>
              <h1 className='pr-3 text-right text-lg font-medium text-slate-800'>
                {title}
              </h1>
            </Link>

            {/* //! TODO  */}
            {/* <p className='tex-sm font-normal text-orange-300'>
              در انتظار تایید ادمین4
            </p> */}
          </div>

          <div>
            {isOwned && id && (
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
                  <DropdownMenuItem>
                    <Button
                      onClick={handleApprovalDetails}
                      variant={"ghost"}
                      className='flex h-fit w-full cursor-pointer flex-row justify-start gap-x-2 p-0  py-0 font-normal text-slate-700 hover:text-slate-600'
                      disabled
                    >
                      <Expand className='h-4 w-4' />
                      جزئیات
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      className='flex cursor-pointer  flex-row gap-x-2 text-slate-700 hover:text-slate-600'
                      href={`/class/${id}`}
                    >
                      <Eye className='h-4 w-4' />
                      مشاهده در کاتب
                    </Link>
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem>
                    <Link
                      className='flex cursor-pointer  flex-row gap-x-2 text-slate-700 hover:text-slate-600'
                      href={`lesson/create?classId=${id}`}
                    >
                      <FilePlus className='h-4 w-4' />
                      ایجاد جلسه جدید
                    </Link>
                  </DropdownMenuItem> */}
                  <DropdownMenuItem>
                    <Link
                      className='flex cursor-pointer  flex-row gap-x-2 text-slate-700 hover:text-slate-600'
                      href={`class/${id}/details`}
                    >
                      <Edit2 className='h-4 w-4' />
                      ویرایش درس
                    </Link>
                  </DropdownMenuItem>
                  {/* {data?.status == "public" ? (
                    <DropdownMenuItem
                      onClick={() => toggleStatus(id)}
                      className='flex cursor-pointer gap-x-2 text-destructive hover:text-destructive'
                    >
                      <EyeOff className='h-4 w-4' />
                      تغییر وضعیت به خصوصی
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      onClick={() => toggleStatus(id)}
                      className='flex cursor-pointer gap-x-2 text-success hover:text-success'
                    >
                      <Eye className='h-4 w-4' />
                      تغییر وضعیت به عمومی
                    </DropdownMenuItem>
                  )} */}
                  {/* <DropdownMenuItem
                    onClick={() => deleteLesson(id)}
                    className='flex cursor-pointer gap-x-2 text-destructive hover:text-destructive'
                  >
                    <Trash2 className='h-4 w-4' />
                    حذف درس
                  </DropdownMenuItem> */}
                  {/* <DropdownMenuSeparator /> */}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className='p-y-0 mt-1 flex flex-row justify-between px-3'>
        <Link href={`/studio/class/${id}/details`}>
          <span className='flex items-center text-sm font-medium text-slate-500'>
            {date}
          </span>
          <span className='flex items-center text-sm font-medium text-slate-500'>
            {viewCount} بازدید
          </span>
        </Link>
      </CardFooter>
    </Card>
  );
}
