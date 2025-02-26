import { course_form_context } from "@/context/course/form.context";
import { cn } from "@/utils/cn"; // Assuming you are using this utility for class management
import React, { useContext } from "react";

interface ProgressCircleProps {
  // currentStep: number;
  totalSteps: number;
  size?: number; // Size of the circle
  strokeWidth?: number; // Thickness of the progress stroke
  className?: string; // Additional class names for styling
  colorClass?: string; // Color class for the progress indicator
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  // currentStep,
  totalSteps,
  size = 48, // Default size
  strokeWidth = 4, // Default stroke thickness
  className = "",
  colorClass = "text-blue-500", // Default color class
}) => {
  const { stepPath }: any = useContext(course_form_context);

  // Calculate the percentage of progress
  const progressPercentage = Math.min((stepPath / totalSteps) * 100, 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg width={size} height={size}>
        {/* Background circle */}
        <circle
          className='text-slate-300'
          strokeWidth={strokeWidth}
          stroke='currentColor'
          fill='transparent'
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          className={colorClass}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={
            circumference - (circumference * progressPercentage) / 100
          }
          strokeLinecap='round'
          stroke='currentColor'
          fill='transparent'
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      {/* Display the current step and total steps inside the circle */}
      <span className='absolute text-center text-sm'>
        {stepPath}/{totalSteps}
      </span>
    </div>
  );
};

export default ProgressCircle;

// ____________Usage__________

{
  /* <ProgressCircle
currentStep={stepPath}
totalSteps={totalSteps}
size={48} // Size of the circle
strokeWidth={4} // Thickness of the stroke
className="my-4" // Additional class names for styling
colorClass="text-blue-500" // Color class for the progress indicator
/> */
}
