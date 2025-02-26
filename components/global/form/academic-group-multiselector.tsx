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

type AcademicGroupMultiselectorType = {
  valueLoading?: boolean;
  label?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  maxSelection?: number;
};

export default function AcademicGroupMultiselector({
  valueLoading,
  label = "گروه‌های تحصیلی:",
  placeholder = "گروه‌های تحصیلی خود را انتخاب کنید.",
  name = "academic_group",
  required,
  disabled,
  maxSelection = 5,
}: AcademicGroupMultiselectorType) {
  const form = useFormContext();

  const [search, setSearch] = useState("");
  // Debounced search term
  const debouncedSearch = useDebounce(search, 1000); // Use a 500ms debounce

  const section = form.watch("section");
  const type = "academic_group";

  const academic_branch = form.watch("academic_branch");

  // const {
  //   data: academicGroupData,
  //   isLoading: academicGroupIsLoading,
  //   isValidating: academicGroupIsValidating,
  //   setSize: academicGroupSetSize,
  //   size: academicGroupSize,
  // } = useSWRInfinite(
  //   (index) => [
  //     routes.categoryRoutes.categories({
  //       page: index + 1,
  //       q: search,
  //     }),
  //     section,
  //     type,
  //     search,
  //     academic_branch,
  //   ],
  //   ([url]) =>
  //     !!academic_branch
  //       ? postFetcher(url, {
  //           type: type,
  //           section: section,
  //           q: search,
  //           version: 2,
  //           parent_id: academic_branch,
  //         })
  //       : null,
  //   {
  //     revalidateOnFocus: false,
  //   }
  // );

  const {
    data: academicGroupData,
    isLoading: academicGroupIsLoading,
    isValidating: academicGroupIsValidating,
    setSize: academicGroupSetSize,
    size: academicGroupSize,
  } = useSWRInfinite(
    (index) => [
      routes.categoryRoutes.categories({
        page: index + 1,
      }),
      section,
      type,
      debouncedSearch,
      academic_branch,
    ],
    ([url]) =>
      !!academic_branch
        ? nextFetcher({
            url,
            method: "POST",
            body: {
              type: type,
              section: section,
              q: debouncedSearch,
              version: 2,
              parent_id: academic_branch,
            },
            useToken: true,
          })
        : null,
    {
      revalidateOnFocus: false,
    }
  );

  const academicGroups = flatten(map(academicGroupData, "data"));

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
                disabled ||
                valueLoading ||
                academicGroupIsLoading ||
                !!!academic_branch
              }
              loading={academicGroupIsLoading}
              isValidating={academicGroupIsValidating}
              setSize={academicGroupSetSize}
              size={academicGroupSize}
              page_number={get(academicGroupData, "[0].page_number", 0)}
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
                academicGroups?.length
                  ? map(academicGroups, (item) => {
                      return { title: item?.title, id: `${item?.id}` };
                    })
                  : []
              }
              maxSelection={maxSelection}
            />
          </FormControl>
          <FormMessage className='text-xs' />
        </FormItem>
      )}
    />
  );
}
