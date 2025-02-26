import { signIn } from "next-auth/react";
import { prependZero } from "@/utils/number-utils";

export const loginHandler = async (data: any, form: any, router: any, toast: any) => {
  const convertedPhoneNumber = prependZero(data?.number);
  try {
    const res: any = await signIn("credentials", {
      username: convertedPhoneNumber,
      password: data.password,
      callbackUrl: "/",
      redirect: false,
    });

    if (res.ok) {
      toast({
        variant: "success",
        title: "با موفقیت وارد سایت شدید.",
      });

      const callbackUrl = res.url;
      if (callbackUrl) {
        router.push(callbackUrl);
      }
    } else if (res.error) {
      throw Error(res.error);
    }
  } catch (e: any) {
    toast({
      variant: "destructive",
      title: e.message,
    });
  }
};
