import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

interface IBANInputProps {
  control: any;
  identifiedBank: any;
  name?: string;
}

export const IBANInput: React.FC<IBANInputProps> = ({
  control,
  identifiedBank,
  name = "ibanNumber",
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <div className='relative'>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
              <span className='text-2xl font-bold text-slate-700'>IR</span>
            </div>
            <Input
              type='text'
              placeholder='شماره شبا'
              className='mb-2 w-full rounded-md bg-slate-150 py-2 pl-8 text-left font-semibold text-black placeholder:text-right placeholder:font-semibold placeholder:text-slate-800 focus:outline-slate-400'
              maxLength={24}
              {...field}
              isSpan={"IR"}
              isSpanClassName={"font-bold text-black"}
            />
            {identifiedBank && field.value && (
              <div className='absolute inset-y-0 right-0 flex items-center pl-3'>
                <Image
                  src={identifiedBank.icon}
                  alt={identifiedBank.name || ""}
                  width={24}
                  height={24}
                />
              </div>
            )}
          </div>
        </FormControl>
        <FormMessage className='text-xs' />
      </FormItem>
    )}
  />
);
