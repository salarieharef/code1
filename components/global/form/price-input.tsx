"use client";

// Component imports
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Icon imports
import { Loader2 } from "lucide-react";

// Form imports
import { useFormContext } from "react-hook-form";

// Util imports
import { Input } from "@/components/ui/input";

type PriceInputType = {
  valueLoading?: boolean;
  label?: string;
  placeholder?: string;
  name: string;
  description?: string;
  disabled?: boolean;
};

const handleInputChange = (event: any) => {
  const regex = /^[0-9\b]+$/; // Only allow numbers and backspace (\b)
  const newValue = event.target.value.replace(/,/g, ""); // Remove existing commas

  if (newValue === "" || regex.test(newValue)) {
    const formattedValue = Number(newValue).toLocaleString();
    return formattedValue;
  }
};

export default function PriceInput({
  valueLoading,
  label = "قیمت:",
  placeholder,
  name,
  description,
  disabled,
}: PriceInputType) {
  const form = useFormContext();

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
            <div className='relative'>
              <Input
                placeholder={placeholder}
                className={`w-full border-0 bg-secondary`}
                {...field}
                onChange={(e) => {
                  form.setValue(name, handleInputChange(e));
                }}
                disabled={disabled}
              />

              <small className='absolute bottom-0 left-0 top-0 m-2 text-muted-foreground'>
                تومان
              </small>
            </div>
          </FormControl>
          <FormDescription className='text-xs'>{description}</FormDescription>
          <FormMessage className='text-xs' />
        </FormItem>
      )}
    />
  );
}
