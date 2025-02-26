import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils/cn";
import { Calendar as CalendarIcon } from "lucide-react";
import moment from "moment-jalaali";
import { Label } from "@/components/ui/label";
import { InfoTooltip } from "@/components/global/InfoTooltip";
import { Calendar } from "@/components/ui/calendar/calendar";
import { TimePicker } from "@/components/ui/calendar/time-picker";

interface DateTimePickerProps {
  date?: Date;
  setDate?: any;
  labels?: {
    hours: string;
    minutes: string;
    seconds: string;
  };
  showHours?: boolean;
  showMinutes?: boolean;
  showSeconds?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean, date?: Date) => void;
  showTimePicker?: boolean;
  daysAllowed?: number;
  min?: number;
  max?: number;
  className?: string;
  label?: string;
  tooltip?: string;
  required?: boolean;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  date,
  setDate = () => {},
  labels,
  showHours = true,
  showMinutes = true,
  showSeconds = false,
  isOpen,
  onOpenChange,
  showTimePicker = true,
  daysAllowed,
  className,
  label = "تاریخ شروع:",
  tooltip,
  required,
}) => {
  const disableDates = (date: Date) => {
    const now = new Date();
    if (daysAllowed) {
      const maxAllowedDate = new Date();
      maxAllowedDate.setDate(now.getDate() + daysAllowed);
      return date < now || date > maxAllowedDate;
    }
    return false;
  };

  const handleDateChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const gregorianDate = moment(selectedDate).format(
        "YYYY-MM-DDTHH:mm:ss.SSSZ"
      );
      setDate(new Date(gregorianDate));
    } else {
      setDate(undefined);
    }
  };

  return (
    <div className={cn("flex w-full flex-col justify-start gap-3", className)}>
      <Label className='text-md flex items-center gap-1'>
        {label} {required ? <span className='text-destructive'>*</span> : null}
        {tooltip ? <InfoTooltip message={tooltip} /> : null}
      </Label>
      <Popover open={isOpen} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "flex w-full justify-start text-right",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className='ml-2 h-4 w-4' />
            {date ? (
              moment(date).format(
                showSeconds ? "jYYYY/jMM/jDD HH:mm:ss " : "jYYYY/jMM/jDD HH:mm "
              )
            ) : (
              <span>انتخاب تاریخ</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='flex w-auto flex-col space-y-2 p-2'
          dir='rtl'
        >
          <Calendar
            mode={"single"}
            selected={date ? moment(date).toDate() : undefined}
            onSelect={handleDateChange}
            disabled={disableDates}
          />
          {showTimePicker && (
            <div className='flex w-full items-end justify-end'>
              <TimePicker
                date={date ? moment(date).toDate() : new Date()}
                setDate={handleDateChange}
                labels={labels}
                showHours={showHours}
                showMinutes={showMinutes}
                showSeconds={showSeconds}
              />
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};
