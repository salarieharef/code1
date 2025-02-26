"use client";

import { useRef } from "react";
import useSWR from "swr";

// Component imports

import StatCard from "./StatCard";

// Icon imports
import { Clock, Eye, GraduationCap, LibraryBig, Users } from "lucide-react";
import Teaching from "@/static/icons/teaching.svg";

// Fetch imports
import { useFetchOnIntersect } from "@/hooks/api";
import { nextFetcher } from "@/utils/api/next-fetcher";
import routes from "@/utils/api/routes";
import { formatWithSeparator } from "@/utils/persian-tools/tools-function";
import { convertDecimalSecondsToHMS } from "@/utils/time-formatter";
import WarningMessageServer from "../warning/warning-message-server";
import { clsx } from "clsx";

interface SiteStatProps {
  className?: string;
  statHeader?: React.ReactNode;
  statClassName?: string;
}

const SiteStats = ({ className, statHeader, statClassName }: SiteStatProps) => {
  const url = routes.homeRoutes.stats?.url;
  const ref = useRef<HTMLDivElement>(null);
  const hasFetched = useFetchOnIntersect(ref);

  // const {
  //   data: statsList,
  //   error,
  //   isLoading,
  // } = useSWR(hasFetched ? url : null, (url) => apiFetcher(url, "GET"), {
  //   revalidateOnFocus: false,
  // });

  const {
    data: statsList,
    error,
    isLoading,
  } = useSWR(hasFetched ? { url, method: "GET" } : null, nextFetcher, {
    revalidateOnFocus: false,
  });

  if ((!isLoading && error) || statsList?.data?.length === 0) {
    return (
      <div className='flex w-full justify-center py-8'>
        <WarningMessageServer>ارتباط با سرور برقرار نشد</WarningMessageServer>
      </div>
    );
  }

  const stats = [
    {
      icon: <Teaching className='w-5 fill-blue-500' />,
      number: formatWithSeparator(statsList?.data?.teachers_counts || 0, ","),
      text: "تعداد کل اساتید",
      fillIcon: false,
    },
    {
      icon: <GraduationCap className='text-blue-500' />,
      number: formatWithSeparator(statsList?.data?.students_counts || 0, ","),
      text: "تعداد کل دانشجویان",
      fillIcon: false,
    },
    {
      icon: <LibraryBig className='text-blue-500' />,
      number: formatWithSeparator(statsList?.data?.courses_counts || 0, ","),
      text: "تعداد کل دروس",
    },
    {
      icon: <LibraryBig className='text-blue-500' />,
      number: formatWithSeparator(statsList?.data?.lessons_counts || 0, ","),
      text: "تعداد کل جلسات",
    },
    {
      icon: <Eye className='text-blue-500' />,
      number: formatWithSeparator(statsList?.data?.views_counts || 0, ","),
      text: "تعداد کل بازدید‌ از دروس",
    },
    {
      icon: <Eye className='text-blue-500' />,
      number: formatWithSeparator(
        statsList?.data?.today_views_counts || 0,
        ","
      ),
      text: "تعداد بازدید ۲۴ ساعت اخیر",
    },
    {
      icon: <Users className='text-blue-500' />,
      number: formatWithSeparator(statsList?.data?.users_count || 0, ","),
      text: "تعداد کل کاربران سایت",
    },
    {
      icon: <Clock className='text-blue-500' />,
      number: convertDecimalSecondsToHMS(statsList?.data?.videos_seconds || 0),
      text: "زمان کل ویدیو‌های سایت",
    },
  ];

  return (
    <div
      ref={ref}
      className={`w-full bg-slate-50 px-2 pt-0 dark:bg-slate-900 md:px-4  md:pt-8 lg:px-16 ${className}`}
    >
      {!statHeader ? (
        <h1 className='mb-4 text-center text-2xl font-bold text-blue-800 lg:text-5xl'>
          آمار سایت
        </h1>
      ) : (
        <>{statHeader}</>
      )}
      <div className='flex scale-95 flex-wrap items-center justify-center gap-2 md:scale-100'>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            number={stat.number}
            text={stat.text}
            fillIcon={stat.fillIcon}
            isLoading={isLoading}
            className={clsx(
              "basis-5/12 md:basis-1/3 lg:basis-1/4 xl:basis-1/6",
              statClassName
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default SiteStats;
