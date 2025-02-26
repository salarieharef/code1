"use client";

import CustomDropzone from "@/components/global/dropzone/CustomDropzone";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import JpgImg from "@/static/icons/jpg.svg";
import PdfImg from "@/static/icons/pdf.svg";
import { cn } from "@/utils/cn";
import { formatFileSize } from "@/utils/functions/formatFileSize";
import { DeleteResume } from "@/utils/functions/user/infoOperations.function";
import { getImageUrlBase } from "@/utils/imageUtils";
import { CircleSlash, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useSWRConfig } from "swr";

type CustomFileDropzoneProps = {
  name: string;
  placeholder?: string;
  containerClassName?: string;
  accept?: any;
  showIcon?: boolean;
  showPreview?: boolean;
  showImagePreview?: boolean;
  showDeleteButton?: boolean;
  isSingImage?: boolean;
  read_only?: boolean;
  buttonStyleDelete?: string;
  StyleWrapperImage?: string;
  instructionsClassName?: string;
};

const CustomFileDropzone: React.FC<CustomFileDropzoneProps> = ({
  name,
  placeholder = "فایل مورد نظر خود را انتخاب کنید یا بکشید اینجا",
  containerClassName,
  accept = "application/pdf,image/*",
  showIcon = true,
  showPreview = false,
  showImagePreview = false,
  showDeleteButton = true,
  isSingImage = false,
  buttonStyleDelete,
  StyleWrapperImage,
  instructionsClassName,
  read_only = false,
}) => {
  const { setValue, watch } = useFormContext();

  const { mutate } = useSWRConfig();

  const file = watch(name);
  const { toast } = useToast();

  const handleFileUpload = (uploadedFile: File) => {
    if (uploadedFile && uploadedFile.type.match(accept)) {
      setValue(name, uploadedFile);
    } else {
      toast({
        variant: "destructive",
        title: `فایل نامعتبر. لطفا یک فایل ${accept} انتخاب کنید.`,
      });
    }
  };

  const handleDelete = async () => {
    if (name === "resume") {
      try {
        const response: any = await DeleteResume(toast, mutate);

        if (response?.success) {
          setValue(name, null);
        }
      } catch (error) {
        console.error("خطا در حذف رزومه:", error);
      }
    } else {
      setValue(name, null);
    }
  };

  const isPdf =
    typeof file === "string"
      ? /\.pdf$/i.test(file)
      : file?.type === "application/pdf";
  const isImage =
    typeof file === "string"
      ? /\.(jpg|jpeg|png|gif)$/i.test(file)
      : file?.type?.startsWith("image/");

  return (
    <div>
      {!file && !read_only ? (
        <CustomDropzone
          onFileUpload={handleFileUpload}
          accept={accept}
          showIcon={false}
          read_only={read_only}
          showPreview={showPreview}
          placeholder={placeholder}
          showOverlayOnImage={false}
          containerClassName={cn(
            "mx-auto mt-4 h-10 w-full items-center rounded-lg border border-dashed border-primary bg-blue-100 text-sm text-primary",
            file
              ? "h-14 cursor-default border border-solid border-slate-300 bg-slate-50"
              : "cursor-pointer hover:bg-blue-200 hover:text-blue-500",
            containerClassName
          )}
          instructionsClassName={instructionsClassName}
        />
      ) : (
        <>
          {!file && read_only ? (
            <>
              <div className='flex h-full w-full flex-col items-center justify-center'>
                <CircleSlash className='size-9 stroke-1.5 text-muted-foreground' />
                <p>فایل آپلود نشده است!</p>
              </div>
            </>
          ) : (
            <>
              <div
                className={cn(
                  "relative mx-auto mt-1 flex h-full w-full items-center justify-between overflow-hidden rounded-md border border-slate-300 px-2 py-2",
                  StyleWrapperImage
                )}
              >
                <Link
                  href={typeof file === "string" ? getImageUrlBase(file) : "#"}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex flex-grow items-center gap-2'
                >
                  {showImagePreview && (isImage || isSingImage) ? (
                    <Image
                      src={
                        typeof file === "string"
                          ? getImageUrlBase(file)
                          : URL.createObjectURL(file)
                      }
                      alt={file.name || "پیش‌نمایش تصویر"}
                      width={200}
                      height={150}
                      className='aspect-video max-h-36 w-full rounded-md object-cover'
                    />
                  ) : showIcon ? (
                    isPdf ? (
                      <PdfImg className='mr-2 size-7 text-red-500' />
                    ) : (
                      <JpgImg className='mr-2 size-7 text-blue-500' />
                    )
                  ) : null}

                  <div className={cn("flex flex-col", isSingImage && "hidden")}>
                    <span className='text-sm font-medium text-slate-700'>
                      {isPdf ? "فایل PDF" : isImage ? "فایل تصویر" : "فایل"}
                    </span>
                    {file.size && (
                      <span className='text-xs text-slate-500'>
                        {formatFileSize(file.size)}
                      </span>
                    )}
                  </div>
                </Link>

                {showDeleteButton && !read_only && (
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={handleDelete}
                    className={cn(
                      "ml-2 text-muted-foreground hover:text-slate-700",
                      buttonStyleDelete
                    )}
                    type='button'
                  >
                    <Trash2 size={24} />
                  </Button>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CustomFileDropzone;
