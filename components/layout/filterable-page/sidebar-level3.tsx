import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";
import { categoryRoutes } from "@/utils/api/routes/category.routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Checkbox } from "../../ui/checkbox";
import { ChildrenSelection } from "./sidebar-level1";
import SidebarLevel4 from "./sidebar-level4";
import SidebarLevel5 from "./sidebar-level5";
export default function SidebarLevel3({
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

  // const { data } = useSWR(
  //   [categoryRoutes.categories(), section, types[0], parentId],
  //   ([url]) =>
  //     postFetcher(url, { type: types[0], parent_id: parentId, section }),
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
        body: { type: types[0], parent_id: parentId, section },
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
                key={`category-${parentId}-side-${index}`}
                value={cat.id}
                className='p-y-0 mt-2 overflow-hidden border-0'
              >
                <div className='absolute right-24 flex h-[1.6125rem] items-center'>
                  <Checkbox
                    id={`category-${parentId}-side-${index}`}
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
                    className={`ml-4 mr-[4.75rem] flex justify-between border-0 px-4 py-1 pr-10 text-white hover:no-underline ${cat.course_count === 0 ? "opacity-70" : ""}`}
                  >
                    <div className='flex flex-row items-center '>
                      <span className='mr-2 text-right text-[0.75rem] text-white xl:text-[0.85rem] 2xl:text-[0.95rem]'>
                        {cat.title}
                        <span className='mr-2 text-[0.50rem] text-white xl:text-[0.65rem] 2xl:text-[0.70rem]'>
                          ({cat.course_count}{" "}
                          {section === "field_introducer" ? "رشته" : "درس"})
                        </span>
                      </span>
                    </div>
                  </AccordionTrigger>
                </div>
                <AccordionContent className='overflow-hidden p-0 pb-2'>
                  {types.length > 2 ? (
                    <SidebarLevel4
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
                    types[1] && (
                      <SidebarLevel5
                        section={section}
                        type={types[1]}
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
                    )
                  )}
                </AccordionContent>
              </AccordionItem>
            ) : null}
          </>
        ))
      ) : (
        <div className='relative ml-3 mt-2 flex flex-col px-5 py-1 pr-24'>
          <Skeleton className='mb-2 h-[1.5rem] w-full rounded-2xl bg-[#6578c0]' />
          <Skeleton className='mb-2 h-[1.5rem] w-full rounded-2xl bg-[#6578c0]' />
          <Skeleton className='mb-2 h-[1.5rem] w-full rounded-2xl bg-[#6578c0]' />
        </div>
      )}
    </Accordion>
  );
}
