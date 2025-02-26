"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";

// Util imports
import { cn } from "@/utils/cn";
import { formatFileSize } from "@/utils/functions/formatFileSize";

// Icon imports
import { Trash2 } from "lucide-react";
import FormattingVideoImg from "@/static/images/global/formatting-video.webp";

// Validators
import { validators } from "./validators";

// Type imports
import { BaseDropzoneProps } from "./types";

// Constant imports
import { ACCEPTED_FILE_TYPES } from "./constant";

// Component imports
import { ImageCrop } from "@/components/image-crop/image-crop";
import { Button } from "@/components/ui/button";
import { RectangleProgress } from "@/components/ui/RectangleProgress";
import { useToast } from "@/components/ui/use-toast";
import * as ReactDropzone from "react-dropzone";
import { PreviewComponents } from "./previews";

const MEDIA_STATUS_LIST = [
  "in_format",
  "failed",
  "uploaded",
  "first_formatted",
];

const MediaStatusOverlay = ({
  status,
  className,
}: {
  status: string | undefined;
  className?: string;
}) => (
  <div
    className={cn(
      // "absolute inset-0 flex items-center justify-center bg-muted/80 backdrop-blur-sm",
      "mb-2 flex aspect-video w-full flex-col items-center justify-center rounded-lg bg-secondary sm:col-span-full",
      className
    )}
  >
    <Image
      src={FormattingVideoImg}
      alt='Formatting video'
      width={200}
      height={200}
    />
    <p className='text-sm'>
      {status === "in_format" &&
        "ویدئو شما درحال پردازش است، لطفا شکیبا باشید."}
      {status === "failed" && "ویدئو شما درحال پردازش است، لطفا شکیبا باشید."}
      {status === "uploaded" && "ویدئو شما درحال پردازش است، لطفا شکیبا باشید."}
      {status === "first_formatted" &&
        "ویدئو شما درحال پردازش است، لطفا شکیبا باشید."}
    </p>
  </div>
);

