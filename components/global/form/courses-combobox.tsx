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
import { Combobox } from "@/components/ui/combobox";
import { flatten, map } from "lodash-es";
import { nextFetcher } from "@/utils/api/next-fetcher";

type CoursesComboboxType = {
  valueLoading?: boolean;
  label?: string;
  name?: string;
};

export default function CoursesCombobox({
  valueLoading,
  label = "دروس:",
  name = "course",
}: CoursesComboboxType) {
  const form = useFormContext();

  const [search, setSearch] = useState("");

  // const {
  //   data: coursesData,
  //   isLoading: coursesLoading,
  //   isValidating: courseIsValidating,
  //   setSize: courseSetSize,
  //   size: courseSize,
  // } = useSWRInfinite(
  //   (index) =>
  //     routes.teacherRoutes.courses({
  //       page: index + 1,
  //     }),
  //   fetcher,
  //   {
  //     revalidateOnFocus: false,
  //   }
  // );
  const {
    data: coursesData,
    isLoading: coursesLoading,
    isValidating: courseIsValidating,
    setSize: courseSetSize,
    size: courseSize,
  } = useSWRInfinite(
    (index) =>
      routes.teacherRoutes.courses({
        page: index + 1,
      }),
    (url) =>
      nextFetcher({
        url: url,
        method: "GET",
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  const courses = flatten(map(coursesData, "data"));

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
            <Combobox
              data={
                courses?.length
                  ? map(courses, (item) => {
                      return { label: item.name, value: `${item.id}` };
                    })
                  : []
              }
              placeholder='دروس خود را انتخاب کنید...'
            />
          </FormControl>
          <FormMessage className='text-xs' />
        </FormItem>
      )}
    />
  );
}
