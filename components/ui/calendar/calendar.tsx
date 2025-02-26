"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { getMonth, getYear } from "date-fns-jalali";
import format from "date-fns-jalali/format";
import { faIR } from "date-fns/locale";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useCallback, useState } from "react";
import { DayPicker } from "react-day-picker/jalali";
import "react-day-picker/style.css";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const Calendar: React.FC<CalendarProps> = React.memo(
  ({ className, classNames, showOutsideDays = true, ...props }) => {
    // State for the current month being displayed
    const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

    // Jalali month names
    const jalaliMonths: string[] = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];

    // Custom formatters for Jalali date picker
    const jalaliFormatters: any = {
      formatWeekdayName: (date: Date) =>
        format(date, "EEEEEE", { locale: faIR }), // Format weekday names,
      formatCaption: (date: Date) => {
        const month = getMonth(date); // Get the month number
        const year = getYear(date); // Get the year
        return `${jalaliMonths[month]} ${year}`; // Return formatted month and year
      },
      formatDay: (date: Date) => format(date, "d", { locale: faIR }), // Format the day number
    };

    // Function to handle month change
    const handleMonthChange = useCallback((month: Date) => {
      setSelectedMonth(month); // Update state with the new month
    }, []);

    return (
      <DayPicker
        dir='rtl'
        formatters={jalaliFormatters} // Apply custom Jalali formatters
        showOutsideDays={showOutsideDays} // Show days from the previous/next month if they appear in the current month view
        className={cn("p-3", className)} // Apply padding and any additional classes
        month={selectedMonth} // Control the month being displayed
        onMonthChange={handleMonthChange} // Update the month when it changes
        classNames={{
          // Custom class names for various parts of the calendar
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          month_caption: "flex justify-center pt-1 relative items-center", // Position caption label in the center
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-start", // Navigation buttons (previous/next month)
          button_previous: "absolute right-1", // Position left button for previous month
          button_next: "absolute left-1", // Position right button for next month
          month_grid: "w-full border-collapse space-y-1",
          weekdays: "flex", // Weekday row layout
          weekday:
            "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]", // Style for each weekday
          week: "flex w-full mt-2", // Layout for each week row
          day: cn(
            // Style for each day cell
            "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
            props.mode === "range"
              ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
              : "[&:has([aria-selected])]:rounded-md"
          ),
          day_button: cn(
            // Style for buttons within each day cell
            buttonVariants({ variant: "ghost" }),
            "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
          ),
          range_start: "day-range-start", // Start of a selected range
          range_end: "day-range-end", // End of a selected range
          selected:
            "bg-primary rounded-md text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground", // Style for selected days
          today: "bg-accent rounded-md text-accent-foreground", // Style for the current day
          outside:
            "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30", // Style for days outside the current month
          disabled: "text-muted-foreground opacity-50", // Style for disabled days
          range_middle:
            "aria-selected:bg-accent  aria-selected:text-accent-foreground", // Style for days in the middle of a selected range
          hidden: "invisible", // Hide element visually
          ...classNames, // Merge with any additional classNames passed in props
        }}
        components={{
          Chevron: ({ orientation }) =>
            orientation === "left" ? (
              <ChevronRightIcon className='h-4 w-4' />
            ) : (
              <ChevronLeftIcon className='h-4 w-4' />
            ),
        }}
        {...props} // Spread additional props into the DayPicker component
      />
    );
  }
);

Calendar.displayName = "Calendar";

export { Calendar };
