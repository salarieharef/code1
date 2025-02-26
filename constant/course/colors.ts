export const getStepColor = ({
  colorScheme,
  isCompletedStep,
  isActiveStep,
  isError,
}: {
  colorScheme: string;
  isCompletedStep: boolean;
  isActiveStep: boolean;
  isError: boolean;
}) => {
  const defaultColors: any = {
    default: {
      completed: "bg-green-500",
      active: "bg-blue-500",
      error: "bg-red-500",
      default: "bg-slate-300",
    },
    blue: {
      completed: "bg-blue-600",
      active: "bg-blue-400",
      error: "bg-red-600",
      default: "bg-blue-300",
    },
    green: {
      completed: "bg-green-600",
      active: "bg-green-400",
      error: "bg-red-600",
      default: "bg-green-300",
    },
    red: {
      completed: "bg-red-600",
      active: "bg-red-400",
      error: "bg-red-700",
      default: "bg-red-300",
    },
  };

  const colors: any = defaultColors[colorScheme] || defaultColors.default;

  if (isError) return colors.error;
  if (isCompletedStep) return colors.completed;
  if (isActiveStep) return colors.active;
  return colors.default;
};
export const getStepLineClass = ({
  colorScheme,
  isCompletedStep,
  isError,
  isActiveStep,
}: {
  colorScheme: any;
  isCompletedStep: any;
  isError: any;
  isActiveStep: any;
}) => {
  const defaultColors: Record<string, Record<string, string>> = {
    default: {
      completed: "bg-green-500",
      active: "bg-yellow-500",
      error: "bg-red-500",
      default: "bg-slate-300",
    },
    blue: {
      completed: "bg-sky-500",
      active: "bg-sky-400",
      error: "bg-red-500",
      default: "bg-sky-300",
    },
    green: {
      completed: "bg-green-500",
      active: "bg-green-400",
      error: "bg-red-500",
      default: "bg-green-300",
    },
    red: {
      completed: "bg-red-500",
      active: "bg-red-400",
      error: "bg-red-700",
      default: "bg-red-300",
    },
  };

  const colors = defaultColors[colorScheme] || defaultColors.default;

  let lineColor: string;
  if (isError) {
    lineColor = colors.error;
  } else if (isCompletedStep) {
    lineColor = colors.completed;
  } else if (isActiveStep) {
    lineColor = colors.active;
  } else {
    lineColor = colors.default;
  }

  return `[&:not(:last-child)]:after:${lineColor}`;
};
