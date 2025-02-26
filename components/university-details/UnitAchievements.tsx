import { useParams } from "next/navigation";

// Component  imports
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ClassCardSkeleton } from "../home/class-card";

// Icon imports
import BestSellerSvg from "@/static/icons/achievements/best-seller.svg";

// Fetch imports
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import useSWR from "swr";
import { Ratings } from "../ui/Ratings";

export default function UnitAchievements({ universityId }: any) {
  const params = useParams();

  // const { data: achievements, isLoading } = useSWR(
  // 	routes.userRoutes.achievements(universityId),
  // 	fetcher,
  // 	{
  // 		revalidateOnFocus: false,
  // 	}
  // );
  const { data: achievements, isLoading } = useSWR(
    () => routes.userRoutes.achievements(universityId),
    (url) =>
      nextFetcher({
        url,
        // method: "GET",
        // useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <section className='w-full px-4 pb-2 lg:pb-0'>
      <h2 className='text-sm font-medium text-blue-900'>رتبه بندی واحد</h2>

      <Carousel
        opts={{
          align: "start",
          direction: "rtl",
        }}
        className={`mb-2 mt-4 w-full ${false ? "overflow-x-scroll" : ""}`}
      >
        <CarouselContent>
          {false
            ? Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className='basis-2/5 sm:basis-1/3'>
                  <ClassCardSkeleton className='h-96' />
                </CarouselItem>
              ))
            : [1, 2, , 3, 4, 5, 6, 7].map((course: any, key: number) => (
                <CarouselItem key={key} className='basis-2/5 sm:basis-1/3'>
                  <Card className={`w-full rounded-2xl border-0 shadow-none`}>
                    <CardContent className='flex flex-col items-center justify-center p-2'>
                      <div className='flex flex-col'>
                        <Image
                          src={BestSellerSvg}
                          alt={"achievement icons"}
                          width={256}
                          height={256}
                          className='h-full w-full'
                        />

                        <div className='flex flex-row-reverse justify-center'>
                          <Ratings rating={2} variant='yellow' size={16} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
        </CarouselContent>
        {/* <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" /> */}
      </Carousel>
      <Separator
        orientation='horizontal'
        className='mt-4 h-[2px] bg-slate-300'
      />
    </section>
  );
}
