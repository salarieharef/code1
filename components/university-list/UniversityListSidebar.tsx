"use client";
import { Suspense, useContext, useEffect, useRef, useState } from "react";

// Component imports
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";

// Icon imports
import { Loader2, SearchIcon } from "lucide-react";
import UniversityScorePopover from "./filter-popover/UniversityScorePopover";
import UniversityStatePopover from "./filter-popover/UniversityStatePopover";
import UniversityCard from "./university-card";

// Fetch imports
import routes from "@/utils/api/routes";

// Context imports
import { university_context } from "@/context/university";
import useSWRInfinite from "swr/infinite";

// Util imports
import flatten from "lodash-es/flatten";
import get from "lodash-es/get";
import map from "lodash-es/map";

// Hook imports
import { nextFetcher } from "@/utils/api/next-fetcher";
import { useIntersection } from "@mantine/hooks";
import { useSearchParams } from "next/navigation";

export default function UniversityListSidebar({ className }: any) {
  const {
    search,
    setSearch,
    setUniversityIdForDetail,
    setShowUniversityDetail,
    position,
    bounds,
  }: any = useContext(university_context);

  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  const [scorePopoverOpen, setScorePopoverOpen] = useState(false);
  const [statePopoverOpen, setStatePopoverOpen] = useState(false);
  const [cityPopoverOpen, setCityPopoverOpen] = useState(false);

  const form = useForm<any>({
    defaultValues: {
      q: q || "",
    },
  });
  const filter = (data: any) => {
    setSearch(data?.q);
  };

  const showUniversityDetails = (id: number | string) => {
    // Set the universityId state
    setUniversityIdForDetail(id);
    setShowUniversityDetail(true);
  };

  // const { data, isLoading, isValidating, setSize, size } = useSWRInfinite(
  //   (index) => [
  //     routes.homeRoutes.universities({ page: index + 1 })?.url,
  //     search,
  //     bounds,
  //   ],
  //   ([url]) =>
  //     apiFetcher(url, routes.homeRoutes.universities()?.method, {
  //       q: search,
  //       map_points: bounds,
  //     }),
  //   {
  //     revalidateOnFocus: false,
  //   }
  // );

  const { data, isLoading, isValidating, setSize, size } = useSWRInfinite(
    (index) => [
      routes.homeRoutes.universities({
        page: index + 1,
        sort: "university_most_score",
      })?.url,
      search,
      bounds,
    ],
    ([url]) =>
      nextFetcher({
        url,
        method: routes.homeRoutes.universities()?.method,
        body: {
          q: search,
          map_points: bounds,
        },
        // useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );
  const universities = flatten(map(data, "data"));

  const page_number = get(data, "[0].page_number", 0);

  const lastUniversity = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastUniversity.current,
    threshold: 1,
  });

  useEffect(() => {
    setSearch(q);
  }, [q]);

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
  }, [entry, page_number]);

  return (
    <aside
      className={`${className} relative flex h-[70vh] flex-col items-start overflow-y-auto pb-4 lg:h-[100vh]`}
    >
      <Suspense>
        <div className='justify-cetner sticky top-0 z-10 mt-4 flex w-full flex-col items-center rounded-md px-4'>
          <Form {...form}>
            <form
              className={`mx-5 flex w-full flex-col items-center overflow-hidden rounded bg-white dark:bg-slate-950`}
              onSubmit={form.handleSubmit(filter)}
            >
              <div className='flex w-full items-center justify-center'>
                <FormField
                  control={form.control}
                  name='q'
                  render={({ field }) => {
                    return (
                      <FormItem className='flex w-full justify-center'>
                        <FormControl>
                          <div className='flex w-full items-center rounded-lg border border-slate-400'>
                            <Input
                              type='text'
                              {...field}
                              placeholder={`واحد‌‌های دانشگاهی را جستجو کنید...`}
                              className='mx-3 rounded-none border-0 text-xs focus-visible:ring-0 focus-visible:ring-offset-0 md:text-sm'
                              autoComplete='off'
                            />

                            <Button
                              variant='ghost'
                              size='icon'
                              className='mx-1 hover:bg-transparent'
                              name='Search'
                              type='submit'
                              disabled={form.formState.isSubmitting}
                            >
                              {form.formState.isSubmitting ? (
                                <Loader2 className='animate-spin' />
                              ) : (
                                <SearchIcon className='stroke-[1.5] text-slate-600' />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className='mt-1 flex w-full items-center justify-center'>
                <div className='flex w-1/3 items-center justify-start'>
                  <FormField
                    control={form.control}
                    name='rate'
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <UniversityScorePopover
                              open={scorePopoverOpen}
                              onOpenChange={() =>
                                setScorePopoverOpen(!scorePopoverOpen)
                              }
                              buttonText='امتیاز'
                              onChange={field.onChange}
                              value={field.value}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div className='flex w-1/3 items-center justify-start'>
                  <FormField
                    control={form.control}
                    name='state'
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <UniversityStatePopover
                              open={statePopoverOpen}
                              onOpenChange={() =>
                                setStatePopoverOpen(!statePopoverOpen)
                              }
                              buttonText='استان'
                              onChange={(id) => {
                                field.onChange(id);
                              }}
                              value={field.value}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
                {/* <div className='flex w-1/3 items-center justify-start'>
                <FormField
                  control={form.control}
                  name='city'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <UniversityCityPopover
                            open={cityPopoverOpen}
                            onOpenChange={() =>
                              setCityPopoverOpen(!cityPopoverOpen)
                            }
                            buttonText='شهر'
                            onChange={(id) => {
                              field.onChange(id);
                            }}
                            value={field.value}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div> */}
              </div>
            </form>
          </Form>
        </div>

        <Separator orientation='horizontal' className='my-2' />
        <div className='flex w-full flex-col gap-2'>
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => <></>)
            : universities?.map((university: any, key: number) => {
                if (key + 1 == universities?.length) {
                  return (
                    <div ref={ref} key={key}>
                      <UniversityCard
                        showUniversityDetails={showUniversityDetails}
                        data={university}
                      />
                    </div>
                  );
                }
                return (
                  <>
                    <UniversityCard
                      showUniversityDetails={showUniversityDetails}
                      data={university}
                      key={key}
                    />
                    <Separator />
                  </>
                );
              })}
        </div>
        {isValidating ? (
          <div className='mt-2 flex items-center justify-center self-center'>
            <Loader2 className='animate-spin' />
          </div>
        ) : null}
      </Suspense>
    </aside>
  );
}
