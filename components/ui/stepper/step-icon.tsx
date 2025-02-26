import React from "react";

// Util imports
import { cn } from "@/utils/cn";

// Icon imports
import { CheckIcon, Loader2, X } from "lucide-react";

// Hook imports
import { useStepper } from "./hooks/use-stepper";

// Type imports
import { iconVariants, StepIconProps } from "./types.d";

const StepIcon = React.forwardRef<HTMLDivElement, StepIconProps>(
  (props, ref) => {
    const { size } = useStepper();

    const {
      isCompletedStep,
      isCurrentStep,
      isError,
      isLoading,
      isKeepError,
      icon: CustomIcon,
      index,
      checkIcon: CustomCheckIcon,
      errorIcon: CustomErrorIcon,
      label,
    } = props;

    const Icon = React.useMemo(
      () => (CustomIcon ? CustomIcon : null),
      [CustomIcon]
    );

    const ErrorIcon = React.useMemo(
      () => (CustomErrorIcon ? CustomErrorIcon : null),
      [CustomErrorIcon]
    );

    const Check = React.useMemo(
      () => (CustomCheckIcon ? CustomCheckIcon : CheckIcon),
      [CustomCheckIcon]
    );

    return React.useMemo(() => {
      if (isCompletedStep) {
        if (isError && isKeepError) {
          return (
            <div key='icon'>
              <X className={cn(iconVariants({ size }))} />
            </div>
          );
        }
        return (
          <div key='check-icon'>
            <Check className={cn(iconVariants({ size }))} />
          </div>
        );
      }
      if (isCurrentStep) {
        if (isError && ErrorIcon) {
          return (
            <div key='error-icon'>
              <ErrorIcon className={cn(iconVariants({ size }))} />
            </div>
          );
        }
        if (isError) {
          return (
            <div key='icon'>
              <X className={cn(iconVariants({ size }))} />
            </div>
          );
        }
        if (isLoading) {
          return (
            <Loader2 className={cn(iconVariants({ size }), "animate-spin")} />
          );
        }
      }
      if (Icon) {
        return (
          <div key='step-icon'>
            <Icon className={cn(iconVariants({ size }))} />
          </div>
        );
      }
      return (
        <span
          ref={ref}
          key='label'
          className={cn("text-md text-center font-medium")}
        >
          {label}
        </span>
      );
    }, [
      isCompletedStep,
      isCurrentStep,
      isError,
      isLoading,
      Icon,
      index,
      Check,
      ErrorIcon,
      isKeepError,
      ref,
      size,
    ]);
  }
);
StepIcon.displayName = "StepIcon";

export { StepIcon };
