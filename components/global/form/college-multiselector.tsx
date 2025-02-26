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
import { nextFetcher } from "@/utils/api/next-fetcher";
import { flatten, get, map } from "lodash-es";
import { useDebounce } from "@/hooks/ui";

type CollegeMultiselectorType = {
  valueLoading?: boolean;
  label?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
};

export default function CollegeMultiselector({
  valueLoading,
  label = "دانشکدگان:",
  placeholder = "دانشکده خود را انتخاب کنید...",
  name = "colleges",
  required,
  disabled,
}: CollegeMultiselectorType) {
  const form = useFormContext();

  const [search, setSearch] = useState(""); // State to store the current search query

  // Debounced search term
  const debouncedSearch = useDebounce(search, 1000); // Use a 500ms debounce

  const section = "college";
  const type = "main_group";

  const {
    data: collegeData,
    isLoading: collegeIsLoading,
    isValidating: collegeIsValidating,
    setSize: collegeSetSize,
    size: collegeSize,
  } = useSWRInfinite(
    (index) => [
      routes.categoryRoutes.categories({ page: index + 1 }),
      section,
      type,
      debouncedSearch, // Use the debounced search term here
    ],
    ([url]) =>
      nextFetcher({
        url,
        method: "POST",
        body: { type: type, section: section, q: debouncedSearch }, // Use debounced search in request
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  const colleges = flatten(map(collegeData, "data"));

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
              list={
                colleges?.length
                  ? map(colleges, (item) => {
                      return { title: item.title, id: `${item.id}` };
                    })
                  : []
              }
              onSearch={setSearch} // Set search query as user types
              loading={collegeIsLoading}
              isValidating={collegeIsValidating}
              placeholder={placeholder}
              disabled={valueLoading || disabled}
              defaultValue={
                field.value?.length
                  ? map(field.value, (item) => {
                      return { title: item.title, id: `${item.id}` };
                    })
                  : []
              }
              setSize={collegeSetSize}
              size={collegeSize}
              page_number={get(collegeData, "[0].page_number", 0)}
              className={`col-span-3 text-slate-800 ${
                form.formState.errors?.state ? "border-r-destructive" : ""
              } w-full border-0 bg-secondary`}
            />
          </FormControl>
          <FormMessage className='text-xs' />
        </FormItem>
      )}
    />
  );
}
