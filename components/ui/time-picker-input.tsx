// time-picker-input.js
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import React from "react";
import {
  TimePickerType,
  getArrowByType,
  getDateByType,
  setDateByType,
} from "./time-picker-utils";

export interface TimePickerInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  picker: TimePickerType;
  date: Date | undefined;
  valueInSeconds?: boolean;
  setDate: (date: Date | undefined) => void;
  onRightFocus?: () => void;
  onLeftFocus?: () => void;
}

const TimePickerInput = React.forwardRef<
  HTMLInputElement,
  TimePickerInputProps
>(
  (
    {
      className,
      type = "tel",
      value,
      id,
      name,
      date = new Date(new Date().setHours(0, 0, 0, 0)),
      setDate,
      onChange,
      onKeyDown,
      picker,
      onLeftFocus,
      onRightFocus,
      valueInSeconds,
      ...props
    },
    ref
  ) => {
    const [flag, setFlag] = React.useState<boolean>(false);

    /**
     * allow the user to enter the second digit within 2 seconds
     * otherwise start again with entering first digit
     */
    React.useEffect(() => {
      if (flag) {
        const timer = setTimeout(() => {
          setFlag(false);
        }, 2000);

        return () => clearTimeout(timer);
      }
    }, [flag]);

    function toPersianDigits(input: any) {
      const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
      return input.toString().replace(/\d/g, (x: any) => persianDigits[x]);
    }

    function toEnglishDigits(input: string) {
      const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
      return input.replace(
        /[۰-۹]/g,
        (w) => englishDigits[persianDigits.indexOf(w)]
      );
    }

    const calculatedValue = React.useMemo(
      () => toPersianDigits(getDateByType(date, picker)),
      [date, picker]
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Tab") return;
      e.preventDefault();
      if (e.key === "ArrowRight") onRightFocus?.();
      if (e.key === "ArrowLeft") onLeftFocus?.();
      if (["ArrowUp", "ArrowDown"].includes(e.key)) {
        const step = e.key === "ArrowUp" ? 1 : -1;
        const newValue = getArrowByType(
          toEnglishDigits(calculatedValue),
          step,
          picker
        );
        if (flag) setFlag(false);
        const tempDate = new Date(date);
        setDate(setDateByType(tempDate, newValue, picker));
      }
      if (e.key >= "0" && e.key <= "9") {
        const newValue = !flag
          ? "0" + e.key
          : toEnglishDigits(calculatedValue.slice(1, 2)) + e.key;
        if (flag) onRightFocus?.();
        setFlag((prev) => !prev);
        const tempDate = new Date(date);
        setDate(setDateByType(tempDate, newValue, picker));
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (valueInSeconds) {
        const input = e.target.value;
        let seconds = 0;
        switch (picker) {
          case "hours":
            seconds = parseInt(input) * 3600;
            break;
          case "minutes":
            seconds = parseInt(input) * 60;
            break;
          case "seconds":
            seconds = parseInt(input);
            break;
        }
        const tempDate = new Date(date);
        tempDate.setSeconds(seconds);
        setDate(tempDate);
      } else {
        const tempDate = new Date(date);
        setDate(setDateByType(tempDate, e.target.value, picker));
      }
    };

    return (
      <Input
        ref={ref}
        id={id || picker}
        name={name || picker}
        className={cn(
          "w-[50px] text-center font-mono text-base tabular-nums caret-transparent focus:bg-accent focus:text-accent-foreground [&::-webkit-inner-spin-button]:appearance-none",
          className
        )}
        value={value || calculatedValue}
        onChange={handleChange}
        type={type}
        inputMode='decimal'
        onKeyDown={(e) => {
          onKeyDown?.(e);
          handleKeyDown(e);
        }}
        {...props}
      />
    );
  }
);

TimePickerInput.displayName = "TimePickerInput";

export { TimePickerInput };
