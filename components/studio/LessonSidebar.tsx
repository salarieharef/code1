"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useContext, useEffect } from "react";

// Fetch imports
import routes from "@/utils/api/routes";
import useSWR from "swr";

// Config imports
import { studioLessonMenu } from "@/constant/studio/menus";

// Component imports
import { Button } from "@/components/ui/button";
import VideoPlayer from "../class/video-player";
import CreateDropdown from "./create-dropdown";

// Utils import
import find from "lodash-es/find";

// Icon imports
import { MoveRight } from "lucide-react";

// Auth imports
import { global_context } from "@/context/global";

// Context imports
import { nextFetcher } from "@/utils/api/next-fetcher";
import { useSession } from "next-auth/react";

export default function LessonSidebar({ className }: any) {
  const { data: session }: any = useSession();
  const { setLessonVideo }: any = useContext(global_context);
  const params = useParams();
  const lessonId = params?.lessonId;
  const pathname = usePathname();
  const menuItems = studioLessonMenu(lessonId);

  // const { data: lessonDetails } = useSWR(
  //   routes.lessonRoutes.details(lessonId),
  //   fetcher,
  //   {
  //     revalidateOnFocus: false,
  //   }
  // );
  const { data: lessonDetails } = useSWR(
    routes.lessonRoutes.details(lessonId),
    (url) => nextFetcher({ url, method: "GET", useToken: true }),
    {
      revalidateOnFocus: false,
    }
  );

  const lessonVideo = find(lessonDetails?.data?.contents, {
    type: "video_topic",
  })?.file;

  useEffect(() => {
    setLessonVideo(lessonVideo);
  }, [lessonVideo]);

  return (
    <aside className={`${className} flex flex-col items-center pb-8`}>
      <div className='flex w-full flex-col items-center justify-center bg-blue-800 pb-8 sm:mb-5 sm:mt-10 sm:w-auto sm:bg-transparent sm:pb-0'>
        <Link
          className={`mb-2 mt-4 flex items-center gap-x-2 text-lg text-white sm:mt-0`}
          href={`/studio/dashboard`}
        >
          <MoveRight className='text-white' />
          <span>اطلاعات کلی اکانت</span>
        </Link>

        <div className='w-52 overflow-hidden xl:w-72'>
          <VideoPlayer src={lessonVideo} poster={lessonDetails?.data?.image} />
          {/* <Image
              src={lessonDetails?.data?.image}
              alt={lessonDetails?.data?.name}
              className="rounded-md object-cover w-full aspect-video"
              width={250}
              height={250}
            /> */}
        </div>
        <h2 className='mt-2 text-center text-lg font-medium text-white'>
          {lessonDetails?.data?.title
            ? `${lessonDetails?.data?.title} - `
            : null}
          {lessonDetails?.data?.name}
        </h2>
      </div>

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
