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
import { useDebounce } from "@/hooks/ui";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { cn } from "@/utils/cn";
import { flatten, get, map } from "lodash-es";
import { MultiSelectCheckBox } from "../MultiSelectCheckbox";

type BranchCheckboxMultiselectorType = {
  valueLoading?: boolean;
  label?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  className?: string;
  sectionItem?: string;
};

export default function BranchCheckboxMultiselector({
  valueLoading,
  label = "شاخه ها:",
  placeholder = "شاخه خود را انتخاب کنید...",
  name = "branch",
  required,
  className,
  sectionItem,
}: BranchCheckboxMultiselectorType) {
  const form = useFormContext();

  const [search, setSearch] = useState("");
  // Debounced search term
  const debouncedSearch = useDebounce(search, 1000); // Use a 500ms debounce

  const section = sectionItem;
  const type = "branch";

  const {
    data: branchData,
    isLoading: branchIsLoading,
    isValidating: branchIsValidating,
    setSize: branchSetSize,
    size: branchSize,
  } = useSWRInfinite(
    (index) => [
      routes.categoryRoutes.categories({ page: index + 1 }),
      section,
      type,
      debouncedSearch,
    ],
    ([url]) =>
      nextFetcher({
        url,
        method: "POST",
        body: { type: type, section: section, q: debouncedSearch },
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  const branchs = flatten(map(branchData, "data"));

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
                branchs?.length
                  ? map(branchs, (item) => {
                      return { title: item.title, id: `${item.id}` };
                    })
                  : []
              }
              onSearch={setSearch}
              loading={branchIsLoading}
              isValidating={branchIsValidating}
              placeholder={placeholder}
              disabled={valueLoading}
              defaultValue={
                field.value?.length
                  ? map(field.value, (item) => {
                      return { title: item.title, id: `${item.id}` };
                    })
                  : []
              }
              setSize={branchSetSize}
              size={branchSize}
              page_number={get(branchData, "[0].page_number", 0)}
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
