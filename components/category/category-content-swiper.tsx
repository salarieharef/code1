// Component imports

import { Mousewheel } from "swiper/modules";
import { Swiper } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Fetch imports
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { useCallback, useRef } from "react";
import useSWR from "swr";

export default function CategoryContentSwiper({
  className,
  children,
  id,
}: any) {
  const ref = useRef<any>(null);
  const handlePrev = useCallback(() => {
    if (!ref.current) return;
    ref.current?.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!ref.current) return;
    ref.current?.swiper.slideNext();
  }, []);

  // const { data, error, isLoading } = useSWR(
  // 	routes.courseRoutes.courses({ sort: "most_liked" }),
  // 	(url) => postFetcher(url, {}),
  // 	{ revalidateOnFocus: false }
  // );

  const { data, error, isLoading } = useSWR(
    routes.courseRoutes.courses({ sort: "most_liked" }),
    (url) =>
      nextFetcher({
        url,
        method: "POST",
        body: {},
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <div className={`relative w-full ${className}`}>
      <Button
        size='icon'
        variant='link'
        onClick={handlePrev}
        className='invisible absolute right-0 h-full w-16 md:visible'
      >
        <ChevronRight className='h-16 w-16 stroke-1 text-slate-700' />
      </Button>
      <Button
        size='icon'
        variant='link'
        onClick={handleNext}
        className='invisible absolute left-0 h-full w-16 md:visible'
      >
        <ChevronLeft className='h-16 w-16 stroke-1 text-slate-700' />
      </Button>
      <div className='md:px-16'>
        <Swiper
          ref={ref}
          dir='rtl'
          className='w-full'
          mousewheel={true}
          modules={[Mousewheel]}
        >
          {children}
        </Swiper>
      </div>
    </div>
  );
}
