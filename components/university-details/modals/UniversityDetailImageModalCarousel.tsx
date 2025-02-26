import VideoPlayer from "@/components/class/video-player";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import NoImageIcon from "@/static/icons/no-image.svg?url";

interface UniversityDetailImageModalCarouselProps {
  contents: any;
  className: string;
  startIndex?: number;
}

export const UniversityDetailImageModalCarousel: React.FC<
  UniversityDetailImageModalCarouselProps
> = ({ contents, className, startIndex }) => {
  return (
    <Carousel
      opts={{ align: "start", direction: "rtl", startIndex: startIndex }}
      className={className}
    >
      <CarouselContent>
        {contents?.map((content: any, index: number) => (
          <CarouselItem
            key={index}
            className='flex items-center justify-center'
          >
            {content?.format == "video" ? (
              <VideoPlayer src={content?.file} />
            ) : (
              <div className='relative flex h-full w-full items-center justify-center'>
                <Image
                  src={content?.file || NoImageIcon}
                  alt={`carousel image ${index}`}
                  className='max-h-[60vh] rounded-2xl object-contain'
                  layout='responsive'
                  width={500}
                  height={500}
                  priority
                />
              </div>
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
