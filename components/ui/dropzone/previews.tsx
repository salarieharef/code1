import VideoPlayer from "@/components/class/video-player";
import { cn } from "@/utils/cn";
import { formatFileSize } from "@/utils/functions/formatFileSize";
import { getImageUrlBase } from "@/utils/imageUtils";
import { File, FileImage, FileSpreadsheet, FileVideo } from "lucide-react";
import Image from "next/image";

import PdfSvg from "@/static/icons/pdf.svg";

// Update the interface for preview components
interface PreviewProps {
  file: File | string;
  className?: string;
  showIcon?: boolean;
  showFileName?: boolean;
  showFileSize?: boolean;
}

export const PreviewComponents = {
  video: ({
    file,
    className,
    showIcon,
    showFileName = true,
    showFileSize = true,
  }: PreviewProps) =>
    showIcon ? (
      <div className={cn("flex items-center gap-2", className)}>
        <FileVideo className='h-8 w-8 text-primary' />
        <div className='flex w-full flex-col'>
          {showFileName && (
            <span className='w-full truncate text-sm font-medium '>
              {typeof file === "string" ? "Video" : file.name}
            </span>
          )}
          {showFileSize && typeof file !== "string" && (
            <span className='text-xs text-muted-foreground'>
              {formatFileSize(file.size)}
            </span>
          )}
        </div>
      </div>
    ) : (
      <div className={cn("aspect-video w-full", className)}>
        {file ? (
          <VideoPlayer
            src={
              typeof file === "string"
                ? file
                : { src: URL.createObjectURL(file), type: "video/mp4" }
            }
            showCenterPlayButton={false}
          />
        ) : null}
      </div>
    ),

  image: ({
    file,
    className,
    showIcon,
    showFileName = true,
    showFileSize = true,
  }: PreviewProps) =>
    showIcon ? (
      <div className={cn("flex items-center gap-2", className)}>
        <FileImage className='h-8 w-8 text-primary' />
        <div className='flex w-full flex-col'>
          {showFileName && (
            <span className='w-full truncate text-sm font-medium '>
              {typeof file === "string" ? "Image" : file.name}
            </span>
          )}
          {showFileSize && typeof file !== "string" && (
            <span className='text-xs text-muted-foreground'>
              {formatFileSize(file.size)}
            </span>
          )}
        </div>
      </div>
    ) : file ? (
      <Image
        src={
          file
            ? typeof file === "string"
              ? getImageUrlBase(file)
              : URL.createObjectURL(file)
            : ""
        }
        alt='Preview'
        width={300}
        height={300}
        className={cn("rounded-lg object-cover", className)}
      />
    ) : null,

  pdf: ({
    file,
    className,
    showIcon,
    showFileName = true,
    showFileSize = true,
  }: PreviewProps) => {
    const content = (
      <div className={cn("flex items-center gap-2", className)}>
        <PdfSvg className='h-8 w-8 text-red-500' />
        <div className='flex w-full flex-col'>
          {showFileName && (
            <span className='w-full truncate text-sm font-medium '>
              {typeof file === "string" ? "PDF Document" : file.name}
            </span>
          )}
          {showFileSize && typeof file !== "string" && (
            <span className='text-xs text-muted-foreground'>
              {formatFileSize(file.size)}
            </span>
          )}
        </div>
      </div>
    );

    return content;
  },

  text: ({ file, className, showIcon, showFileName = true }: PreviewProps) => (
    <div className={cn("flex items-center gap-2", className)}>
      <File className='h-8 w-8 text-blue-500' />
      {showFileName && (
        <span className='w-full truncate text-sm font-medium  '>
          {typeof file === "string" ? "Document" : file.name}
        </span>
      )}
    </div>
  ),

  spreadsheet: ({
    file,
    className,
    showIcon,
    showFileName = true,
    showFileSize = true,
  }: PreviewProps) => (
    <div className={cn("flex items-center gap-2", className)}>
      <FileSpreadsheet className='h-8 w-8 text-green-500' />
      <div className='flex w-full flex-col'>
        {showFileName && (
          <span className='w-full truncate text-sm font-medium '>
            {typeof file === "string" ? "Spreadsheet" : file.name}
          </span>
        )}
        {showFileSize && typeof file !== "string" && (
          <span className='text-xs text-muted-foreground'>
            {formatFileSize(file.size)}
          </span>
        )}
      </div>
    </div>
  ),

  document: (props: PreviewProps) => {
    const ext =
      typeof props.file === "string"
        ? props.file.split(".").pop()?.toLowerCase()
        : props.file.name.split(".").pop()?.toLowerCase();

    if (ext === "pdf") return PreviewComponents.pdf(props);
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext || ""))
      return PreviewComponents.image(props);
    return PreviewComponents.text(props);
  },

  media: (props: PreviewProps) => {
    const ext =
      typeof props.file === "string"
        ? props.file.split(".").pop()?.toLowerCase()
        : props.file.name.split(".").pop()?.toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext || ""))
      return PreviewComponents.image(props);
    if (["mp4", "mkv", "mov", "avi"].includes(ext || ""))
      return PreviewComponents.video(props);
    return PreviewComponents.text(props);
  },

  all: (props: PreviewProps) => {
    const ext =
      typeof props.file === "string"
        ? props.file.split(".").pop()?.toLowerCase()
        : props.file.name.split(".").pop()?.toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext || ""))
      return PreviewComponents.image(props);
    if (["mp4", "mkv", "mov", "avi"].includes(ext || ""))
      return PreviewComponents.video(props);
    if (ext === "pdf") return PreviewComponents.pdf(props);
    if (["xlsx", "xls", "csv"].includes(ext || ""))
      return PreviewComponents.spreadsheet(props);
    return PreviewComponents.text(props);
  },
};
