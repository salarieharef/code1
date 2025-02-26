"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getImageUrlBase } from "@/utils/imageUtils";
import Link from "next/link";

interface SelectableCardOption {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  pdfLink?: string;
  walletLink?: string;
}

interface SelectableCardGroupProps {
  options: SelectableCardOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  readonly?: boolean;
}

const SelectableCardGroup: React.FC<SelectableCardGroupProps> = ({
  options,
  selectedValue,
  onChange,
  readonly = false,
}) => {
  return (
    <div
      className={`space-y-4 py-4 ${readonly ? "pointer-events-none opacity-95" : ""}`}
      dir='rtl'
    >
      <RadioGroup
        value={selectedValue}
        className={`space-y-4 py-4 ${readonly ? "pointer-events-none opacity-95" : ""}`}
        onValueChange={(value) => !readonly && onChange(value)}
        dir='rtl'
      >
        {options?.map((option) => (
          <label
            className={`flex items-center justify-between rounded-lg border p-2 transition-colors md:p-8 ${
              selectedValue === option.id
                ? "border-blue-400 bg-blue-100"
                : "border-slate-300"
            } ${readonly ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}
            htmlFor={option.id}
            key={option?.id}
          >
            <div className='flex items-start gap-4'>
              {option?.icon}
              <div className='space-y-1'>
                <h3 className='font-semibold'>{option.title}</h3>
                <p className='text-sm text-slate-600'>{option.description}</p>
                {option.pdfLink ? (
                  <Link
                    href={getImageUrlBase(option.pdfLink)}
                    className={`mt-4 block w-fit text-sm text-blue-500 hover:underline`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    دانلود PDF
                  </Link>
                ) : null}

                {option.walletLink ? (
                  <Link
                    href={option.walletLink}
                    className={`mt-4 block text-sm ${readonly ? "text-slate-400" : "text-blue-500"}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    افزایش موجودی
                  </Link>
                ) : null}
              </div>
            </div>

            <div className='flex items-center'>
              <RadioGroupItem
                value={option.id}
                className='mr-2 h-6 w-6 border-slate-400 '
                disabled={readonly}
                CircleClassName='h-5 w-5'
                id={option.id}
              />
            </div>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
};

export default SelectableCardGroup;
