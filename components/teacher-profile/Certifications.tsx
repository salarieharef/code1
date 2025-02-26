import Image from "next/image";
import { useParams } from "next/navigation";

// Component  imports
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";

// Icon imports
import { BookA } from "lucide-react";

// Fetch imports
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import useSWR from "swr";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

export default function Certifications({ user }: any) {
  const params = useParams();

  // const { data: certificates, isLoading } = useSWR(
  //   routes.userRoutes.certificates(params.id),
  //   fetcher,
  //   {
  //     revalidateOnFocus: false,
  //   }
  // );
  const { data: certificates, isLoading } = useSWR(
    routes.userRoutes.certificates(params.id),
    (url) =>
      nextFetcher({
        url: url,
        method: "GET",
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );
  return (
    <section className='mt-4'>
      <h2 className='text-xl font-bold text-blue-900 sm:text-2xl'>
        گواهی‌نامه‌های دریافت‌ شده
      </h2>

      {isLoading ? (
        <div className='mt-6 grid grid-cols-3 gap-4'>
          <Skeleton className='aspect-video w-full bg-slate-300' />
          <Skeleton className='aspect-video w-full bg-slate-300' />
          <Skeleton className='aspect-video w-full bg-slate-300' />
        </div>
      ) : certificates?.data?.length ? (
        <Carousel
          opts={{
            align: "start",
          }}
          className='mt-4 w-full'
        >
          <CarouselContent>
            {certificates?.data?.map((certificate: any, i: number) => (
              <CarouselItem
                key={i}
                className='basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5'
              >
                <Image
                  src={certificate?.image}
                  alt='Certificate Image'
                  width={512}
                  height={375}
                  key={i}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious /> */}
          {/* <CarouselNext /> */}
        </Carousel>
      ) : (
        <div className='flex flex-col items-center justify-center'>
          <BookA className='h-36 w-36 stroke-[.5]' />
          <span>{user?.name} هیچ گواهینامه ای ثبت نکرده است.</span>
        </div>
      )}

      <Separator
        orientation='horizontal'
        className='mt-4 h-[2px] bg-slate-300 '
      />
    </section>
  );
}
