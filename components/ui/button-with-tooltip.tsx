import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { Button, ButtonProps, buttonVariants } from "./button";

export interface ButtonWithTooltipProps extends ButtonProps {
  tooltip?: string;
}

const ButtonWithTooltip = React.forwardRef<
  HTMLButtonElement,
  ButtonWithTooltipProps
>(({ tooltip, ...props }, ref) => {
  return (
    <>
      {tooltip ? (
        <Tooltip>
          <TooltipTrigger {...props}>
            {/* <Button {...props}>{props?.children}</Button> */}
            {props?.children}
          </TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      ) : (
        <Button ref={ref} {...props}>
          {props?.children}
        </Button>
      )}
    </>
  );
});
ButtonWithTooltip.displayName = "Button";

export { ButtonWithTooltip, buttonVariants };
