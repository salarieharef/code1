import React from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import {
  removeSeparators,
  formatWithSeparator,
} from "@/utils/persian-tools/tools-function";
import PriceInputField from "@/components/ui/PriceInputField";

interface WrapperPriceInputProps {
  name: string;
  form: any;
  minAmount: number;
  maxAmount: number;
  step: number;
  readonly?: boolean;
  separator?: string;
  separateAtDigit?: number;
  unit?: string;
}

const WrapperPriceInput: React.FC<WrapperPriceInputProps> = ({
  name,
  form,
  minAmount,
  maxAmount,
  step,
  readonly = false,
  separator = ",",
  separateAtDigit = 3,
  unit = "toman",
}) => {
  const handleIncrement = () => {
    const currentAmount = parseInt(
      removeSeparators(form.getValues(name), separator),
      10
    );
    const newAmount = Math.min(currentAmount + step, maxAmount);
    form.setValue(
      name,
      formatWithSeparator(newAmount.toString(), separator, separateAtDigit)
    );
  };

  const handleDecrement = () => {
    const currentAmount = parseInt(
      removeSeparators(form.getValues(name), separator),
      10
    );
    const newAmount = Math.max(currentAmount - step, minAmount);
    form.setValue(
      name,
      formatWithSeparator(newAmount.toString(), separator, separateAtDigit)
    );
  };

  return (
    <div className='relative w-full'>
      <Button
        onClick={handleDecrement}
        className='absolute left-1 top-1 z-10 rounded-full p-2'
        disabled={readonly}
        type='button'
      >
        <Minus size={24} />
      </Button>
      <PriceInputField
        name={name}
        form={form}
        readonly={readonly}
        inputClassName='rounded-lg font-bold w-full h-12 md:h-12 border border-blue-400 bg-transparent text-center text-lg -mt md:text-xl focus:ring-0'
        separator={separator}
        separateAtDigit={separateAtDigit}
        unit={unit}
        isToman={true}
        wordClassName='transform text-xs text-slate-400 text-center'
      />
      <Button
        onClick={handleIncrement}
        className='absolute right-1 top-1 z-10 rounded-full p-2'
        disabled={readonly}
        type='button'
      >
        <Plus size={24} />
      </Button>
    </div>
  );
};

export default WrapperPriceInput;
