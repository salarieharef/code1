import React from "react";
import Image from "next/image";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CardInputProps {
  control: any;
  identifiedBank: any;
  formatCardNumber: (value: string) => string;
  name?: string;
}

export const CardInput: React.FC<CardInputProps> = ({
  control,
  identifiedBank,
  formatCardNumber,
  name = "cardNumber",
}) => (
  <FormField
    name={name}
    control={control}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <div className='relative'>
            <Input
              type='text'
              placeholder='شماره کارت'
              className='mb-2 w-full rounded-md bg-slate-150 py-2 pl-2 text-left font-semibold text-black placeholder:text-right placeholder:font-semibold placeholder:text-slate-800 focus:outline-slate-400'
              value={field.value}
              onChange={(e) => field.onChange(formatCardNumber(e.target.value))}
              maxLength={19}
            />
            {identifiedBank && field.value && (
              <div className='absolute inset-y-0 right-0 flex items-center pl-3'>
                <Image
                  src={identifiedBank.icon}
                  alt={identifiedBank.name}
                  width={24}
                  height={24}
                />
                <span className='ml-2 text-xxm font-bold'>
                  {identifiedBank.name}
                </span>
              </div>
            )}
          </div>
        </FormControl>
        <FormMessage className='text-xs' />
      </FormItem>
    )}
  />
);
