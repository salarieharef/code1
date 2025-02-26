"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";

// Hook imports
import { useToast } from "@/components/ui/use-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

// Component imports
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Icon imports
import { Loader2 } from "lucide-react";
import LogoImg from "@/static/images/global/logo.webp";

// Context imports
import { global_context } from "@/context/global";

// Auth imports
import { signIn } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// Fetch imports
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { prependZero } from "@/utils/number-utils";
import useSWR from "swr";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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

  // get countries
  // const {
  //   data: { data: countryList } = {},
  //   error,
  //   isLoading: countryListIsLoading,
  // } = useSWR(routes.authRoutes.getCountries, fetcher, {
  //   revalidateOnFocus: false,
  // });
  const {
    data: { data: countryList } = {},
    error,
    isLoading: countryListIsLoading,
  } = useSWR(
    routes.authRoutes.getCountries,
    (url) =>
      nextFetcher({
        url: url,
        method: "GET",
        useToken: true,
      }),
    { revalidateOnFocus: false }
  );
  const [selectedCountry, setSelectedCountry] = useState({
    id: "",
    name: "",
    code: "",
    image: "",
  });
  // set default value for the selector (iran)
  useEffect(() => {
    if (countryList?.length > 0) {
      const iran = countryList.find((country: any) => country.code === "98");
      if (iran) {
        setSelectedCountry(iran);
      }
    }
  }, [countryList]);

  // handling input validation for different countries
  const countryCodeLength = selectedCountry?.code?.length;
  const requiredDigits = 11 - countryCodeLength + 1; // +1 for the zero at the beginning;

  const validation = yup.object({
    number: yup
      .string()
      .required("شماره موبایل نباید خالی باشد")
      .test(
        "number",
        `شماره موبایل باید ${requiredDigits} رقم و بدون صفر اول باشد`,
        (value) => {
          const regex = new RegExp(`^[1-9][0-9]{${requiredDigits - 1}}$`);
          return regex.test(value);
        }
      ),
    password: yup
      .string()
      .min(8, "رمز ورود باید حداقل ۸ رقم باشد")
      .max(20, "رمز ورود باید حداکثر ۲۰ رقم باشد")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/,
        "رمز ورود باید دارای کلمات کوچک و بزرگ باشد"
      )
      .required("لطفا رمز خود را وارد کنید"),
  });

  type Inputs = yup.InferType<typeof validation>;

  const form = useForm<Inputs>({
    resolver: yupResolver(validation),
  });
  // Sign the user in
  const login: SubmitHandler<Inputs> = async (data) => {
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

        // const callbackUrl = searchParams.get("callbackUrl");
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

  return (
    <div className='w-full p-12'>
      <div className='mb-36 flex flex-col items-center justify-center'>
        {/* Site logo */}
        <Image
          src={LogoImg}
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
            {/* Phone number */}
            <FormField
              control={form.control}
              name='number'
              render={({ field }: any) => (
                <FormItem>
                  <FormControl>
                    <div className={`col-span-3 flex`}>
                      <div className='w-35 ml-1 flex items-center justify-center'>
                        {countryListIsLoading ? (
                          <Loader2 className='mx-2 h-5 w-5 animate-spin' />
                        ) : (
                          <Select
                            dir='ltr'
                            value={selectedCountry?.code}
                            onValueChange={(v: any) => {
                              const selectedCountry = countryList.find(
                                (country: any) => country.code === v
                              );
                              setSelectedCountry(selectedCountry);
                            }}
                          >
                            <SelectTrigger
                              className={`rounded-r border-r-4 ${
                                form.formState.errors?.number
                                  ? "border-r-destructive"
                                  : "border-r-primary"
                              }`}
                            >
                              <SelectValue>
                                <Image
                                  src={selectedCountry?.image}
                                  alt={selectedCountry?.code}
                                  width={20}
                                  height={20}
                                  className='mr-2 inline-block'
                                />
                                {"+" + selectedCountry?.code}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent position='popper'>
                              {countryList && countryList.length > 0
                                ? countryList.map(
                                    (country: any, index: number) => (
                                      <SelectItem
                                        key={index}
                                        value={country.code}
                                      >
                                        <Image
                                          src={country?.image}
                                          alt={country?.code}
                                          width={20}
                                          height={20}
                                          className='mr-2 inline-block'
                                        />
                                        {"+" + country?.code}
                                      </SelectItem>
                                    )
                                  )
                                : null}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                      {/* <Input
                        placeholder="شماره خود را وارد کنید..."
                        {...field}
                        className={`col-span-3 border-r-4 ${
                          form.formState.errors?.number
                            ? "border-r-destructive"
                            : "border-r-primary"
                        } w-full`}
                        type="number"
                      /> */}
                      <Input
                        className={`flex-grow rounded-r`} // This will take up the remaining space
                        type='number'
                        placeholder='شماره تلفن خود را وارد کنید...'
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='رمز ورود خود را وارد کنید...'
                      {...field}
                      className={`col-span-3 border-r-4 ${
                        form.formState.errors?.password
                          ? "border-r-destructive"
                          : "border-r-primary"
                      } w-full`}
                      type='password'
                    />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />

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
