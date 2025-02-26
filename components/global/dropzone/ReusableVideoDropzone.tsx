"use client";

import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import CustomVideoDropzone from "./CustomVideoDropzone"; // Import the correct component
import { cn } from "@/utils/cn";

export default function ReusableVideoDropzone({
  name = "file",
  message = "ویدئو جلسه خود را انتخاب کنید یا بکشید اینجا",
  containerClassName,
  showIcon = true,
  instructionsClassName,
}: any) {
  const form = useFormContext<any>();

  const handleFileUpload = (file: File) => {
    form.setValue(name, [file]); // Ensure the file is set as an array
  };

  const initialVideo = form.watch(name);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <CustomVideoDropzone
              onFileUpload={handleFileUpload}
              placeholder={message}
              containerClassName={cn(
                "group md:aspect-video overflow-hidden rounded-lg border border-dashed border-slate-300 transition-colors hover:bg-slate-50 dark:border-slate-500 dark:hover:bg-slate-800",
                containerClassName
              )}
              labelClassName='flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg'
              iconClassName='h-16 w-16 stroke-1'
              instructionsClassName={instructionsClassName}
              videoClassName=''
              initialFile={typeof initialVideo === "string" ? initialVideo : ""}
              accept={{
                "video/mp4": [".mp4"],
                "video/mkv": [".mkv"],
              }}
              multiple={false}
              showIcon={showIcon}
            />
          </FormControl>
          <FormMessage className='text-xs dark:text-red-500' />
        </FormItem>
      )}
    />
  );
}
