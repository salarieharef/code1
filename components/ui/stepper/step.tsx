import React from "react";

// Type imports
import { FullStepProps, StepProps } from "./types.d";

// Hook imports
import { useStepper } from "./hooks/use-stepper";
import { VerticalStep } from "./vertical-step";
import { HorizontalStep } from "./horizontal-step";

const Step = React.forwardRef<HTMLLIElement, StepProps>(
  (props, ref: React.Ref<any>) => {
    const {
      children,
      description,
      icon,
      state,
      checkIcon,
      errorIcon,
      index,
      isCompletedStep,
      isCurrentStep,
      isLastStep,
      isKeepError,
      label,
      onClickStep,
      className,
      disabled,
      id,
      type,
      loading,
      containerClassName,
    } = props as FullStepProps;

    const { isVertical, isError, isLoading, clickable } = useStepper();

    const hasVisited = isCurrentStep || isCompletedStep;

    const sharedProps = {
      isLastStep,
      isCompletedStep,
      isCurrentStep,
      index,
      isError,
      isLoading,
      clickable,
      label,
      description,
      hasVisited,
      icon,
      isKeepError,
      checkIcon,
      state,
      errorIcon,
      onClickStep,
      className,
      disabled,
      id,
      type,
      loading,
      containerClassName,
    };

    const renderStep = () => {
      switch (isVertical) {
        case true:
          return (
            <VerticalStep ref={ref} {...sharedProps}>
              {children}
            </VerticalStep>
          );
        default:
          return <HorizontalStep ref={ref} {...sharedProps} />;
      }
    };

    return renderStep();
  }
);
Step.displayName = "Step";

export { Step };
