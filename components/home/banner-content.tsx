import ErrorBoundary from "@/components/ErrorBoundary";
import { CarouselItem } from "@/components/ui/carousel";
import routes from "@/utils/api/routes";
import useSWR from "swr";

import { nextFetcher } from "@/utils/api/next-fetcher";
import BannerCard, { BannerCardSkeleton } from "./banner-card";
const BannerContent = () => {
  // const { data, error, isLoading } = useSWR(
  //   routes.slideRoutes.slides({ type: "main" }),
  //   fetcher,
  //   { revalidateOnFocus: false }
  // );
  const { data, error, isLoading } = useSWR(
    routes.slideRoutes.slides({ type: "main" }),
    (url) =>
      nextFetcher({
        url,
        method: "GET",
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <ErrorBoundary
      loadingComponent={
        <div className='w-full'>
          <BannerCardSkeleton />
        </div>
      }
      data={data}
      isLoading={isLoading}
      error={error}
    >
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
    </ErrorBoundary>
  );
};

export default BannerContent;
