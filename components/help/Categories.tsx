"use client";

// Component imports
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import CategoryCard, { CategoryCardSkeleton } from "./category-card";

// Icon imports
import CategoryContent, { CategoryContentSkeleton } from "./category-content";

// Fetch imports
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import useSWR from "swr";

export default function Categories() {
  // const {
  // 	data: helpGroups,
  // 	error,
  // 	isLoading,
  // } = useSWR(routes.helpRoutes.helpGroups()?.url, apiFetcher, {
  // 	revalidateOnFocus: false,
  // });

  const {
    data: helpGroups,
    error,
    isLoading,
  } = useSWR(
    routes.helpRoutes.helpGroups()?.url,
    (url) =>
      nextFetcher({
        url,
        method: routes.helpRoutes.helpGroups()?.method,
        // useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <section className='mx-10 my-10 gap-6 md:mx-24'>
      <Tabs defaultValue={helpGroups?.data?.[0]?.id} className='mt-4' dir='rtl'>
        <TabsList className='grid h-auto w-full justify-start gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {isLoading ? (
            <CategoryCardSkeleton />
          ) : (
            helpGroups?.data?.map((group: any, i: number) => (
              <CategoryCard group={group} key={i} />
            ))
          )}
        </TabsList>

        {isLoading
          ? helpGroups?.data?.map((group: any, i: number) => (
              <TabsContent value={group?.id} key={i}>
                <CategoryContentSkeleton />
              </TabsContent>
            ))
          : helpGroups?.data?.map((group: any, i: number) => (
              <TabsContent value={group?.id} key={i}>
                <CategoryContent id={group?.id} />
              </TabsContent>
            ))}
      </Tabs>
    </section>
  );
}
