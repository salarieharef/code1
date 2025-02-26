"use client";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";

// Context imports
import VideoContextProvider from "@/context/video";

// Component imports
import AboutClass from "@/components/class/AboutClass";
import AboutTeacher from "@/components/class/AboutTeacher";
import Comments from "@/components/class/Comments";
import Headline from "@/components/class/Headline";
import MobileTranscript from "@/components/class/MobileTranscript";
import Navbar from "@/components/class/Navbar";
import Ratings from "@/components/class/Ratings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MediaPlayerInstance } from "@vidstack/react";

// Fetch imports
import routes from "@/utils/api/routes";
import useSWR from "swr";

// Permission classes
import { ClassServices } from "@/security/permissions/class";

// Context imports
import Price from "@/components/class/pricing";
import { BreadcrumbComponent } from "@/components/global/BreadcrumbComponent";
import WarningMessageServer from "@/components/warning/warning-message-server";
import { nextFetcher } from "@/utils/api/next-fetcher";

export default function Class() {
  const playerRef = useRef<MediaPlayerInstance>(null);
  const adRef = useRef<MediaPlayerInstance>(null);
  const params = useParams();

  // const {
  //   data: details,
  //   error,
  //   isLoading,
  //   mutate,
  // } = useSWR(routes.courseRoutes.detail(params.id), fetcher, {
  //   revalidateOnFocus: false,
  // });
  const {
    data: details,
    error,
    isLoading,
    mutate,
  } = useSWR(
    routes.courseRoutes.detail(params.id),
    (url) =>
      nextFetcher({
        url,
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  const RenderContent = () => {
    // if (isLoading) {
    //   return (
    //     <div className='flex w-full justify-center py-8'>
    //       در حال بارگذاری...
    //     </div>
    //   );
    // }

    if (!isLoading && (error || !details || !details.success)) {
      return (
        <div className='flex w-full justify-center py-8'>
          <WarningMessageServer>ارتباط با سرور برقرار نشد</WarningMessageServer>
        </div>
      );
    }

    if (!isLoading && details?.data?.length === 0) {
      return (
        <div className='flex w-full justify-center py-8'>
          <WarningMessageServer>داده‌ای یافت نشد</WarningMessageServer>
        </div>
      );
    }

    return (
      <>
        <Navbar courseDetails={details?.data} seekVideoToSub={seekVideoToSub} />
        <div className='col-span-full mx-4 my-2 md:mx-8 md:my-4 lg:col-span-8 lg:mr-0'>
          <div className='mb-3 flex justify-start rounded-lg bg-slate-200 py-2 sm:px-1 md:px-4'>
            <BreadcrumbComponent
              links={[
                { type: "link", href: "/", label: "خانه" },
                { type: "link", href: "/", label: "کلاس" },
                { type: "link", href: "/", label: "درس" },
                { type: "page", label: "فیزیک" },
              ]}
            />
          </div>

          {details?.data?.price ? <Price details={details?.data} /> : null}

          <MobileTranscript seekVideoToSub={seekVideoToSub} />

          <Tabs defaultValue='headline' className='mt-4' dir='rtl'>
            <TabsList className='flex h-auto w-full justify-between gap-x-4 overflow-x-scroll rounded-full bg-white text-blue-400 sm:grid sm:grid-cols-5'>
              <TabsTrigger
                value='headline'
                className='sm:text-md m-0 rounded-full p-2 font-bold data-[state=active]:bg-blue-400 data-[state=active]:text-white'
              >
                سرفصل ها
              </TabsTrigger>
              {ClassServices.comment.active ? (
                <TabsTrigger
                  value='comments'
                  className='sm:text-md m-0 rounded-full p-2 font-bold data-[state=active]:bg-blue-400 data-[state=active]:text-white'
                >
                  نظرات کاربران
                </TabsTrigger>
              ) : null}
              <TabsTrigger
                value='about'
                className='sm:text-md m-0 rounded-full p-2 font-bold data-[state=active]:bg-blue-400 data-[state=active]:text-white'
              >
                درباره درس
              </TabsTrigger>
              <TabsTrigger
                value='teacher'
                className='sm:text-md m-0 rounded-full p-2 font-bold data-[state=active]:bg-blue-400 data-[state=active]:text-white'
              >
                درباره مدرس
              </TabsTrigger>
              <TabsTrigger
                value='ratings'
                className='sm:text-md m-0 rounded-full p-2 font-bold data-[state=active]:bg-blue-400 data-[state=active]:text-white'
              >
                رتبه بندی درس
              </TabsTrigger>
            </TabsList>

            <TabsContent value='headline'>
              <Headline />
            </TabsContent>

            <TabsContent value='comments'>
              <Comments courseDetails={details?.data} />
            </TabsContent>

            <TabsContent value='about'>
              <AboutClass courseDetails={details?.data} mutateCourse={mutate} />
            </TabsContent>

            <TabsContent value='teacher'>
              <AboutTeacher courseDetails={details?.data} mutate={mutate} />
            </TabsContent>

            <TabsContent value='ratings'>
              <Ratings />
            </TabsContent>
          </Tabs>
        </div>
      </>
    );
  };

  const seekVideoToSub = (sub: any) => {
    if (playerRef?.current?.currentTime)
      playerRef.current.currentTime = sub?.startSeconds;
  };

  // const viewCourse = async () => {
  //   try {
  //     await postFetcher(routes.courseRoutes.view(params.id));
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  const viewCourse = async () => {
    try {
      await nextFetcher({
        url: routes.courseRoutes.view(params.id),
        method: "POST",
        useToken: true,
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!details?.data?.stats?.is_viewed) {
      viewCourse();
    }
  }, [details]);

  return (
    <main className='grid grid-cols-12 gap-x-4'>
      <VideoContextProvider>
        <RenderContent />
      </VideoContextProvider>
    </main>
  );
}
