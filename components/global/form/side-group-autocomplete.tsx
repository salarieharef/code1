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

type SideGroupAutocompleteType = {
  valueLoading?: boolean;
  label?: string;
  placeholder?: string;
  name?: string;
};

export default function SideGroupAutocomplete({
  valueLoading,
  label = "گروه فرعی:",
  placeholder = "گروه فرعی خود را انتخاب کنید...",
  name = "side_group",
}: SideGroupAutocompleteType) {
  const form = useFormContext();

  const [search, setSearch] = useState("");

  const main_group = form.watch("main_group");
  const section = form.watch("section");
  const type = "side_group";

  const {
    data: sideGroupData,
    isLoading: sideGroupIsLoading,
    isValidating: sideGroupIsValidating,
    setSize: sideGroupSetSize,
    size: sideGroupSize,
  } = useSWRInfinite(
    (index) =>
      main_group
        ? [
            routes.categoryRoutes.categories({ page: index + 1 }),
            section,
            type,
            main_group,
            search,
          ]
        : null,
    ([url]) =>
      nextFetcher({
        url,
        method: "POST",
        body: {
          type: type,
          section: section,
          parent_id: main_group,
          q: search,
        },
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  const sideGroups = flatten(map(sideGroupData, "data"));

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
              disabled={valueLoading || !main_group}
              loading={sideGroupIsLoading}
              isValidating={sideGroupIsValidating}
              setSize={sideGroupSetSize}
              size={sideGroupSize}
              page_number={get(sideGroupData, "[0].page_number", 0)}
              onSearch={setSearch}
              defaultValue={field.value}
              placeholder={placeholder}
              list={
                sideGroups?.length
                  ? map(sideGroups, (item) => {
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
