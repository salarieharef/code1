"use client";

// Component imports
import { searchQueryParams } from "@/types/search-query";

// Component imports
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ShowMore from "@/components/global/ShowMore";
import { Skeleton } from "@/components/ui/skeleton-loading";
import Image from "next/image";
import { getImageUrlBase } from "@/utils/imageUtils";
import useSWR from "swr";
import { find } from "lodash-es";
import { useEffect } from "react";

// Icon imports
import IconTitleMaker from "@/components/agreement/icon-title-maker";
import { Square } from "lucide-react";

// Hook imports
import { useRouter, useSearchParams } from "next/navigation";

// Type imports
import { HelpProps } from "@/types/faq";
import { useDebounce } from "@/hooks/ui";
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";

import NoImageIcon from "@/static/icons/no-image.svg?url";

const FaqSearchResult = ({ searchQuery, group_id }: searchQueryParams) => {
  // Debounced search and other hooks
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);
  console.log(searchQuery);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Api URLs
  const helpURL = routes.faqRoutes.helps(searchQuery, group_id);
  const faqGroupURL = routes.faqRoutes.groups();

  // Calling api here to get the selected group by user
  const {
    data: groups,
    error,
    isLoading,
  } = useSWR(
    group_id ? { url: faqGroupURL?.url, method: faqGroupURL?.method } : null,
    nextFetcher,
    { revalidateOnFocus: false }
  );
  const selectedGroup = find(groups?.data, (data) => data?.id == group_id);

  useEffect(() => {
    if (searchQuery) {
      // With This trick after the debounce time finishes you can scroll to the search result
      const params = new URLSearchParams(searchParams.toString());
      router.push(`?${params.toString() + "#search-result"}`);
    }
  }, [searchQuery]);

  return (
    <div className='w-full'>
      <div className='flex flex-col items-center justify-center gap-y-10'>
        <div>
          <IconTitleMaker
            icon={
              selectedGroup?.image ? (
                <Image
                  src={getImageUrlBase(selectedGroup?.image) || NoImageIcon}
                  alt={selectedGroup?.title || ""}
                  width={50}
                  height={50}
                  className='size-7'
                />
              ) : (
                //This is jus a fallback icon if the image doesn't load ill change it to something better later
                <Square className={"size-7 text-blue-400"} />
              )
            }
            //! We need a switch case which translate the types to Farsi here
            title={searchQuery ? "نتایج جستجو" : selectedGroup?.title}
          />
        </div>

        <Accordion
          type='single'
          collapsible
          className='w-full overflow-hidden rounded-lg'
        >
          <ShowMore
            url={helpURL.url}
            limit={1}
            skeletonComponent={<Skeleton className={"my-2 h-12 w-full"} />}
            api_method={helpURL.method}
          >
            {(item: HelpProps) => (
              <AccordionItem value={`${item.title + item.id}`} key={item.id}>
                <AccordionTrigger className='bg-slate-100 p-2 font-normal hover:no-underline [&[data-state=open]]:bg-slate-150'>
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className=' bg-slate-50 text-muted-foreground'>
                  <p className='m-3 max-w-screen-lg'>{item.title}</p>
                </AccordionContent>
              </AccordionItem>
            )}
          </ShowMore>
        </Accordion>
      </div>
    </div>
  );
};

export default FaqSearchResult;
