"use client";
import { Suspense, useState } from "react";

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
import { Loader2, PlusSquare } from "lucide-react";

// Form imports
import { useFormContext } from "react-hook-form";

// Fetch imports
import routes from "@/utils/api/routes";
import useSWRInfinite from "swr/infinite";

// Util imports
import { Button } from "@/components/ui/button";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { cn } from "@/utils/cn";
import { flatten, get, map } from "lodash-es";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type CourseAutocompleteType = {
  valueLoading?: boolean;
  label?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  type?: string;
  labelTeacher?: boolean;
};

export default function CourseAutocomplete({
  valueLoading,
  label = "دروس:",
  name = "course",
  placeholder,
  required = false,
  className,
  type = "teacher",
  labelTeacher = false,
}: CourseAutocompleteType) {
  const form = useFormContext();
  const searchParams = useSearchParams();
  const fieldId = searchParams.get("fieldId");

  const [search, setSearch] = useState("");

  const {
    data: coursesData,
    isLoading: coursesLoading,
    isValidating: courseIsValidating,
    setSize: courseSetSize,
    size: courseSize,
  } = useSWRInfinite(
    (index) =>
      type === "teacher"
        ? routes.teacherRoutes.courses({ page: index + 1 })
        : routes.courseRoutes.courses({ page: index + 1 }),
    (url) =>
      nextFetcher({
        url,
        method: "POST",
        body: {
          q: search,
          course_type: fieldId ? "field_introducer" : "",
        },
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  const courses = flatten(map(coursesData, "data"));
  // console.log(" courses", courses);

  return (
    <Suspense>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className='w-full text-right'>
            <FormLabel className='flex items-center gap-2'>
              {label}
              {required ? <span className='text-destructive'>*</span> : null}
              {valueLoading ? (
                <Loader2 className='h-5 w-5 animate-spin' />
              ) : null}
            </FormLabel>
            <FormControl>
              <Autocomplete
                {...field}
                className={cn(
                  `text-slate-800 ${
                    form.formState.errors?.course ? "border-r-destructive" : ""
                  } w-full border-0 bg-secondary`,
                  className
                )}
                disabled={valueLoading}
                loading={coursesLoading}
                placeholder={placeholder}
                isValidating={courseIsValidating}
                setSize={courseSetSize}
                onSearch={setSearch}
                size={courseSize}
                page_number={get(coursesData, "[0].page_number", 0)}
                defaultValue={typeof field.value == "string" ? field.value : ""}
                list={
                  courses?.length
                    ? map(courses, (item) => {
                        // console.log(item);

                        return {
                          label: item.name,
                          label_firstName_teacher: item?.teacher?.first_name,
                          label_lastName_teacher: item?.teacher?.last_name,
                          value: `${item.id}`,
                        };
                      })
                    : []
                }
                labelTeacher={labelTeacher}
              >
                {type == "teacher" ? (
                  <Link href='/studio/class/create' className='text-blue-500'>
                    <Button
                      variant='ghost'
                      className='flex w-full gap-2 hover:text-inherit'
                    >
                      <PlusSquare className='stroke-1' />
                      <span>ساخت درس جدید</span>
                    </Button>
                  </Link>
                ) : null}
              </Autocomplete>
            </FormControl>
            <FormMessage className='text-xs' />
          </FormItem>
        )}
      />
    </Suspense>
  );
}
