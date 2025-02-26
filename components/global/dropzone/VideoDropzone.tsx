"use client";
import VideoPlayer from "@/components/class/video-player";
import { RectangleProgress } from "@/components/ui/RectangleProgress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useUploadWithProgress } from "@/hooks/api/useUploadWithProgress";
import { cancelRequest } from "@/utils/api/next-fetcher";
import { cn } from "@/utils/cn";
import { handleDeleteContent } from "@/utils/functions/course/contentOperations.function";
import { Trash2, VideoOff } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useSWRConfig } from "swr";

// Define the props with TypeScript
interface VideoDropzoneProps {
  name: string;
  placeholder?: string;
  containerClassName?: string;
  instructionsClassName?: string;
  fillClassName?: string;
  noFillClassName?: string;
  IconUploadVideo?: React.ReactNode;
  value?: File | string | null;
  onChange: (file: File | null) => void;
  contentsId?: string;
  progress?: any;
  fileType?: "intro-video" | "sample_video"; // Add more file types if needed
  read_only_video?: boolean;
  timeRemaining?: any;
  sizeRemaining?: any;
  cancelUpload?: any;
}

const VideoDropzone: React.FC<VideoDropzoneProps> = ({
  placeholder = "فایل ویدیو خود را انتخاب کنید یا بکشید اینجا",
  containerClassName,
  instructionsClassName,
  fillClassName,
  noFillClassName,
  IconUploadVideo,
  value,
  onChange,
  contentsId,
  name,
  progress,
  fileType = "intro-video",
  read_only_video = false,
  timeRemaining,
  sizeRemaining,
}) => {
  const [videoUrl, setVideoUrl]: any = useState<string | null>(null);
  const params = useParams();
  const courseId = params?.id || params?.classId || params?.fieldId;
  const form = useFormContext();
  const { toast } = useToast();
  const { mutate } = useSWRConfig();

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size <= 100 * 1024 * 1024) {
        // 50 MB limit
        setVideoUrl({
          src: URL.createObjectURL(selectedFile),
          type: "video/mp4",
        });
        onChange(selectedFile);
        toast({
          variant: "success",
          title: "فایل با موفقیت انتخاب شد.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "حجم ویدئوی شما بیش از حد مجاز است",
        });
      }
    }
  };

  useEffect(() => {
    setVideoUrl(null);
  }, []);

  // Handle drag and drop events
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    // for mozilla browser
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      if (droppedFile.size <= 100 * 1024 * 1024) {
        // 50 MB limit
        setVideoUrl({
          src: URL.createObjectURL(droppedFile),
          type: "video/mp4",
        });
        onChange(droppedFile);
        toast({
          variant: "success",
          title: "فایل با موفقیت انتخاب شد.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "حجم ویدئوی شما بیش از حد مجاز است",
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "لطفا یک فایل ویدیو معتبر انتخاب کنید.",
      });
    }
  };

  return (
    <div>
      {!videoUrl && !value && !read_only_video ? (
        <div
          className={cn(
            "mx-auto mt-4 w-full items-center rounded-lg border border-dashed border-blue-400 bg-blue-100 text-sm text-blue-400 md:w-64",
            value
              ? `cursor-default border-none border-slate-500 bg-slate-50 md:w-96 ${fillClassName}`
              : `h-10 cursor-pointer hover:bg-blue-200 hover:text-blue-500 ${noFillClassName}`,
            containerClassName
          )}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <label
            className={`flex h-full w-full cursor-pointer flex-col items-center justify-center ${noFillClassName}`}
          >
            {IconUploadVideo ? (
              <div className='max-w-9'>{IconUploadVideo}</div>
            ) : (
              <></>
            )}
            <Input
              type='file'
              accept='video/*'
              onChange={handleFileChange}
              className='hidden'
            />
            <span
              className={cn("text-center text-blue-400", instructionsClassName)}
            >
              {placeholder}
            </span>
          </label>
        </div>
      ) : (
        <div className='relative w-full'>
          <div className={cn("absolute right-4 top-4 z-10")}>
            {progress ? (
              // <CircleProgress
              //   size={40}
              //   strokeWidth={3}
              //   progressColor='stroke-blue-600'
              //   bgColor='stroke-slate-300'
              //   value={progress}
              //   textColor='text-black text-sm font-semibold'
              //   checkStyle='size-7 text-success'
              //   // CheckIcon={
              //   //   <Check
              //   //     className={cn("absolute text-success")} // Apply Tailwind classes
              //   //     size={120 / 2.5} // Dynamic size based on circle size
              //   //   />
              //   // }
              // />
              <RectangleProgress
                progressColor='bg-gradient-to-r from-blue-600 to-blue-300 '
                // bgColor='bg-slate-200'
                value={progress}
                timeRemaining={timeRemaining}
                sizeRemaining={sizeRemaining}
                textColor='text-black'
                showCheckOnComplete={true}
                onCancel={() => cancelRequest("cancelFetchSampleVideo")}
              />
            ) : !read_only_video ? (
              <div className='overflow-hidden rounded-lg bg-slate-50/90 shadow-lg'>
                <Button
                  onClick={() =>
                    handleDeleteContent({
                      fileType,
                      toast,
                      mutate,
                      onChange,
                      setVideoUrl,
                      value,
                      contentId: contentsId,
                      courseId,
                      form,
                      videoUrl,
                      name,
                    })
                  }
                  className='text-slate-500 hover:text-slate-700'
                  type='button'
                  variant='ghost'
                  size='icon'
                >
                  <Trash2 size={24} />
                </Button>
              </div>
            ) : null}
          </div>

          <div className='aspect-video w-full'>
            {read_only_video && !value ? (
              <div className='flex h-full w-full flex-col items-center justify-center'>
                <VideoOff className='size-14 stroke-1.5 text-muted-foreground' />
                <p>ویدیو آپلود نشده است!</p>
              </div>
            ) : (
              <VideoPlayer
                src={videoUrl || value}
                showCenterPlayButton={false}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDropzone;
