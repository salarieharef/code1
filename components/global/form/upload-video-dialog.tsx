"use client";

import { useState } from "react";

// Component imports
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Form imports
import { useFormContext } from "react-hook-form";
import ReusableVideoDropzone from "../dropzone/ReusableVideoDropzone";

export default function UploadVideoDialog({ name = "file" }: any) {
  const form = useFormContext();
  const [showVideoDialog, setShowVideoDialog] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }: any) => (
        <FormItem>
          <FormControl>
            <Dialog
              open={showVideoDialog}
              onOpenChange={() => setShowVideoDialog(!showVideoDialog)}
            >
              <DialogTrigger asChild>
                <Button className="w-full">آپلود ویدئو معرفی</Button>
              </DialogTrigger>
              <DialogContent>
                <ReusableVideoDropzone
                  name={name}
                  message="ویدئو معرفی خود را انتخاب کنید یا به اینجا بکشید"
                />
              </DialogContent>
            </Dialog>
          </FormControl>
          <FormMessage className="text-xs dark:text-red-500" />
        </FormItem>
      )}
    />
  );
}
