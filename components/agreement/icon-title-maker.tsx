import React from "react";
import { clsx } from "clsx";

interface IconTitleProps {
  icon: any;
  title: string;
  className?: string;
}

const IconTitleMaker = ({ icon, title, className }: IconTitleProps) => {
  return (
    <div className={clsx("flex flex-col items-center gap-y-3", className)}>
      <div className='bg-katebBlue/10 rounded-full p-4'>{icon}</div>
      <div className='font-medium'>{title}</div>
    </div>
  );
};

export default IconTitleMaker;
