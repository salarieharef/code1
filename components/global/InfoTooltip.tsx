"use client";
import { useState } from "react";

// Component imports
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Icon imports
import { Info } from "lucide-react";

export function InfoTooltip({ message }: any) {
  const [open, setOpen] = useState(false);
  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild onClick={() => setOpen(!open)}>
          <Button variant='ghost' size='icon' className='h-4 w-4' type='button'>
            <Info />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div dangerouslySetInnerHTML={{ __html: message }}></div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
