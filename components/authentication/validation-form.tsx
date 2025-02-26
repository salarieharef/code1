"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  useOTPHandler,
  useResendOTP,
} from "@/utils/functions/authentication/otpHandler.function";
import { prependZero } from "@/utils/number-utils";
import { Loader2 } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useOTPTimer } from "@/hooks/api";
import { useEffect } from "react";

interface ValidationFormProps {
  data: {
    number: string;
  };
  form: any;
  submitFunction: (data: any) => Promise<void>;
}

export default function ValidationForm({
  data,
  form,
  submitFunction,
}: ValidationFormProps) {
  const { otpCode, setOtpCode } = useOTPHandler(form, submitFunction);

  const { isTimerActive, otpTimer, formatTime, initTimer } = useOTPTimer();

  const { resendCode, resendIsLoading } = useResendOTP(data.number);

  useEffect(() => {
    initTimer(); 
  }, []);

  const handleResendOTP = () => {
    resendCode();
    initTimer(); 
  };

  return (
    <Form {...form}>
      <form
        className='flex h-full w-full flex-col justify-center gap-y-2'
        onSubmit={form.handleSubmit(submitFunction)}
      >
        <FormField
          control={form.control}
          name='otp'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center gap-2'>
                کد ارسال شده به شماره تلفن
                <b className='font-bold'> {prependZero(data.number)} </b>
                را وارد کنید
              </FormLabel>
              <FormControl>
                <div className='flex w-full items-center justify-center'>
                  <InputOTP
                    maxLength={5}
                    {...field}
                    onComplete={form.handleSubmit(submitFunction)}
                    autoFocus
                    value={otpCode || field.value} // Auto-fill the OTP code if received
                    autoComplete='one-time-code' // WebOTP auto-complete attribute
                  >
                    <InputOTPGroup dir='ltr'>
                      <InputOTPSlot index={0} />
                      {/* // Ensure the IDs are unique */}
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />
        <Button
          className='mx-2 mt-1 rounded-full px-6 text-lg font-bold md:mx-0'
          type='submit'
          disabled={form.formState.isSubmitting}
          name='Verify'
        >
          {form.formState.isSubmitting && (
            <Loader2 className='ml-2 h-4 w-4 animate-spin' />
          )}
          ورود
        </Button>

        <div className='mt-4 text-center'>
          {isTimerActive ? (
            <div className='text-sm font-medium text-slate-800'>
              <div className='font-bold'>{formatTime(otpTimer)}</div>
              <div>تا ارسال مجدد کد</div>
            </div>
          ) : (
            <Button
              variant='ghost'
              size='sm'
              className='text-sm text-slate-400'
              type='button'
              disabled={isTimerActive || resendIsLoading}
              onClick={handleResendOTP}
            >
              {resendIsLoading && (
                <Loader2 className='ml-2 h-4 w-4 animate-spin' />
              )}
              ارسال مجدد کد
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
