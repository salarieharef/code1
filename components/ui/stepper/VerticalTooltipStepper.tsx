"use client";
import React from "react";

// Component imports
import ProgressCircle from "@/components/global/ProgressCircle";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { StepItem } from "@/components/ui/stepper";

// Util imports
import { cn } from "@/utils/cn";
import { filter, last } from "lodash-es";

// Icon imports
import { Check, Hourglass } from "lucide-react";

interface VerticalTooltipStepperProps {
  stepPath: number;
  stepList: StepItem[];
  backendStepIndex: number;
  onStepClick: (index: number) => void;
  showMiniSteps?: boolean;
}

const states = {
  active: (currentStep: number, stepPath: number) => currentStep === stepPath,
  checked: (currentStep: number, stepPath: number) => currentStep < stepPath,
  passed: (currentStep: number, stepPath: number, backendStep: number) =>
    currentStep > stepPath && currentStep < backendStep,
  disabled: (currentStep: number, backendStep: number) => {
    return currentStep > backendStep;
  },
};

const VerticalTooltipStepper: React.FC<VerticalTooltipStepperProps> = (
  props
) => {
  const { stepPath, stepList, backendStepIndex, onStepClick } = props;

  const allSteps: any[] = filter(stepList, (step: any) => {
    return !props.showMiniSteps ? step?.type !== "mini" : step;
  });

  // Disable steps beyond the backendStepIndex or steps after step 5
  const isStepDisabled = (index: number) => {
    return index + 1 > backendStepIndex || index + 1 > 5;
  };

  // Function to get the icon for each step based on the conditions
  const getStepIcon = (step: StepItem, index: number) => {
    const stepNumber = Number(step?.id) || index + 1;

    // 1. Completed steps (before active step) get a blue checkmark
    if (states.checked(stepNumber, stepPath) && step?.type !== "mini") {
      return (
        <span className='flex size-6 items-center justify-center rounded-full bg-blue-400 p-1'>
          <Check className='h-4 w-4 text-white' />
        </span>
      );
    }

    // 2. Active step shows the step number (current step)
    if (states.active(stepNumber, stepPath) && step?.type !== "mini") {
      return (
        <span className='flex size-6 items-center justify-center rounded-full bg-transparent p-1 text-blue-400 ring-1 ring-blue-400'>
          {stepNumber}
        </span>
      );
    }

    // 3. Steps after the current step but before backendStepIndex get the step number
    if (
      states.passed(stepNumber, stepPath, backendStepIndex) &&
      step?.type !== "mini"
    ) {
      return (
        <span className='flex size-6 items-center justify-center rounded-full bg-transparent p-1 text-blue-400 ring-1 ring-blue-400'>
          {stepNumber}
        </span>
      );
    }

    // 5. Steps after backendStepIndex are disabled and get a grey hourglass icon
    return (
      <span className='flex size-6 items-center justify-center rounded-full bg-yellow-400 p-1'>
        <Hourglass className='h-3 w-3 text-white' />
      </span>
    );
  };

  return (
    <div className='relative'>
      <div className='md:hidden'>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='outline' className='h-10 w-10 rounded-full p-0'>
              <ProgressCircle
                totalSteps={Number(last(stepList)?.id) || stepList.length}
                size={40}
                strokeWidth={2}
                colorClass='text-blue-500'
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-64 p-0' align='start'>
            <div className='py-2'>
              {allSteps.map((step, index) => (
                <Button
                  key={step.label}
                  variant='ghost'
                  className={cn(
                    `flex w-full justify-between px-4 py-2 font-normal ${step?.type == "mini" ? "text-xs" : ""}
                   ${states.disabled(Number(step?.id) || index + 1, backendStepIndex) ? "cursor-not-allowed opacity-50" : ""}`,
                    `${states.active(Number(step?.id) || index + 1, stepPath) ? "font-bold" : ""}`
                  )}
                  disabled={states.disabled(
                    Number(step?.id) || index + 1,
                    backendStepIndex
                  )}
                  onClick={() => {
                    if (
                      !states.disabled(
                        Number(step?.id) || index + 1,
                        backendStepIndex
                      )
                    ) {
                      onStepClick(Number(step?.id) || index + 1);
                    }
                  }}
                >
                  {step.label}
                  {getStepIcon(step, index)}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default VerticalTooltipStepper;
