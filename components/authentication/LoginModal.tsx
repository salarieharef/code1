import Image from "next/image";
import { useContext } from "react";

// Component imports
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LoginForm } from "../forms/authentication/log-in-form";

// Context imports
import { ButtonWithTooltip } from "@/components/ui/button-with-tooltip";
import { global_context } from "@/context/global";

import SignUpImage from "@/static/images/global/signup_image.webp";

export function LoginModal() {
  const { loginDialog, setLoginDialog }: any = useContext(global_context);

  return (
    <Dialog open={loginDialog} onOpenChange={(val) => setLoginDialog(val)}>
      <DialogTrigger asChild>
        <ButtonWithTooltip
          variant='link'
          tooltip='ورود به صفحه کاربری'
          className='px-2 text-lg font-bold text-white hover:text-white'
          name='Log in'
        >
          ورود
        </ButtonWithTooltip>
      </DialogTrigger>
      <DialogContent className='top-0 max-h-screen w-full max-w-[640px] translate-y-0 overflow-y-scroll border-0 p-0 md:top-[50%] md:max-w-[720px] md:translate-y-[-50%] lg:max-w-[960px] xl:max-w-[1024px]'>
        <div className='flex flex-col-reverse md:flex-row'>
          <LoginForm />
          <div className='relative flex w-full flex-col items-center justify-center p-16 text-center font-bold text-white'>
            <Image
              src={SignUpImage}
              alt='Signup Image'
              layout='fill'
              objectFit='cover'
              objectPosition='top'
              className='absolute inset-0 z-0'
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
