import { nextFetcher } from "@/utils/api/next-fetcher";
import { prependZero } from "@/utils/number-utils";
import routes from "@/utils/api/routes";
import { ToastProps } from "@/components/ui/toast";

export const sendOTP = async (
  phoneNumber: string,
  toast: (option: ToastProps) => void,
  setValidationStep: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
  setIsLoading(true);
  try {
    const response = await nextFetcher({
      url: routes.userRoutes.checkLogin,
      method: "POST",
      body: { username: prependZero(phoneNumber) },
      useToken: true,
    });

    if (!response.success) {
      if (response.code === 400) {
        toast({
          variant: "destructive",
          title: response.msg || "درخواست نامعتبر است.",
          position: "top-right",
        });
        setValidationStep(true);
        return;
      }

      if (response.code >= 500) {
        throw new Error("Internal Server Error");
      }
    } else {
      toast({
        variant: "success",
        title: "کد تایید ارسال شد.",
        position: "top-right",
      });
      setValidationStep(true);
    }
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "خطای سرور. لطفاً دوباره تلاش کنید.",
      position: "top-right",
    });
  } finally {
    setIsLoading(false);
  }
};

export const verifyOTP = async (
  data: { otp: string },
  phoneNumber: string,
  toast: any,
  handleLogin?: (data: { otp: string }) => void
): Promise<any> => {
  try {
    const res = await nextFetcher({
      url: routes.userRoutes.checkVerify,
      method: "POST",
      body: {
        username: prependZero(phoneNumber),
        code: data.otp,
      },
      useToken: true,
    });
    // toast({ variant: "success", title: res.msg || "کد تایید صحیح است." });
    if (handleLogin) {
      handleLogin(data);
    }
    return res;
  } catch (error: any) {
    const message = error?.msg || "کد تایید نادرست است.";
    toast({ variant: "destructive", title: message });
  }
};
