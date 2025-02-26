import Link from "next/link";
import { useParams } from "next/navigation";

// Component  imports
import { ClassCard } from "./class-card";

// Fetch imports
import routes from "@/utils/api/routes";
import useSWR from "swr";
import { Button } from "../ui/button";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

// Auth imports
import { CarouselItemClassSkeleton } from "@/components/ui/skeleton-loading/skeletons";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { useSession } from "next-auth/react";

export default function ClassRecommendations({ user }: any) {
  const { data: session }: any = useSession();
  const params = useParams();

  const {
    data: classes,
    isLoading,
    error,
  } = useSWR(
    `${routes.courseRoutes.courses({})}`,
    (url) =>
      nextFetcher({
        url,
        method: "POST",
        body: { teacher: params.id },
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <section className='mt-4'>
      <h2 className='text-xl font-bold text-blue-900 sm:text-2xl'>
        دروس پرطرفدار
      </h2>

      {isLoading ? (
        <CarouselItemClassSkeleton count={3} />
      ) : (
        <Carousel
          opts={{
            align: "start",
          }}
          className='mt-4 w-full'
        >
          <CarouselContent>
            {classes?.data?.map((classItem: any, i: number) => (
              <CarouselItem
                key={i}
                className='basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5'
              >
                <Link href={`/class/${classItem?.id}`} key={i}>
                  <ClassCard data={classItem} />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious /> */}
          {/* <CarouselNext /> */}
        </Carousel>
      )}

      <div className='flex items-center justify-center gap-2'>
        {session?.user && session?.user?.id == user?.id ? (
          <Link
            className='flex items-center justify-center'
            href='/studio/class/create'
          >
            <Button className='mt-8' variant='link'>
              درخواست تدریس جدید
            </Button>
          </Link>
        ) : null}
        <Link
          className='flex items-center justify-center'
          href={`/category?teacher=${user?.id}`}
        >
          <Button className='mt-8'>مشاهده همه</Button>
        </Link>
      </div>
      {/* <Separator
        orientation="horizontal"
        className="h-[2px] bg-slate-300 mt-4 "
      /> */}
    </section>
  );
}
