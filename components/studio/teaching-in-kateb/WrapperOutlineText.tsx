// components/WrapperOutlineText.tsx
import { Card, CardTitle } from "@/components/ui/card";
import { cn } from "@/utils/cn";
import React, { ReactNode } from "react";

interface WrapperOutlineTextProps {
  children: ReactNode;
  titleBorder: string;
  subtitle_border?: string;
  className?: string; // Optional class name
  type?: string;
  WrapperOutlineLink?: ReactNode;
}

export const WrapperOutlineText: React.FC<WrapperOutlineTextProps> = ({
  children,
  titleBorder,
  subtitle_border,
  className,
  WrapperOutlineLink,
  type,
}) => {
  return (
    <Card className={cn("relative rounded-xl bg-transparent p-4", className)}>
      {/* Border Title */}
      <CardTitle
        className={`absolute -top-4 ${type == "teaching-in-kateb" ? "bg-slate-50" : "bg-white"} right-4 px-2 text-sm font-semibold text-slate-800 sm:text-lg`}
      >
        <span>{titleBorder}</span>
        <span className='hidden pr-1.5 text-xs font-normal text-muted-foreground md:inline-block md:text-sm'>
          {subtitle_border}
        </span>
      </CardTitle>
      {WrapperOutlineLink ? (
        <>
          <CardTitle
            className={`absolute -top-4 ${type == "teaching-in-kateb" ? "bg-slate-50" : "bg-white"} left-2 px-2 text-sm font-semibold text-slate-800 sm:text-lg md:left-4`}
          >
            {WrapperOutlineLink}
          </CardTitle>
        </>
      ) : null}

      {/* Content */}
      {children}
    </Card>
  );
};
