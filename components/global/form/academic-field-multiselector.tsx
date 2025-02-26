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
import { cn } from "@/utils/cn";
import { useDebounce } from "@/hooks/ui";

type AcademicFieldMultiselectorType = {
  valueLoading?: boolean;
  label?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  maxSelection?: number;
  className?: any;
};

export default function AcademicFieldMultiselector({
  valueLoading,
  label = "گرایش‌های تحصیلی:",
  placeholder = "گرایش های خود را انتخاب کنید.",
  name = "academic_field",
  required,
  disabled,
  maxSelection,
  className,
}: AcademicFieldMultiselectorType) {
  const form = useFormContext();

  const [search, setSearch] = useState("");
  // Debounced search term
  const debouncedSearch = useDebounce(search, 1000); // Use a 1000ms debounce

  const section = form.watch("section");
  const type = "academic_field";

  const academic_groups = form.watch("academic_group");

  const {
    data: academicFieldData,
    isLoading: academicFieldIsLoading,
    isValidating: academicFieldIsValidating,
    setSize: academicFieldSetSize,
    size: academicFieldSize,
  } = useSWRInfinite(
    (index) => [
      routes.categoryRoutes.categories({ page: index + 1 }),
      section,
      type,
      debouncedSearch,
      academic_groups,
    ],
    ([url]) =>
      academic_groups?.length
        ? nextFetcher({
            url,
            method: "POST",
            body: {
              type: type,
              section: section,
              q: debouncedSearch,
              version: 2,
              parent_ids: map(academic_groups, "id"),
            },
            useToken: true,
          })
        : null,
    {
      revalidateOnFocus: false,
    }
  );

  const academicFields = flatten(map(academicFieldData, "data"));

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
              className={cn(
                `col-span-3 text-slate-800 ${
                  form.formState.errors?.state ? "border-r-destructive" : ""
                } w-full border-0 bg-secondary`,
                className
              )}
              disabled={disabled || valueLoading || !academic_groups?.length}
              loading={academicFieldIsLoading}
              isValidating={academicFieldIsValidating}
              setSize={academicFieldSetSize}
              size={academicFieldSize}
              page_number={get(academicFieldData, "[0].page_number", 0)}
              onSearch={setSearch}
              defaultValue={
                field.value?.length
                  ? map(field.value, (item) => {
                      return {
                        title: item.title,
                        id: `${item.id}`,
                      };
                    })
                  : []
              }
              placeholder={placeholder}
              list={
                academicFields?.length
                  ? map(academicFields, (item) => {
                      return {
                        title: `${item?.parent?.title} -> ${item?.title}`,
                        id: `${item?.id}`,
                      };
                    })
                  : []
              }
              maxSelection={maxSelection} //pass limit
            />
          </FormControl>
          <FormMessage className='text-xs' />
        </FormItem>
      )}
    />
  );
}
