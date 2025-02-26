"use client";

// Component imports
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InfoTooltip } from "../../InfoTooltip";
import { Input } from "@/components/ui/input";

// Form imports
import { useFormContext } from "react-hook-form";

type LessonNameInputType = {
  valueLoading?: boolean;
  label?: string;
  placeholder?: string;
  tooltip?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
};

export default function LessonNameInput({
  label = "عنوان:",
  placeholder = "مشتق بخش اول...",
  name = "name",
  required,
  disabled,
  tooltip = "منظور عنوان محتوا است.",
}: LessonNameInputType) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='flex items-center gap-2'>
            <span>{label}</span>
            {required ? <span className='text-destructive'>*</span> : null}
            {tooltip ? <InfoTooltip message={tooltip} /> : null}
          </FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              type='text'
              className='border-0 bg-secondary'
            />
          </FormControl>
          <FormMessage className='text-xs dark:text-red-500' />
        </FormItem>
      )}
    />
  );
}
