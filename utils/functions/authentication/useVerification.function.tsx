// verificationFunctions.ts
import {
  FormInputs,
  VerificationFunctionsProps,
} from "@/types/authentication/verification-types";
import routes from "@/utils/api/routes";
import { prependZero } from "@/utils/number-utils";
import { includes } from "lodash";
import { getSession, signIn } from "next-auth/react";

export const useVerificationFunctions = ({
  form,
  submitForm,
  setIsNewUser,
  setValidationStep,
  setSignupStep,
  setNewUser,
  toast,
  searchParams,
  router,
  newUser,
}: VerificationFunctionsProps) => {
  const sendOTP = async (data: FormInputs) => {
    await submitForm({
      apiEndpoint: routes.authRoutes.login,
      data: {
        username: prependZero(data.number),
      },
      successCallback: (res: any) => {
        setIsNewUser(res?.data?.user?.is_new_user);
        toast({
          variant: "success",
          title: "کد تایید ارسال شد.",
        });
        setValidationStep(true);
      },
      errorCallback: (error: any) => {
        if (error.code === 429) {
          toast({
            variant: "destructive",
            title:
              "درخواست های زیاد ایجاد کرده اید، لطفاً بعداً مجدد امتحان کنید.",
          });
        } else if (error.code === 400) {
          toast({
            variant: "destructive",
            title: error?.msg,
          });
          setIsNewUser(error?.error_data?.is_new_user);
          setValidationStep(true);
        } else {
          toast({
            variant: "destructive",
            title: error.msg || "ارسال کد تایید با خطا مواجه شد.",
          });
        }
      },
    });
  };

  const login = async (data: FormInputs, userDetails?: any) => {
    const convertedPhoneNumber = prependZero(data.number);
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    try {
      // const UrlContainTeachingInKateb = includes(
      //   callbackUrl,
      //   "teaching-in-kateb"
      // );

      const res: any = await signIn("credentials", {
        username: convertedPhoneNumber,
        code: data.otp,
        user: userDetails ? JSON.stringify(userDetails) : null,
        callbackUrl,
        redirect: true,
        // redirect: UrlContainTeachingInKateb ? false : true,
      });

      if (res?.ok) {
        toast({
          variant: "success",
          title: "با موفقیت وارد سایت شدید.",
        });
        // const session: any = await getSession();
        // const lastTeachingCourseId = session?.user?.last_teaching_course_id;

        // if (UrlContainTeachingInKateb && lastTeachingCourseId) {
        //   router.push(
        //     `/studio/teaching-in-kateb/course/${lastTeachingCourseId}/edit`
        //   );
        // } else if (UrlContainTeachingInKateb) {
        //   router.push(`/studio/teaching-in-kateb/course/add`);
        // } else {
        //   router.push(callbackUrl);
        // }
      } else if (res?.error) {
        throw new Error(
          res.error || "کد وارد شده اشتباه است. لطفاً دوباره امتحان کنید."
        );
      }
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: e.msg || "کد وارد شده اشتباه است. لطفاً دوباره امتحان کنید.",
      });
    }
  };

  const validate = async (data: FormInputs) => {
    await submitForm({
      apiEndpoint: routes.authRoutes.verify,
      data: {
        username: prependZero(data.number),
        code: data.otp,
      },
      successCallback: (res: any) => {
        setNewUser(res?.data);
        setSignupStep(true);
        toast({
          variant: "success",
          title: "کد تایید صحیح است.",
        });
      },
      errorCallback: (error: any) => {
        toast({
          variant: "destructive",
          title: error.msg || "کد تایید نادرست است.",
        });
      },
    });
  };

  const signup = async (data: FormInputs) => {
    await submitForm({
      apiEndpoint: routes.authRoutes.signup,
      data: {
        ...data,
        username: prependZero(form.watch("number")),
      },
      successCallback: () => {
        login(form.getValues(), {
          user: newUser?.data?.user,
          token: newUser?.token,
        });
        setIsNewUser(false);
      },
      errorCallback: (error: any) => {
        toast({
          variant: "destructive",
          title: error.message || "ثبت نام با خطا مواجه شد.",
        });
      },
      token: newUser?.token?.access_token,
    });
  };

  return { sendOTP, validate, signup, login };
};
