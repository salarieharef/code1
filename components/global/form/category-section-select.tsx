"use client";

// Component imports
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Icon imports
import { Loader2 } from "lucide-react";

// Form imports
import { useFormContext } from "react-hook-form";
import { InfoTooltip } from "../InfoTooltip";

// Fetch imports
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import useSWR from "swr";

type CategorySectionSelectType = {
  valueLoading?: boolean;
  label?: string;
  name?: string;
  placeholder?: string;
  defaultValue?: string;
  tooltip?: any;
  required?: boolean;
  disabled?: boolean;
};

export default function CategorySectionSelect({
  valueLoading,
  label = "بخش:",
  name = "section",
  placeholder = "بخش خود را انتخاب کنید...",
  defaultValue = "university",
  tooltip,
  required,
  disabled
}: CategorySectionSelectType) {
  const form = useFormContext();

  // const { data: userInfo, isLoading: userInfoLoading } = useSWR(
  // 	routes.userRoutes.me,
  // 	fetcher
  // );

  const { data: userInfo, isLoading: userInfoLoading } = useSWR(
    routes.userRoutes.me,
    (url) =>
      nextFetcher({
        url,
        useToken: true,
      })
  );

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
            {tooltip ? <InfoTooltip message={tooltip} /> : null}
          </FormLabel>
          <FormControl>
            <Select
              defaultValue={field.value || defaultValue}
              onValueChange={field.onChange}
              value={field.value}
              dir='rtl'
            >
              <SelectTrigger disabled={disabled} className='w-full border-0 bg-slate-150'>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='university'>دانشگاهی</SelectItem>
                  <SelectItem value='school'>مدرسه‌ای</SelectItem>
                  <SelectItem value='skill'>مهارتی</SelectItem>
                  <SelectItem value='deep_learn'>یادگیری عمیق</SelectItem>
                  {userInfo?.data?.username == "09125038274" ? (
                    <SelectItem value='teaching_assistants'>
                      دستیاران آموزشی
                    </SelectItem>
                  ) : null}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage className='text-xs' />
        </FormItem>
      )}
    />
  );
}
