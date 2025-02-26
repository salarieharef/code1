"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ShowMore from "@/components/global/ShowMore";
import { Skeleton } from "@/components/ui/skeleton-loading";

//Types import
import { RuleProps } from "@/types/agreement/list";
import { GroupType } from "@/types/faq";
import routes from "@/utils/api/routes";

const BaseAgreements = ({ type }: GroupType) => {
  return (
    <Accordion
      type='single'
      collapsible
      className='w-full overflow-hidden rounded-lg'
    >
      <ShowMore
        url={
          type === "agreement"
            ? routes.agreementRoutes.rules()?.url
            : routes.faqRoutes.helps()?.url
        }
        limit={1}
        skeletonComponent={<Skeleton className={"my-2 h-12 w-full"} />}
      >
        {(item: RuleProps) => (
          <AccordionItem value={`${item?.title + item?.id}`} key={item?.id}>
            <AccordionTrigger className='bg-slate-100 p-2 font-normal hover:no-underline [&[data-state=open]]:bg-slate-150'>
              {item?.title}
            </AccordionTrigger>
            <AccordionContent className=' bg-slate-50 text-muted-foreground'>
              <p
                className='m-3 max-w-screen-lg'
                dangerouslySetInnerHTML={{ __html: item?.description }}
              ></p>
            </AccordionContent>
          </AccordionItem>
        )}
      </ShowMore>
    </Accordion>
  );
};

export default BaseAgreements;
