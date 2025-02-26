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
import { nextFetcher } from "@/utils/api/next-fetcher";
import { cn } from "@/utils/cn";
import { filter, flatten, get, map } from "lodash-es";
import { MultiSelectCheckBox } from "../MultiSelectCheckbox";
import { useDebounce } from "@/hooks/ui";

type CategoryLessonCheckboxMultiselectorType = {
  valueLoading?: boolean;
  label?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  className?: string;
};

export default function CategoryLessonCheckboxMultiselector({
  valueLoading,
  label = "عناوین دروس:",
  placeholder = "عنوان درس خود را انتخاب کنید...",
  name = "lesson",
  required,
  className,
}: CategoryLessonCheckboxMultiselectorType) {
  const form = useFormContext();

  const [search, setSearch] = useState("");

  const fields = form.watch("fields");
  const section = form.watch("section");
  const type = "lesson";

  const field_ids = filter(map(fields, "id"), (field) => field !== undefined);

  // Debounced search term
  const debouncedSearch = useDebounce(search, 1000); // Use a 500ms debounce
  const {
    data: lessonData,
    isLoading: lessonIsLoading,
    isValidating: lessonIsValidating,
    setSize: lessonSetSize,
    size: lessonSize,
  } = useSWRInfinite(
    (index) =>
      fields
        ? [
            routes.categoryRoutes.categories({ page: index + 1 }),
            section,
            type,
            fields,
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
          parent_ids: field_ids?.length ? field_ids : fields,
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
            <MultiSelectCheckBox
              {...field}
              list={
                lessons?.length
                  ? map(lessons, (item) => {
                      return { title: item.title, id: `${item.id}` };
                    })
                  : []
              }
              onSearch={setSearch}
              loading={lessonIsLoading}
              isValidating={lessonIsValidating}
              placeholder={placeholder}
              disabled={valueLoading || !fields?.length}
              defaultValue={
                field.value?.length
                  ? map(field.value, (item) => {
                      return { title: item.title, id: `${item.id}` };
                    })
                  : []
              }
              setSize={lessonSetSize}
              size={lessonSize}
              page_number={get(lessonData, "[0].page_number", 0)}
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
