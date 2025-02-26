"use client";

// Component imports
import { CategoryCard, CategoryCardSkeleton } from "./category-card";

import "swiper/css";
import "swiper/css/navigation";

// Fetch imports
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import useSWR from "swr";

import categoryDefaultIcon from "@/static/icons/defaults/category_default.svg?url";

export default function CategoryTabs({ section, type, version }: any) {
  const { data: categories, isLoading } = useSWR(
    [routes.categoryRoutes.categories({ limit: 20 }), section, type],
    ([url]) =>
      nextFetcher({
        url,
        method: "POST",
        body: {
          section: section || "university",
          type: type || "grade",
          version: version || "2",
        },
        useToken: true,
      }),
    { revalidateOnFocus: false }
  );

  return (
    <div className='my-8 flex flex-wrap items-start justify-center gap-x-2 gap-y-4'>
      {isLoading ? (
        <>
          <CategoryCardSkeleton />
          <CategoryCardSkeleton />
          <CategoryCardSkeleton />
          <CategoryCardSkeleton />
          <CategoryCardSkeleton />
          <CategoryCardSkeleton />
          <CategoryCardSkeleton />
          <CategoryCardSkeleton />
        </>
      ) : (
        categories?.data?.map((category: any, i: number) => (
          <>
            <CategoryCard
              section={section}
              title={category?.title}
              courseCount={category?.course_count}
              image={category?.image || categoryDefaultIcon}
              link={`/category?section=${section}&type=${type}&categories=${category.id}`}
              key={`home-category-${section}-${type}-${i}`}
            />
          </>
        ))
      )}
    </div>
  );
}
