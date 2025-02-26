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
import { MultiSelect } from "@/components/ui/multi-select";
import { useDebounce } from "@/hooks/ui";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { flatten, get, map } from "lodash-es";

type BranchMultiselectorType = {
  valueLoading?: boolean;
  label?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  maxSelection?: number; //
};

export default function BranchMultiselector({
  valueLoading,
  label = "شاخه ها:",
  placeholder = "شاخه خود را انتخاب کنید...",
  name = "branch",
  required,
  maxSelection = 4, // default
}: BranchMultiselectorType) {
  const form = useFormContext();

  const [search, setSearch] = useState("");
  // Debounced search term
  const debouncedSearch = useDebounce(search, 1000); // Use a 1000ms debounce

  const section = form.watch("section");
  const gradeValue = form.watch("grade");
  const type = "branch";

  const {
    data: branchData,
    isLoading: branchIsLoading,
    isValidating: branchIsValidating,
    setSize: branchSetSize,
    size: branchSize,
  } = useSWRInfinite(
    (index) => [
      routes.categoryRoutes.categories({
        page: index + 1,
      }),
      section,
      type,
      debouncedSearch,
      gradeValue,
    ],
    ([url]) =>
      nextFetcher({
        url,
        method: "POST",
        body: {
          type: type,
          section: section,
          q: debouncedSearch,
          version: 2,
          parent_id: gradeValue,
        },
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
            <MultiSelect
              {...field}
              className={`col-span-3 text-slate-800 ${
                form.formState.errors?.state ? "border-r-destructive" : ""
              } w-full border-0 bg-secondary`}
              disabled={valueLoading}
              loading={branchIsLoading}
              isValidating={branchIsValidating}
              setSize={branchSetSize}
              size={branchSize}
              page_number={get(branchData, "[0].page_number", 0)}
              onSearch={setSearch}
              defaultValue={
                field.value?.length
                  ? map(field.value, (item) => {
                      return {
                        title: item.title,
                        id: `${item.id}`,
                        children_count: `${item?.children_count}`,
                      };
                    })
                  : []
              }
              placeholder={placeholder}
              list={
                branchs?.length
                  ? map(branchs, (item) => {
                      return {
                        title: item.title,
                        id: `${item.id}`,
                        children_count: `${item?.children_count}`,
                      };
                    })
                  : []
              }
              maxSelection={maxSelection} //pass limit
            />
          </FormControl>
          <FormMessage className='text-xs' />
        </FormItem>
      )}
    />
  );
}
