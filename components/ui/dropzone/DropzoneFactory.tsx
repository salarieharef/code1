import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/utils/cn";
import * as ReactDropzone from "react-dropzone";
import { validators } from "./validators";
import { PreviewComponents } from "./previews";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { RectangleProgress } from "@/components/ui/RectangleProgress";

interface DropzoneStyles {
  container?: string;
  dropzone?: string;
  preview?: string;
  previewContainer?: string;
  deleteButton?: string;
  progressBar?: string;
  icon?: string;
  instructions?: string;
  formControl?: string;
  formMessage?: string;
}

interface DropzoneProps {
  name?: string;
  value?: File | File[] | null;
  onChange?: (file: File | File[] | null) => void;
  readOnly?: boolean;
  disabled?: boolean;
  styles?: DropzoneStyles;
  placeholder?: string;
  icon?: React.ReactNode;
  type: "video" | "image" | "pdf" | "text";
  textType?: "docx" | "pdf";
  maxSize?: number;
  multiple?: boolean;
  maxDuration?: number;
  showProgress?: boolean;
  timeRemaining?: number;
  sizeRemaining?: number;
  onCancel?: () => void;
  onFileUpload?: (file: File) => void;
  onDelete?: () => void;
}

const Dropzone: React.FC<DropzoneProps> = (props) => {
  const formContext = useFormContext();
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const fileValue =
    formContext && props.name ? formContext.watch(props.name) : props.value;

  const getAcceptedTypes = (): Record<string, string[]> => {
    switch (props.type) {
      case "video":
        return { "video/mp4": [".mp4"], "video/mkv": [".mkv"] };
      case "image":
        return {
          "image/jpeg": [".jpeg", ".jpg"],
          "image/png": [".png"],
          "image/gif": [".gif"],
          "image/webp": [".webp"],
        };
      case "pdf":
        return { "application/pdf": [".pdf"] };
      case "text":
        return props.textType === "docx"
          ? {
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                [".docx"],
            }
          : { "application/pdf": [".pdf"] };
      default:
        return {};
    }
  };

  const validateFile = async (file: File) => {
    try {
      // Size validation
      if (props.maxSize) {
        validators.size(file, props.maxSize);
      }

      // Type-specific validation
      switch (props.type) {
        case "video":
          if (props.maxDuration) {
            await validators.video(file, props.maxDuration);
          }
          break;
        case "image":
          await validators.image(file);
          break;
        case "pdf":
          await validators.pdf(file);
          break;
      }

      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: error as string,
      });
      return false;
    }
  };

  const handleDrop = async (acceptedFiles: File[], rejectedFiles: any[]) => {
    if (props.readOnly || props.disabled) return;

    if (rejectedFiles.length > 0) {
      const error = rejectedFiles[0].errors[0];
      toast({
        variant: "destructive",
        title:
          error.code === "file-too-large"
            ? "File size exceeds limit"
            : "Invalid file format",
      });
      return;
    }

    const validFiles = [];
    for (const file of acceptedFiles) {
      const isValid = await validateFile(file);
      if (isValid) validFiles.push(file);
    }

    if (validFiles.length > 0) {
      const newValue = props.multiple ? validFiles : validFiles[0];
      if (formContext && props.name) {
        formContext.setValue(props.name, newValue);
      } else if (props.onChange) {
        props.onChange(newValue);
      }
      validFiles.forEach((file) => props.onFileUpload?.(file));
    }
  };

  const handleDelete = (fileIndex?: number) => {
    if (props.multiple && Array.isArray(fileValue) && fileIndex !== undefined) {
      const newFiles = fileValue.filter((_, index) => index !== fileIndex);
      if (formContext && props.name) {
        formContext.setValue(props.name, newFiles);
      } else if (props.onChange) {
        props.onChange(newFiles);
      }
    } else {
      if (formContext && props.name) {
        formContext.setValue(props.name, null);
      } else if (props.onChange) {
        props.onChange(null);
      }
    }
    props.onDelete?.();
  };

  const renderPreview = () => {
    if (!fileValue) return null;

    const PreviewComponent = PreviewComponents[props.type];

    if (props.multiple && Array.isArray(fileValue)) {
      return (
        <div className='grid grid-cols-2 gap-4'>
          {fileValue.map((file, index) => (
            <div
              key={index}
              className={cn("relative", props.styles?.previewContainer)}
            >
              <PreviewComponent
                file={file}
                className={cn(props.styles?.preview)}
              />
              {!props.readOnly && !props.disabled && (
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => handleDelete(index)}
                  className={cn(
                    "absolute right-2 top-2",
                    props.styles?.deleteButton
                  )}
                >
                  <Trash2 className='h-5 w-5' />
                </Button>
              )}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className={cn("relative", props.styles?.previewContainer)}>
        <PreviewComponent
          file={fileValue}
          className={cn(props.styles?.preview)}
        />
        {!props.readOnly && !props.disabled && (
          <Button
            variant='outline'
            size='icon'
            onClick={() => handleDelete()}
            className={cn("absolute right-2 top-2", props.styles?.deleteButton)}
          >
            <Trash2 className='h-5 w-5' />
          </Button>
        )}

        {isUploading && props.showProgress && (
          <RectangleProgress
            value={progress}
            timeRemaining={props.timeRemaining}
            sizeRemaining={props.sizeRemaining}
            onCancel={props.onCancel}
            // className={props.styles?.progressBar}
          />
        )}
      </div>
    );
  };

  const Content = ({ field }: any) => (
    <div
      className={cn(
        "relative",
        props.readOnly && "cursor-not-allowed opacity-60",
        props.styles?.container
      )}
    >
      {fileValue?.length ? (
        renderPreview()
      ) : (
        <ReactDropzone.default
          multiple={props.multiple}
          onDrop={handleDrop}
          accept={getAcceptedTypes()}
          maxSize={props.maxSize}
          disabled={props.readOnly || props.disabled}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className={cn(
                "flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100",
                props.styles?.dropzone
              )}
            >
              <input {...getInputProps()} />
              <div className={props.styles?.icon}>{props.icon}</div>
              <p
                className={cn(
                  "text-sm text-slate-600",
                  props.styles?.instructions
                )}
              >
                {props.placeholder || "Drop files here or click to select"}
              </p>
            </div>
          )}
        </ReactDropzone.default>
      )}
    </div>
  );

  if (formContext && props.name) {
    return (
      <FormField
        control={formContext.control}
        name={props.name}
        render={({ field }) => (
          <FormItem>
            <FormControl className={props.styles?.formControl}>
              <Content field={field} />
            </FormControl>
            <FormMessage className={props.styles?.formMessage} />
          </FormItem>
        )}
      />
    );
  }

  return <Content />;
};

export default Dropzone;
