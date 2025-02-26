import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePicker } from "./time-picker";

interface TimePickerPopoverProps {
  date?: Date | undefined;
  setDate?: (date: Date | undefined) => void;
  labels: {
    hours: string;
    minutes: string;
    seconds: string;
  };
  showHours: boolean;
  showMinutes: boolean;
  showSeconds: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean, date?: Date) => void;
  width?: string;
}

export function TimePickerPopover({
  date,
  setDate,
  labels,
  showHours,
  showMinutes,
  showSeconds,
  isOpen,
  onOpenChange,
  width = "280px",
}: TimePickerPopoverProps) {
  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            `w-[${width}] justify-start rounded-md border-0 bg-secondary text-left font-normal`, // Use width prop here
            !date && "text-muted-foreground "
          )}
        >
          {date ? format(date, "HH:mm:ss") : <span>زمان را انتخاب کنید</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <div className='border-t border-border p-3'>
          <TimePicker
            date={date}
            setDate={(date: any) => {
              setDate && setDate(date);
            }}
            labels={labels}
            showHours={showHours}
            showMinutes={showMinutes}
            showSeconds={showSeconds}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
