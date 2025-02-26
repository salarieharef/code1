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
import { cn } from "@/utils/cn";
import { flatten, get, map } from "lodash-es";

type UniversityAutocompleteType = {
  valueLoading?: boolean;
  label?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  className?: any;
};

export default function UniversityAutocomplete({
  valueLoading,
  label = "واحد دانشگاهی:",
  required,
  disabled,
  className,
  name = "university",
}: UniversityAutocompleteType) {
  const form = useFormContext();

  const [search, setSearch] = useState("");

  const {
    data: universitiesData,
    isLoading: universitiesLoading,
    isValidating: universityIsValidating,
    setSize: setUniversitySize,
    size: universitySize,
  } = useSWRInfinite(
    (index) => {
      const { url, method } = routes.homeRoutes.universities({
        page: index + 1,
        limit: 1000,
      });
      return { url, method, search: search };
    },
    ({ url, method }) =>
      nextFetcher({
        url,
        method,
        body: { q: search },
        // useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  const universities = flatten(map(universitiesData, "data"));

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
                  form.formState.errors?.university
                    ? "border-r-destructive"
                    : ""
                } w-full border-0 bg-secondary`,
                className
              )}
              disabled={valueLoading || disabled}
              loading={universitiesLoading}
              isValidating={universityIsValidating}
              setSize={setUniversitySize}
              size={universitySize}
              page_number={get(universitiesData, "[0].page_number", 0)}
              onSearch={setSearch}
              defaultValue={field.value}
              list={
                universities?.length
                  ? map(universities, (item) => {
                      return {
                        label: `${item?.code ? `${item?.code} -` : ""} ${
                          item.name
                        }`,
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
