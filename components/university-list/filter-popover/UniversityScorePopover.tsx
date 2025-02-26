"use client";

// Component imports
import { Ratings } from "@/components/ui/Ratings";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Icon imports
import { ChevronDown, ChevronUp, Star, StarHalf } from "lucide-react";

export default function UniversityScorePopover({
  open,
  onOpenChange,
  buttonText,
  onChange,
  value,
}: {
  open?: boolean;
  onOpenChange?: () => void;
  buttonText?: string;
  onChange?: () => void;
  value?: string | number;
}) {
  const ratings = [4.5, 4, 3.5, 3, 2.5, 2];

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild className=''>
        <Button
          className='h-fit w-fit p-2 text-sm hover:bg-transparent'
          variant={"ghost"}
        >
          <div className='flex flex-row items-center justify-center gap-1'>
            {buttonText}
            {open ? (
              <ChevronUp className=' h-4 w-4' />
            ) : (
              <ChevronDown className=' h-4 w-4' />
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-58 mx-4 p-0'>
        <div className='flex w-full flex-col items-center justify-start'>
          {ratings.map((rating) => (
            <Button variant={"ghost"} className='h-fit w-full' key={rating}>
              <div className='flex w-full flex-row items-center justify-between'>
                <div className='flex flex-row justify-center'>
                  <Ratings rating={rating} variant='yellow' size={16} />
                  <span className='mr-1 flex items-center gap-x-1 text-sm text-slate-500'>
                    {rating}
                    <span className=''>و بالاتر</span>
                  </span>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
