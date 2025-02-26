"use client";
import { useState } from "react";

// Component imports
import SortFilter from "@/components/global/filters/sort-filter";
import LessonList from "@/components/studio/lessons/LessonList";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Icon imports
import { Edit2 } from "lucide-react";

// Fetch imports
import routes from "@/utils/api/routes";
import useSWR from "swr";

// Auth imports
import { nextFetcher } from "@/utils/api/next-fetcher";
import { useSession } from "next-auth/react";

export default function StudioClassLessons() {
  const [sort, setSort] = useState("most_recent");
  const [q, setQ] = useState("");
  const [selectedTab, setSelectedTab] = useState<string | undefined>(
    "courseLessons"
  );
  const { data: session }: any = useSession();

  // const { data: userInfo, isLoading: userInfoLoading } = useSWR(
  //   routes.userRoutes.me,
  //   fetcher
  // );
  const { data: userInfo, isLoading: userInfoLoading } = useSWR(
    routes.userRoutes.me,
    (url) =>
      nextFetcher({
        url,
        useToken: true,
      })
  );
  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  return (
    <div className='min-h[100rem] mb-10 w-full rounded-[7px] bg-white p-4 shadow-xl sm:mt-10 sm:px-12 sm:py-8'>
      <div className='flex items-center justify-between'>
        <h1 className='flex text-xl font-medium text-blue-900 sm:text-3xl'>
          <Edit2 className='text-blue-400 sm:h-10 sm:w-10' />
          جلسات مدرس
        </h1>
        {/* {userInfo?.data?.is_user_info_completed ? (
          <Link href={`/studio/lesson/create`}>
            <Button size='sm'>ایجاد جلسه جدید</Button>
          </Link>
        ) : null} */}
      </div>
      {/* desktop tabs */}
      <Tabs
        defaultValue='courseLessons'
        className='hidden w-full md:block'
        dir='rtl'
        onValueChange={handleTabChange}
        value={selectedTab}
      >
        {session?.user?.access_to_field_introduce ? (
          <div className='flex justify-center'>
            <TabsList className='h-auto divide-x-1 divide-x-reverse overflow-hidden border border-blue-500 bg-transparent p-0'>
              <TabsTrigger
                value='courseLessons'
                className={`rounded-none border-blue-500 font-normal text-slate-600 data-[state=active]:bg-blue-500 data-[state=active]:font-medium data-[state=active]:text-white sm:px-10 sm:text-lg`}
              >
                جلسات درس
              </TabsTrigger>
            </TabsList>
          </div>
        ) : null}
        <Separator orientation='horizontal' className='my-4' />

        <TabsContent value='courseLessons'>
          <SortFilter
            searchPlaceHolder='جلسه مورد نظر خود را جستجو کنید...'
            sort={sort}
            setSort={setSort}
            onSearch={setQ}
          />

          <LessonList q={q} sort={sort} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
