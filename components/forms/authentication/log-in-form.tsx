"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";

// Hook imports
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";

// Component imports
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

// Icon imports
import { Loader2 } from "lucide-react";

// Context imports
import { global_context } from "@/context/global";

// Fetch imports
import routes from "@/utils/api/routes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useSWR from "swr";

// Utility functions and validation schema

// Importing fields
import { nextFetcher } from "@/utils/api/next-fetcher";
import { loginValidationSchema } from "@/utils/validations/authentication.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { PasswordField, PhoneNumberField } from "./AuthenticationField";
import { loginHandler } from "./loginHandler";

export function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const { setLoginDialog, setSignupDialog, setForgotPasswordDialog }: any =
    useContext(global_context);

  const swipeLoginWithSignupDialog = () => {
    setLoginDialog(false);
    setSignupDialog(true);
  };

  const swipeLoginWithForgotPasswordDialog = () => {
    setLoginDialog(false);
    setForgotPasswordDialog(true);
  };

  // const { data: countryList, isLoading: countryListIsLoading } = useSWR(
  //   routes.authRoutes.getCountries,
  //   fetcher,
  //   { revalidateOnFocus: false }
  // );
  const { data: countryList, isLoading: countryListIsLoading } = useSWR(
    routes.authRoutes.getCountries,
    (url) =>
      nextFetcher({
        url: url,
        method: "GET",
        // useToken: true,
      }),
    { revalidateOnFocus: false }
  );

  const [selectedCountry, setSelectedCountry] = useState({
    id: "",
    name: "",
    code: "",
    image: "",
  });

  useEffect(() => {
    if (countryList?.length > 0) {
      const iran = countryList.find((country: any) => country.code === "98");
      if (iran) {
        setSelectedCountry(iran);
      }
    }
  }, [countryList]);

  const form = useForm({
    resolver: yupResolver(loginValidationSchema(selectedCountry)),
  });

  const login = async (data: any) => loginHandler(data, form, router, toast);

  return (
    <div className='w-full p-12'>
      <div className='mb-36 flex flex-col items-center justify-center'>
        <Image
          src='/static/images/logo.png'
          alt='Kateb logo'
          width={200}
          height={200}
          className='mb-16'
        />

        <Form {...form}>
          <form
            className='flex w-full flex-col gap-y-2'
            onSubmit={form.handleSubmit(login)}
          >
            <PhoneNumberField
              form={form}
              countryList={countryList}
              countryListIsLoading={countryListIsLoading}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />
            <PasswordField form={form} />

            <Button
              className='rounded-full px-6 text-lg font-bold'
              type='submit'
              disabled={form.formState.isSubmitting || countryListIsLoading}
              name='Verify'
            >
              {form.formState.isSubmitting && (
                <Loader2 className='ml-2 h-4 w-4 animate-spin' />
              )}
              ورود
            </Button>
          </form>
        </Form>
      </div>
      <div className='text-center'>
        <span className='block'>
          هنوز ثبت نام نکرده اید؟{" "}
          {pathname == "/auth/login" ? (
            <Link href='/auth/signup' className='text-primary hover:underline'>
              ثبت نام در سایت
            </Link>
          ) : (
            <Button
              variant='link'
              className='h-0 p-0 text-primary'
              onClick={swipeLoginWithSignupDialog}
            >
              ثبت نام در سایت
            </Button>
          )}
        </span>
        <span>
          رمز عبور خود را فراموش کرده اید؟{" "}
          {pathname == "/auth/login" ? (
            <Link
              href='/auth/forgot-pass'
              className='text-primary hover:underline'
            >
              بازنشانی رمز عبور
            </Link>
          ) : (
            <Button
              variant='link'
              className='h-0 p-0 text-primary'
              onClick={swipeLoginWithForgotPasswordDialog}
            >
              بازنشانی رمز عبور
            </Button>
          )}
        </span>
      </div>
    </div>
  );
}
