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

type StateAutocompleteType = {
  valueLoading?: boolean;
  label?: string;
  name?: string;
  className?: any;
  required?: boolean;
  disabled?: boolean;
};

export default function StateAutocomplete({
  valueLoading,
  label = "استان:",
  className,
  name = "state",
  required,
  disabled,
}: StateAutocompleteType) {
  const form = useFormContext();

  const [search, setSearch] = useState("");

  // const {
  //   data: statesData,
  //   isLoading: statesLoading,
  //   isValidating: stateIsValidating,
  //   setSize: stateSetSize,
  //   size: stateSize,
  // } = useSWRInfinite(
  //   (index) =>
  //     routes.homeRoutes.states({ page: index + 1, limit: 1000, q: search })
  //       ?.url,
  //   (url) => apiFetcher(url, routes.homeRoutes.states()?.method),
  //   {
  //     revalidateOnFocus: false,
  //   }
  // );

  const {
    data: statesData,
    isLoading: statesLoading,
    isValidating: stateIsValidating,
    setSize: stateSetSize,
    size: stateSize,
  } = useSWRInfinite(
    (index) =>
      routes.homeRoutes.states({ page: index + 1, limit: 1000, q: search })
        ?.url,
    (url) =>
      nextFetcher({
        url,
        method: routes.homeRoutes.states()?.method,
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  const states = flatten(map(statesData, "data"));

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
                  form.formState.errors?.state ? "border-r-destructive" : ""
                } w-full border-0 bg-secondary`,
                className
              )}
              disabled={valueLoading || disabled}
              loading={statesLoading}
              isValidating={stateIsValidating}
              setSize={stateSetSize}
              size={stateSize}
              page_number={get(statesData, "[0].page_number", 0)}
              onSearch={setSearch}
              defaultValue={field.value}
              list={
                states?.length
                  ? map(states, (item) => {
                      return { label: item?.name, value: `${item?.id}` };
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
