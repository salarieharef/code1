import { useEffect, useState } from "react";

// Component imports
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";
import SidebarLevel2 from "./sidebar-level2";
import SidebarLevel5 from "./sidebar-level5";

// Util imports
import { categoryRoutes } from "@/utils/api/routes/category.routes";

// Fetch imports
import { nextFetcher } from "@/utils/api/next-fetcher";
import useSWR from "swr";

export type ChildrenSelection = {
  id: number;
  children: number[];
};

export default function SidebarLevel1({
  section,
  types,
  version = 2,
  onChange,
  defaultValue,
}: any) {
  const [childrenSelections, setChildrenSelections] = useState<
    ChildrenSelection[]
  >([]);
  const [itemsValue, setItemsValue] = useState<any>(defaultValue || []);
  const [checkboxValue, setCheckboxValue] = useState<any>(defaultValue || []);

  // const { data } = useSWR(
  //   [categoryRoutes.categories(), section, types[0]],
  //   ([url]) => postFetcher(url, { type: types[0], section }),
  //   {
  //     revalidateOnFocus: false,
  //     dedupingInterval: 60000,
  //   }
  // );
  const { data } = useSWR(
    [categoryRoutes.categories(), section, types[0], version],
    ([url]) =>
      nextFetcher({
        url,
        method: "POST",
        body: { type: types[0], section, version: version },
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );
  const categories = data?.data;

  const mergeAndUpdateSelection = (newChildrenSelections: any) => {
    const values = [...checkboxValue];
    newChildrenSelections.forEach((s: any) => {
      values.push(...s.children);
    });
    onChange && onChange({ children: values });
  };

  useEffect(() => {
    mergeAndUpdateSelection(childrenSelections);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkboxValue]);

  return (
    <Accordion
      type='multiple'
      className='mt-4'
      value={itemsValue}
      onValueChange={(items) => {
        setItemsValue(items);
      }}
    >
      {categories ? (
        categories?.map((cat: any, index: number) =>
          section === "college" ||
          (section === "school" && parseInt(cat.code) <= 9) ? (
            <>
              {cat.course_count ? (
                <>
                  <div className='absolute right-12 flex h-[3.25rem] items-center'>
                    <Checkbox
                      id={`category-${section}-${types[0]}-${index}`}
                      className='h-5 w-5 border-white fill-white text-blue-400'
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
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
                  </div>
                  <label
                    htmlFor={`category-${section}-${types[0]}-${index}`}
                    className={`my-2 ml-3 mr-7 flex cursor-pointer justify-between rounded-2xl border-0
                 px-5 py-3 pr-10 text-white hover:no-underline
                 ${cat.course_count === 0 ? "opacity-70" : ""}`}
                  >
                    <div className='flex flex-row items-center'>
                      <span className='mr-2 text-start text-[0.95rem] text-white xl:text-[1.05rem] 2xl:text-[1.25rem]'>
                        {cat.title}
                        <span className='mr-2 text-[0.65rem] text-white xl:text-[0.80rem] 2xl:text-[0.85rem]'>
                          ({cat.course_count}{" "}
                          {section === "field_introducer" ? "رشته" : "درس"})
                        </span>
                      </span>
                    </div>
                  </label>
                </>
              ) : null}
            </>
          ) : (
            <>
              {cat.course_count ? (
                <AccordionItem
                  key={`category-${section}-${types[0]}-${index}`}
                  value={cat.id}
                  className='my-2 border-0 py-0'
                >
                  {section === "field_introducer" &&
                  cat?.id &&
                  cat.title &&
                  cat.course_count < 1 ? (
                    <SidebarLevel2
                      section={section}
                      types={types?.filter?.(
                        (type: any, index: number) => index > 0
                      )}
                      parentId={cat.id}
                      onChange={(selection: ChildrenSelection) => {
                        const newChildrenSelections = [...childrenSelections];
                        let catFound = false;
                        newChildrenSelections.forEach((s, index: number) => {
                          if (s.id === cat.id) {
                            newChildrenSelections[index].children =
                              selection.children;
                            catFound = true;
                          }
                        });
                        if (!catFound) {
                          newChildrenSelections.push({
                            id: cat.id,
                            children: [],
                          });
                        }
                        setChildrenSelections([...newChildrenSelections]);
                        mergeAndUpdateSelection(newChildrenSelections);
                      }}
                    />
                  ) : (
                    <div>
                      <div className='absolute right-12 flex h-[3.25rem] items-center'>
                        <Checkbox
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (checkboxValue.includes(cat.id)) {
                              setCheckboxValue(
                                checkboxValue.filter((v: any) => v != cat.id)
                              );
                            } else {
                              setCheckboxValue([...checkboxValue, cat.id]);
                            }
                          }}
                          checked={checkboxValue.includes(cat.id)}
                          id={`category-${section}-${types[0]}-${index}`}
                          className='h-5 w-5 border-white fill-white text-blue-400'
                        />
                      </div>
                      <div>
                        <AccordionTrigger
                          className={`ml-3 mr-7 flex justify-between rounded-2xl border-0 px-5 py-3 pr-10 text-white hover:no-underline ${cat.course_count === 0 ? "opacity-70" : ""}`}
                        >
                          <div className='flex flex-row items-center'>
                            <span className='mr-2 text-start text-[0.95rem] text-white xl:text-[1.05rem] 2xl:text-[1.25rem]'>
                              {cat.title}
                              <span className='mr-2 text-[0.65rem] text-white xl:text-[0.80rem] 2xl:text-[0.85rem]'>
                                ({cat.course_count}{" "}
                                {section === "field_introducer"
                                  ? "رشته"
                                  : "درس"}
                                )
                              </span>
                            </span>
                          </div>
                        </AccordionTrigger>
                      </div>
                    </div>
                  )}

                  <AccordionContent className='relative overflow-hidden p-0 pb-2'>
                    {types.length > 2 ? (
                      <SidebarLevel2
                        section={section}
                        types={types?.filter?.(
                          (type: any, index: number) => index > 0
                        )}
                        parentId={cat.id}
                        onChange={(selection: ChildrenSelection) => {
                          const newChildrenSelections = [...childrenSelections];
                          let catFound = false;
                          newChildrenSelections.forEach((s, index: number) => {
                            if (s.id === cat.id) {
                              newChildrenSelections[index].children =
                                selection.children;
                              catFound = true;
                            }
                          });
                          if (!catFound) {
                            newChildrenSelections.push({
                              id: cat.id,
                              children: [],
                            });
                          }
                          setChildrenSelections([...newChildrenSelections]);
                          mergeAndUpdateSelection(newChildrenSelections);
                        }}
                      />
                    ) : (
                      <SidebarLevel5
                        section={section}
                        type={types[1] || types[0]}
                        parentId={cat.id}
                        onChange={(selection: ChildrenSelection) => {
                          const newChildrenSelections = [...childrenSelections];
                          let catFound = false;
                          newChildrenSelections.forEach((s, index: number) => {
                            if (s.id === cat.id) {
                              newChildrenSelections[index].children =
                                selection.children;
                              catFound = true;
                            }
                          });
                          if (!catFound) {
                            newChildrenSelections.push({
                              id: cat.id,
                              children: [],
                            });
                          }
                          setChildrenSelections([...newChildrenSelections]);
                          mergeAndUpdateSelection(newChildrenSelections);
                        }}
                      />
                    )}
                  </AccordionContent>
                </AccordionItem>
              ) : null}
            </>
          )
        )
      ) : (
        <div className='relative  flex flex-col px-4 pr-8'>
          <Skeleton className='mb-2 h-12 w-full rounded-2xl bg-blue-600' />
          <Skeleton className='mb-2 h-12 w-full rounded-2xl bg-blue-600' />
          <Skeleton className='mb-2 h-12 w-full rounded-2xl bg-blue-600' />
        </div>
      )}
    </Accordion>
  );
}
