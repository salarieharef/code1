import { Button } from "@/components/ui/button";
import CreditSvg from "@/static/icons/wallet/credit.svg";
import {
  formatWithSeparator,
  removeSeparators,
} from "@/utils/persian-tools/tools-function";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import PresetAmountButtons from "./PresetAmountButtons";
import WrapperPriceInput from "./WrapperPriceInput";
import { Form } from "@/components/ui/form";

interface PresetAmount {
  value: number;
  label: string;
  signPrice: string;
}

interface ChargeTabProps {
  initialCredit?: number;
}

const presetAmounts: PresetAmount[] = [
  { value: 100000, label: "۱۰۰,۰۰۰", signPrice: "تومان" },
  { value: 200000, label: "۲۰۰,۰۰۰", signPrice: "تومان" },
  { value: 500000, label: "۵۰۰,۰۰۰", signPrice: "تومان" },
];

const ChargeTab: React.FC<ChargeTabProps> = ({ initialCredit = 300000000 }) => {
  const form = useForm({
    defaultValues: {
      chargeAmount: "1,000,000",
    },
  });

  const { handleSubmit } = form;

  const [activePreset, setActivePreset] = useState<number | null>(100000);
  const [step, setStep] = useState<number>(10);

  const minAmount: number = useMemo(
    () => Math.min(...presetAmounts.map((preset) => preset.value)),
    []
  );
  const maxAmount: number = 10000000;

  const amount = form.watch("chargeAmount");

  useEffect(() => {
    const numericAmount = parseInt(removeSeparators(amount, ","), 10);
    const matchingPreset = presetAmounts.find(
      (preset) => preset.value === numericAmount
    );
    if (matchingPreset) {
      setActivePreset(matchingPreset.value);
    } else {
      setActivePreset(null);
    }
  }, [amount, minAmount, maxAmount]);

  const handlePresetClick = (value: number): void => {
    form.setValue(
      "chargeAmount",
      formatWithSeparator(value.toString(), ",", 3)
    );
    setStep(value);
  };

  const onSubmit = (data: any) => {
    console.log("Form submitted with data:", data);
    // Handle form submission logic here
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mx-auto max-w-xl py-6'>
          <div
            className='flex w-full flex-col items-center justify-center space-y-6 text-slate-700 md:p-4'
            dir='ltr'
          >
            <div className='flex flex-col items-center justify-center space-y-2'>
              <CreditSvg className='m-1 h-12 w-12 fill-blue-500' />
              <p className='text-center text-lg font-bold md:text-xl'>
                :اعتبار فعلی شما
              </p>
              <div className='flex justify-center gap-1 text-xl font-bold text-blue-500 md:text-3xl'>
                <p>تومان</p>
                <p>{formatWithSeparator(initialCredit.toString(), ",", 3)}</p>
              </div>
            </div>
            <div className='w-full'>
              <p className='text-center text-xs text-slate-400'>
                برای افزایش موجودی در کاتب مبلغ مد نظر خود را وارد یا انتخاب
                کنید
              </p>
              <WrapperPriceInput
                name='chargeAmount'
                form={form}
                minAmount={minAmount}
                maxAmount={maxAmount}
                step={step}
                separator=','
                separateAtDigit={3}
                unit='toman'
              />
              <PresetAmountButtons
                presetAmounts={presetAmounts}
                activePreset={activePreset}
                onPresetClick={handlePresetClick}
              />
              <Button
                type='submit'
                className='mt-10 w-full rounded-lg py-3 font-bold text-white md:mt-2'
              >
                پرداخت
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ChargeTab;
