"use client";

// Component imports
import CreateDropdown from "@/components/studio/create-dropdown";
import Sidebar from "@/components/studio/Sidebar";
import { SidebarSheet } from "@/components/studio/SidebarSheet";

// Fetch imports
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import useSWR from "swr";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { data: userInfo, isLoading: userInfoLoading } = useSWR(
  // 	routes.userRoutes.me,
  // 	fetcher
  // );

  const { data: userInfo, isLoading: userInfoLoading } = useSWR(
    routes.userRoutes.me,
    (url) =>
      nextFetcher({
        url,
        useToken: true,
      })
  );

  return (
    <main className='relative'>
      <div className='h-28 w-full bg-blue-800 p-4 sm:h-80'>
        <div className='flex w-full items-center justify-between sm:hidden'>
          <SidebarSheet>
            <Sidebar />
          </SidebarSheet>

          {userInfo?.data?.type == "teacher" ? (
            <CreateDropdown />
          ) : (
            <div className='my-3'></div>
          )}
        </div>
      </div>

      <div className='relative -mt-8 grid grid-cols-8 justify-evenly gap-x-2 px-4 sm:-mt-80 xl:gap-x-8 xl:px-14'>
        <div className='col-span-2 hidden sm:block'>
          <Sidebar />
        </div>

        <main className='col-span-full flex flex-1 sm:col-span-6'>
          {children}
        </main>
      </div>
    </main>
  );
}
