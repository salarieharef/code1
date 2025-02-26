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
import { flatten, get, map } from "lodash-es";
import { MultiSelectCheckBox } from "../MultiSelectCheckbox";
import { useDebounce } from "@/hooks/ui";

type TeacherMultiselectorType = {
  valueLoading?: boolean;
  label?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  isAllItem?: boolean;
};

export default function TeacherCheckboxMultiselect({
  valueLoading,
  label,
  placeholder = "عنوان مدرس خود را انتخاب کنید...",
  name = "teacher",
  required,
  className,
  isAllItem,
}: TeacherMultiselectorType) {
  const form = useFormContext();

  const [search, setSearch] = useState("");
  // Debounced search term
  const debouncedSearch = useDebounce(search, 1000); // Use a 500ms debounce

  const {
    data: teacherData,
    isLoading: teacherIsLoading,
    isValidating: teacherIsValidating,
    setSize: teacherSetSize,
    size: teacherSize,
  } = useSWRInfinite(
    (index) => [
      routes.teacherRoutes.teachers({ page: index + 1 }),
      debouncedSearch,
    ],
    ([url]) =>
      nextFetcher({
        url,
        method: "POST",
        body: {
          q: debouncedSearch,
        },
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  const teachers = flatten(map(teacherData, "data"));

  // const allOption = { title: "همه", id: "all" };
  const allOption = { name: "همه", id: "all" };
  const allTeachers = [allOption, ...teachers];

  const Items = isAllItem && teachers.length >= 2 ? allTeachers : [...teachers];

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='text-right'>
          {label ? (
            <FormLabel className='flex items-center gap-2'>
              {label}
              {valueLoading ? (
                <Loader2 className='h-5 w-5 animate-spin' />
              ) : null}
              {required ? <span className='text-destructive'>*</span> : null}
            </FormLabel>
          ) : null}
          <FormControl>
            <MultiSelectCheckBox
              {...field}
              className={cn(
                `w-full border-r-4 focus:ring-0 focus:ring-offset-0 ${
                  form.formState.errors?.state
                    ? "border-r-destructive"
                    : "border-r-primary"
                } font-medium`,
                className
              )}
              disabled={valueLoading}
              loading={teacherIsLoading}
              isValidating={teacherIsValidating}
              setSize={teacherSetSize}
              size={teacherSize}
              page_number={get(teachers, "[0].page_number", 0)}
              onSearch={setSearch}
              defaultValue={
                field.value?.length
                  ? map(field.value, (item) => {
                      return {
                        title: item.name,
                        id: `${item.id}`,
                      };
                    })
                  : []
              }
              placeholder={placeholder}
              list={
                Items?.length
                  ? map(Items, (item) => {
                      return {
                        title: item.name,
                        id: `${item.id}`,
                      };
                    })
                  : []
              }
              inputClassName='bg-secondary'
            />
          </FormControl>
          <FormMessage className='text-xs' />
        </FormItem>
      )}
    />
  );
}