const MemoizedProgressBar = React.memo(
  ({
    isUploading,
    showProgressBar,
    uploadProgress,
    uploadTimeRemaining,
    uploadSizeRemaining,
    onUploadCancel,
    className,
  }: {
    isUploading?: boolean;
    showProgressBar?: boolean;
    uploadProgress?: number;
    uploadTimeRemaining?: number;
    uploadSizeRemaining?: number;
    onUploadCancel?: () => void;
    className?: string;
  }) => {
    if (!isUploading || !showProgressBar) return null;

    return (
      <RectangleProgress
        value={uploadProgress || 0}
        timeRemaining={uploadTimeRemaining}
        sizeRemaining={uploadSizeRemaining}
        onCancel={onUploadCancel}
        className={className}
      />
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if these props change
    return (
      prevProps.isUploading === nextProps.isUploading &&
      prevProps.showProgressBar === nextProps.showProgressBar &&
      prevProps.uploadProgress === nextProps.uploadProgress &&
      prevProps.uploadTimeRemaining === nextProps.uploadTimeRemaining &&
      prevProps.uploadSizeRemaining === nextProps.uploadSizeRemaining
    );
  }
);
MemoizedProgressBar.displayName = "MemoizedProgressBar";

const DeleteButton = ({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) => (
  <Button
    variant='outline'
    size='icon'
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className={cn("relative z-20", className)}
    type='button'
  >
    <Trash2 className='h-5 w-5' />
  </Button>
);

const Dropzone: React.FC<BaseDropzoneProps> = (props) => {
  const { toast } = useToast();
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [pendingCropFile, setPendingCropFile] = useState<File | null>(null);

  const selectedFiles = props.value || null;

  const getAllowedFileTypes = (fileType?: string): Record<string, string[]> => {
    if (
      props.acceptedFileTypes &&
      typeof props.acceptedFileTypes === "object"
    ) {
      return props.acceptedFileTypes;
    }

    if (!fileType || fileType === "all") {
      return {
        ...ACCEPTED_FILE_TYPES.document,
        ...ACCEPTED_FILE_TYPES.video,
        ...ACCEPTED_FILE_TYPES.image,
        ...ACCEPTED_FILE_TYPES.audio,
        ...ACCEPTED_FILE_TYPES.spreadsheet,
        ...ACCEPTED_FILE_TYPES.archive,
      };
    }

    if (fileType === "media") {
      return {
        ...ACCEPTED_FILE_TYPES.video,
        ...ACCEPTED_FILE_TYPES.image,
        ...ACCEPTED_FILE_TYPES.audio,
      };
    }

    return ACCEPTED_FILE_TYPES[fileType as keyof typeof ACCEPTED_FILE_TYPES];
  };

  const validateFile = async (file: File) => {
    try {
      // Size validation
      if (props.maxFileSize) {
        validators.size(file, props.maxFileSize);
      }

      // Type-specific validation
      switch (props.fileType) {
        case "video":
          if (props.maxVideoDuration) {
            await validators.video(file, props.maxVideoDuration);
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

  const handleFilesDrop = async (
    acceptedFiles: File[],
    rejectedFiles: any[]
  ) => {
    if (props.readOnly || props.disabled) return;

    if (rejectedFiles.length > 0) {
      const error = rejectedFiles[0].errors[0];
      toast({
        variant: "destructive",
        title:
          error.code === "file-too-large"
            ? "File size exceeds limit"
            : error.code === "file-invalid-type"
              ? `Invalid file type. Accepted types: ${Object.values(getAllowedFileTypes(props.fileType)).flat().join(", ")}`
              : "Invalid file format",
      });
      return;
    }

    const validFiles = [];
    for (const file of acceptedFiles) {
      const isValid = await validateFile(file);
      if (isValid) {
        if (props.enableImageCropper && props.fileType === "image") {
          setPendingCropFile(file);
          setCropModalOpen(true);
          return;
        }
        validFiles.push(file);
      }
    }

    if (validFiles.length > 0) {
      if (props.multiple) {
        // Handle multiple files
        let newValue: File[];
        if (props.preserveExistingFiles && Array.isArray(selectedFiles)) {
          // Append new files to existing ones
          newValue = [...selectedFiles, ...validFiles];
        } else {
          // Replace with new files
          newValue = validFiles;
        }

        if (props.onChange) {
          props.onChange(newValue);
        }
      } else {
        // Handle single file (always replaces existing)
        const newValue = validFiles[0];
        if (props.onChange) {
          props.onChange(newValue);
        }
      }

      validFiles.forEach((file) => props.onFileUpload?.(file));
    }
  };

  const handleFileDelete = (fileIndex?: number) => {
    if (
      props.multiple &&
      Array.isArray(selectedFiles) &&
      fileIndex !== undefined
    ) {
      const newFiles = selectedFiles.filter((_, index) => index !== fileIndex);
      if (props.onChange) {
        props.onChange(newFiles);
      }
    } else {
      if (props.onChange) {
        props.onChange(null);
      }
    }
    props.onFileDelete?.();
  };

  const RenderDropzone = useMemo(() => {
    const Component = ({ children }: { children?: React.ReactNode }) => (
      <ReactDropzone.default
        multiple={props.multiple}
        onDrop={handleFilesDrop}
        accept={
          props?.acceptedFileTypes
            ? props?.acceptedFileTypes
            : getAllowedFileTypes(props.fileType)
        }
        maxSize={props.maxFileSize}
        disabled={props.readOnly || props.disabled}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className={cn(
              `group flex ${
                props.readOnly || props.disabled
                  ? "cursor-not-allowed opacity-60"
                  : "cursor-pointer"
              } flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100`,
              !children && "h-32",
              props.styles?.dropzone
            )}
          >
            <input
              {...getInputProps()}
              disabled={props.readOnly || props.disabled}
            />
            {children ? (
              <div className='relative h-full w-full'>
                <div
                  className={`group flex ${selectedFiles ? "hidden" : ""} pointer-events-none absolute inset-0 flex-col items-center justify-center bg-muted/40 backdrop-blur-sm ${!props.readOnly && !props.disabled ? "group-hover:z-10 group-hover:flex" : ""}`}
                >
                  <div className={props.styles?.icon}>{props.icon}</div>
                  <p className={cn("text-sm", props.styles?.instructions)}>
                    {props.placeholder || "Drop files here or click to select"}
                  </p>
                </div>
                {children}
              </div>
            ) : (
              <div className={`flex flex-col items-center justify-center`}>
                <div className={props.styles?.icon}>{props.icon}</div>
                <p className={cn("text-sm", props.styles?.instructions)}>
                  {props.placeholder || "Drop files here or click to select"}
                </p>
              </div>
            )}
          </div>
        )}
      </ReactDropzone.default>
    );
    Component.displayName = "RenderDropzone";
    return Component;
  }, [
    props.multiple,
    props.acceptedFileTypes,
    props.fileType,
    props.maxFileSize,
    props.readOnly,
    props.disabled,
    props.styles?.dropzone,
    props.icon,
    props.styles?.icon,
    props.styles?.instructions,
    props.placeholder,
  ]);

  const RenderPreview = useMemo(() => {
    if (!selectedFiles || props.showPreview === false) return null;

    const PreviewComponent =
      PreviewComponents[props.fileType as keyof typeof PreviewComponents] ||
      PreviewComponents.all;

    if (!PreviewComponent) {
      console.warn(
        `No preview component found for file type: ${props.fileType}`
      );
      return null;
    }

    // Table Layout
    if (props.previewLayout === "table") {
      const files = Array.isArray(selectedFiles)
        ? selectedFiles
        : [selectedFiles];
      return (
        <div className='w-full'>
          <table className='w-full'>
            <tbody>
              {files.map((file, index) => (
                <tr key={index} className='border-b'>
                  <td className='py-2'>
                    <PreviewComponent
                      file={file}
                      showIcon={props.showFileIcon}
                      showFileName={false}
                      showFileSize={false}
                      className={cn("h-12 w-12", props.styles?.preview)}
                    />
                  </td>
                  <td className='flex flex-col px-4 py-2'>
                    {(props.showFileName ?? true) && (
                      <span>{file instanceof File ? file.name : "File"}</span>
                    )}
                    {(props.showFileSize ?? true) &&
                      typeof file !== "string" && (
                        <span className='text-xs text-muted-foreground'>
                          {formatFileSize(file.size)}
                        </span>
                      )}
                  </td>
                  {!props.readOnly &&
                    !props.disabled &&
                    (props.showDeleteButton ?? true) && (
                      <td className='w-16 py-2'>
                        <DeleteButton
                          onClick={() => handleFileDelete(index)}
                          className={props.styles?.deleteButton}
                        />
                      </td>
                    )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // Grid Layout
    if (props.previewLayout === "grid") {
      const files = Array.isArray(selectedFiles)
        ? selectedFiles
        : [selectedFiles];
      return (
        <div
          className={cn(
            "grid gap-4",
            `grid-cols-${props.gridColumnCount || 2}`,
            props.styles?.previewContainer
          )}
        >
          {files.map((file, index) => (
            <div key={index} className='relative'>
              <PreviewComponent
                file={file}
                showIcon={props.showFileIcon}
                showFileName={props.showFileName}
                showFileSize={props.showFileSize}
                className={cn(props.styles?.preview)}
              />
              <div className='mt-2 flex flex-col'>
                {(props.showFileName ?? true) && (
                  <span className='truncate text-sm'>
                    {file instanceof File ? file.name : "File"}
                  </span>
                )}
                {(props.showFileSize ?? true) && typeof file !== "string" && (
                  <span className='text-xs text-muted-foreground'>
                    {formatFileSize(file.size)}
                  </span>
                )}
              </div>
              {!props.readOnly &&
                !props.disabled &&
                (props.showDeleteButton ?? true) && (
                  <DeleteButton
                    onClick={() => handleFileDelete(index)}
                    className={cn(
                      "absolute right-2 top-2",
                      props.styles?.deleteButton
                    )}
                  />
                )}
            </div>
          ))}
        </div>
      );
    }

    // Default single file preview
    return (
      <div
        className={cn("relative h-max w-max", props.styles?.previewContainer)}
      >
        <PreviewComponent
          file={Array.isArray(selectedFiles) ? selectedFiles[0] : selectedFiles}
          showIcon={props.showFileIcon}
          showFileName={props.showFileName}
          showFileSize={props.showFileSize}
          className={cn(props.styles?.preview)}
        />
        {!props.readOnly &&
          !props.disabled &&
          (props.showDeleteButton ?? true) && (
            <DeleteButton
              onClick={() => handleFileDelete()}
              className={cn("absolute top-2 m-2", props.styles?.deleteButton)}
            />
          )}
      </div>
    );
  }, [
    selectedFiles,
    props.showPreview,
    props.fileType,
    props.previewLayout,
    props.gridColumnCount,
    props.styles?.previewContainer,
    props.styles?.preview,
    props.styles?.deleteButton,
    props.showDeleteButton,
    props.readOnly,
    props.disabled,
    props.showFileIcon,
    props.showFileName,
    props.showFileSize,
  ]);

  const Content = useMemo(() => {
    const hasFiles =
      (!props?.multiple && selectedFiles) ||
      (props?.multiple &&
        Array.isArray(selectedFiles) &&
        selectedFiles?.length);

    return (
      <div
        className={cn(
          "relative",
          (props.readOnly || props.disabled) && "cursor-not-allowed opacity-80",
          props.styles?.container
        )}
      >
        {hasFiles && props.showPreview !== false ? (
          <>
            {props.canDropOnPreview ? (
              <RenderDropzone>
                {RenderPreview}
                {props.mediaStatus &&
                  MEDIA_STATUS_LIST.includes(props.mediaStatus) && (
                    <MediaStatusOverlay
                      status={props.mediaStatus}
                      className={props.styles?.mediaStatus}
                    />
                  )}
              </RenderDropzone>
            ) : (
              <>
                {hasFiles ? (
                  props.mediaStatus &&
                  MEDIA_STATUS_LIST.includes(props.mediaStatus) ? (
                    <MediaStatusOverlay
                      status={props.mediaStatus}
                      className={props.styles?.mediaStatus}
                    />
                  ) : (
                    RenderPreview
                  )
                ) : (
                  props.mediaStatus &&
                  MEDIA_STATUS_LIST.includes(props.mediaStatus) && (
                    <MediaStatusOverlay
                      status={props.mediaStatus}
                      className={props.styles?.mediaStatus}
                    />
                  )
                )}
                {props.canDropAgain && <RenderDropzone />}
              </>
            )}
          </>
        ) : (
          <>
            {props.canDropOnPreview ? (
              <>
                <RenderDropzone>
                  {props.mediaStatus &&
                    MEDIA_STATUS_LIST.includes(props.mediaStatus) && (
                      <>
                        <MediaStatusOverlay
                          status={props.mediaStatus}
                          className={cn(
                            "absolute inset-0 aspect-video h-full w-full",
                            props.styles?.mediaStatus
                          )}
                        />
                        <DeleteButton
                          onClick={() => handleFileDelete()}
                          className={cn(
                            "absolute right-2 top-2",
                            props.styles?.deleteButton
                          )}
                        />
                      </>
                    )}
                </RenderDropzone>
              </>
            ) : (
              <>
                {props.mediaStatus &&
                  MEDIA_STATUS_LIST.includes(props.mediaStatus) && (
                    <div className='relative'>
                      <MediaStatusOverlay
                        status={props.mediaStatus}
                        className={props.styles?.mediaStatus}
                      />
                      <DeleteButton
                        onClick={() => handleFileDelete()}
                        className={cn(
                          "absolute right-2 top-2",
                          props.styles?.deleteButton
                        )}
                      />
                    </div>
                  )}

                <RenderDropzone />
              </>
            )}
          </>
        )}

        <MemoizedProgressBar
          isUploading={props.isUploading}
          showProgressBar={props.showProgressBar}
          uploadProgress={props.uploadProgress}
          uploadTimeRemaining={props.uploadTimeRemaining}
          uploadSizeRemaining={props.uploadSizeRemaining}
          onUploadCancel={props.onUploadCancel}
          className={cn(
            "absolute right-2 top-2 m-2",
            props.styles?.progressBar
          )}
        />
      </div>
    );
  }, [
    selectedFiles,
    props.multiple,
    props.showPreview,
    props.canDropOnPreview,
    props.canDropAgain,
    props.readOnly,
    props.mediaStatus,
    props.uploadProgress,
    props.uploadTimeRemaining,
    props.uploadSizeRemaining,
    props.showProgressBar,
    props.isUploading,
  ]);

  const handleCroppedFileUpload = (croppedBlob: Blob): void => {
    if (!pendingCropFile) {
      console.warn("No pending file to crop");
      return;
    }

    const croppedFile = new File(
      [croppedBlob],
      pendingCropFile.name || "cropped-image",
      {
        type: croppedBlob.type,
      }
    );

    if (props.multiple) {
      const newValue = Array.isArray(selectedFiles)
        ? [...selectedFiles, croppedFile]
        : [croppedFile];

      if (props.onChange) {
        props.onChange(newValue);
      }
    } else {
      if (props.onChange) {
        props.onChange(croppedFile);
      }
    }

    props.onFileUpload?.(croppedFile);
  };

  return (
    <>
      {Content}
      {props.enableImageCropper && props.fileType === "image" && (
        <ImageCrop
          isOpen={cropModalOpen}
          setIsOpen={setCropModalOpen}
          imageURL={pendingCropFile}
          setCroppedImage={handleCroppedFileUpload}
          aspectRatio={props.cropperAspectRatio || 1}
          size={props.cropperSizePresets?.[0]?.value || "default"}
          setSize={(newSize: string) => {
            props.onCropperSizeChange?.(newSize);
          }}
          sizeOptions={props.cropperSizePresets || []}
          className={props.styles?.imageCropper}
        />
      )}
    </>
  );
};

export default Dropzone;
