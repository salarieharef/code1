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

type UniversityPlaceMultiselectorType = {
  valueLoading?: boolean;
  label?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: any;
  isAllItem?: boolean;
};

export default function UniversityPlaceCheckboxMultiselector({
  valueLoading,
  label,
  placeholder = "دسته بندی های خود را انتخاب کنید...",
  name = "university_place",
  required,
  disabled,
  loading,
  className,
  isAllItem,
}: UniversityPlaceMultiselectorType) {
  const form = useFormContext();

  const [search, setSearch] = useState("");

  // Debounced search term
  const debouncedSearch = useDebounce(search, 1000); //

  const states = form.watch("states");

  // const {
  //   data: universitiesData,
  //   isLoading: universitiesLoading,
  //   isValidating: universityIsValidating,
  //   setSize: setUniversitySize,
  //   size: universitySize,
  // } = useSWRInfinite(
  //   (index) => [
  //     routes.homeRoutes.universities({
  //       page: index + 1,
  //       q: search,
  //     })?.url,
  //     states,
  //   ],
  //   ([url]) =>
  //     apiFetcher(url, routes.homeRoutes.universities()?.method, {
  //       state_id: states?.[0]?.id,
  //     }),
  //   {
  //     revalidateOnFocus: false,
  //   }
  // );
  const {
    data: universitiesData,
    isLoading: universitiesLoading,
    isValidating: universityIsValidating,
    setSize: setUniversitySize,
    size: universitySize,
  } = useSWRInfinite(
    (index) => [
      routes.homeRoutes.universities({
        page: index + 1,
      })?.url,
      states,
    ],
    ([url]) =>
      nextFetcher({
        url,
        method: routes.homeRoutes.universities()?.method,
        body: {
          state_id: states?.[0]?.id,
          q: debouncedSearch,
        },
        // useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  const universities = flatten(map(universitiesData, "data"));
  // const allOption = { title: "همه", id: "all" };
  const allOption = { name: "همه", id: "all" };
  const allUniversities = [allOption, ...universities];

  const Items =
    isAllItem && universities.length >= 2 ? allUniversities : [...universities];
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='space-y-0 text-right'>
          <FormLabel className='flex items-center gap-2'>
            {label}
            {valueLoading ? <Loader2 className='h-5 w-5 animate-spin' /> : null}
            {required ? <span className='text-destructive'>*</span> : null}
          </FormLabel>
          <FormControl>
            {/* <MultiSelect
              {...field}
              className={`col-span-3 text-slate-800 ${
                form.formState.errors?.state ? "border-r-destructive" : ""
              } w-full border-0 bg-secondary`}
              disabled={valueLoading}
              loading={universitiesIsLoading}
              isValidating={universitiesIsValidating}
              setSize={universitiesSetSize}
              size={universitiesSize}
              page_number={get(universitiesData, "[0].page_number", 0)}
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
                universities?.length
                  ? map(universities, (item) => {
                      return { title: item.title, id: `${item.id}` };
                    })
                  : []
              }
            /> */}

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
              disabled={disabled || valueLoading}
              loading={loading}
              isValidating={universityIsValidating}
              setSize={setUniversitySize}
              size={universitySize}
              page_number={get(universities, "[0].page_number", 0)}
              onSearch={setSearch}
              defaultValue={
                field.value?.length
                  ? map(field.value, (item) => {
                      // console.log("universe item", item);

                      return { title: item.name, id: `${item.id}` };
                    })
                  : []
              }
              placeholder={placeholder}
              list={
                Items?.length
                  ? map(Items, (item) => {
                      return { title: item.name, id: `${item.id}` };
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
