"use client";
// Component imports
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";

// Form imports
import { useFormContext } from "react-hook-form";

// Util imports
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { OrganNameInputType } from "@/types/input-types";

export default function OrganTypeSelector({
  label = "نوع ارگان:",
  placeholder = "نوع ارگان خود را انتخاب کنید...",
  name = "organ_type",
  disabled,
  required,
}: OrganNameInputType) {
  const form = useFormContext();

  const organizationTypes = [
    {
      title: "دولتی",
      value: "governmental",
    },
    {
      title: "خصوصی",
      value: "special",
    },
    {
      title: "آموزشی",
      value: "training",
    },
    {
      title: "مجموعه تولیدی",
      value: "production-set",
    },
  ];

  return (
    <FormField
      control={form.control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem>
          <Label className='flex gap-1'>
            {label}
            {required ? <span className='text-destructive'>*</span> : null}
          </Label>
          <Select
            dir='rtl'
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger
                className={`border-r-4 focus:ring-0 focus:ring-offset-0 ${
                  form.formState.errors?.organ_type
                    ? "border-r-destructive"
                    : "border-r-primary"
                } font-medium`}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {organizationTypes.map((type, key) => (
                <SelectItem value={type.value} key={key}>
                  {type.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className='text-xs' />
        </FormItem>
      )}
    />
  );
}
