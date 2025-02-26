"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Icon imports
import UserNoImageIcon from "@/static/icons/user-no-image.svg?url";
import { PlayCircle, Users2 } from "lucide-react";

// Component imports
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CreateDropdown from "./create-dropdown";

// Config imports
import { studioTeacherMenu } from "@/constant/studio/menus";

// Auth imports
import { signOut } from "next-auth/react";

// Fetch imports
import { nextFetcher } from "@/utils/api/next-fetcher";
import routes from "@/utils/api/routes";
import Image from "next/image";
import useSWR from "swr";

export default function Sidebar({ className }: any) {
  const pathname = usePathname();

  const { data: userInfo, isLoading: userInfoLoading } = useSWR(
    routes.userRoutes.me,
    (url) =>
      nextFetcher({
        url,
        useToken: true,
      })
  );
  function StudentExamsMenu({ userInfo, pathname, menuItems }: any) {
    return menuItems.map((item: any, index: number) => (
      <Link key={index} href={item.path || ""}>
        <Button
          className={`${
            pathname == item.path
              ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
              : "bg-transparent text-slate-700 hover:bg-slate-200"
          } text-md flex w-full justify-start whitespace-break-spaces rounded-lg py-6 font-medium sm:h-24 sm:w-24 sm:flex-col sm:items-center sm:justify-center`}
        >
          <div
            className={`${
              pathname !== item.path ? "text-blue-500 sm:text-inherit" : ""
            }`}
          >
            {item.icon}
          </div>
          <span className='mt-1'>{item.title}</span>
        </Button>
      </Link>
    ));
  }

  function TeacherMenu({ userInfo, pathname }: any) {
    return studioTeacherMenu.map((item: any, index: number) =>
      (item.rule == "any" || userInfo?.data?.type == item.rule) &&
      (item.title !== "رشته‌ها" || userInfo?.data?.access_to_field_introduce) &&
      item.action !== "signOut" ? (
        <Link key={index} href={item.path || ""}>
          <Button
            className={`${
              pathname.includes(item.path)
                ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
                : "bg-transparent text-slate-700 hover:bg-slate-200"
            } text-md flex w-full justify-start whitespace-break-spaces rounded-lg py-6 font-medium sm:h-24 sm:w-24 sm:flex-col sm:items-center sm:justify-center`}
          >
            <div
              className={`${
                pathname.includes(item.path)
                  ? "text-blue-500 sm:text-inherit"
                  : ""
              }`}
            >
              {item.icon}
            </div>
            <span className='mt-1'>{item.title}</span>
          </Button>
        </Link>
      ) : item.action === "signOut" ? (
        <Button
          onClick={() => signOut()}
          className={`${
            pathname == item.path
              ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
              : "bg-transparent text-slate-700 hover:bg-slate-200"
          } text-md flex w-full justify-start rounded-lg py-6 font-medium sm:h-24 sm:w-24 sm:flex-col sm:items-center sm:justify-center`}
        >
          <div
            className={`${
              pathname !== item.path ? "text-blue-500 sm:text-inherit" : ""
            }`}
          >
            {item.icon}
          </div>
          <span className='mt-1'>{item.title}</span>
        </Button>
      ) : null
    );
  }

  return (
    <aside className={`${className} flex flex-col items-center pb-8 sm:mx-8`}>
      <div className='my-10 hidden flex-col items-center justify-center sm:flex'>
        <Avatar className='h-28 w-28 border-b-2 border-amber-500'>
          <AvatarImage src={userInfo?.data?.image}></AvatarImage>

          <AvatarFallback>
            <Image
              src={UserNoImageIcon}
              width={20}
              height={20}
              alt=''
              className='h-full w-full'
            />
            <div className='absolute bottom-0 mb-2'>
              {userInfo?.data?.first_name
                ? userInfo?.data?.first_name.charAt(0).toUpperCase()
                : null}
              ‌.
              {userInfo?.data?.last_name
                ? userInfo?.data?.last_name.charAt(0).toUpperCase()
                : null}
            </div>
          </AvatarFallback>
        </Avatar>

        {userInfoLoading ? (
          <Skeleton className='mt-2 h-6 w-full' />
        ) : (
          <h2 className='mt-2 text-center text-2xl font-medium text-white'>
            {userInfo?.data?.name}
          </h2>
        )}

        {userInfoLoading ? (
          <Skeleton className='mt-2 h-4 w-full' />
        ) : (
          <h4 className='text-md mt-1 font-medium text-slate-300'>
            {userInfo?.data?.bio}
          </h4>
        )}

        <div className='mt-4 flex justify-between gap-4'>
          {userInfoLoading ? (
            <Skeleton className='h-6 w-20' />
          ) : (
            <span className='flex gap-1 text-sm font-medium text-white'>
              <Users2 className='opacity-[0.6]' />
              {userInfo?.data?.stats?.followers || 0} دنبال‌کننده
            </span>
          )}

          {userInfoLoading ? (
            <Skeleton className='h-6 w-20' />
          ) : (
            <span className='flex gap-1 text-sm font-medium text-white'>
              <PlayCircle className='opacity-70' />
              {userInfo?.data?.type == "teacher" ? (
                <div className='flex items-center gap-1'>
                  {userInfo?.data?.stats?.lessons_count || 0}
                  <span>جلسه</span>
                </div>
              ) : (
                <div className='flex items-center gap-1'>
                  {userInfo?.data?.stats?.finished_courses || 0}
                  <span>درس</span>
                </div>
              )}
            </span>
          )}
        </div>
      </div>
      <div className='flex w-full items-center justify-center gap-2 bg-blue-800 pb-8 pt-4 sm:hidden'>
        <Avatar className='h-14 w-14 border-b-2 border-amber-500'>
          <AvatarImage
            src={userInfo?.data?.image || UserNoImageIcon}
          ></AvatarImage>
          <AvatarFallback>
            {userInfo?.data?.name
              ? userInfo?.data?.name.charAt(0).toUpperCase()
              : null}
          </AvatarFallback>
        </Avatar>

        <div>
          {userInfoLoading ? (
            <Skeleton className='mt-2 h-6 w-full' />
          ) : (
            <h2 className='mt-2 text-xl font-medium text-white sm:text-2xl'>
              {userInfo?.data?.name}
            </h2>
          )}

          {userInfoLoading ? (
            <Skeleton className='mt-2 h-4 w-full' />
          ) : (
            <h4 className='sm:text-md text-xs font-medium text-slate-300 sm:mt-1'>
              {userInfo?.data?.bio}
            </h4>
          )}

          <div className='mt-4 flex justify-between gap-4'>
            {userInfoLoading ? (
              <Skeleton className='h-6 w-20' />
            ) : (
              <span className='flex items-center gap-1 text-xs font-medium text-white sm:text-sm'>
                <Users2 className='h-5 w-5 stroke-1 opacity-70 sm:h-auto sm:w-auto sm:stroke-inherit' />
                {userInfo?.data?.stats?.followers || 0} دنبال‌کننده
              </span>
            )}

            {userInfoLoading ? (
              <Skeleton className='h-6 w-20' />
            ) : (
              <span className='flex items-center gap-1 text-sm font-medium text-white'>
                <PlayCircle className='h-5 w-5 stroke-1 opacity-70 sm:h-auto sm:w-auto' />
                {userInfo?.data?.type == "teacher" ? (
                  <div className='flex items-center gap-1'>
                    {userInfo?.data?.stats?.lessons_count || 0}
                    <span className='text-xs sm:text-sm'>جلسه</span>
                  </div>
                ) : (
                  <div className='flex items-center gap-1'>
                    {userInfo?.data?.stats?.finished_courses || 0}
                    <span className='text-xs sm:text-sm'>درس</span>
                  </div>
                )}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className='-mt-4 flex w-full flex-col items-center sm:mt-auto'>
        {userInfo?.data?.type == "teacher" ? (
          <CreateDropdown />
        ) : (
          <div className='my-3'></div>
        )}

        <div className='sm:p-auto mt-8 grid w-full gap-2 px-4 sm:grid-cols-2 sm:gap-4'>
          <TeacherMenu userInfo={userInfo} pathname={pathname} />
        </div>
      </div>
    </aside>
  );
}
