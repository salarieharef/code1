import { cn } from "@/utils/cn";
import React from "react";

interface AboutSectionProps {
  title: string;
  icon: any;
  className?: string;
  children: React.ReactNode;
}

const AboutSection = ({
  title,
  icon,
  className,
  children,
}: AboutSectionProps) => {
  return (
    <div className={cn("", className)}>
      <div className='flex items-center justify-center gap-x-3 rounded-md bg-blue-800 p-3 px-8 text-lg font-semibold text-background md:justify-start md:text-2xl'>
        <div>{icon}</div>
        <p>{title}</p>
      </div>
      <div className='px-2 py-8 md:px-8'>{children}</div>
    </div>
  );
};

export default AboutSection;
