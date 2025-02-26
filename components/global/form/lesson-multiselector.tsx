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

type LessonMultiselectorType = {
  valueLoading?: boolean;
  label?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
};

export default function LessonMultiselector({
  valueLoading,
  label = "عناوین دروس: (ورژن یک)",
  placeholder = "عنوان درس خود را انتخاب کنید...",
  name = "lesson",
  required,
}: LessonMultiselectorType) {
  const form = useFormContext();

  const [search, setSearch] = useState("");
  // Debounced search term
  const debouncedSearch = useDebounce(search, 1000); // Use a 500ms debounce

  const fieldValue = form.watch("field");
  const section = form.watch("section");
  const type = "lesson";

  const {
    data: lessonData,
    isLoading: lessonIsLoading,
    isValidating: lessonIsValidating,
    setSize: lessonSetSize,
    size: lessonSize,
  } = useSWRInfinite(
    (index) =>
      fieldValue
        ? [
            routes.categoryRoutes.categories({ page: index + 1 }),
            section,
            type,
            fieldValue,
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
          parent_ids: map(fieldValue, "id"),
          q: debouncedSearch,
        },
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  const lessons = flatten(map(lessonData, "data"));

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
              disabled={valueLoading || !fieldValue?.length}
              loading={lessonIsLoading}
              isValidating={lessonIsValidating}
              setSize={lessonSetSize}
              size={lessonSize}
              page_number={get(lessonData, "[0].page_number", 0)}
              onSearch={setSearch}
              defaultValue={
                field.value?.length
                  ? map(field.value, (item) => {
                      return { title: item.title, id: `${item.id}` };
                    })
                  : []
              }
              placeholder={placeholder}
              list={
                lessons?.length
                  ? map(lessons, (item) => {
                      return {
                        title: `${item.title} (${item.code})`,
                        id: `${item.id}`,
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
