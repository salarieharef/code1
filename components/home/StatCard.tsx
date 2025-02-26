import React from "react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";
import { cn } from "@/utils/cn";

interface StatCardProps {
  icon: React.ReactNode;
  number: number | string;
  text: string;
  fillIcon?: boolean;
  isLoading?: boolean;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  number,
  text,
  fillIcon,
  isLoading,
  className,
}) => {
  return (
    <Card
      className={cn(
        "w-full rounded-2xl border border-solid border-blue-500 bg-white shadow",
        className
      )}
    >
      <CardContent className='flex w-full flex-col items-center px-2 py-2 md:max-w-full md:px-3'>
        <div className='flex w-full items-center justify-between'>
          {isLoading ? (
            <Skeleton className='ml-6 h-6 w-full' />
          ) : (
            <h3 className=' text-lg font-medium text-blue-400 md:text-3xl'>
              {number}
            </h3>
          )}
          <div className='flex aspect-square items-center justify-center rounded-md bg-blue-200 p-2 text-blue-400'>
            {icon}
            {/* {React.isValidElement(icon) &&
              React.cloneElement(icon as React.ReactElement<any>, {
                className: `ml-1 ${fillIcon ? "fill-current" : ""}`,
              })} */}
          </div>
        </div>
        <div className='flex w-full flex-row items-center justify-start pb-0 pt-2'>
          <p className='text-xs font-medium md:text-sm'>{text}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
