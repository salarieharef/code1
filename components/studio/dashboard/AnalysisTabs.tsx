"use client";
// Component imports
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Icon imports
import {
  FileSearch,
  GalleryVerticalEnd,
  Heart,
  MessagesSquare,
  PlayCircle,
  ShoppingBag,
} from "lucide-react";

// Auth imports
import { useSession } from "next-auth/react";

// Fetch imports
import routes from "@/utils/api/routes";
import useSWR from "swr";

// Util imports
import WrapperLineChart from "@/components/chart/WrapperLineChart";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { map, zip } from "lodash-es";
import { useEffect, useState } from "react";

export default function AnalysisTabs({ timestamp }: any) {
  const { data: session }: any = useSession();
  const [selectedTab, setSelectedTab] = useState("courses_view");
  const [chartData, setChartData] = useState<any>(null);

  const dateNow = new Date().toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  let last30Days = new Date();
  last30Days.setDate(last30Days.getDate() - timestamp);

  const statsApi =
    session?.user?.type == "teacher"
      ? routes.teacherRoutes.stats(session?.user?.id)
      : routes.studentRoutes.stats(session?.user?.id);

  const { data: totalStats, isLoading: totalStatsIsLoading } = useSWR(
    [statsApi, timestamp],
    ([url]) =>
      nextFetcher({
        url,
        method: "POST",
        body: {
          start_date: new Intl.DateTimeFormat("fa-IR")
            .format(last30Days)
            .replace(/\//g, "-"),
          end_date: dateNow.replace(/\//g, "-"),
          chart_type: selectedTab,
          chart: false,
        },
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  const { data: stats, isLoading: statsIsLoading } = useSWR(
    [statsApi, selectedTab, timestamp],
    ([url]) =>
      nextFetcher({
        url,
        method: "POST",
        body: {
          start_date: new Intl.DateTimeFormat("fa-IR")
            .format(last30Days)
            .replace(/\//g, "-"),
          end_date: dateNow.replace(/\//g, "-"),
          chart_type: selectedTab,
        },
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (stats && stats.data && stats.data.chart) {
      setChartData(stats.data.chart);
    }
  }, [stats]);

  const teacherTabs = [
    {
      value: "courses_view",
      icon: (
        <GalleryVerticalEnd className='h-8 w-8 stroke-1.5 group-data-[state=active]:text-current sm:text-blue-400' />
      ),
      title: "بازدید دروس",
      count: `${totalStats?.data?.courses_view?.count || 0} مرتبه`,
      percentage: "4%",
      tooltip: "بازدید از دروس فعال شما",
    },
    {
      value: "lessons_view",
      icon: (
        <PlayCircle className='h-8 w-8 stroke-1.5 group-data-[state=active]:text-current sm:text-blue-400' />
      ),
      title: "بازدید جلسات",
      count: `${totalStats?.data?.lessons_view?.count || 0} مرتبه`,
      percentage: "4%",
      tooltip: "بازدید از جلسات فعال شما",
    },
    {
      value: "comment",
      icon: (
        <MessagesSquare className='h-8 w-8 stroke-1.5 group-data-[state=active]:text-current sm:text-blue-400' />
      ),
      title: "تعداد نظرات",
      count: `${totalStats?.data?.comment?.count || 0} نظر`,
      percentage: "4%",
      tooltip: "تعداد نظرات بر روی دروس فعال شما",
    },
    {
      value: "courses_like",
      icon: (
        <Heart className='h-8 w-8 stroke-1.5 group-data-[state=active]:text-current sm:text-blue-400' />
      ),
      title: "تعداد لایک‌ها",
      count: `${totalStats?.data?.courses_like?.count || 0} مرتبه`,
      percentage: "4%",
      tooltip: "تعداد لایک های دریافتی شما",
    },
    {
      value: "order",
      icon: (
        <ShoppingBag className='h-8 w-8 stroke-1.5 group-data-[state=active]:text-current sm:text-blue-400' />
      ),
      title: "فروش دروس",
      count: `${totalStats?.data?.order?.count || 0} مرتبه`,
      percentage: "4%",
      tooltip: "تعداد فروش شما",
    },
  ];

  const studentTabs = [
    {
      value: "courses_view",
      icon: (
        <PlayCircle className='h-8 w-8 stroke-1.5 text-blue-400 group-data-[state=active]:text-current' />
      ),
      title: "دروس شرکت کرده",
      count: `${totalStats?.data?.courses_view?.count || 0} درس`,
      percentage: "4%",
      tooltip: "تعداد دروسی که شما شرکت کرده اید.",
    },
    {
      value: "lessons_view",
      icon: (
        <GalleryVerticalEnd className='h-8 w-8 stroke-1.5 text-blue-400 group-data-[state=active]:text-current' />
      ),
      title: "جلسات شرکت کرده",
      count: `${totalStats?.data?.lessons_view?.count || 0} جلسه`,
      percentage: "4%",
      tooltip: "تعداد جلساتی که شما شرکت کرده اید.",
    },
    {
      value: "comment",
      icon: (
        <MessagesSquare className='h-8 w-8 stroke-1.5 text-blue-400 group-data-[state=active]:text-current' />
      ),
      title: "تعداد نظرات",
      count: `${totalStats?.data?.comment?.count || 0} نظر`,
      percentage: "4%",
      tooltip: "تعداد نظرات شما بر روی دروس اساتید.",
    },
    {
      value: "courses_like",
      icon: (
        <FileSearch className='h-8 w-8 stroke-1.5 text-blue-400 group-data-[state=active]:text-current' />
      ),
      title: "مشاهده پروفایل",
      count: `${totalStats?.data?.courses_like?.count || 0} مرتبه`,
      percentage: "4%",
      tooltip: "تعداد بازدید از پروفایل شما.",
    },
    {
      value: "order",
      icon: (
        <ShoppingBag className='h-8 w-8 stroke-1.5 text-blue-400 group-data-[state=active]:text-current' />
      ),
      title: "خرید دروس",
      count: `${totalStats?.data?.order?.count || 0} مرتبه`,
      percentage: "4%",
      tooltip: "تعداد خرید های شما",
    },
  ];

  const tabs = session?.user?.type == "teacher" ? teacherTabs : studentTabs;

  const formattedData = (data: any) => {
    return map(zip(data?.x_data, data?.y_data), ([x, y]: any) => ({
      x: new Date(x).getTime(),
      y: typeof y == "number" ? y : 0,
    }));
  };

  return (
    <div className='w-full'>
      <Accordion
        type='single'
        collapsible
        className='flex w-full flex-col gap-y-2 sm:hidden'
        onValueChange={setSelectedTab}
        value={selectedTab}
      >
        {tabs.map((tab: any, i) => {
          return totalStatsIsLoading ? (
            <Skeleton className='h-40 w-40' key={i} />
          ) : (
            <AccordionItem value={tab.value} key={i}>
              <AccordionTrigger className='rounded-xl bg-gradient-to-r from-blue-400 to-blue-500 p-0 px-4 text-white hover:no-underline'>
                <div className='flex items-center gap-2'>
                  {tab.icon}
                  <div className='flex flex-col items-start'>
                    <h4 className='text-lg font-normal'>{tab.title}</h4>
                    <h3 className='text-2xl group-data-[state=active]:text-current'>
                      {tab.count}
                    </h3>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className='p-2'>
                <div>
                  <WrapperLineChart
                    data={chartData}
                    name='بازدید'
                    loading={statsIsLoading}
                    href={"/studio/class/create"}
                    textButton={"ایجاد درس"}
                    text_header={"شما هیچ درسی را ایجاد نکرده اید"}
                    description_chart={`آمار دروس فعال در ${timestamp} روز گذشته`}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      <Tabs
        className='hidden w-full sm:block'
        dir='rtl'
        onValueChange={setSelectedTab}
        value={selectedTab}
      >
        <TabsList className='flex h-full flex-wrap justify-between gap-6 overflow-hidden bg-transparent py-4'>
          {tabs.map((tab, i) => {
            return totalStatsIsLoading ? (
              <Skeleton className='h-40 w-40' />
            ) : (
              <TabsTrigger
                value={tab.value}
                key={i}
                className='group flex h-40 w-40 flex-col items-start justify-between overflow-hidden rounded-xl bg-secondary from-blue-400 to-blue-500 px-2 py-4 text-slate-600 data-[state=active]:bg-gradient-to-r data-[state=active]:text-white data-[state=active]:shadow'
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild className='h-full w-full'>
                      <div className='flex flex-col items-start'>
                        {tab.icon}
                        <h4 className='text-lg font-normal'>{tab.title}</h4>
                        <h3 className='text-2xl text-blue-400 group-data-[state=active]:text-current'>
                          {tab.count}
                        </h3>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{tab?.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TabsTrigger>
            );
          })}
        </TabsList>
        <TabsContent value='lessons_view'>
          <WrapperLineChart
            data={chartData}
            name='بازدید'
            loading={statsIsLoading}
            href={"/studio/class/create"}
            textButton={"ایجاد درس"}
            text_header={"شما هیچ درسی را ایجاد نکرده اید"}
            description_chart={`آمار دروس فعال در ${timestamp} روز گذشته`}
          />
        </TabsContent>
        <TabsContent value='courses_view'>
          <WrapperLineChart
            data={chartData}
            name='بازدید'
            loading={statsIsLoading}
            href={"/studio/class/create"}
            textButton={"ایجاد درس"}
            text_header={"شما هیچ درسی را ایجاد نکرده اید"}
            description_chart={`آمار دروس فعال در ${timestamp} روز گذشته`}
          />
        </TabsContent>
        <TabsContent value='comment'>
          <WrapperLineChart
            data={chartData}
            name='کامنت'
            loading={statsIsLoading}
            href={"/studio/class/create"}
            textButton={"ایجاد درس"}
            text_header={"شما هیچ درسی را ایجاد نکرده اید"}
            description_chart={`آمار دروس فعال در ${timestamp} روز گذشته`}
          />
        </TabsContent>
        <TabsContent value='courses_like'>
          <WrapperLineChart
            data={chartData}
            name='مرتبه'
            loading={statsIsLoading}
            href={"/studio/class/create"}
            textButton={"ایجاد درس"}
            text_header={"شما هیچ درسی را ایجاد نکرده اید"}
            description_chart={`آمار دروس فعال در ${timestamp} روز گذشته`}
          />
        </TabsContent>
        <TabsContent value='order'>
          <WrapperLineChart
            data={chartData}
            name='مرتبه'
            loading={statsIsLoading}
            href={"/studio/class/create"}
            textButton={"ایجاد درس"}
            text_header={"شما هیچ درسی را ایجاد نکرده اید"}
            description_chart={`آمار دروس فعال در ${timestamp} روز گذشته`}
          />
        </TabsContent>
        <TabsContent value='certifications'></TabsContent>
      </Tabs>
    </div>
  );
}
