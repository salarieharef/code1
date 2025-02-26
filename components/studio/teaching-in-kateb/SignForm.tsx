import { useRouter } from "next/navigation";
import { useState } from "react";

// Hook imports
import { useOTPTimer } from "@/hooks/api";

// Util imports
// import { useOTPHandler } from "@/utils/functions/authentication/otpHandler.function";
import {
  sendOTP,
  verifyOTP,
} from "@/utils/functions/user/signOperation.function";
import { useFormContext } from "react-hook-form";

// Session imports
import { useSession } from "next-auth/react";

// Component imports
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/utils/cn";
import OTPInputSection from "./OTPInputSection";
import OtpButtonSection from "./PhoneInputSection";
import { useOTPHandler } from "@/utils/functions/authentication/otpHandler.function";

interface FormInputs {
  otp: string;
}

const UserSignForm = ({
  isDisabled = false,
  name,
  containerClassName,
  buttonClassName,
  timerTextClassName,
  //Otp Style
  containerOtpClassName,
  textOtpClassName,
  otpGroupClassName,
  styleButtonOtp,
  styleItemOtp,
  otpPosition,
}: {
  isDisabled?: boolean;
  name?: string;
  containerClassName?: string;
  buttonClassName?: string;
  timerTextClassName?: string;
  containerOtpClassName?: string;
  textOtpClassName?: string;
  otpGroupClassName?: string;
  styleButtonOtp?: string;
  styleItemOtp?: string;
  otpPosition?: string;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const { data: session }: any = useSession();
  const phoneNumber = session?.user?.mobile;

  const [validationStep, setValidationStep] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useFormContext();

  const handleLogin = (data: FormInputs): void => {
    router.push("/dashboard");
  };

  // Initialize OTP Timer
  const { isTimerActive, otpTimer, formatTime, initTimer } = useOTPTimer();

  const { otpCode, setOtpCode } = useOTPHandler(form, (data) =>
    verifyOTP(data, phoneNumber, false, handleLogin)
  );

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      await sendOTP(phoneNumber, toast, setValidationStep, setIsLoading);
      initTimer(); // Reset the timer upon resending OTP
    } catch (error) {
      console.error("Error resending OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-md space-y-2 md:max-w-lg",
        containerClassName
      )}
    >
      {otpPosition === "top" && (
        <>
          <OtpButtonSection
            phoneNumber={phoneNumber}
            sendOTP={(): any => {
              sendOTP(phoneNumber, toast, setValidationStep, setIsLoading);
              initTimer();
            }}
            isLoading={isLoading}
            isDisabled={isDisabled||validationStep}
            styleButtonOtp={styleButtonOtp}
          />
          {validationStep && (
            <div
              className={cn(
                "text-center text-sm text-slate-600",
                timerTextClassName
              )}
            >
              {isTimerActive ? (
                <p>{formatTime(otpTimer)} تا ارسال مجدد کد</p>
              ) : (
                <Button
                  type='button'
                  variant='ghost'
                  className={cn(
                    "text-blue-600 hover:underline",
                    buttonClassName
                  )}
                  onClick={handleResendOTP}
                >
                  ارسال مجدد کد
                </Button>
              )}
            </div>
          )}

          <OTPInputSection
            otpCode={otpCode}
            phoneNumber={phoneNumber}
            containerOtpClassName={containerOtpClassName}
            textOtpClassName={textOtpClassName}
            otpGroupClassName={otpGroupClassName}
            styleItemOtp={styleItemOtp}
            name={name}
            validationStep={validationStep}
            isDisabled={isDisabled}
          />
        </>
      )}

      {otpPosition === "right" && (
        <div className='flex flex-col items-center justify-center md:flex-row'>
          <div
            className={cn(
              "w-48 text-center text-sm text-slate-600",
              timerTextClassName
            )}
          >
            {!validationStep ? (
              <OtpButtonSection
                phoneNumber={phoneNumber}
                sendOTP={(): any => {
                  sendOTP(phoneNumber, toast, setValidationStep, setIsLoading);
                  initTimer();
                }}
                isLoading={isLoading}
                isDisabled={isDisabled}
                styleButtonOtp={"h-8"}
                styleWrapperBtnOtp='my-0'
              />
            ) : isTimerActive ? (
              <div className='flex items-center justify-center'>
                <p className='w-12 px-0.5 font-semibold'>
                  {formatTime(otpTimer)}
                </p>
                <p>تا ارسال مجدد کد</p>
              </div>
            ) : (
              <Button
                type='button'
                variant='ghost'
                className={cn(
                  "h-8 text-blue-600 hover:underline",
                  buttonClassName
                )}
                onClick={handleResendOTP}
              >
                ارسال مجدد کد
              </Button>
            )}
          </div>

          <OTPInputSection
            otpCode={otpCode}
            phoneNumber={phoneNumber}
            containerOtpClassName={containerOtpClassName}
            textOtpClassName={textOtpClassName}
            otpGroupClassName={otpGroupClassName}
            styleItemOtp={styleItemOtp}
            name={name}
            validationStep={validationStep}
          />
        </div>
      )}
    </div>
  );
};

export default UserSignForm;
