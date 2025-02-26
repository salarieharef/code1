import { useToast } from "@/components/ui/use-toast";
import routes from "@/utils/api/routes";
import { prependZero } from "@/utils/number-utils";
import { useEffect, useState } from "react";

export const useOTPHandler = (
  form: any,
  submitFunction: (data: any) => Promise<void>
) => {
  const [otpCode, setOtpCode] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const handleOTPReceive = async () => {
      try {
        if ("credentials" in navigator && "get" in navigator.credentials) {
          const credentialOptions: CredentialRequestOptions & {
            otp?: { transport: string[] };
          } = {
            otp: { transport: ["sms"] },
            signal: controller.signal,
          };

          const otp: any = await navigator.credentials.get(credentialOptions);

          if (otp) {
            const cleanedOtp = otp.code.replace(/\s+/g, "").slice(0, 5);
            setOtpCode(cleanedOtp);
            form.setValue("otp", cleanedOtp);
            form.trigger("otp");
            form.handleSubmit(submitFunction)();
          }
        }
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Error receiving OTP:", error);
        }
      }
    };

    if (!otpCode) {
      handleOTPReceive();
    }

    return () => {
      controller.abort();
    };
  }, [otpCode, form, submitFunction]);

  useEffect(() => {
    if (otpCode) {
      form.setValue("otp", otpCode);
      form.trigger("otp");
    }
  }, [otpCode, form]);

  return { otpCode, setOtpCode };
};

export const useResendOTP = (phoneNumber: string) => {
  const { toast } = useToast();
  const [resendIsLoading, setResendIsLoading] = useState(false);

  const resendCode = async () => {
    setResendIsLoading(true);
    try {
      const response = await fetch(routes.authRoutes.resend, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: prependZero(phoneNumber),
        }),
      });

      const res = await response.json();

      if (response.ok && res.code === 200) {
        toast({
          variant: "success",
          title: "کد یکبار مصرف برای شما مجدد ارسال شد",
        });
      } else {
        throw new Error(res.msg || "مشکلی پیش آمده است");
      }
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: e.message,
      });
    } finally {
      setResendIsLoading(false);
    }
  };

  return { resendCode, resendIsLoading };
};
