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
import { useDebounce } from "@/hooks/ui";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { flatten, get, map } from "lodash-es";

type MainGroupMultiselectorType = {
  valueLoading?: boolean;
  label?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
};

export default function MainGroupMultiselector({
  valueLoading,
  label = "گروه های اصلی:",
  placeholder = "گروه اصلی خود را انتخاب کنید...",
  name = "main_group",
  required,
  disabled,
}: MainGroupMultiselectorType) {
  const form = useFormContext();

  const [search, setSearch] = useState("");
  // Debounced search term
  const debouncedSearch = useDebounce(search, 1000); // Use a 500ms debounce

  const section = form.watch("section");
  const fieldValue = form.watch("field");
  const type = "main_group";

  const {
    data: mainGroupData,
    isLoading: mainGroupIsLoading,
    isValidating: mainGroupIsValidating,
    setSize: mainGroupSetSize,
    size: mainGroupSize,
  } = useSWRInfinite(
    (index) => [
      routes.categoryRoutes.categories({ page: index + 1 }),
      section,
      type,
      fieldValue,
      debouncedSearch,
    ],
    ([url]) =>
      nextFetcher({
        url,
        method: "POST",
        body: {
          type: type,
          section: section,
          parent_ids:
            section == "school" && fieldValue ? map(fieldValue, "id") : [],
          q: debouncedSearch,
          version: 2,
        },
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  const mainGroups = mainGroupData?.length
    ? flatten(map(mainGroupData, "data"))
    : [];

  // Add additional item
  if (section === "skill")
    mainGroups.push({
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
              // disabled={
              //   valueLoading || (section == "school" && !fieldValue?.length)
              // }
              disabled={disabled}
              loading={mainGroupIsLoading}
              isValidating={mainGroupIsValidating}
              setSize={mainGroupSetSize}
              size={mainGroupSize}
              page_number={get(
                mainGroupData?.length ? mainGroupData?.length : [],
                "[0].page_number",
                0
              )}
              onSearch={setSearch}
              defaultValue={
                field?.value?.length
                  ? map(field?.value, (item) => {
                      return {
                        title: `${item?.title}`,
                        id: `${item?.id}`,
                        children_count: `${item?.children_count}`,
                      };
                    })
                  : []
              }
              placeholder={placeholder}
              list={
                mainGroups && mainGroups?.length
                  ? map(mainGroups, (item) => {
                      return {
                        title: `${item?.title}`,
                        id: `${item?.id}`,
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
