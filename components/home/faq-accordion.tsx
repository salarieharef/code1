"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";
import { useFetchOnIntersect } from "@/hooks/api";
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { Circle } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import useSWR from "swr";
import WarningMessageServer from "../warning/warning-message-server";
import { cn } from "@/utils/cn";

const FAQAccordion: React.FC<{ className?: string }> = ({ className }) => {
  const url = routes.homeRoutes.faqs({ limit: 5 })?.url;

  const ref = useRef<HTMLDivElement>(null);
  const hasFetched = useFetchOnIntersect(ref);

  const { data, error, isLoading } = useSWR(
    hasFetched ? { url, method: "GET" } : null,
    nextFetcher,
    { revalidateOnFocus: false }
  );

  if (!isLoading && error) {
    return (
      <div className='flex w-full justify-center py-8'>
        <WarningMessageServer>ارتباط با سرور برقرار نشد</WarningMessageServer>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-4xl w-full bg-blue-900 px-10 pt-6 text-right text-lg font-bold text-blue-50 dark:bg-blue-950 md:mt-8 md:px-16 md:pt-12 md:text-xl xl:px-40 xl:pt-24 xl:text-3xl",
        className
      )}
    >
      <Accordion type='single' collapsible>
        {isLoading ? (
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-14 w-full bg-blue-950' />
            <Skeleton className='h-14 w-full bg-blue-950' />
            <Skeleton className='h-14 w-full bg-blue-950' />
            <Skeleton className='h-14 w-full bg-blue-950' />
            <Skeleton className='h-14 w-full bg-blue-950' />
          </div>
        ) : (
          data?.data?.map((faq: any, key: number) => (
            <AccordionItem value={faq?.title} key={key}>
              <AccordionTrigger className='text-right hover:no-underline'>
                {faq?.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className='mb-4 mt-2 flex items-start gap-2 text-base font-medium text-amber-500 md:text-lg xl:text-2xl'>
                  <Circle className='mt-3 h-2 w-2 fill-amber-500 stroke-amber-500' />
                  <p dangerouslySetInnerHTML={{ __html: faq?.value }}></p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))
        )}
      </Accordion>

      <div className='my-14 inline-block w-full text-center'>
        {data?.page_number > 1 ? (
          <Button size='lg'>
            <Link href='/faq'>مشاهده تمام سوالات</Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default FAQAccordion;
