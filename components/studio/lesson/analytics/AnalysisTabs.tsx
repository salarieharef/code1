"use client";
import { useParams } from "next/navigation";

// Component imports
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Icon imports
import { Bookmark, Clock, Eye, Heart, Users } from "lucide-react";

// Fetch imports
import routes from "@/utils/api/routes";
import useSWR from "swr";

// Util imports
import WrapperLineChart from "@/components/chart/WrapperLineChart";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import map from "lodash-es/map";
import zip from "lodash-es/zip";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { useEffect, useState } from "react";

export default function AnalysisTabs({ timestamp }: any) {
  const params = useParams();

  const [selectedTab, setSelectedTab] = useState("like");
  const [chartData, setChartData] = useState<any>(null);

  const dateNow = new Date().toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  let last30Days = new Date();
  last30Days.setDate(last30Days.getDate() - timestamp);

  const { data: totalStats, isLoading: totalStatsIsLoading } = useSWR(
    [routes.lessonRoutes.stats(params.lessonId), timestamp],
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
    [routes.lessonRoutes.stats(params.lessonId), selectedTab, timestamp],
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

  const tabs = [
    {
      value: "like",
      icon: (
        <Heart className='h-8 w-8 stroke-1.5 text-blue-400 group-data-[state=active]:text-current' />
      ),
      title: "لایک‌ ها",
      count: `${totalStats?.data?.like?.count || 0} مرتبه`,
      percentage: "4%",
      tooltip: "تعداد لایک های دریافتی برای این جلسه.",
    },
    {
      value: "save",
      icon: (
        <Bookmark className='h-8 w-8 stroke-1.5 text-blue-400 group-data-[state=active]:text-current' />
      ),
      title: "ذخیره ها",
      count: `${totalStats?.data?.save?.count || 0} مرتبه`,
      percentage: "4%",
      tooltip: "تعداد ذخیره های این جلسه.",
    },
    {
      value: "unique_view",
      icon: (
        <Eye className='h-8 w-8 stroke-1.5 text-blue-400 group-data-[state=active]:text-current' />
      ),
      title: "بازدید درس",
      count: `${totalStats?.data?.unique_view?.count || 0} مرتبه`,
      percentage: "4%",
      tooltip: "تعداد بازدید از این جلسه",
    },
    {
      value: "people",
      icon: (
        <Users className='h-8 w-8 stroke-1.5 text-blue-400 group-data-[state=active]:text-current' />
      ),
      title: "نفرات بازدید کننده",
      count: `${totalStats?.data?.unique_view?.count || 0} نظر`,
      percentage: "4%",
      tooltip: "تعداد نفرات بازدید کننده از این جلسه",
    },
    {
      value: "view",
      icon: (
        <Clock className='h-8 w-8 stroke-1.5 text-blue-400 group-data-[state=active]:text-current' />
      ),
      title: "مدت زمان بازدید",
      count: `${totalStats?.data?.view?.count || 0} ساعت`,
      percentage: "4%",
      tooltip: "مدت زمان بازدید کاربران از این جلسه.",
    },
  ];

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
        {tabs.map((tab, i) => {
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
                <WrapperLineChart
                  data={chartData}
                  name='بازدید'
                  loading={statsIsLoading}
                  href={"/studio/class/create"}
                  textButton={"ایجاد درس"}
                  text_header={"شما هیچ درسی را ایجاد نکرده اید"}
                  description_chart={`آمار دروس فعال در ${timestamp} روز گذشته`}
                />
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
                      {/* <span>{tab.percentage}</span> */}
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
        <TabsContent value='like'>
          <WrapperLineChart
            data={chartData}
            name='لایک'
            loading={statsIsLoading}
            href={"/studio/class/create"}
            textButton={"ایجاد درس"}
            text_header={"شما هیچ درسی را ایجاد نکرده اید"}
            description_chart={`آمار دروس فعال در ${timestamp} روز گذشته`}
          />
        </TabsContent>
        <TabsContent value='save'>
          <WrapperLineChart
            data={chartData}
            name='ذخیره'
            loading={statsIsLoading}
            href={"/studio/class/create"}
            textButton={"ایجاد درس"}
            text_header={"شما هیچ درسی را ایجاد نکرده اید"}
            description_chart={`آمار دروس فعال در ${timestamp} روز گذشته`}
          />
        </TabsContent>
        <TabsContent value='view'>
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
        <TabsContent value='comment'>
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
