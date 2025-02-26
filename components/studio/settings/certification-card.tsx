"use client";
// Component imports
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";

// Icon imports
import { DeleteAlert } from "@/components/global/DeleteAlert";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { Trash2 } from "lucide-react";
import Image from "next/image";

export function CertificationCard({ mutate = () => {}, data }: any) {
  const { toast } = useToast();

  const deleteCertification = async (id: number) => {
    try {
      // const res = await postFetcher(routes.userRoutes.removeCertificate(id));
      const res = await nextFetcher({
        url: routes.userRoutes.removeCertificate(id),
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
    <Card className='overflow-hidden rounded-lg border-0 shadow-md'>
      <CardContent className='py-4 text-center'>
        <div className='overflow-hidden rounded-lg'>
          {data?.image && (
            <Image
              src={data?.image}
              alt={data?.title}
              className='h-full w-full'
              width={500}
              height={500}
            />
          )}
        </div>
        <div className='mt-3 flex flex-col items-center justify-between '>
          <h3>گواهینامه</h3>
          <h2 className='text-xl font-medium'>«{data?.title}»</h2>
          {/* <div>
            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="text-muted-foreground">
                  عملیات ها
                </DropdownMenuLabel>
                <DropdownMenuItem>
                  <Link
                    className="flex flex-row  gap-x-2 text-slate-700 hover:text-slate-600 cursor-pointer"
                    href={`lesson/${data?.id}/details`}
                  >
                    <Edit2 className="w-4 h-4" />
                    ویرایش درس
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => deleteLesson(data?.id)}
                  className="text-destructive hover:text-destructive cursor-pointer flex gap-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  حذف درس
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div> */}
        </div>
      </CardContent>

      <CardFooter className='relative flex items-center justify-center pb-2 text-center'>
        {data?.file ? (
          <a
            href={data?.file}
            className='text-blue-500 hover:underline'
            target='_blank'
          >
            دریافت فایل PDF
          </a>
        ) : null}

        <DeleteAlert
          title={`حذف گواهینامه`}
          message={`آیا مطمئن هستید قصد حذف گواهینامه با عنوان ${data?.title} را دارید؟`}
          onAccept={() => deleteCertification(data?.id)}
        >
          <Button
            variant='ghost'
            size='icon'
            className='absolute bottom-0 left-0 mx-2 mb-1'
          >
            <Trash2 className='h-6 w-6' />
          </Button>
        </DeleteAlert>
      </CardFooter>
    </Card>
  );
}

export function CertificationCardSkeleton() {
  return (
    <Card className='overflow-hidden rounded-lg border-0 shadow-md'>
      <CardContent className='py-4 text-center'>
        <Skeleton className='aspect-video w-full overflow-hidden rounded-md shadow-sm' />
        <Skeleton className='mx-auto mt-4 h-4 w-1/2 overflow-hidden rounded-md shadow-sm' />
        <Skeleton className='mt-4 h-6 w-full overflow-hidden rounded-[7px] border-0 shadow-sm' />
      </CardContent>
      <CardFooter className='flex items-center justify-center text-center'>
        <Skeleton className='h-6 w-1/2 overflow-hidden rounded-[7px] border-0 shadow-sm' />
      </CardFooter>
    </Card>
  );
}
