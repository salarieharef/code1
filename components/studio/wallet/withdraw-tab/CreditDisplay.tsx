import CreditSvg from "@/static/icons/wallet/credit.svg";
import { formatWithSeparator } from "@/utils/persian-tools/tools-function";
import React from "react";

interface CreditDisplayProps {
  credit: string;
}

export const CreditDisplay: React.FC<CreditDisplayProps> = ({ credit }) => (
  <div className='flex flex-col items-center justify-center space-y-2'>
    <CreditSvg className='m-1 h-12 w-12 fill-blue-500' />
    <p className='text-center text-lg font-bold md:text-xl'>اعتبار فعلی شما:</p>
    <div className='flex justify-center gap-1 text-xl font-bold text-blue-500 md:text-3xl'>
      <p>تومان</p>
      <p>{formatWithSeparator(credit, ",", 3)}</p>
    </div>
  </div>
);
