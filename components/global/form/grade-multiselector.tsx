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

type GradeMultiselectorType = {
  valueLoading?: boolean;
  label?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
};

export default function GradeMultiselector({
  valueLoading,
  label = "مقاطع: (ورژن یک)",
  placeholder = "مقطع خود را انتخاب کنید...",
  name = "grade",
  required,
}: GradeMultiselectorType) {
  const form = useFormContext();

  const [search, setSearch] = useState("");
  // Debounced search term
  const debouncedSearch = useDebounce(search, 1000); // Use a 500ms debounce

  const section = form.watch("section");
  const type = "grade";

  const {
    data: gradeData,
    isLoading: gradeIsLoading,
    isValidating: gradeIsValidating,
    setSize: gradeSetSize,
    size: gradeSize,
  } = useSWRInfinite(
    (index) => [
      routes.categoryRoutes.categories({ page: index + 1 }),
      section,
      type,
      debouncedSearch,
    ],
    ([url]) =>
      nextFetcher({
        url,
        method: "POST",
        body: { type: type, section: section, q: debouncedSearch },
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  const grades = flatten(map(gradeData, "data"));

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
              list={
                grades?.length
                  ? map(grades, (item) => {
                      return { title: item.title, id: `${item.id}` };
                    })
                  : []
              }
              onSearch={setSearch}
              loading={gradeIsLoading}
              isValidating={gradeIsValidating}
              placeholder={placeholder}
              disabled={valueLoading}
              defaultValue={
                field.value?.length
                  ? map(field.value, (item) => {
                      return { title: item.title, id: `${item.id}` };
                    })
                  : []
              }
              setSize={gradeSetSize}
              size={gradeSize}
              page_number={get(gradeData, "[0].page_number", 0)}
              className={`col-span-3 text-slate-800 ${
                form.formState.errors?.state ? "border-r-destructive" : ""
              } w-full border-0 bg-secondary`}
            />
          </FormControl>
          <FormMessage className='text-xs' />
        </FormItem>
      )}
    />
  );
}
