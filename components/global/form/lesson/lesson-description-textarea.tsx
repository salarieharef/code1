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
import dynamic from "next/dynamic";

// Component imports
const Tiptap = dynamic(() => import("@/components/global/editor/TipTap"), {
  ssr: false,
});
// Form imports
import { useFormContext } from "react-hook-form";

type LessonDescriptionTextareaType = {
  valueLoading?: boolean;
  label?: string;
  placeholder?: string;
  tooltip?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
};

export default function LessonDescriptionTextarea({
  label = "توضیحات:",
  placeholder = "مشتق بخش اول...",
  name = "description",
  required,
  disabled,
  tooltip = "مباحث مطرح شده در ویدیو را به صورت خلاصه وارد کنید.",
}: LessonDescriptionTextareaType) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem className='col-span-2'>
          <FormLabel className='flex items-center gap-2'>
            {label}
            {tooltip ? <InfoTooltip message={tooltip} /> : null}
          </FormLabel>
          <FormControl>
            <Tiptap description={field.value || ""} onChange={field.onChange} />
          </FormControl>
          <FormMessage className='text-xs dark:text-red-500' />
        </FormItem>
      )}
    />
  );
}
