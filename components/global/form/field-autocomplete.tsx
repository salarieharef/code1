"use client";
import { useState } from "react";

// Component imports
import { Autocomplete } from "@/components/ui/autocomplete";
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
import { nextFetcher } from "@/utils/api/next-fetcher";
import { flatten, get, map } from "lodash-es";
import { cn } from "@/utils/cn";

type FieldAutocompleteType = {
  valueLoading?: boolean;
  label?: string;
  placeholder?: string;
  name?: string;
  standAlone?: boolean;
  className?: any;
  required?: boolean;
  disabled?: boolean;
};

export default function FieldAutocomplete({
  valueLoading,
  label = "عنوان رشته:",
  placeholder = "عنوان رشته خود را انتخاب کنید...",
  name = "field",
  standAlone = false,
  className,
  required,
  disabled,
}: FieldAutocompleteType) {
  const form = useFormContext();

  const [search, setSearch] = useState("");

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
            routes.fieldRoutes.fields({ page: index + 1, q: search })?.url,
            section,
            type,
            section === "school" ? "" : side_group,
            branch,
            search,
          ]
        : null,
    ([url]) =>
      nextFetcher({
        url,
        method: routes.fieldRoutes.fields()?.method,
        body: {
          type: type,
          section: section,
          parent_id: section === "school" ? branch : side_group,
          q: search,
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
            {required ? <span className='text-destructive'>*</span> : null}
            {valueLoading ? <Loader2 className='h-5 w-5 animate-spin' /> : null}
          </FormLabel>
          <FormControl>
            <Autocomplete
              {...field}
              onChange={field.onChange}
              className={cn(
                `col-span-3 text-slate-800 ${
                  form.formState.errors?.state ? "border-r-destructive" : ""
                } w-full border-0 bg-secondary`,
                className
              )}
              disabled={
                disabled ||
                (standAlone ? false : valueLoading || (!branch && !side_group))
              }
              loading={fieldIsLoading}
              isValidating={fieldIsValidating}
              setSize={fieldSetSize}
              size={fieldSize}
              page_number={get(fieldData, "[0].page_number", 0)}
              onSearch={setSearch}
              allowCreate={true}
              defaultValue={field.value}
              placeholder={placeholder}
              list={
                fields?.length
                  ? map(fields, (item) => {
                      return { label: item?.name, value: `${item?.id}` };
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
