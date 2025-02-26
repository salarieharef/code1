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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OrganNameInputType } from "@/types/input-types";

export default function OrganNameInput({
  label = "نام:",
  placeholder = "نام ارگان خود را وارد کنید...",
  name = "organ_name",
  disabled,
  required,
}: OrganNameInputType) {
  const form = useFormContext();

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
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className={`col-span-3 border-r-4 ${
                form.formState.errors?.organ_name
                  ? "border-r-destructive"
                  : "border-r-primary"
              } w-full`}
            />
          </FormControl>
          <FormMessage className='text-xs' />
        </FormItem>
      )}
    />
  );
}
