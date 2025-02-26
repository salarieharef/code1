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

type AcademicBranchAutocompleteType = {
  valueLoading?: boolean;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  name?: string;
};

export default function AcademicBranchAutocomplete({
  valueLoading,
  label = "شاخه تحصیلی:",
  placeholder = "شاخه تحصیلی خود را انتخاب کنید.",
  required,
  disabled,
  name = "academic_branch",
}: AcademicBranchAutocompleteType) {
  const form = useFormContext();

  const [search, setSearch] = useState("");

  const section = form.watch("section");
  const type = "academic_branch";

  const {
    data: academicBranchData,
    isLoading: academicBranchIsLoading,
    isValidating: academicBranchIsValidating,
    setSize: academicBranchSetSize,
    size: academicBranchSize,
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
        body: {
          type: type,
          section: section,
          q: search,
          version: 2,
        },
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  const academic_branches = flatten(map(academicBranchData, "data"));

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
            <Autocomplete
              {...field}
              className={`col-span-3 text-slate-800 ${
                form.formState.errors?.state ? "border-r-destructive" : ""
              } w-full border-0 bg-secondary`}
              disabled={valueLoading||disabled}
              loading={academicBranchIsLoading}
              isValidating={academicBranchIsValidating}
              setSize={academicBranchSetSize}
              size={academicBranchSize}
              page_number={get(academicBranchData, "[0].page_number", 0)}
              onSearch={setSearch}
              defaultValue={field.value}
              placeholder={placeholder}
              list={
                academic_branches?.length
                  ? map(academic_branches, (item) => {
                      return { label: item?.title, value: `${item?.id}` };
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
