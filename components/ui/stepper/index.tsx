"use client";
import React from "react";

// Util imports
import { cn } from "@/utils/cn";

// Context imports
import { StepperProvider } from "./context";

// Type imports
import { StepItem, StepperProps } from "./types.d";

// Constant imports
import { VARIABLE_SIZES } from "./constant";

// Hook imports
import { useMediaQuery } from "./hooks/use-media-query";

// Component imports
import { HorizontalContent } from "./horizontal-step";
import { Step } from "./step";
import { VerticalContent } from "./vertical-step";

// <---------- STEPS ---------->
const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (props, ref: React.Ref<HTMLDivElement>) => {
    const {
      className,
      children,
      orientation: orientationProp,
      state,
      responsive,
      checkIcon,
      errorIcon,
      onClickStep,
      mobileBreakpoint,
      expandVerticalSteps = false,
      initialStep = 0,
      size,
      steps,
      variant,
      styles,
      variables,
      scrollTracking = false,
      ...rest
    } = props;

    const childArr = React.Children.toArray(children);

    const items = [] as React.ReactElement[];

    const footer = childArr.map((child, _index) => {
      if (!React.isValidElement(child)) {
        throw new Error("Stepper children must be valid React elements.");
      }
      if (child.type === Step) {
        items.push(child);
        return null;
      }

      return child;
    });

    const stepCount = items.length;

    const isMobile = useMediaQuery(
      `(max-width: ${mobileBreakpoint || "768px"})`
    );

    const clickable = !!onClickStep;

    const orientation = isMobile && responsive ? "vertical" : orientationProp;

    const isVertical = orientation === "vertical";

    return (
      <StepperProvider
        value={{
          initialStep,
          orientation,
          state,
          size,
          responsive,
          checkIcon,
          errorIcon,
          onClickStep,
          clickable,
          stepCount,
          isVertical,
          variant: variant || "circle",
          expandVerticalSteps,
          steps,
          scrollTracking,
          styles,
        }}
      >
        <div
          ref={ref}
          className={cn(
            "stepper__main-container",
            "flex w-full flex-wrap",
            stepCount === 1 ? "justify-end" : "justify-between",
            orientation === "vertical" ? "flex-col" : "flex-row",
            variant === "line" && orientation === "horizontal" && "gap-4",
            className,
            styles?.["main-container"]
          )}
          style={
            {
              "--step-icon-size":
                variables?.["--step-icon-size"] ||
                `${VARIABLE_SIZES[size || "md"]}`,
              "--step-gap": variables?.["--step-gap"] || "8px",
            } as React.CSSProperties
          }
          {...rest}
        >
          <VerticalContent>{items}</VerticalContent>
        </div>
        {orientation === "horizontal" && (
          <HorizontalContent>{items}</HorizontalContent>
        )}
        {footer}
      </StepperProvider>
    );
  }
);
Stepper.displayName = "Stepper";

export { Step, Stepper };
export type { StepItem, StepperProps };
