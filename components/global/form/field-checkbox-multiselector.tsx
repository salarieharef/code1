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

type FieldCheckboxMultiselectorType = {
  valueLoading?: boolean;
  label?: string;
  placeholder?: string;
  name?: string;
  standAlone?: boolean;
  required?: boolean;
  className?: string;
};

export default function FieldCheckboxMultiselector({
  valueLoading,
  label = "عناوین رشته ها:",
  placeholder = "عنوان رشته خود را انتخاب کنید...",
  name = "field",
  standAlone = false,
  required,
  className,
}: FieldCheckboxMultiselectorType) {
  const form = useFormContext();

  const [search, setSearch] = useState("");
  // Debounced search term
  const debouncedSearch = useDebounce(search, 1000); // Use a 500ms debounce

  const side_groups = standAlone ? "" : form.watch("side_groups");
  const branches = standAlone ? "" : form.watch("branches");
  const section = standAlone ? "" : form.watch("section");
  const type = "field";

  const side_group_ids = filter(
    map(side_groups, "id"),
    (side_group) => side_group !== undefined
  );

  const branch_ids = filter(
    map(branches, "id"),
    (branch) => branch !== undefined
  );

  const {
    data: fieldData,
    isLoading: fieldIsLoading,
    isValidating: fieldIsValidating,
    setSize: fieldSetSize,
    size: fieldSize,
  } = useSWRInfinite(
    (index) =>
      (standAlone ? standAlone : side_groups || branches)
        ? [
            routes.categoryRoutes.categories({ page: index + 1 }),
            section,
            type,
            section === "school" ? "" : side_groups,
            branches,
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
            section === "school"
              ? branch_ids?.length
                ? branch_ids
                : branches
              : side_group_ids?.length
                ? side_group_ids
                : side_groups,
          q: debouncedSearch,
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
            <MultiSelectCheckBox
              {...field}
              list={
                fields?.length
                  ? map(fields, (item) => {
                      return { title: item.title, id: `${item.id}` };
                    })
                  : []
              }
              onSearch={setSearch}
              loading={fieldIsLoading}
              isValidating={fieldIsValidating}
              placeholder={placeholder}
              disabled={
                standAlone
                  ? false
                  : valueLoading || (!branches?.length && !side_groups?.length)
              }
              defaultValue={
                field.value?.length
                  ? map(field.value, (item) => {
                      return { title: item.title, id: `${item.id}` };
                    })
                  : []
              }
              setSize={fieldSetSize}
              size={fieldSize}
              page_number={get(fieldData, "[0].page_number", 0)}
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
