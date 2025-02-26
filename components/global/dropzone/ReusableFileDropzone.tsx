"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/utils/cn";
import Image from "next/image";
import React from "react";
import { useFormContext } from "react-hook-form";
import CustomDropzone from "./CustomDropzone";
import UploadIcon from '@/static/icons/upload.svg?url'

type ReusableFileDropzoneProps = {
  valueLoading?: boolean;
  containerClassName?: string;
  label?: string;
  placeholder?: string;
  name?: string;
  accept?: any;
  showIcon?: boolean;
  showPreview?: boolean;
  readonly?: boolean;
  onChange?: any;
  value?: any;
};

const ReusableFileDropzone: React.FC<ReusableFileDropzoneProps> = ({
  placeholder = "فایل مورد نظر خود را برای آپلود بکشید و رها کنید.",
  name = "file",
  accept = { "image/*": [] },
  showIcon = true,
  showPreview = false,
  containerClassName,
  readonly,
}) => {
  const form = useFormContext();

  // const handleFileUpload = (file: File) => {
  //   form.setValue(name, [file]); // Ensure the file is set as an array
  // };

  // const initialFile = form.watch(name);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <CustomDropzone
              onFileUpload={(file: any) => field.onChange([file])}
              placeholder={placeholder}
              containerClassName={cn(
                "group flex cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300 p-6 transition-colors hover:bg-slate-50 dark:border-slate-500 dark:hover:bg-slate-800",
                containerClassName
              )}
              value={field.value}
              labelClassName='flex flex-col items-center justify-center gap-2'
              iconClassName='h-12 w-12'
              instructionsClassName='text-sm'
              initialFile={typeof field.value === "string" ? field.value : ""}
              accept={accept}
              multiple={false}
              showPreview={showPreview}
              showIcon={showIcon}
              icon={
                <Image
                  src={UploadIcon}
                  alt=''
                  width={100}
                  height={100}
                  className='h-12 w-12'
                />
              }
              disabled={readonly}
            />
          </FormControl>
          <FormMessage className='text-xs dark:text-red-500' />
        </FormItem>
      )}
    />
  );
};

export default ReusableFileDropzone;
