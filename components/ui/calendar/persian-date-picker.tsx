"use client";

import { InfoTooltip } from "@/components/global/InfoTooltip";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils/cn";
import { format } from "date-fns";
import faIR from "date-fns/locale/fa-IR";
import jalaali from "jalaali-js";
import { memo } from "react";
import { Calendar } from "./calendar";
import { TimePicker } from "./time-picker";

interface PersianCalendarProps {
  label?: string;
  value: Date | undefined;
  setValue: (date: Date | undefined) => void;
  required?: boolean;
  labels?: {
    hours: string;
    minutes: string;
    seconds: string;
  };
  showHours?: boolean;
  showMinutes?: boolean;
  showSeconds?: boolean;
  showTimePicker?: boolean;
  className?: string;
  tooltip?: string;
  disabled?: boolean;
}

const PersianDatePicker = memo(
  ({
    className,
    label = "تاریخ شروع",
    value,
    setValue,
    required = false,
    labels,
    showHours = true,
    showMinutes = true,
    showSeconds = true,
    showTimePicker = false,
    tooltip,
    disabled,
  }: PersianCalendarProps) => {
    const formatDate = (value: Date | undefined) => {
      if (!value) return "یک تاریخ انتخاب کنید";
      const date = new Date(value);
      if (isNaN(date.getTime())) return "Invalid date";
      const { jy, jm, jd } = jalaali.toJalaali(date);
      return `${jy}/${jm.toString().padStart(2, "0")}/${jd.toString().padStart(2, "0")}`;
    };

    const formatTime = (value: Date | undefined) => {
      if (!value || !showTimePicker) return "";
      const date = new Date(value);
      if (isNaN(date.getTime())) return "";
      return format(date, "HH:mm:ss");
    };
    const handleDateChange = (selectedDate: Date | undefined) => {
      if (selectedDate) {
        const currentTime = value ? new Date(value) : new Date();
        const updatedDate = new Date(selectedDate);

        // Merge the selected date with the current time
        updatedDate.setHours(
          currentTime.getHours(),
          currentTime.getMinutes(),
          currentTime.getSeconds(),
          currentTime.getMilliseconds()
        );

        setValue(updatedDate);
      } else {
        setValue(undefined);
      }
    };

    return (
      <div
        className={cn("flex w-full flex-col justify-start gap-3", className)}
      >
        <Label className='text-md flex items-center gap-1'>
          {label}{" "}
          {required ? <span className='text-destructive'>*</span> : null}
          {tooltip ? <InfoTooltip message={tooltip} /> : null}
        </Label>
        <Popover modal={false}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              className='flex w-full justify-start bg-secondary text-right'
              disabled={disabled}
            >
              <span>
                {showTimePicker
                  ? `${formatTime(value)} ${value ? "-" : ""}`
                  : ""}{" "}
                {formatDate(value)}
              </span>
            </Button>
          </PopoverTrigger>

          <PopoverContent className='flex w-auto flex-col space-y-2 p-2'>
            {showTimePicker && (
              <div className='flex w-full items-center justify-center'>
                <TimePicker
                  date={value ? new Date(value) : new Date()}
                  setDate={setValue}
                  labels={labels}
                  showHours={showHours}
                  showMinutes={showMinutes}
                  showSeconds={showSeconds}
                />
              </div>
            )}

            <div>
              <Calendar
                locale={faIR}
                mode='single'
                selected={value ? new Date(value) : undefined}
                onSelect={handleDateChange}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

PersianDatePicker.displayName = "PersianDatePicker";

export default PersianDatePicker;
