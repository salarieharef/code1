"use client";

// Component imports
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Fetch imports
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import useSWR from "swr";

export default function CategoryContent({ id }: any) {
  // const {
  //   data: helps,
  //   error,
  //   isLoading,
  // } = useSWR(routes.helpRoutes.helps({ group_id: id }).url, apiFetcher, {
  //   revalidateOnFocus: false,
  // });
  const {
    data: helps,
    error,
    isLoading,
  } = useSWR(
    routes.helpRoutes.helps({ group_id: id }).url,
    (url) =>
      nextFetcher({
        url,
        method: routes.helpRoutes.helps({ group_id: id }).method,
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );
  return (
    <Tabs
      defaultValue={helps?.data?.[0]?.id}
      className='mt-4 grid md:grid-cols-6'
      dir='rtl'
    >
      <TabsList className='col-span-2 flex h-auto flex-col justify-start gap-2'>
        {isLoading ? (
          <>
            <Skeleton className='h-6 w-full rounded-lg bg-slate-200' />
            <Skeleton className='h-6 w-full rounded-lg bg-slate-200' />
            <Skeleton className='h-6 w-full rounded-lg bg-slate-200' />
            <Skeleton className='h-6 w-full rounded-lg bg-slate-200' />
            <Skeleton className='h-6 w-full rounded-lg bg-slate-200' />
            <Skeleton className='h-6 w-full rounded-lg bg-slate-200' />
          </>
        ) : (
          helps?.data?.map((help: any, i: number) => (
            <TabsTrigger
              value={help?.id}
              key={i}
              className='group flex w-full justify-start p-2 text-slate-800 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-500'
            >
              {help?.title}
            </TabsTrigger>
          ))
        )}
      </TabsList>

      {isLoading ? (
        <>
          <Skeleton className='h-6 w-full rounded-lg bg-slate-200' />
          <Skeleton className='h-6 w-full rounded-lg bg-slate-200' />
          <Skeleton className='h-6 w-full rounded-lg bg-slate-200' />
          <Skeleton className='h-6 w-full rounded-lg bg-slate-200' />
          <Skeleton className='h-6 w-full rounded-lg bg-slate-200' />
          <Skeleton className='h-6 w-full rounded-lg bg-slate-200' />
        </>
      ) : (
        helps?.data?.map((help: any, i: number) => (
          <TabsContent value={help?.id} key={i} className='col-span-4 px-4'>
            <p
              dangerouslySetInnerHTML={{ __html: help?.description }}
              className='rounded-lg bg-white p-4 shadow-lg'
            ></p>
          </TabsContent>
        ))
      )}
    </Tabs>
  );
}

export function CategoryContentSkeleton() {
  return (
    <div className='grid md:grid-cols-6'>
      <div className='col-span-2 flex flex-col'>
        <Skeleton className='h-6 w-full bg-slate-200' />
      </div>
    </div>
  );
}
