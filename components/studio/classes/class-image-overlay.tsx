import Image from "next/image";

// Component imports
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";
import ResponsiveImage from "@/components/responsive-image/ResponsiveImage";
import ClassGalleryIcon from "@/static/icons/class-gallery.svg?url";
import NoImageIcon from "@/static/icons/no-image.svg?url";

export function ClassImageOverlay({
  image,
  lessonsCount,
  className = "",
}: any) {
  return (
    <div className={`relative ${className}`}>
      <div className='absolute bottom-0 left-0 top-0 z-10 w-1/3 items-center justify-center rounded-l-md bg-slate-900/50 p-4'></div>
      <div className='absolute bottom-0 left-0 top-0 z-10 flex w-1/3 flex-col items-center justify-center rounded-l-lg bg-transparent'>
        <span className='text-2xl font-bold text-white'>{lessonsCount}</span>
        <Image
          src={ClassGalleryIcon}
          alt='Class Gallery Icon'
          width={64}
          height={64}
          className='h-8 w-8'
        />
        {/* <GalleryVerticalEnd className="fill-gradient-to-r from-blue-400 to-blue-500 fill-white stroke-white w-8 h-8"/> */}
      </div>
      <ResponsiveImage
        src={image || NoImageIcon}
        alt='Class Image'
        imageClassName='aspect-video w-full rounded-xl object-cover'
        containerClassName='aspect-video md:aspect-video rounded-2xl w-full h-full'
      />
    </div>
  );
}

export function ClassImageOverlaySkeleton({ className }: any) {
  return (
    <div className={className}>
      <Skeleton className='!aspect-video w-full overflow-hidden rounded-md shadow-sm' />
    </div>
  );
}
