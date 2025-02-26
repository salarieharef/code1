// time-picker.js
import * as React from "react";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "./time-picker-input";

interface TimePickerDemoProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  labels?: {
    hours?: string;
    minutes?: string;
    seconds?: string;
  };
  valueInSeconds?: boolean;
  showHours?: boolean;
  showMinutes?: boolean;
  showSeconds?: boolean;
  className?: any;
  disabled?: boolean;
}

export function TimePicker({
  date,
  setDate,
  labels,
  valueInSeconds = true,
  showHours = true,
  showMinutes = true,
  showSeconds = true,
  className,
  disabled,
}: TimePickerDemoProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className='flex items-end gap-2'>
      {showSeconds && (
        <div className='grid gap-1 text-center'>
          <Label htmlFor='seconds' className='text-xs'>
            {labels?.seconds}
          </Label>
          <TimePickerInput
            picker='seconds'
            date={date || undefined}
            setDate={setDate}
            ref={secondRef}
            onLeftFocus={() => minuteRef.current?.focus()}
            valueInSeconds={valueInSeconds}
            className={className}
            disabled={disabled}
          />
        </div>
      )}
      {showMinutes && (
        <div className='grid gap-1 text-center'>
          <Label htmlFor='minutes' className='text-xs'>
            {labels?.minutes}
          </Label>
          <TimePickerInput
            picker='minutes'
            date={date}
            setDate={setDate}
            ref={minuteRef}
            onLeftFocus={() => hourRef.current?.focus()}
            onRightFocus={() => secondRef.current?.focus()}
            valueInSeconds={valueInSeconds}
            className={className}
            disabled={disabled}
          />
        </div>
      )}

      {showHours && (
        <div className='grid gap-1 text-center'>
          <Label htmlFor='hours' className='text-xs'>
            {labels?.hours}
          </Label>
          <TimePickerInput
            picker='hours'
            date={date}
            setDate={setDate}
            ref={hourRef}
            onRightFocus={() => minuteRef.current?.focus()}
            valueInSeconds={valueInSeconds}
            className={className}
            disabled={disabled}
          />
        </div>
      )}

      <div className='flex h-10 items-center'>
        <Clock className='ml-2 h-5 w-5 text-blue-400' />
      </div>
    </div>
  );
}
