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

type MainGroupAutocompleteType = {
  valueLoading?: boolean;
  label?: string;
  placeholder?: string;
  name?: string;
};

export default function MainGroupAutocomplete({
  valueLoading,
  label = "گروه اصلی:",
  placeholder = "گروه اصلی خود را انتخاب کنید...",
  name = "main_group",
}: MainGroupAutocompleteType) {
  const form = useFormContext();

  const [search, setSearch] = useState("");

  const section = form.watch("section");
  const fieldValue = form.watch("field");
  const type = "main_group";

  const {
    data: mainGroupData,
    isLoading: mainGroupIsLoading,
    isValidating: mainGroupIsValidating,
    setSize: mainGroupSetSize,
    size: mainGroupSize,
  } = useSWRInfinite(
    (index) => [
      routes.categoryRoutes.categories({ page: index + 1 }),
      section,
      type,
      fieldValue,
      search,
    ],
    ([url]) =>
      nextFetcher({
        url,
        method: "POST",
        body: {
          type: type,
          section: section,
          parent_id: section === "school" ? fieldValue : "",
          q: search,
        },
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  const mainGroups = flatten(map(mainGroupData, "data"));

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
              disabled={valueLoading || (section == "school" && !fieldValue)}
              loading={mainGroupIsLoading}
              isValidating={mainGroupIsValidating}
              setSize={mainGroupSetSize}
              size={mainGroupSize}
              page_number={get(mainGroupData, "[0].page_number", 0)}
              onSearch={setSearch}
              defaultValue={field.value}
              placeholder={placeholder}
              list={
                mainGroups?.length
                  ? map(mainGroups, (item) => {
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
