import { cn } from "@/utils/cn";
import { ArrowUpCircleIcon } from "lucide-react";
import React from "react";

type DropzoneContentProps = {
  className?: string;
  labelClassName?: string;
  iconClassName?: string;
  textClassName?: string;
};

const DropzoneContent: React.FC<DropzoneContentProps> = ({
  className,
  labelClassName,
  iconClassName,
  textClassName,
}) => {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center",
        className
      )}
    >
      <label
        className={cn(
          "flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg",
          labelClassName
        )}
      >
        <div className='flex flex-col items-center justify-center space-y-3'>
          <div
            className={cn(
              "flex justify-center justify-items-end rounded-md border-2 border-slate-200 p-2 md:p-4",
              iconClassName
            )}
          >
            <ArrowUpCircleIcon className='h-6 w-6 rounded-full border-none bg-sky-600 text-slate-200 md:h-10 md:w-10' />
          </div>
          <span
            className={cn("text-center text-sm text-slate-500", textClassName)}
          >
            ویدئویی تبلیغ خود را برای آپلود بکشید و رها کنید.
          </span>
          <span
            className={cn(
              "text-center text-xs font-normal text-slate-400",
              textClassName
            )}
          >
            حداکثر زمان تبلیغ ویدئویی 30 ثانیه میباشد.
          </span>
        </div>
      </label>
    </div>
  );
};

export default DropzoneContent;
