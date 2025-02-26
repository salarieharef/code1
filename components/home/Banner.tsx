// Component imports
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import WarningMessageServer from "@/components/warning/warning-message-server";
import Autoplay from "embla-carousel-autoplay";
import BannerCard, { BannerCardSkeleton } from "./banner-card";

// Fetch imports
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import useSWR from "swr";

interface BannerContentProps {
  banner_url?: string;
  banner_image?: any;
}

function BannerContent({ banner_url }: BannerContentProps) {
  // const { data, error, isLoading } = useSWR(
  //   routes.slideRoutes.slides({ type: "main" }),
  //   fetcher,
  //   { revalidateOnFocus: false }
  // );
  const url = !!banner_url
    ? banner_url
    : routes.slideRoutes.slides({ type: "main" });

  const { data, error, isLoading } = useSWR(
    url,
    () =>
      nextFetcher({
        url,
        method: "GET",
      }),
    { revalidateOnFocus: false }
  );

  if (isLoading) {
    return (
      <>
        <div
          className={`${data?.title ? "w-1/2" : "w-full"} h-full overflow-hidden`}
        >
          <>
            <BannerCardSkeleton />
          </>
        </div>
      </>
    );
  }

  if (!isLoading && (error || !data || !data.success)) {
    return (
      <div className='flex w-full justify-center py-8'>
        <WarningMessageServer>ارتباط با سرور برقرار نشد</WarningMessageServer>
      </div>
    );
  }

  if (data?.data?.length === 0) {
    return (
      <div className='flex w-full justify-center py-8'>
        <WarningMessageServer>داده‌ای یافت نشد</WarningMessageServer>
      </div>
    );
  }
  return (
    <>
      {data?.data?.map((banner: any, key: number) => (
        <CarouselItem key={key}>
          <BannerCard
            data={banner}
            color='bg-sky-500'
            key={key}
            className='overflow-hidden'
          />
        </CarouselItem>
      ))}
    </>
  );
}

export default function Banner({
  banner_url,
  banner_image,
}: BannerContentProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        direction: "rtl",
        loop: true,
      }}
      className='my-4 w-full'
      plugins={[Autoplay({ delay: 20000 })]}
    >
      <CarouselContent dir='rtl'>
        {banner_image ? (
          <CarouselItem>
            <BannerCard data={{ image: banner_image }} />
          </CarouselItem>
        ) : (
          <BannerContent banner_url={banner_url} banner_image={banner_image} />
        )}
      </CarouselContent>
      {!banner_image ? (
        <>
          <CarouselPrevious className='hidden shadow-lg sm:flex rtl:right-4' />
          <CarouselNext className='hidden shadow-lg sm:flex rtl:left-4' />
        </>
      ) : null}
    </Carousel>
  );
}
