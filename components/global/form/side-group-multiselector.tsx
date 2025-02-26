"use client";
import { useState } from "react";

// Component imports
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Icon imports
import { Loader2 } from "lucide-react";

// Form imports
import { useFormContext } from "react-hook-form";

// Fetch imports
import routes from "@/utils/api/routes";
import useSWRInfinite from "swr/infinite";

// Util imports
import { MultiSelect } from "@/components/ui/multi-select";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { flatten, get, map } from "lodash-es";
import { useDebounce } from "@/hooks/ui";

type SideGroupMultiselectorType = {
  valueLoading?: boolean;
  label?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
};

export default function SideGroupMultiselector({
  valueLoading,
  label = "گروه های فرعی:",
  placeholder = "گروه فرعی خود را انتخاب کنید...",
  name = "side_group",
  required,
  disabled,
}: SideGroupMultiselectorType) {
  const form = useFormContext();

  const [search, setSearch] = useState("");
  // Debounced search term
  const debouncedSearch = useDebounce(search, 1000); // Use a 500ms debounce

  const main_group = form.watch("main_group");
  const section = form.watch("section");
  const type = "side_group";

  const {
    data: sideGroupData,
    isLoading: sideGroupIsLoading,
    isValidating: sideGroupIsValidating,
    setSize: sideGroupSetSize,
    size: sideGroupSize,
  } = useSWRInfinite(
    (index) =>
      main_group?.length
        ? [
            routes.categoryRoutes.categories({ page: index + 1 }),
            section,
            type,
            main_group,
            debouncedSearch,
          ]
        : null,
    ([url]) =>
      nextFetcher({
        url,
        method: "POST",
        body: {
          type: type,
          section: section,
          parent_ids: section !== "skill" ? map(main_group, "id") : [], // Only send parent_ids for sections other than 'skill'
          q: debouncedSearch,
          version: 2,
        },
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  const sideGroups = flatten(map(sideGroupData, "data"));

  // Add additional item for skill section
  if (section === "skill")
    sideGroups.push({
      type: "main_group",
      title: "سایر",
      id: 0,
    });

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='text-right'>
          <FormLabel className='flex items-center gap-2'>
            {label}
            {valueLoading ? <Loader2 className='h-5 w-5 animate-spin' /> : null}
            {required ? <span className='text-destructive'>*</span> : null}
          </FormLabel>
          <FormControl>
            <MultiSelect
              {...field}
              className={`col-span-3 text-slate-800 ${
                form.formState.errors?.state ? "border-r-destructive" : ""
              } w-full border-0 bg-secondary`}
              disabled={disabled || valueLoading || !main_group?.length}
              loading={sideGroupIsLoading}
              isValidating={sideGroupIsValidating}
              setSize={sideGroupSetSize}
              size={sideGroupSize}
              page_number={get(sideGroupData, "[0].page_number", 0)}
              onSearch={setSearch}
              defaultValue={
                field.value?.length
                  ? map(field.value, (item) => {
                      return {
                        title: item.title,
                        id: `${item.id}`,
                        children_count: `${item?.children_count}`,
                      };
                    })
                  : []
              }
              placeholder={placeholder}
              list={
                sideGroups?.length
                  ? map(sideGroups, (item) => {
                      return {
                        title: item.title,
                        id: `${item.id}`,
                        children_count: `${item?.children_count}`,
                      };
                    })
                  : []
              }
            />
          </FormControl>
          <FormMessage className='text-xs' />
        </FormItem>
      )}
    />
  );
}
