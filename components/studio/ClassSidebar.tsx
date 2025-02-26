"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

// Fetch imports
import routes from "@/utils/api/routes";
import useSWR from "swr";

// Config imports
import { studioClassMenu } from "@/constant/studio/menus";

// Component imports
import { Button } from "@/components/ui/button";
import { ClassImageOverlay } from "./classes/class-image-overlay";
import CreateDropdown from "./create-dropdown";

// Icon imports
import { MoveRight } from "lucide-react";
import NoImageIcon from "@/static/icons/no-image.svg?url";

// Auth imports
import { nextFetcher } from "@/utils/api/next-fetcher";
import { useSession } from "next-auth/react";

export default function ClassSidebar({ className }: any) {
  const { data: session }: any = useSession();
  const params = useParams();
  const classId = params?.classId;
  const pathname = usePathname();
  const menuItems = studioClassMenu(classId);

  // const { data: classDetails } = useSWR(
  //   routes.courseRoutes.detail(classId),
  //   fetcher,
  //   {
  //     revalidateOnFocus: false,
  //   }
  // );
  const { data: classDetails } = useSWR(
    routes.courseRoutes.detail(classId),
    (url) =>
      nextFetcher({
        url,
        method: "GET",
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <aside className={`${className} flex flex-col items-center sm:pb-8`}>
      <div className='flex w-full flex-col items-center justify-center bg-blue-800 pb-8 sm:mb-5 sm:mt-10 sm:w-auto sm:bg-transparent sm:pb-0'>
        <Link
          className={`mb-2 mt-4 flex items-center gap-x-2 text-lg text-white sm:mt-0`}
          href={`/studio/dashboard`}
        >
          <MoveRight className='text-white' />
          <span>بازگشت به داشبورد</span>
        </Link>
      </div>

      <ClassImageOverlay
        className='w-full'
        image={classDetails?.data?.image || NoImageIcon}
        lessonsCount={classDetails?.data?.lesson_details?.lessons_count}
      />
      <h2 className='mt-2 text-center text-lg font-medium text-white'>
        {classDetails?.data?.name}
      </h2>

      <div className='-mt-4 flex w-full flex-col items-center sm:mt-auto'>
        {session?.user?.type == "teacher" ? <CreateDropdown /> : null}

        <div className='sm:p-auto mt-8 grid w-full gap-2 px-4 sm:grid-cols-2 sm:gap-4'>
          {menuItems.map((item, index) => (
            <Link key={index} href={item.path || ""}>
              <Button
                className={`${
                  pathname.startsWith(item.path)
                    ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
                    : "bg-transparent text-slate-700 hover:bg-slate-200"
                } text-md flex w-full justify-start rounded-lg py-6 font-medium sm:h-24 sm:w-24 sm:flex-col sm:items-center sm:justify-center`}
              >
                <div
                  className={`${
                    pathname !== item.path
                      ? "text-blue-500 sm:text-inherit"
                      : ""
                  }`}
                >
                  {item.icon}
                </div>
                <span className='mt-1'>{item.title}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
