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

type CitiesMultiselectorType = {
  valueLoading?: boolean;
  label?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: any;
};

export default function CitiesCheckboxMultiselector({
  valueLoading,
  label,
  placeholder = "دسته بندی های خود را انتخاب کنید...",
  name = "state",
  required,
  disabled,
  loading,
  className,
}: CitiesMultiselectorType) {
  const form = useFormContext();

  const [search, setSearch] = useState("");

  const selectedState = form.watch("states");
  // Debounced search term
  const debouncedSearch = useDebounce(search, 1000); // Use a 500ms debounce

  // const {
  //   data: citiesData,
  //   isLoading: citiesLoading,
  //   isValidating: citiesIsValidating,
  //   setSize: citiesSetSize,
  //   size: citiesSize,
  // } = useSWRInfinite(
  //   (index) =>
  //     routes.homeRoutes.cities({
  //       state: map(selectedState, "id"),
  //       page: index + 1,
  //       limit: 1000,
  //       q: search,
  //     })?.url,
  //   (url) => apiFetcher(url, routes.homeRoutes.cities()?.method),
  //   {
  //     revalidateOnFocus: false,
  //   }
  // );

  const {
    data: citiesData,
    isLoading: citiesLoading,
    isValidating: citiesIsValidating,
    setSize: citiesSetSize,
    size: citiesSize,
  } = useSWRInfinite(
    (index) =>
      routes.homeRoutes.cities({
        state: map(selectedState, "id"),
        page: index + 1,
        limit: 1000,
        q: debouncedSearch,
      })?.url,
    (url) =>
      nextFetcher({
        url,
        method: routes.homeRoutes.cities()?.method,
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );
  // console.log("citiesData", citiesData);

  const cities = flatten(map(citiesData, "data"));

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
              loading={citiesIsLoading}
              isValidating={citiesIsValidating}
              setSize={citiesSetSize}
              size={citiesSize}
              page_number={get(citiesData, "[0].page_number", 0)}
              onSearch={setSearch}
              defaultValue={
                field.value?.length
                  ? map(field.value, (item) => {
                      return { title: item.name, id: `${item.id}` };
                    })
                  : []
              }
              placeholder={placeholder}
              list={
                cities?.length
                  ? map(cities, (item) => {
                      return { title: item.name, id: `${item.id}` };
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
              isValidating={citiesIsValidating}
              setSize={citiesSetSize}
              size={citiesSize}
              page_number={get(cities, "[0].page_number", 0)}
              onSearch={setSearch}
              defaultValue={
                field.value?.length
                  ? map(field.value, (item) => {
                      return { title: item.name, id: `${item.id}` };
                    })
                  : []
              }
              placeholder={placeholder}
              list={
                cities?.length
                  ? map(cities, (item) => {
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
