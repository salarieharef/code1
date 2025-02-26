import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideDownload, LucideZoomOut } from "lucide-react";
import React from "react";

interface DownloadSelectChartProps {
  isDownloadingSVG: boolean;
  isDownloadingCSV: boolean;
  downloadPNG: () => void;
  downloadSVG: () => void;
  downloadCSV: () => void;
  zoomOut: () => void;
}

const DownloadSelectChart: React.FC<DownloadSelectChartProps> = ({
  isDownloadingSVG,
  isDownloadingCSV,
  downloadPNG,
  downloadSVG,
  downloadCSV,
  zoomOut,
}) => {
  return (
    <div className='flex justify-start gap-1 p-2'>
      <Button variant='outline' type='button' size='icon' onClick={zoomOut}>
        <LucideZoomOut className='text-slate-400' size={20} />
      </Button>
      <DropdownMenu dir='rtl'>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon'>
            <LucideDownload className='text-slate-400' size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='px-1'>
          <DropdownMenuItem onSelect={downloadPNG} className='cursor-pointer'>
            دانلود PNG
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={downloadSVG}
            disabled={isDownloadingSVG}
            className='cursor-pointer'
          >
            دانلود SVG
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={downloadCSV}
            disabled={isDownloadingCSV}
            className='cursor-pointer'
          >
            دانلود CSV
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DownloadSelectChart;
