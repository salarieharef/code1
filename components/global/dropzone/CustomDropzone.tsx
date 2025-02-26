"use client";

import { toast } from "@/components/ui/use-toast";
import { cn } from "@/utils/cn";
import { getImageUrlBase } from "@/utils/imageUtils";
import { FileImage } from "lucide-react";
import { nanoid } from "nanoid";
import Image from "next/image";
import React, { useState } from "react";
import Dropzone, { DropzoneProps, FileRejection } from "react-dropzone";

interface CustomDropzoneProps extends DropzoneProps {
  onFileUpload: (file: File) => void;
  containerClassName?: string;
  labelClassName?: string;
  iconClassName?: string;
  instructionsClassName?: string;
  placeholder?: string;
  sub_placeholder?: string;
  imageClassName?: string;
  initialFile?: string;
  showPreview?: boolean;
  maxSize?: number;
  icon?: React.ReactNode;
  showIcon?: boolean;
  accept?: any;
  showOverlayOnImage?: boolean;
  read_only?: boolean;
  disabled?: boolean;
  value?: any;
}

const CustomDropzone: React.FC<CustomDropzoneProps> = ({
  onFileUpload,
  containerClassName = "",
  labelClassName = "",
  iconClassName = "",
  instructionsClassName = "",
  imageClassName = "",
  placeholder = "تصویر خود را برای آپلود بکشید و رها کنید.",
  initialFile = "",
  showPreview = true,
  showIcon = true,
  accept,
  maxSize,
  icon,
  sub_placeholder,
  showOverlayOnImage = false,
  read_only = false,
  disabled,
  value,
  ...dropzoneProps
}) => {
  const uniqueId = nanoid();

  const handleDrop = (
    acceptedFiles: File[],
    rejectedFiles: FileRejection[]
  ) => {
    if (read_only) return;
    if (rejectedFiles.length > 0) {
      const errorMessage = rejectedFiles[0].errors[0].message;
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } else if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      onFileUpload(file);
    }
  };

  return (
    <Dropzone
      onDrop={handleDrop}
      accept={accept}
      maxSize={maxSize}
      {...dropzoneProps}
      disabled={read_only || disabled}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className={cn(
            "group h-[200px] w-full overflow-hidden rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-500",
            containerClassName,
            (read_only || disabled) && "cursor-not-allowed"
          )}
        >
          <input
            {...getInputProps()}
            disabled={read_only || disabled}
            className={cn((read_only || disabled) && "cursor-not-allowed")}
          />
          <div className='relative flex h-full w-full items-center justify-center'>
            <label
              htmlFor={`dropzone-file-${uniqueId}`}
              className={cn(
                "flex h-full w-full cursor-pointer flex-col items-center justify-center",
                labelClassName,
                (read_only || disabled) && "cursor-not-allowed"
              )}
            >
              {(value?.length || initialFile) && showPreview ? (
                <div
                  className={cn(
                    "relative flex items-center",
                    imageClassName,
                    (read_only || disabled) && "cursor-not-allowed"
                  )}
                >
                  {/* Display uploaded image */}
                  <Image
                    src={
                      value?.length && typeof value == "object"
                        ? URL.createObjectURL(value?.[0] || "")
                        : getImageUrlBase(initialFile || "")
                    }
                    alt='uploaded'
                    width={1500}
                    height={250}
                    className={cn(
                      "rounded-xl",
                      imageClassName,
                      (read_only || disabled) && "cursor-not-allowed"
                    )}
                  />
                  {/* Overlay icon and placeholder if showOverlayOnImage is true */}
                  {showOverlayOnImage && (
                    <div
                      className={cn(
                        "absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                        (read_only || disabled) && "cursor-not-allowed"
                      )}
                    >
                      {/* Icon and placeholder text */}
                      {showIcon &&
                        (icon || (
                          <FileImage
                            className={cn(
                              "h-12 w-12 stroke-1 text-slate-100",
                              iconClassName
                            )}
                          />
                        ))}
                      <span
                        className={cn(
                          "max-w-48 text-center text-sm font-normal text-white",
                          instructionsClassName
                        )}
                      >
                        {placeholder}
                      </span>
                      {sub_placeholder && (
                        <span className='text-center text-xs font-normal text-white'>
                          {sub_placeholder}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className={cn(
                    "flex flex-col items-center justify-center",
                    (read_only || disabled) && "cursor-not-allowed"
                  )}
                >
                  {showIcon &&
                    (icon || (
                      <FileImage
                        className={cn(
                          "h-12 w-12 stroke-1 text-slate-700",
                          iconClassName
                        )}
                      />
                    ))}
                  <span
                    className={cn(
                      "max-w-48 text-center text-sm font-normal",
                      instructionsClassName
                    )}
                  >
                    {placeholder}
                  </span>
                  {sub_placeholder && (
                    <span className='text-center text-xs font-normal text-slate-400'>
                      {sub_placeholder}
                    </span>
                  )}
                </div>
              )}
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

export default CustomDropzone;
