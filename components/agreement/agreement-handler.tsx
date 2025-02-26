"use client";
import Image from "next/image";

// Component imports
import IconTitleMaker from "@/components/agreement/icon-title-maker";
import ShowMore from "@/components/global/ShowMore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton-loading";

// Api imports
import useSWR from "swr";

// Util imports
import { find } from "lodash-es";
import { getImageUrlBase } from "@/utils/imageUtils";

// Type imports
import { dynamicAgreementProps, RuleProps } from "@/types/agreement/list";

// Icon imports
import NoImageIcon from "@/static/icons/no-image.svg?url";

import { Square } from "lucide-react";
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";

const AgreementHandler = ({ agreement_group }: dynamicAgreementProps) => {
  const {
    data: groups,
    error,
    isLoading,
  } = useSWR(
    { url: routes.agreementRoutes.groups(), method: "GET" },
    nextFetcher,
    { revalidateOnFocus: false }
  );

  const selectedGroup = find(
    groups?.data,
    (data) => data?.id == agreement_group
  );

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
            title={selectedGroup?.title}
          />
        </div>

        <Accordion
          type='single'
          collapsible
          className='w-full overflow-hidden rounded-lg'
        >
          <ShowMore
            url={routes.agreementRoutes.rules(agreement_group)?.url}
            api_method={routes.agreementRoutes.rules()?.method}
            limit={1}
            skeletonComponent={<Skeleton className={"my-2 h-12 w-full"} />}
          >
            {(item: RuleProps) => (
              <AccordionItem value={`${item.title + item.id}`} key={item.id}>
                <AccordionTrigger className='bg-slate-100 p-2 font-normal hover:no-underline [&[data-state=open]]:bg-slate-150'>
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className=' bg-slate-50 text-muted-foreground'>
                  <p
                    className='m-3 max-w-screen-lg'
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></p>
                </AccordionContent>
              </AccordionItem>
            )}
          </ShowMore>
        </Accordion>
      </div>
    </div>
  );
};

export default AgreementHandler;
