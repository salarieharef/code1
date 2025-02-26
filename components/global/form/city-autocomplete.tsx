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

type CityAutocompleteType = {
  valueLoading?: boolean;
  label?: string;
  name?: string;
  className?: any;
  required?: boolean;
  disabled?: boolean;
};

export default function CityAutocomplete({
  valueLoading,
  label = "شهر:",
  className,
  name = "city",
  required,
  disabled,
}: CityAutocompleteType) {
  const form = useFormContext();

  const [search, setSearch] = useState("");

  const selectedState = form.watch("state");

  // const {
  //   data: citiesData,
  //   isLoading: citiesLoading,
  //   isValidating: cityIsValidating,
  //   setSize: citySetSize,
  //   size: citySize,
  // } = useSWRInfinite(
  //   (index) =>
  //     selectedState
  //       ? routes.homeRoutes.cities({
  //           state: selectedState,
  //           limit: 1000,
  //           page: index + 1,
  //           q: search,
  //         })?.url
  //       : null,
  //   (url) => apiFetcher(url, routes.homeRoutes.cities()?.method),
  //   {
  //     revalidateOnFocus: false,
  //   }
  // );

  const {
    data: citiesData,
    isLoading: citiesLoading,
    isValidating: cityIsValidating,
    setSize: citySetSize,
    size: citySize,
  } = useSWRInfinite(
    (index) =>
      selectedState
        ? routes.homeRoutes.cities({
            state: selectedState,
            limit: 1000,
            page: index + 1,
            q: search,
          })?.url
        : null,
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
  const cities = flatten(map(citiesData, "data"));

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
              className={cn(
                `col-span-3 text-slate-800 ${
                  form.formState.errors?.city ? "border-r-destructive" : ""
                } w-full border-0 bg-secondary`,
                className
              )}
              disabled={!form.watch("state") || valueLoading||disabled}
              loading={citiesLoading}
              isValidating={cityIsValidating}
              setSize={citySetSize}
              onSearch={setSearch}
              size={citySize}
              page_number={get(citiesData, "[0].page_number", 0)}
              defaultValue={field.value}
              list={
                cities?.length
                  ? map(cities, (item) => {
                      return { label: item.name, value: `${item.id}` };
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
