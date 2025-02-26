import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
const VideoPlayer = dynamic(() => import("@/components/class/video-player"), {
  ssr: false,
});

interface StepProps {
  image?: string;
  video?: string;
  title: string;
  body: string;
  subtitle?: string;
}

const Step: React.FC<StepProps> = ({ image, video, title, body, subtitle }) => (
  <div className='text-center'>
    {video && (
      <div className='aspect-video w-full'>
        <VideoPlayer src={video} />
      </div>
    )}
    {image && !video && (
      <Image
        src={image}
        alt={title}
        width={150}
        height={195}
        className='mx-auto aspect-square h-auto max-w-sm rounded-lg object-cover'
      />
    )}
    <h2 className='mt-2 text-lg font-extrabold text-slate-800'>{title}</h2>
    {subtitle && (
      <h3 className='mt-4 text-base font-medium text-slate-700'>{subtitle}</h3>
    )}
    <p className='mt-1 text-sm text-muted-foreground'>{body}</p>
  </div>
);

export default Step;
