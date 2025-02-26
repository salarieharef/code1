import { cn } from "@/utils/cn";
import React from "react";

type VideoInfoProps = {
  nameVideo?: string;
  sizeVideo?: number | null;
  className?: string;
  infoClassName?: string;
};

const VideoInfo: React.FC<VideoInfoProps> = ({
  nameVideo,
  sizeVideo,
  className,
  infoClassName,
}) => {
  return (
    <div className={cn("flex flex-col justify-between", className)}>
      {nameVideo && (
        <div
          className={cn("flex items-center justify-start gap-3", infoClassName)}
        >
          <p className='text-lg font-medium'>نام ویدئو: </p>
          <p className='text-md truncate text-slate-700'>{nameVideo}</p>
        </div>
      )}
      {sizeVideo !== null && (
        <div
          className={cn("flex items-center justify-start gap-3", infoClassName)}
        >
          <p className='text-lg font-medium'>حجم ویدئو: </p>
          <p className='text-md truncate text-slate-700'>{`${sizeVideo} مگابایت`}</p>
        </div>
      )}
    </div>
  );
};

export default VideoInfo;
