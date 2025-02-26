"use client";
import { useContext, useEffect, useRef } from "react";

// Component imports
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Icon imports
import { Check, ChevronDown, ChevronUp, Loader2 } from "lucide-react";

// Fetch imports
import routes from "@/utils/api/routes";
import useSWRInfinite from "swr/infinite";

// Util imports
import { flatten, get, map } from "lodash-es";

// Hook imports
import { university_context } from "@/context/university";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { useIntersection } from "@mantine/hooks";
import { useFormContext } from "react-hook-form";

export default function UniversityCityPopover({
  open,
  onOpenChange,
  buttonText,
  onChange,
  value,
}: {
  open?: boolean;
  onOpenChange?: () => void;
  buttonText?: string;
  onChange?: (id: any) => void;
  value?: string | number;
}) {
  const { setPosition, setZoom }: any = useContext(university_context);

  const form = useFormContext();

  // const {
  //   data: citiesData,
  //   isLoading,
  //   isValidating,
  //   setSize,
  //   size,
  // } = useSWRInfinite(
  //   (index) =>
  //     routes.homeRoutes.cities({
  //       page: index + 1,
  //       limit: 10,
  //       state: form?.watch("state") || "",
  //     })?.url,
  //   (url) => apiFetcher(url, routes.homeRoutes.cities()?.method),
  //   {
  //     revalidateOnFocus: false,
  //   }
  // );
  const {
    data: citiesData,
    isLoading,
    isValidating,
    setSize,
    size,
  } = useSWRInfinite(
    (index) => {
      const { url, method } = routes.homeRoutes.cities({
        page: index + 1,
        limit: 10,
        state: form?.watch("state") || "",
      });
      return { url, method };
    },
    ({ url, method }) =>
      nextFetcher({
        url,
        method,
        // useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );
  const cities = flatten(map(citiesData, "data"));

  const lastCity = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastCity.current,
    threshold: 1,
  });

  const page_number = get(citiesData, "[0].page_number", 0);
  useEffect(() => {
    if (
      page_number &&
      page_number > 1 &&
      entry?.isIntersecting &&
      size !== page_number &&
      !isValidating
    ) {
      setSize(size + 1);
    }
  }, [entry, page_number, setSize, size]);

  const changeMapPositionToCityPosition = (city: any) => {
    setPosition([city?.lat, city?.lon]);
    setZoom(12);
  };

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild className=''>
        <Button
          className='h-fit w-fit p-2 text-sm hover:bg-transparent'
          variant={"ghost"}
        >
          <div className='flex flex-row items-center justify-center gap-1'>
            {buttonText}
            {open ? (
              <ChevronUp className=' h-4 w-4' />
            ) : (
              <ChevronDown className=' h-4 w-4' />
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-58 mx-4'>
        <div className='flex max-h-60 w-full flex-col items-center justify-start gap-y-3 overflow-y-auto'>
          {cities.map((city, index) => {
            if (index + 1 == cities?.length) {
              return (
                <div ref={ref} key={index}>
                  <Button
                    variant={"ghost"}
                    className='h-fit w-full p-0 px-4 hover:bg-transparent'
                    onClick={() => {
                      changeMapPositionToCityPosition(city);
                      onChange ? onChange(city?.id) : null;
                    }}
                  >
                    {city?.id == value ? (
                      <Check className='mx-1 h-4 w-4' />
                    ) : null}
                    {city?.name}
                  </Button>
                </div>
              );
            }
            return (
              <Button
                key={index}
                variant={"ghost"}
                className='h-fit w-full p-0 px-4 hover:bg-transparent'
                onClick={() => {
                  changeMapPositionToCityPosition(city);
                  onChange ? onChange(city?.id) : null;
                }}
              >
                {city?.id == value ? <Check className='mx-1 h-4 w-4' /> : null}
                {city?.name}
              </Button>
            );
          })}

          {isValidating ? (
            <div className='mt-2 flex justify-center'>
              <Loader2 className='animate-spin' />
            </div>
          ) : null}
        </div>
      </PopoverContent>
    </Popover>
  );
}
