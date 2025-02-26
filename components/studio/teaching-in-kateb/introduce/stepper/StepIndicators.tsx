import { Button } from "@/components/ui/button";
import React from "react";

interface StepIndicatorsProps {
  stepCount: number;
  currentStep: number;
  onStepClick: (index: number) => void;
}

const StepIndicators: React.FC<StepIndicatorsProps> = ({
  stepCount,
  currentStep,
  onStepClick,
}) => (
  <div className='mt-4 flex flex-row-reverse justify-center gap-1'>
    {Array.from({ length: stepCount }, (_, index) => (
      <Button
        key={index}
        onClick={() => onStepClick(index)}
        className={`h-2 w-8 rounded-full p-0 transition-colors ${
          index === currentStep ? "bg-blue-500" : "bg-blue-200"
        }`}
      />
    ))}
  </div>
);

export default StepIndicators;
