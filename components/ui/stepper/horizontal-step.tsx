import React from "react";

// Type imports
import { StepSharedProps } from "./types.d";

// Hook imports
import { useStepper } from "./hooks/use-stepper";

// Util imports
import { cn } from "@/utils/cn";

// Component imports
import { StepButtonContainer } from "./step-button-container";
import { StepIcon } from "./step-icon";
import { StepLabel } from "./step-label";
import { Loader2 } from "lucide-react";

const HorizontalContent = ({ children }: { children: React.ReactNode }) => {
  const { activeStep } = useStepper();
  const childArr = React.Children.toArray(children);

  if (activeStep > childArr.length) {
    return null;
  }

  return (
    <>
      {React.Children.map(childArr[activeStep], (node) => {
        if (!React.isValidElement(node)) {
          return null;
        }
        return React.Children.map(
          node.props.children,
          (childNode) => childNode
        );
      })}
    </>
  );
};

const HorizontalStep = React.forwardRef<HTMLDivElement, StepSharedProps>(
  (props, ref) => {
    const {
      isError,
      isLoading,
      onClickStep,
      variant,
      clickable,
      checkIcon: checkIconContext,
      errorIcon: errorIconContext,
      styles,
      steps,
      setStep,
    } = useStepper();

    const {
      index,
      isCompletedStep,
      isCurrentStep,
      hasVisited,
      icon,
      label,
      description,
      isKeepError,
      state,
      checkIcon: checkIconProp,
      errorIcon: errorIconProp,
      className,
      containerClassName,
      disabled,
      id,
      type,
      loading,
    } = props;

    const localIsLoading = isLoading || state === "loading";
    const localIsError = isError || state === "error";

    const opacity = hasVisited ? 1 : 0.8;

    const active =
      variant === "line" ? isCompletedStep || isCurrentStep : isCompletedStep;

    const checkIcon = checkIconProp || checkIconContext;
    const errorIcon = errorIconProp || errorIconContext;

    return (
      <div
        aria-disabled={!hasVisited}
        className={cn(
          "stepper__horizontal-step",
          "relative flex items-center transition-all duration-200",
          "[&:not(:last-child)]:flex-1",
          "[&:not(:last-child)]:after:transition-all [&:not(:last-child)]:after:duration-200",
          "[&:not(:last-child)]:after:h-[2px] [&:not(:last-child)]:after:bg-border",
          "data-[completed=true]:[&:not(:last-child)]:after:bg-primary",
          "data-[invalid=true]:[&:not(:last-child)]:after:bg-destructive",
          // `[&:not(:last-child)]:after:bg-red-500`,
          variant === "circle-alt" &&
            "flex-1 flex-col justify-start [&:not(:last-child)]:after:relative [&:not(:last-child)]:after:end-[50%] [&:not(:last-child)]:after:start-[50%] [&:not(:last-child)]:after:top-[calc(var(--step-icon-size)/2)] [&:not(:last-child)]:after:order-[-1] [&:not(:last-child)]:after:w-[calc((100%-var(--step-icon-size))-(var(--step-gap)))]",
          variant === "circle" &&
            "[&:not(:last-child)]:after:me-[var(--step-gap)] [&:not(:last-child)]:after:ms-[var(--step-gap)] [&:not(:last-child)]:after:flex-1",
          variant === "line" &&
            "flex-1 flex-col border-t-[3px] data-[active=true]:border-primary",
          styles?.["horizontal-step"],
          containerClassName
        )}
        data-optional={steps[index || 0]?.optional}
        data-completed={isCompletedStep}
        data-active={active}
        data-invalid={localIsError}
        data-clickable={clickable}
        onClick={() => onClickStep?.(id || index || 0, setStep)}
        ref={ref}
      >
        <div
          className={cn(
            "stepper__horizontal-step-container",
            "flex items-center justify-center",
            variant === "circle-alt" && "flex-col justify-center gap-1",
            variant === "line" && "w-full",
            styles?.["horizontal-step-container"],
            disabled ? "cursor-not-allowed opacity-80" : ""
          )}
        >
          <StepButtonContainer
            {...{
              ...props,
              isError: localIsError,
              isLoading: localIsLoading,
            }}
            className={cn(
              className,
              disabled ? "cursor-not-allowed opacity-80" : ""
            )}
          >
            {loading ? (
              <Loader2 className='animate-spin' />
            ) : (
              <StepIcon
                {...{
                  index,
                  isCompletedStep,
                  isCurrentStep,
                  isError: localIsError,
                  isKeepError,
                  isLoading: localIsLoading,
                }}
                label={id || (index || 0) + 1}
                icon={icon}
                checkIcon={checkIcon}
                errorIcon={errorIcon}
              />
            )}
          </StepButtonContainer>
          <StepLabel
            label={label}
            description={description}
            className={type == "mini" ? "text-xs" : ""}
            {...{ isCurrentStep, opacity }}
          />
        </div>
      </div>
    );
  }
);
HorizontalStep.displayName = "HorizontalStep";
HorizontalContent.displayName = "HorizontalContent";
export { HorizontalStep, HorizontalContent };
