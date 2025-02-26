// Util imports
import { cva } from "class-variance-authority";

// Icon imports
import { LucideIcon } from "lucide-react";
import { ReactComponentElement } from "react";

const iconVariants = cva("", {
  variants: {
    size: {
      sm: "size-4",
      md: "size-4",
      lg: "size-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});
type VerticalStepProps = StepSharedProps & {
  children?: React.ReactNode;
};
type StepButtonContainerProps = StepSharedProps & {
  children?: React.ReactNode;
};

interface StepLabelProps {
  isCurrentStep?: boolean;
  opacity: number;
  label?: string | React.ReactNode;
  description?: string | null;
  className?: string | null;
}

interface StepProps extends React.HTMLAttributes<HTMLLIElement> {
  label?: string | React.ReactNode;
  description?: string;
  icon?: IconType;
  state?: "loading" | "error";
  checkIcon?: IconType;
  errorIcon?: IconType;
  isCompletedStep?: boolean;
  isKeepError?: boolean;
  onClickStep?: (step: number, setStep: (step: number) => void) => void;
  disabled?: boolean;
  id?: any;
  type?: any;
  loading?: boolean;
  containerClassName?: string;
}

interface StepSharedProps extends StepProps {
  isLastStep?: boolean;
  isCurrentStep?: boolean;
  index?: number;
  hasVisited: boolean | undefined;
  isError?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  id?: any;
  type?: any;
  loading?: boolean;
  containerClassName?: string;
}

// Props which shouldn't be passed to to the Step component from the user
interface StepInternalConfig {
  index: number;
  isCompletedStep?: boolean;
  isCurrentStep?: boolean;
  isLastStep?: boolean;
}

interface FullStepProps extends StepProps, StepInternalConfig {}

interface StepIconProps {
  isCompletedStep?: boolean;
  isCurrentStep?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  isKeepError?: boolean;
  icon?: IconType;
  index?: number;
  checkIcon?: IconType;
  errorIcon?: IconType;
  label?: string;
  containerClassName?: string;
}

type IconType = LucideIcon | React.ComponentType<any> | undefined;

type StepItem = {
  id: number;
  label?: string | ReactComponentElement;
  description?: string;
  icon?: IconType;
  type?: "mini" | "default";
  status?: StepStatus;
  id?: number;
  optional?: boolean;
  bgClassName?: string;
  formSchema?: any;
  send_admin?: boolean;
  iconClassName?: string;
  containerClassName?: string;
};

type StepStatus = "idle" | "pending" | "confirmed" | "rejected";

type StepInfo = {
  icon: LucideIcon;
  label: string | null;
  className: string;
};

interface StepOptions {
  orientation?: "vertical" | "horizontal";
  state?: "loading" | "error";
  responsive?: boolean;
  checkIcon?: IconType;
  errorIcon?: IconType;
  onClickStep?: (step: number, setStep: (step: number) => void) => void;
  mobileBreakpoint?: string;
  variant?: "circle" | "circle-alt" | "line";
  expandVerticalSteps?: boolean;
  size?: "sm" | "md" | "lg";
  styles?: {
    /** Styles for the main container */
    "main-container"?: string;
    /** Styles for the horizontal step */
    "horizontal-step"?: string;
    /** Styles for the horizontal step container (button and labels) */
    "horizontal-step-container"?: string;
    /** Styles for the vertical step */
    "vertical-step"?: string;
    /** Styles for the vertical step container (button and labels) */
    "vertical-step-container"?: string;
    /** Styles for the vertical step content */
    "vertical-step-content"?: string;
    /** Styles for the step button container */
    "step-button-container"?: string;
    /** Styles for the label and description container */
    "step-label-container"?: string;
    /** Styles for the step label */
    "step-label"?: string;
    /** Styles for the step description */
    "step-description"?: string;
  };
  variables?: {
    "--step-icon-size"?: string;
    "--step-gap"?: string;
  };
  scrollTracking?: boolean;
}
interface StepperProps extends StepOptions {
  children?: React.ReactNode;
  className?: string;
  initialStep: number;
  steps: StepItem[];
}

export { iconVariants };
export type {
  StepItem,
  StepperProps,
  StepProps,
  FullStepProps,
  VerticalStepProps,
  StepSharedProps,
  StepButtonContainerProps,
  StepIconProps,
  StepLabelProps,
  StepStatus,
  StepInfo,
};
