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

type CategoriesMultiselectorType = {
  valueLoading?: boolean;
  label?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: any;
  tooltip?: boolean;
};

export default function CategoriesCheckboxMultiselector({
  valueLoading,
  label,
  placeholder = "دسته بندی های خود را انتخاب کنید...",
  name = "custom_multi_select",
  required,
  disabled,
  loading,
  className,
  tooltip,
}: CategoriesMultiselectorType) {
  const form = useFormContext();

  const [search, setSearch] = useState("");
  // Debounced search term
  const debouncedSearch = useDebounce(search, 1000); // Use a 500ms debounce

  const {
    data: categoriesData,
    isLoading: categoriesIsLoading,
    isValidating: categoriesIsValidating,
    setSize: categoriesSetSize,
    size: categoriesSize,
  } = useSWRInfinite(
    (index) => [
      routes.categoryRoutes.categories({
        page: index + 1,
      }),
      debouncedSearch,
    ],
    ([url]) =>
      nextFetcher({
        url,
        method: "POST",
        body: { q: debouncedSearch },
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  const categories = flatten(map(categoriesData, "data"));

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
            {/* {tooltip ? <InfoTooltip message={"توضیحات"} />: null} */}
          </FormLabel>
          <FormControl>
            {/* <MultiSelect
              {...field}
              className={`col-span-3 text-slate-800 ${
                form.formState.errors?.state ? "border-r-destructive" : ""
              } w-full border-0 bg-secondary`}
              disabled={valueLoading}
              loading={categoriesIsLoading}
              isValidating={categoriesIsValidating}
              setSize={categoriesSetSize}
              size={categoriesSize}
              page_number={get(categoriesData, "[0].page_number", 0)}
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
                categories?.length
                  ? map(categories, (item) => {
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
              isValidating={categoriesIsValidating}
              setSize={categoriesSetSize}
              size={categoriesSize}
              page_number={get(categories, "[0].page_number", 0)}
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
                categories?.length
                  ? map(categories, (item) => {
                      return { title: item.title, id: `${item.id}` };
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
