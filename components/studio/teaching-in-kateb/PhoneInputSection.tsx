import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { prependZero } from "@/utils/number-utils";
import { Loader2 } from "lucide-react";
import React from "react";

interface OtpButtonSectionProps {
  phoneNumber: string;
  sendOTP: () => Promise<void>;
  isLoading: boolean;
  isDisabled?: boolean;
  styleButtonOtp?: string;
  styleWrapperBtnOtp?: string;
}

const OtpButtonSection: React.FC<OtpButtonSectionProps> = ({
  sendOTP,
  isLoading,
  isDisabled,
  styleWrapperBtnOtp,
  styleButtonOtp,
}) => (
  <div>
    <div className={cn("my-6 flex justify-center gap-4", styleWrapperBtnOtp)}>
      <Button
        className={cn(styleButtonOtp)}
        onClick={sendOTP}
        disabled={isLoading || isDisabled}
      >
        {isLoading && <Loader2 className='ml-2 h-4 w-4 animate-spin' />}
        ارسال کد تایید
      </Button>
    </div>
  </div>
);

export default OtpButtonSection;
