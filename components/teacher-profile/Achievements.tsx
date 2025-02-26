"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";
import WarningMessageServer from "@/components/warning/warning-message-server";
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { FileBadge2, Star } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

export default function Achievements({ user }: any) {
  const params = useParams();

  // const {
  //   data: achievements,
  //   isLoading,
  //   error,
  // } = useSWR(routes.userRoutes.achievements(params.id), fetcher, {
  //   revalidateOnFocus: false,
  // });
  const {
    data: achievements,
    isLoading,
    error,
  } = useSWR(
    routes.userRoutes.achievements(params.id),
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

  const RenderContent = () => {
    if (isLoading) {
      return (
        <div className='mt-6 flex flex-row flex-wrap justify-center gap-x-4 lg:justify-between lg:gap-2'>
          {[...Array(5)].map((_, index) => (
            <Skeleton
              key={index}
              className='h-24 w-24 rounded-full bg-slate-300 lg:h-40 lg:w-40'
            />
          ))}
        </div>
      );
    }

    if (!isLoading && (error || !achievements || !achievements.success)) {
      return (
        <div className='flex w-full justify-center py-8'>
          <WarningMessageServer>ارتباط با سرور برقرار نشد</WarningMessageServer>
        </div>
      );
    }

    if (!isLoading && achievements?.data?.length === 0) {
      return (
        <div className='flex flex-col items-center justify-center'>
          <FileBadge2 className='h-36 w-36 stroke-[.5]' />
          <span>{user?.name} هیچ دستاوردی هنوز دریافت نکرده است.</span>
        </div>
      );
    }

    return (
      <Carousel
        opts={{
          align: "start",
        }}
        className='mt-4 w-full'
      >
        <CarouselContent>
          {achievements?.data?.map((data: any, i: number) => (
            <CarouselItem
              key={i}
              className='basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6'
            >
              <Dialog>
                <DialogTrigger asChild className='cursor-pointer'>
                  <div className='flex flex-col'>
                    <Image
                      src={data?.achievement?.image}
                      alt={data?.achievement?.title}
                      width={256}
                      height={256}
                      className='h-full w-full'
                    />

                    <div className='flex flex-row-reverse justify-center'>
                      {Array.from(Array(5).keys()).map((i) => (
                        <Star
                          className={
                            data?.rate > i
                              ? "fill-amber-400 text-amber-400"
                              : "fill-slate-300 text-slate-300"
                          }
                          key={i}
                        />
                      ))}
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className='w-auto p-0'>
                  <div className='flex flex-col'>
                    <div className='flex flex-col items-center bg-slate-100 p-4'>
                      <Image
                        src={data?.achievement?.image}
                        alt={data?.achievement?.title}
                        width={200}
                        height={200}
                      />

                      <div className='flex flex-row-reverse justify-center'>
                        {Array.from(Array(5).keys()).map((i) => (
                          <Star
                            className={
                              data?.rate > i
                                ? "fill-amber-400 text-amber-400"
                                : "fill-slate-300 text-slate-300"
                            }
                            key={i}
                          />
                        ))}
                      </div>
                    </div>
                    <div className='p-4'>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: data?.achievement?.description,
                        }}
                      ></p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious /> */}
        {/* <CarouselNext /> */}
      </Carousel>
    );
  };

  return (
    <section className='mt-4'>
      <h2 className='text-xl font-bold text-blue-900 sm:text-2xl'>دستاوردها</h2>
      <RenderContent />
      <Separator
        orientation='horizontal'
        className='mt-4 h-[2px] bg-slate-300 '
      />
    </section>
  );
}
