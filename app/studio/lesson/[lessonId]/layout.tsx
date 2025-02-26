"use client";

import LessonSidebar from "@/components/studio/LessonSidebar";
import { SidebarSheet } from "@/components/studio/SidebarSheet";
import CreateDropdown from "@/components/studio/create-dropdown";

// Fetch imports
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import useSWR from "swr";

export default function StudioLessonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data: userInfo,
    isLoading: userInfoLoading,
    error: userInfoError,
  } = useSWR(
    routes.userRoutes.me,
    (url) =>
      nextFetcher({
        url: url,
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <main className='relative'>
      <div className='flex h-28 justify-between bg-blue-800 p-4 md:h-80'>
        <div className='flex w-full justify-between sm:hidden'>
          <SidebarSheet>
            <LessonSidebar />
          </SidebarSheet>

          {userInfo?.data?.type == "teacher" ? (
            <CreateDropdown />
          ) : (
            <div className='my-3'></div>
          )}
        </div>
      </div>

      <div className='relative -mt-8 grid grid-cols-8 justify-evenly gap-x-8 px-4 sm:-mt-80 sm:px-14'>
        <div className='col-span-2 hidden sm:block'>
          <LessonSidebar />
        </div>

        <main className='col-span-full flex flex-1 sm:col-span-6'>
          {children}
        </main>
      </div>
    </main>
  );
}
