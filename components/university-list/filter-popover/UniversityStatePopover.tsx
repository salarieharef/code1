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
import flatten from "lodash-es/flatten";
import get from "lodash-es/get";
import map from "lodash-es/map";

// Hook imports
import { university_context } from "@/context/university";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { useIntersection } from "@mantine/hooks";

export default function UniversityStatePopover({
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

  // const {
  //   data: statesData,
  //   isLoading,
  //   isValidating,
  //   setSize,
  //   size,
  // } = useSWRInfinite(
  //   (index) => routes.homeRoutes.states({ page: index + 1, limit: 10 }),
  //   ({ url }) => apiFetcher(url, routes.homeRoutes.states()?.method),
  //   {
  //     revalidateOnFocus: false,
  //   }
  // );
  const {
    data: statesData,
    isLoading,
    isValidating,
    setSize,
    size,
  } = useSWRInfinite(
    (index) => {
      const { url, method } = routes.homeRoutes.states({
        page: index + 1,
        limit: 10,
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
  const states = flatten(map(statesData, "data"));

  const lastState = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastState.current,
    threshold: 1,
  });

  const page_number = get(statesData, "[0].page_number", 0);
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

  const changeMapPositionToStatePosition = (state: any) => {
    setPosition([state?.lat, state?.lon]);
    setZoom(10);
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
      <PopoverContent className='w-58 p-0'>
        <div className='flex max-h-60 w-full flex-col items-center justify-start overflow-y-auto'>
          {states.map((state, index) => {
            if (index + 1 == states?.length) {
              return (
                <div ref={ref} key={index}>
                  <Button
                    variant={"ghost"}
                    className='h-fit w-full'
                    onClick={() => {
                      changeMapPositionToStatePosition(state);
                      onChange ? onChange(state?.id) : null;
                    }}
                  >
                    {state?.id == value ? (
                      <Check className='mx-1 h-4 w-4' />
                    ) : null}
                    {state?.name}
                  </Button>
                </div>
              );
            }
            return (
              <Button
                key={index}
                variant={"ghost"}
                className='h-fit w-full'
                onClick={() => {
                  changeMapPositionToStatePosition(state);
                  onChange ? onChange(state?.id) : null;
                }}
              >
                {state?.id == value ? <Check className='mx-1 h-4 w-4' /> : null}
                {state?.name}
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
