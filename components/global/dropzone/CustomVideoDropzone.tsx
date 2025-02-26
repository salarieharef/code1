"use client";

import { FileVideo } from "lucide-react";
import React, { useState, useEffect } from "react";
import Dropzone, { DropzoneProps, FileRejection } from "react-dropzone";
import { nanoid } from "nanoid";
import { cn } from "@/utils/cn";
import { toast } from "@/components/ui/use-toast";

interface CustomVideoDropzoneProps extends DropzoneProps {
  onFileUpload: (file: File) => void;
  containerClassName?: string;
  labelClassName?: string;
  iconClassName?: string;
  instructionsClassName?: string;
  placeholder?: string;
  sub_placeholder?: string;
  videoClassName?: string;
  initialFile?: string;
  showPreview?: boolean;
  showIcon?: boolean;
  maxSize?: number;
  icon?: React.ReactNode;
  checkVideoDuration?: (file: File) => Promise<void>;
}

const CustomVideoDropzone: React.FC<CustomVideoDropzoneProps> = ({
  onFileUpload,
  containerClassName = "",
  labelClassName = "",
  iconClassName = "",
  instructionsClassName = "",
  videoClassName = "",
  placeholder = "ویدیوی خود را برای آپلود بکشید و رها کنید.",
  initialFile = "",
  showPreview = false,
  maxSize,
  icon,
  sub_placeholder,
  checkVideoDuration,
  showIcon = true,
  ...dropzoneProps
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [initialVideo, setInitialVideo] = useState<string | null>(initialFile);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const uniqueId = nanoid();

  useEffect(() => {
    if (initialFile) {
      setInitialVideo(initialFile);
      setVideoURL(initialFile);
    }
  }, [initialFile]);

  useEffect(() => {
    if (files.length) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setVideoURL(url);

      // Clean up the URL object on component unmount
      return () => URL.revokeObjectURL(url);
    }
  }, [files]);

  const handleDrop = async (
    acceptedFiles: File[],
    rejectedFiles: FileRejection[]
  ) => {
    try {
      if (rejectedFiles.length > 0) {
        const errorMessage = rejectedFiles[0].errors[0].message;
        console.error(errorMessage);
        toast({
          variant: "destructive",
          title: errorMessage,
        });
      } else if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (checkVideoDuration) {
          await checkVideoDuration(file);
        }
        onFileUpload(file);
        setFiles([file]);
        setInitialVideo(null);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: error as string,
      });
    }
  };

  return (
    <Dropzone onDrop={handleDrop} maxSize={maxSize} {...dropzoneProps}>
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className={cn(
            "group h-[200px] w-full overflow-hidden rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-500",
            containerClassName
          )}
        >
          <input {...getInputProps()} />
          <div className='relative flex h-full w-full items-center justify-center'>
            <label
              htmlFor={`dropzone-file-${uniqueId}`}
              className={cn(
                "flex h-full w-full cursor-pointer flex-col items-center justify-center",
                labelClassName
              )}
            >
              {videoURL && !showPreview ? (
                <video
                  controls
                  className={cn("h-full w-full object-cover", videoClassName)}
                >
                  <source src={videoURL} type='video/mp4' />
                </video>
              ) : (
                <div className='flex flex-col items-center justify-center'>
                  {showIcon
                    ? icon || (
                        <FileVideo
                          className={cn(
                            "h-12 w-12 stroke-1 text-slate-700",
                            iconClassName
                          )}
                        />
                      )
                    : null}
                  <span
                    className={cn(
                      "max-w-48 text-center text-sm font-normal text-slate-700",
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

export default CustomVideoDropzone;
