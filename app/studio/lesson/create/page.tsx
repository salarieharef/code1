"use client";

// Component imports
import CreateLesson from "@/components/studio/lesson/CreateLesson";
import { Separator } from "@/components/ui/separator";

// Icon imports
import { CircleOff, Edit2 } from "lucide-react";

// Fetch imports
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import useSWR from "swr";

export default function StudioClassCreate() {
  const {
    data: userInfo,
    isLoading: userInfoLoading,
    error: userInfoError,
  } = useSWR(
    routes.userRoutes.me,
    (url) =>
      nextFetcher({
        url: url,
        method: "GET",
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );
  return (
    <div className='mb-10 w-full rounded-md bg-white p-4 shadow-xl sm:mt-10 sm:px-12 sm:py-8'>
      <h1 className='flex gap-x-2 text-xl font-medium text-blue-900 sm:text-3xl'>
        <Edit2 className='text-blue-400 sm:h-10 sm:w-10' />
        ایجاد جلسه جدید
      </h1>

      <Separator orientation='horizontal' className='my-4' />

      {userInfo?.data?.university || userInfo?.data?.university?.name ? (
        <CreateLesson />
      ) : (
        <div className='flex flex-col items-center justify-center'>
          <CircleOff className='h-28 w-28 stroke-[.5]' />
          <span>
            لطفا برای ایجاد جلسه جدید واحد دانشگاهی خود در تنظیمات انتخاب کنید.
          </span>
        </div>
      )}
    </div>
  );
}
