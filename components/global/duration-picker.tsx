"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { convertSecondsToTime } from "@/utils/functions/formatDateTimeForServer";

export default function DurationPicker({
  showHours = true,
  showMinutes = true,
  showSeconds = false,
  showLabels = true,
  onChange = (value: number) => {},
  disabled,
  value,
  max_hours = 24,
  max_minutes = 59,
  max_seconds = 59,
  ...props
}: {
  showHours?: boolean;
  showMinutes?: boolean;
  showSeconds?: boolean;
  showLabels?: boolean;
  onChange?: (value: number) => void;
  value?: number;
  disabled?: boolean;
  max_hours?: number;
  max_minutes?: number;
  max_seconds?: number;
}) {
  const [time, setTime] = useState({ hours: "0", minutes: "0", seconds: "0" });

  useEffect(() => {
    console.log("setTime", convertSecondsToTime(value || 0), time);
    setTime(convertSecondsToTime(value || 0));
  }, [value]);

  const totalSeconds = useCallback(() => {
    return (
      parseInt(time.hours) * 3600 +
      parseInt(time.minutes) * 60 +
      parseInt(time.seconds)
    );
  }, [time]);

  // This effect will only call onChange if totalSeconds changes
  useEffect(() => {
    onChange(totalSeconds());
  }, [totalSeconds()]); // Call onChange only when totalSeconds changes

  const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  };

  const handleChange =
    (unit: "hours" | "minutes" | "seconds") => (value: string) => {
      // Update state based on the selected unit
      value
        ? setTime((prev) => ({
            ...prev,
            [unit]: value,
          }))
        : null;
    };

  return (
    <div className='mb-4 flex flex-col-reverse md:flex-row gap-2' {...props}>
      {showSeconds && (
        <div className='flex items-center gap-1'>
          {showLabels && (
            <label htmlFor='seconds' className='text-sm'>
              ثانیه:
            </label>
          )}
          <Select
            value={time.seconds}
            onValueChange={handleChange("seconds")}
            disabled={disabled}
          >
            <SelectTrigger id='seconds' className='w-24 border-0 bg-slate-150'>
              <SelectValue placeholder='ثانیه' />
            </SelectTrigger>
            <SelectContent>
              {range(0, max_seconds).map((second) => (
                <SelectItem
                  key={second}
                  value={second.toString().padStart(2, "0")}
                >
                  {second.toString().padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      {showMinutes && (
        <div className='flex items-center gap-1'>
          {showLabels && (
            <label htmlFor='minutes' className='text-sm'>
              دقیقه:
            </label>
          )}
          <Select
            value={time.minutes}
            onValueChange={handleChange("minutes")}
            disabled={disabled}
          >
            <SelectTrigger id='minutes' className='w-24 border-0 bg-slate-150'>
              <SelectValue placeholder='دقیقه' />
            </SelectTrigger>
            <SelectContent>
              {range(0, max_minutes).map((minute) => (
                <SelectItem
                  key={minute}
                  value={minute.toString().padStart(2, "0")}
                >
                  {minute.toString().padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      {showHours && (
        <div className='flex items-center gap-1'>
          {showLabels && (
            <label htmlFor='hours' className='text-sm'>
              ساعت:
            </label>
          )}
          <Select
            value={time.hours}
            onValueChange={handleChange("hours")}
            disabled={disabled}
          >
            <SelectTrigger id='hours' className='w-24 border-0 bg-slate-150'>
              <SelectValue placeholder='ساعت' />
            </SelectTrigger>
            <SelectContent>
              {range(0, max_hours).map((hour) => (
                <SelectItem key={hour} value={hour.toString().padStart(2, "0")}>
                  {hour.toString().padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
