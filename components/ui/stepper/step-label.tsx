// Util imports
import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

// Type imports
import { StepLabelProps } from "./types.d";

// Hook imports
import { useStepper } from "./hooks/use-stepper";

// Constant imports
import { labelVariants } from "./constant";

const descriptionVariants = cva("", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-xs",
      lg: "text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const StepLabel = ({
  isCurrentStep,
  opacity,
  label,
  description,
  className,
}: StepLabelProps) => {
  const { variant, styles, size, orientation } = useStepper();
  const shouldRender = !!label || !!description;

  return shouldRender ? (
    <div
      aria-current={isCurrentStep ? "step" : undefined}
      className={cn(
        "stepper__step-label-container",
        "flex flex-col",
        variant !== "line" ? "" : orientation === "horizontal" && "my-2",
        variant === "circle-alt" && "text-center",
        variant === "circle-alt" && orientation === "horizontal" && "ms-0",
        variant === "circle-alt" && orientation === "vertical" && "text-start",
        styles?.["step-label-container"]
      )}
      style={{
        opacity,
      }}
    >
      {!!label && (
        <span
          className={cn(
            "stepper__step-label",
            labelVariants({ size }),
            styles?.["step-label"],
            className
          )}
        >
          {label}
        </span>
      )}
      {!!description && (
        <span
          className={cn(
            "stepper__step-description",
            "text-muted-foreground",
            descriptionVariants({ size }),
            styles?.["step-description"],
            className
          )}
        >
          {description}
        </span>
      )}
    </div>
  ) : null;
};

export { StepLabel };
