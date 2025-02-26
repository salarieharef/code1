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

type FieldMultiselectorType = {
  valueLoading?: boolean;
  label?: string;
  placeholder?: string;
  name?: string;
  standAlone?: boolean;
  required?: boolean;
};

export default function FieldMultiselector({
  valueLoading,
  label = "عناوین رشته ها:",
  placeholder = "عنوان رشته خود را انتخاب کنید...",
  name = "field",
  standAlone = false,
  required,
}: FieldMultiselectorType) {
  const form = useFormContext();

  const [search, setSearch] = useState("");
  // Debounced search term
  const debouncedSearch = useDebounce(search, 1000); // Use a 500ms debounce

  const side_group = standAlone ? "" : form.watch("side_group");
  const branch = standAlone ? "" : form.watch("branch");
  const section = standAlone ? "" : form.watch("section");
  const type = "field";

  const {
    data: fieldData,
    isLoading: fieldIsLoading,
    isValidating: fieldIsValidating,
    setSize: fieldSetSize,
    size: fieldSize,
  } = useSWRInfinite(
    (index) =>
      (standAlone ? standAlone : side_group || branch)
        ? [
            routes.categoryRoutes.categories({ page: index + 1 }),
            section,
            type,
            section === "school" ? "" : side_group,
            branch,
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
          parent_ids:
            section === "school" ? map(branch, "id") : map(side_group, "id"),
          q: debouncedSearch,
          version: 2,
        },
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  const fields = flatten(map(fieldData, "data"));

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
              disabled={
                standAlone
                  ? false
                  : valueLoading || (!branch?.length && !side_group?.length)
              }
              loading={fieldIsLoading}
              isValidating={fieldIsValidating}
              setSize={fieldSetSize}
              size={fieldSize}
              page_number={get(fieldData, "[0].page_number", 0)}
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
                fields?.length
                  ? map(fields, (item) => {
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
