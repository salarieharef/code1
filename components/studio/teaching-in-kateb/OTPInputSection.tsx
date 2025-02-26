import { FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { maskString } from "@/utils/maskedNumber";
import React from "react";
import { useFormContext } from "react-hook-form";

import { cn } from "@/utils/cn";

interface OTPInputSectionProps {
  otpCode: string;
  phoneNumber?: any;
  name?: string;
  containerOtpClassName?: string;
  textOtpClassName?: string;
  otpGroupClassName?: string;
  styleItemOtp?: string;
  validationStep?: boolean;
  readonly?: boolean;
  isDisabled?: boolean;
}

const OTPInputSection: React.FC<OTPInputSectionProps> = ({
  otpCode,
  phoneNumber = "",
  name = "otp",
  containerOtpClassName,
  textOtpClassName,
  otpGroupClassName,
  styleItemOtp,
  validationStep,
  readonly,
  isDisabled,
}) => {
  const form = useFormContext();

  const maskedNumber = maskString(phoneNumber, {
    maskChar: "*",
    visibleStart: 0,
    visibleEnd: 4,
    separator: "",
  });

  return (
    <div
      className={cn(
        "my-6 flex flex-col items-center justify-center space-y-4",
        containerOtpClassName
      )}
    >
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <InputOTP
                maxLength={5}
                {...field}
                value={otpCode || field.value || ""}
                disabled={isDisabled}
              >
                <InputOTPGroup dir='ltr' className={cn(otpGroupClassName)}>
                  <InputOTPSlot index={0} className={cn(styleItemOtp)} />
                  <InputOTPSlot index={1} className={cn(styleItemOtp)} />
                  <InputOTPSlot index={2} className={cn(styleItemOtp)} />
                  <InputOTPSlot index={3} className={cn(styleItemOtp)} />
                  <InputOTPSlot index={4} className={cn(styleItemOtp)} />
                </InputOTPGroup>
              </InputOTP>
            </FormControl>
          </FormItem>
        )}
      />

      {validationStep ? (
        <p className={cn("text-sm text-muted-foreground", textOtpClassName)}>
          کد پیامک شده به شماره
          <span dir='ltr' className='px-1'>
            {maskedNumber}
          </span>
          را وارد نمایید
        </p>
      ) : null}
    </div>
  );
};

export default OTPInputSection;
