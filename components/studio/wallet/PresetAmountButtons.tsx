import React from "react";
import { Button } from "@/components/ui/button";

interface PresetAmount {
  value: number;
  label: string;
  signPrice: string;
}

interface PresetAmountButtonsProps {
  presetAmounts: PresetAmount[];
  activePreset: number | null;
  onPresetClick: (value: number) => void;
}

const PresetAmountButtons: React.FC<PresetAmountButtonsProps> = ({
  presetAmounts,
  activePreset,
  onPresetClick,
}) => {
  return (
    <div className='grid w-full grid-cols-1 md:grid-cols-3 gap-1 mt-2.5'>
      {presetAmounts.map((preset) => (
        <Button
          variant='ghost'
          key={preset.value}
          onClick={() => onPresetClick(preset.value)}
          className={`flex flex-row items-center gap-1 rounded border-2 px-4 py-3 text-lg text-slate-800 ${
            activePreset === preset.value
              ? "border-blue-500 font-bold"
              : "bg-slate-150"
          }`}
        >
          <span className='md:text-md text-xs'>{preset.signPrice}</span>
          <span>{preset.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default PresetAmountButtons;
