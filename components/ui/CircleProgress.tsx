"use client";

import { cn } from "@/utils/cn";
import { Check } from "lucide-react"; // Import the CheckCircle icon
import * as React from "react";

// Circle Progress Bar with dynamic progress and completion check
interface CircleProgressProps {
  size?: number; // Diameter of the circle
  strokeWidth?: number; // Stroke width of the circle
  progressColor?: string; // the progress bar color
  bgColor?: string; // the background circle color
  value: number; // Percentage of progress (0-100)
  textColor?: string; // the percentage text color
  checkStyle?: string; // the percentage text color
  showCheckOnComplete?: boolean; // Dynamically show checkmark on 100% progress
  CheckIcon?: any;
}

const CircleProgress: React.FC<CircleProgressProps> = ({
  size = 100,
  strokeWidth = 10,
  progressColor = "stroke-blue-600", // Tailwind class for progress color
  bgColor = "stroke-slate-200", // Tailwind class for background color
  value,
  textColor = "text-black", // Tailwind class for text color
  showCheckOnComplete = true, // Default to true if not provided
  checkStyle,
  CheckIcon,
}) => {
  const CheckIconCircleProgress = CheckIcon || (
    <Check
      className={cn("absolute text-success", checkStyle)}
      size={size / 2.5} // Dynamic size based on circle size
    />
  );

  const radius = (size - strokeWidth) / 2; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const offset = circumference - (value / 100) * circumference; // Calculate stroke offset based on progress value

  return (
    <div className='relative flex items-center justify-center'>
      <svg width={size} height={size} className='-rotate-90 transform'>
        {/* Background circle */}
        <circle
          className={cn(bgColor)} // Apply Tailwind class for background color
          fill='transparent'
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          className={cn(progressColor)} // Apply Tailwind class for progress color
          fill='transparent'
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference} // Full circle length
          strokeDashoffset={offset} // Control how much of the circle is visible
          strokeLinecap='round'
        />
      </svg>

      {/* Dynamically display checkmark when progress reaches 100% */}
      {showCheckOnComplete && value == 100 ? (
        CheckIconCircleProgress
      ) : (
        <span className={cn("absolute font-bold", textColor)}>{value}%</span> // Apply Tailwind class for text color
      )}
    </div>
  );
};

export { CircleProgress };
