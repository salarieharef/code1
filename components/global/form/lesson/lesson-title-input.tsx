"use client";

// Component imports
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Form imports
import { useFormContext } from "react-hook-form";
import { InfoTooltip } from "../../InfoTooltip";
import { generateWeekOptions } from "@/utils/functions/generateWeekOptions";
import { Input } from "@/components/ui/input";

type LessonTitleInputType = {
  valueLoading?: boolean;
  label?: string;
  placeholder?: string;
  tooltip?: string;
  name?: string;
  required?: boolean;
  week_count?: number;
  section?: string;
};

export default function LessonTitleInput({
  valueLoading,
  label = "شاخه:",
  placeholder = "شاخه خود را انتخاب کنید...",
  name = "title",
  tooltip,
  required,
  week_count,
  section,
}: LessonTitleInputType) {
  const form = useFormContext();

  const levels = generateWeekOptions({
    maxWeek: week_count || 16,
    appendedText: section === "skill" ? "جلسه" : "هفته",
  });
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='flex items-center gap-2'>
            <span>هفته:</span>
            {required ? <span className='text-destructive'>*</span> : null}
            {tooltip ? <InfoTooltip message={tooltip} /> : null}
          </FormLabel>
          <FormControl>
            {/* <Input
              placeholder='هفته اول...'
              {...field}
              type='text'
              className='border-0 bg-secondary'
            /> */}
            <Select
              dir='rtl'
              onValueChange={field.onChange}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger
                  className={`border-0 bg-secondary font-medium focus:ring-0 focus:ring-offset-0`}
                >
                  <SelectValue placeholder='هفته جلسه خود را انتخاب کنید...' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <ScrollArea className='h-72 p-0' dir='rtl'>
                  {levels.map((type, key) => (
                    <SelectItem value={type.value} key={key}>
                      {type.label}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage className='text-xs dark:text-red-500' />
        </FormItem>
      )}
    />
  );
}
