"use client";
import Image from "next/image";

// Component imports
import GroupSkeletonLoading from "@/components/agreement/group-skeleton-loading";
import WarningMessageServer from "@/components/warning/warning-message-server";
import { Button } from "../ui/button";

// Util imports
import { getImageUrlBase } from "@/utils/imageUtils";

// Api imports
import useSWR from "swr";

// Type imports
import { GroupItemProps } from "@/types/agreement/list";
import { GroupType } from "@/types/faq";

// Icon imports
import { Square } from "lucide-react";
import NoImageIcon from "@/static/icons/no-image.svg?url";

import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";

const AgreementGroupList = ({ type }: GroupType) => {
  //Calling Api here
  const {
    data: groups,
    error,
    isLoading,
  } = useSWR(
    {
      url:
        type === "agreement"
          ? routes.agreementRoutes.groups().url
          : routes.faqRoutes.groups().url,
      method: "GET",
    },
    nextFetcher,
    { revalidateOnFocus: false }
  );

  if (isLoading) {
    return <GroupSkeletonLoading />;
  }

  if (!isLoading && error) {
    return (
      <div className='flex w-full justify-center py-8'>
        <WarningMessageServer>ارتباط با سرور برقرار نشد</WarningMessageServer>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4'>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
        {groups?.data?.map((item: GroupItemProps, index: number) => (
          <Button
            key={index}
            className='flex aspect-video h-full w-full cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-none border border-muted p-4 text-center'
            variant='ghost'
            href={`?group=${item.id}`}
          >
            <div>
              {item?.image ? (
                <Image
                  src={getImageUrlBase(item?.image) || NoImageIcon}
                  alt={item?.title || ""}
                  width={50}
                  height={50}
                  className='size-7'
                />
              ) : (
                //This is jus a fallback icon if the image doesn't load ill change it to something better later
                <Square className={"size-7 text-blue-400"} />
              )}
            </div>
            <span className='text-sm font-medium text-slate-800'>
              {item.title}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AgreementGroupList;
