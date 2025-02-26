import React from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  name?: string;
}

const ChartTooltip: React.FC<ChartTooltipProps> = ({
  active,
  payload,
  label,
  name,
}) => {
  if (active && payload && payload.length) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div dir="rtl" className='rounded border bg-white'>
            <p className='border-b bg-slate-200 px-2 py-1 text-lg font-normal'>
              {name}
            </p>
            {payload.map((data, index) => (
              <p
                className='px-4 py-1.5 '
                key={index}
                style={{ color: data.color }}
              >
                {/* {`${name}: ${data.value}`} */}
                {`تعداد: ${data.value}`}
              </p>
            ))}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div>
            <p>{name}</p>
            {payload.map((data, index) => (
              <p key={index} style={{ color: data.color }}>
                {`${name}: ${data.value}`}
              </p>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }
  return null;
};

export default ChartTooltip;
