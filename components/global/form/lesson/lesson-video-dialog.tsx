"use client";
import Link from "next/link";
import { useState } from "react";

// Component imports
import UploadVideoForm from "@/components/studio/lesson/upload-video-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

// Form imports
import { useFormContext } from "react-hook-form";

type LessonVideoDialogType = {
  valueLoading?: boolean;
  label?: string;
  placeholder?: string;
  tooltip?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
};

export default function LessonVideoDialog({
  label = "آپلود ویدئو",
  placeholder = "مشتق بخش اول...",
  name = "file",
  required,
  disabled,
  tooltip = "منظور عنوان محتوا است.",
}: LessonVideoDialogType) {
  const form = useFormContext();

  const [showVideoDialog, setShowVideoDialog] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      disabled={disabled}
      render={({ field }: any) => (
        <FormItem>
          {/* <FormLabel></FormLabel> */}
          <FormControl>
            <Dialog
              open={showVideoDialog}
              onOpenChange={() => setShowVideoDialog(!showVideoDialog)}
            >
              <DialogTrigger asChild>
                <Button className='w-full'>{label}</Button>
              </DialogTrigger>
              <DialogContent className='max-w-2xl p-0'>
                <DialogTitle className='flex items-center justify-center pt-4'>
                  <p className='font-medium text-blue-800'>{label}</p>
                </DialogTitle>

                <Separator />

                <div className='p-4 pt-0'>
                  <UploadVideoForm
                    setValue={form.setValue}
                    setShowDialog={setShowVideoDialog}
                  />

                  <div className='mt-2 flex flex-col items-center'>
                    <small>
                      با ارسال ویدیوهای خود به کاتب، تأیید می‌کنید که با{" "}
                      <Link href='' className='text-primary hover:underline'>
                        شرایط خدمات
                      </Link>{" "}
                      و{" "}
                      <Link href='' className='text-primary hover:underline'>
                        دستورالعمل‌های انجمن کاتب
                      </Link>{" "}
                      موافقت می‌کنید.
                    </small>
                    <small>
                      لطفاً مطمئن شوید که حق چاپ یا حریم خصوصی دیگران را نقض
                      نکنید.{" "}
                      <Link href='' className='text-primary hover:underline'>
                        بیشتر بدانید
                      </Link>
                    </small>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </FormControl>
          <FormMessage className='text-xs dark:text-red-500' />
        </FormItem>
      )}
    />
  );
}
