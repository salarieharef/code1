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
import { useDebounce } from "@/hooks/ui";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { cn } from "@/utils/cn";
import { filter, flatten, get, map } from "lodash-es";
import { MultiSelectCheckBox } from "../MultiSelectCheckbox";

type SideGroupCheckboxMultiselectorType = {
  valueLoading?: boolean;
  label?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  className?: string;
  sectionItem?: string;
};

export default function SideGroupCheckboxMultiselector({
  valueLoading,
  label = "گروه های فرعی:",
  placeholder = "گروه فرعی خود را انتخاب کنید...",
  name = "side_group",
  required,
  className,
  sectionItem,
}: SideGroupCheckboxMultiselectorType) {
  const form = useFormContext();

  const [search, setSearch] = useState("");
  // Debounced search term
  const debouncedSearch = useDebounce(search, 1000); // Use a 500ms debounce

  const main_groups = form.watch("main_groups");
  const section = sectionItem;
  const type = "side_group";

  const main_group_ids = filter(
    map(main_groups, "id"),
    (main_group) => main_group !== undefined
  );

  const {
    data: sideGroupData,
    isLoading: sideGroupIsLoading,
    isValidating: sideGroupIsValidating,
    setSize: sideGroupSetSize,
    size: sideGroupSize,
  } = useSWRInfinite(
    (index) =>
      main_groups?.length
        ? [
            routes.categoryRoutes.categories({ page: index + 1 }),
            section,
            type,
            main_groups,
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
          parent_ids: main_group_ids?.length ? main_group_ids : main_groups,
          q: debouncedSearch,
        },
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  const sideGroups = flatten(map(sideGroupData, "data"));

  // Add additional item
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
            <MultiSelectCheckBox
              {...field}
              list={
                sideGroups?.length
                  ? map(sideGroups, (item) => {
                      return { title: item.title, id: `${item.id}` };
                    })
                  : []
              }
              onSearch={setSearch}
              loading={sideGroupIsLoading}
              isValidating={sideGroupIsValidating}
              placeholder={placeholder}
              disabled={valueLoading || !main_groups?.length}
              defaultValue={
                field.value?.length
                  ? map(field.value, (item) => {
                      return { title: item.title, id: `${item.id}` };
                    })
                  : []
              }
              setSize={sideGroupSetSize}
              size={sideGroupSize}
              page_number={get(sideGroupData, "[0].page_number", 0)}
              className={cn(
                `w-full border-r-4 focus:ring-0 focus:ring-offset-0 ${
                  form.formState.errors?.state
                    ? "border-r-destructive"
                    : "border-r-primary"
                } font-medium`,
                className
              )}
              inputClassName='bg-secondary'
            />
          </FormControl>
          <FormMessage className='text-xs' />
        </FormItem>
      )}
    />
  );
}
