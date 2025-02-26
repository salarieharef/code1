"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/utils/cn";
import Dropzone from "@/components/ui/dropzone";
import { useFormContext } from "react-hook-form";
import { WrapperOutlineText } from "./WrapperOutlineText";

interface ResumeUploadProps {
  type?: "teaching-in-kateb" | "course";
  readOnly?: boolean;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ type, readOnly }) => {
  const form = useFormContext();

  return (
    <WrapperOutlineText
      titleBorder='آپلود فایل رزومه'
      className={cn("mx-auto mt-6 px-2 py-12 sm:mt-0 sm:px-6")}
      type={type}
    >
      <FormField
        control={form.control}
        name='resume'
        render={({ field }) => (
          <FormItem className='space-y-0'>
            <FormControl>
              <Dropzone
                acceptedFileTypes={{
                  "application/pdf": [".pdf"],
                  "image/*": [],
                }}
                name='resume'
                placeholder='آپلود فایل رزومه'
                fileType='document'
                value={field.value}
                showFileIcon
                readOnly={readOnly}
                showFileName
                showFileSize
                styles={{
                  container: "flex mx-auto justify-center items-center",
                  dropzone: `bg-blue-100 h-10 rounded-md md:w-80 border-primary`,
                  previewContainer:
                    "rounded-md border border-slate-300 px-2 py-2 w-80",
                  instructions: "text-primary text-center",
                  deleteButton: "left-0 -top-0.5",
                  preview: "w-72",
                }}
                onChange={(file: any) => {
                  field.onChange(file);
                }}
              />
            </FormControl>
            <FormMessage className='text-xs text-red-500' />
          </FormItem>
        )}
      />
      <p className='mt-5 text-center text-sm text-slate-400'>
        در صورت تمایل می‌توانید فایل روزمه خود را آپلود کنید.
      </p>
    </WrapperOutlineText>
  );
};

export default ResumeUpload;
