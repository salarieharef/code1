"use client";

// Icon imports
import { CircleOff, Edit2 } from "lucide-react";

// Component  import
import { Separator } from "@/components/ui/separator";

// Fetch imports
import routes from "@/utils/api/routes";
import useSWR from "swr";

import { nextFetcher } from "@/utils/api/next-fetcher";
import CourseForm from "./course.form";
import { submitCreatecourse } from "./course.utilty";

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
    <div className='min-h[100rem] mb-10 w-full rounded-[7px] bg-white p-4 shadow-xl sm:mt-10 sm:px-12 sm:py-8'>
      <h1 className='flex flex-row gap-x-2 text-xl font-medium leading-10 text-blue-900 sm:text-3xl'>
        <Edit2 className='text-blue-400 sm:h-10 sm:w-10' />
        درخواست تدریس جدید
      </h1>

      <Separator orientation='horizontal' className='my-4' />

      {userInfo?.data?.university || userInfo?.data?.university?.name ? (
        <CourseForm handleSubmit={submitCreatecourse} />
      ) : (
        <div className='flex flex-col items-center justify-center'>
          <CircleOff className='h-28 w-28 stroke-[.5]' />
          <span>
            لطفا برای درخواست تدریس جدید واحد دانشگاهی خود را در تنظیمات انتخاب
            کنید.
          </span>
        </div>
      )}
    </div>
  );
}
