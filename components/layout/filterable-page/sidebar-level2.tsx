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
import { ChildrenSelection } from "./sidebar-level1";
import SidebarLevel3 from "./sidebar-level3";
import SidebarLevel5 from "./sidebar-level5";

// Fetch imports
import { categoryRoutes } from "@/utils/api/routes/category.routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import useSWR from "swr";

export default function SidebarLevel2({
  parentId,
  types,
  section,
  onChange,
}: any) {
  const [childrenSelections, setChildrenSelections] = useState<
    ChildrenSelection[]
  >([]);

  const [itemsValue, setItemsValue] = useState<any>([]);
  const [checkboxValue, setCheckboxValue] = useState<any>([]);

  const payload: any = { type: types[0], section };
  if (
    !(section === "university" && types[0] === "main_group") &&
    !(section === "deep_learn" && types[0] === "main_group") &&
    !(section === "field_introducer" && types[0] === "main_group") &&
    section !== "school"
  ) {
    payload["parent_id"] = parentId;
  }
  // const { data } = useSWR(
  //   [categoryRoutes.categories(), section, types[0], parentId],
  //   ([url]) => postFetcher(url, payload),
  //   {
  //     revalidateOnFocus: false,
  //     dedupingInterval: 60000,
  //   }
  // );
  const { data } = useSWR(
    [categoryRoutes.categories(), section, types[0], parentId],
    ([url]) =>
      nextFetcher({
        url,
        method: "POST",
        body: payload,
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
      value={itemsValue}
      onValueChange={(items) => {
        setItemsValue(items);
      }}
    >
      {categories ? (
        categories?.map((cat: any, index: number) => (
          <>
            {cat.course_count ? (
              <AccordionItem
                key={`category-${section}-${types[0]}-${parentId}-sub-${index}`}
                value={cat.id}
                className='mt-2 overflow-hidden border-0 py-0'
              >
                <div className='absolute right-[4.5rem] flex h-[1.875rem] items-center'>
                  <Checkbox
                    id={`category-${section}-${types[0]}-${parentId}-sub-${index}`}
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
                <div>
                  <AccordionTrigger
                    className={`ml-3 mr-[3.25rem] flex justify-between border-0 px-5 py-1 pr-10 text-white hover:no-underline ${cat.course_count === 0 ? "opacity-70" : ""}`}
                  >
                    <div className='flex flex-row items-center '>
                      <span className='mr-2 text-[0.85rem] text-white xl:text-[0.975rem] 2xl:text-[1.1rem]'>
                        {cat.title}
                        <span className='mr-2 text-[0.55rem] text-white xl:text-[0.70rem] 2xl:text-[0.75rem]'>
                          ({cat.course_count}{" "}
                          {section === "field_introducer" ? "رشته" : "درس"})
                        </span>
                      </span>
                    </div>
                  </AccordionTrigger>
                </div>
                <AccordionContent className='relative overflow-hidden p-0 pb-2'>
                  {types.length > 2 ? (
                    <SidebarLevel3
                      types={types?.filter?.(
                        (type: any, index: number) => index > 0
                      )}
                      section={section}
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
        ))
      ) : (
        <div className='relative ml-3 mt-2 flex flex-col px-5 py-1 pr-16'>
          <Skeleton className='mb-2 h-[1.5rem] w-full rounded-2xl bg-[#6578c0]' />
          <Skeleton className='mb-2 h-[1.5rem] w-full rounded-2xl bg-[#6578c0]' />
          <Skeleton className='mb-2 h-[1.5rem] w-full rounded-2xl bg-[#6578c0]' />
        </div>
      )}
    </Accordion>
  );
}
