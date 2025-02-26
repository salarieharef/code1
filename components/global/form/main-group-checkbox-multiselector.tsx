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
import { find, flatten, get, map } from "lodash-es";
import { MultiSelectCheckBox } from "../MultiSelectCheckbox";

type MainGroupCheckboxMultiselectorType = {
  valueLoading?: boolean;
  label?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  className?: string;
  sectionItem?: string;
};

export default function MainGroupCheckboxMultiselector({
  valueLoading,
  label = "گروه های اصلی:",
  placeholder = "گروه اصلی خود را انتخاب کنید...",
  name = "main_group",
  required,
  className,
  sectionItem,
}: MainGroupCheckboxMultiselectorType) {
  const form = useFormContext();

  const [search, setSearch] = useState("");
  // Debounced search term
  const debouncedSearch = useDebounce(search, 1000); // Use a 500ms debounce

  const section = sectionItem;
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
      routes.categoryRoutes.categories({
        page: index + 1,
      }),
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
            section === "school" && fieldValue ? map(fieldValue, "id") : [],
          q: debouncedSearch,
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
            <MultiSelectCheckBox
              {...field}
              list={
                mainGroups?.length
                  ? map(mainGroups, (item) => {
                      return { title: item?.title, id: `${item?.id}` };
                    })
                  : []
              }
              onSearch={setSearch}
              loading={mainGroupIsLoading}
              isValidating={mainGroupIsValidating}
              placeholder={placeholder}
              disabled={
                valueLoading || (section == "school" && !fieldValue?.length)
              }
              defaultValue={
                field.value?.length
                  ? map(field.value, (item) => {
                      const getTitle: any = !item?.title
                        ? find(mainGroups, { id: item })
                        : null;
                      return item?.title
                        ? { title: item?.title, id: `${item?.id}` }
                        : { title: getTitle?.title, id: `${getTitle?.id}` };
                    })
                  : []
              }
              setSize={mainGroupSetSize}
              size={mainGroupSize}
              page_number={get(mainGroupData, "[0].page_number", 0)}
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
