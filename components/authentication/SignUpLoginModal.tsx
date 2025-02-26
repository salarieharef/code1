"use client";
import Image from "next/image";
import { useContext } from "react";

// Component imports
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// Context imports
import { global_context } from "@/context/global";
import { VerificationForm } from "./verification-form";

import SignUpImage from "@/static/images/global/signup_image.webp";

export function SignUpLoginModal() {
  const {
    signupDialog,
    setSignupDialog,
    setSignupUserType,
    setOpenedLoginDialogFromClassPage,
  }: any = useContext(global_context);

  return (
    <Dialog
      open={signupDialog}
      onOpenChange={(value) => {
        setSignupUserType("student");
        setSignupDialog(value);
        setOpenedLoginDialogFromClassPage(false);
      }}
    >
      <DialogTrigger asChild>
        <Button
          className='ml-3 bg-blue-500 px-6 text-lg font-medium hover:bg-blue-500/80'
          size='sm'
          name='Sign up'
        >
          ورود/ثبت‌نام
        </Button>
      </DialogTrigger>
      <DialogContent className='top-0 min-h-[55vh] max-w-[640px] translate-y-0 rounded-md border-0 p-0 md:top-[50%] md:max-w-[720px] md:translate-y-[-50%] lg:max-w-[960px] xl:max-w-[1024px]'>
        <div className='flex flex-col-reverse md:flex-row'>
          <VerificationForm />
          <div className='relative flex w-full flex-col items-center justify-center rounded-l-md p-16 text-center font-bold text-white '>
            <Image
              src={SignUpImage}
              alt='Signup Image'
              layout='fill'
              objectFit='cover'
              objectPosition='top'
              className='inset-0 rounded-l-md ring-offset-0'
            />
            <div className='relative z-10'>
              <h1 className='text-4xl'>به کاتب بپیوندید</h1>
              <p>خلاقیت خود را با هزاران درس عملی کاوش کنید</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
