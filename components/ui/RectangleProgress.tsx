"use client";

import { formatRemainingTime } from "@/utils/functions/formatDateTimeForServer";
import { formatFileSize } from "@/utils/functions/formatFileSize";
import { removeSeparators } from "@/utils/persian-tools/tools-function";
import { Check, FileVideo, X } from "lucide-react";
import * as React from "react";
import { Button } from "./button";
import { Progress } from "./progress";
import { cn } from "@/utils/cn";

interface RectangleProgressProps {
  progressColor?: string;
  bgColor?: string;
  value: number;
  timeRemaining?: number;
  sizeRemaining?: number;
  textColor?: string;
  showCheckOnComplete?: boolean;
  CheckIcon?: React.ReactNode;
  onCancel?: () => void;
  className?: string;
}

// Extract progress info component
const ProgressInfo: React.FC<{
  value: number;
  downloadedSize: string;
  totalSize: string;
  showCheckOnComplete: boolean;
  onCancel?: () => void;
  CheckIcon: React.ReactNode;
}> = ({
  value,
  downloadedSize,
  totalSize,
  showCheckOnComplete,
  onCancel,
  CheckIcon,
}) => (
  <div className='flex items-center justify-between py-0.5'>
    <span className='text-xs text-slate-800'>{value}%</span>
    <div className='flex items-center justify-center gap-1'>
      <span className='text-xs text-muted-foreground' dir='ltr'>
        {downloadedSize}/{totalSize}
      </span>
      {showCheckOnComplete &&
        (value === 100 ? (
          <Button
            size='icon'
            variant='ghost'
            type='button'
            className='mx-0.5 mb-0.5 size-5 shrink-0 ring-2 ring-slate-50'
          >
            {CheckIcon}
          </Button>
        ) : (
          onCancel && (
            <Button
              size='icon'
              variant='ghost'
              type='button'
              onClick={onCancel}
              className='mx-0.5 mb-0.5 size-5 shrink-0 ring-2 ring-slate-50'
            >
              <X className='size-4 text-destructive' />
            </Button>
          )
        ))}
    </div>
  </div>
);

const RectangleProgress: React.FC<RectangleProgressProps> = ({
  progressColor = "bg-blue-600",
  bgColor = "bg-slate-150",
  value,
  timeRemaining = 0,
  sizeRemaining = 0,
  textColor = "text-black",
  showCheckOnComplete = true,
  CheckIcon = <Check className='text-success' size={20} />,
  onCancel,
  className,
}) => {
  const downloadedSize = formatFileSize((value / 100) * sizeRemaining);
  const totalSize = formatFileSize(sizeRemaining);
  const formattedTime = removeSeparators(
    formatRemainingTime(timeRemaining),
    ",",
    " و"
  );

  return (
    <div
      className={cn(
        "relative flex w-64 items-stretch rounded-lg border-2 border-slate-50 bg-slate-200 bg-opacity-85 p-1.5 shadow-md",
        className
      )}
    >
      <div className='flex w-full items-center justify-between gap-1'>
        <FileVideo className='size-9 rounded-lg stroke-1.5 text-slate-800 ring-2 ring-slate-50' />

        <div className='flex w-full flex-col px-1'>
          <ProgressInfo
            value={value}
            downloadedSize={downloadedSize}
            totalSize={totalSize}
            showCheckOnComplete={showCheckOnComplete}
            onCancel={onCancel}
            CheckIcon={CheckIcon}
          />

          <Progress
            value={value}
            indicatorClassName={progressColor}
            className='h-2'
          />

          {formattedTime ? (
            <div className='mt-1 flex justify-between text-xs text-muted-foreground'>
              <div className='flex items-center gap-0.5'>
                <span>زمان باقی مانده:</span>
                <span>{formattedTime}</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export { RectangleProgress };
