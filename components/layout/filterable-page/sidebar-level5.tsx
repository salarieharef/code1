import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";
import { categoryRoutes } from "@/utils/api/routes/category.routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Checkbox } from "../../ui/checkbox";
export default function SidebarLevel5({
  parentId,
  type,
  section,
  onChange,
}: any) {
  const [checkboxValue, setCheckboxValue] = useState<any>([]);

  // const { data } = useSWR(
  //   [categoryRoutes.categories(), section, type, parentId],
  //   ([url]) => postFetcher(url, { type, parent_id: parentId, section }),
  //   {
  //     revalidateOnFocus: false,
  //     dedupingInterval: 60000,
  //   }
  // );
  const { data } = useSWR(
    [categoryRoutes.categories(), section, type, parentId],
    ([url]) =>
      nextFetcher({
        url,
        method: "POST",
        body: { type, parent_id: parentId, section },
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );
  const categories = data?.data?.map((cat: any) => {
    return {
      id: cat.id,
      title: cat.title,
      code: cat.code,
      courseCount: cat.course_count,
    };
  });
  useEffect(() => {
    onChange && onChange({ children: checkboxValue });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkboxValue]);

  return (
    <div className='my-1 bg-white pb-2 pt-1'>
      {categories ? (
        categories?.map((cat: any, index: number) => (
          <>
            {cat.courseCount ? (
              <div
                key={`category-${parentId}-lesson-${index}`}
                className='ml-2 mr-12 mt-2 flex flex-row items-center '
              >
                <Checkbox
                  id={`category-${parentId}-lesson-${index}`}
                  className='h-5 w-5 border-blue-800 fill-white text-blue-400'
                  onClick={(e) => {
                    // e.preventDefault();
                    if (checkboxValue.includes(cat.id)) {
                      setCheckboxValue(
                        checkboxValue.filter((v: any) => v != cat.id)
                      );
                    } else {
                      setCheckboxValue([...checkboxValue, cat.id]);
                    }
                  }}
                  checked={checkboxValue.includes(cat.id)}
                />
                <div
                  className={`flex flex-row ${cat.courseCount === 0 ? "opacity-70" : ""}`}
                >
                  <label
                    htmlFor={`category-${parentId}-lesson-${index}`}
                    className='mr-2 cursor-pointer text-[0.725rem] leading-none text-blue-800 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 xl:text-[0.85rem] 2xl:text-[0.975rem]'
                  >
                    {cat.title}
                    <span className='mr-2 text-[0.50rem] xl:text-[0.65rem] 2xl:text-[0.70rem]'>
                      ({cat.courseCount}{" "}
                      {section === "field_introducer" ? "رشته" : "درس"})
                    </span>
                  </label>
                </div>
              </div>
            ) : null}
          </>
        ))
      ) : (
        <div className='relative ml-3 mt-2 flex flex-col px-5 py-1 pr-12'>
          <Skeleton className='mb-2 h-[1.25rem] w-full rounded-2xl bg-slate-300' />
          <Skeleton className='mb-2 h-[1.25rem] w-full rounded-2xl bg-slate-300' />
          <Skeleton className='mb-2 h-[1.25rem] w-full rounded-2xl bg-slate-300' />
        </div>
      )}
    </div>
  );
}
