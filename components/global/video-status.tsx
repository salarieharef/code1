// components/VideoStatus.tsx
import React from "react";
import Image from "next/image";
import VideoPreview from "./form/VideoPreview";
import FormattingVideoImg from "@/static/images/global/formatting-video.webp";

interface VideoStatusProps {
  fileValue?: File | null;
  contentStatus?: "uploaded" | "in_format" | string | "none";
}

const VideoStatus: React.FC<VideoStatusProps> = ({
  fileValue,
  contentStatus,
}) => {
  return (
    <>
      {fileValue ? (
        <div className='sm:col-span-full'>
          <VideoPreview fileValue={fileValue} />
        </div>
      ) : contentStatus === "uploaded" || contentStatus === "in_format" ? (
        <div className='flex aspect-video w-full flex-col items-center justify-center rounded-lg bg-secondary sm:col-span-full'>
          <Image
            src={FormattingVideoImg}
            alt='Formatting video'
            width={200}
            height={200}
          />
          <p>ویدئو شما درحال پردازش است، لطفا شکیبا باشید.</p>
        </div>
      ) : null}
    </>
  );
};

export default VideoStatus;
