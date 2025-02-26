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

type GradeAutocompleteType = {
  valueLoading?: boolean;
  label?: string;
  placeholder?: string;
  name?: string;
};

export default function BranchAutocomplete({
  valueLoading,
  label = "شاخه:",
  placeholder = "شاخه خود را انتخاب کنید...",
  name = "branch",
}: GradeAutocompleteType) {
  const form = useFormContext();

  const [search, setSearch] = useState("");

  const section = form.watch("section");
  const type = "branch";

  const {
    data: gradeData,
    isLoading: gradeIsLoading,
    isValidating: gradeIsValidating,
    setSize: gradeSetSize,
    size: gradeSize,
  } = useSWRInfinite(
    (index) => [
      routes.categoryRoutes.categories({ page: index + 1 }),
      section,
      type,
      search,
    ],
    ([url]) =>
      nextFetcher({
        url,
        method: "POST",
        body: { type: type, section: section, q: search },
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  const grades = flatten(map(gradeData, "data"));

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
              disabled={valueLoading}
              loading={gradeIsLoading}
              isValidating={gradeIsValidating}
              setSize={gradeSetSize}
              size={gradeSize}
              page_number={get(gradeData, "[0].page_number", 0)}
              onSearch={setSearch}
              defaultValue={field.value}
              placeholder={placeholder}
              list={
                grades?.length
                  ? map(grades, (item) => {
                      return { label: item.title, value: `${item.id}` };
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
