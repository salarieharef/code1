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

type LessonAutocompleteType = {
  valueLoading?: boolean;
  label?: string;
  placeholder?: string;
  name?: string;
};

export default function LessonAutocomplete({
  valueLoading,
  label = "عنوان درس:",
  placeholder = "عنوان درس خود را انتخاب کنید...",
  name = "lesson",
}: LessonAutocompleteType) {
  const form = useFormContext();

  const [search, setSearch] = useState("");

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
            search,
          ]
        : null,
    ([url]) =>
      nextFetcher({
        url,
        method: "POST",
        body: {
          type: type,
          section: section,
          parent_id: fieldValue,
          q: search,
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
          </FormLabel>
          <FormControl>
            <Autocomplete
              {...field}
              className={`col-span-3 text-slate-800 ${
                form.formState.errors?.state ? "border-r-destructive" : ""
              } w-full border-0 bg-secondary`}
              disabled={valueLoading || !fieldValue}
              loading={lessonIsLoading}
              isValidating={lessonIsValidating}
              setSize={lessonSetSize}
              size={lessonSize}
              page_number={get(lessonData, "[0].page_number", 0)}
              onSearch={setSearch}
              defaultValue={field.value}
              placeholder={placeholder}
              list={
                lessons?.length
                  ? map(lessons, (item) => {
                      return {
                        label: `${item.title} (${item.code})`,
                        value: `${item.id}`,
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
