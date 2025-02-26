import { useContext } from "react";
import Image from "next/image";
// Component imports
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// Context imports
import { global_context } from "@/context/global";

import SignUpImage from "@/static/images/global/signup_image.webp";
import StudentSignupForm from "./student-signup-form";

export function SignUpModal() {
  const { signupDialog, setSignupDialog, setSignupUserType }: any =
    useContext(global_context);

  return (
    <Dialog
      open={signupDialog}
      onOpenChange={(value) => {
        setSignupUserType("student");
        setSignupDialog(value);
      }}
    >
      <DialogTrigger asChild>
        <Button className='ml-3 px-6 text-lg font-bold' name='Sign up'>
          ثبت نام
        </Button>
      </DialogTrigger>
      <DialogContent className='top-0 max-h-screen max-w-[640px] translate-y-0 overflow-y-scroll border-0 p-0 md:top-[50%] md:max-w-[720px] md:translate-y-[-50%] lg:max-w-[960px] xl:max-w-[1024px]'>
        <div className='flex flex-col-reverse md:flex-row'>
          <StudentSignupForm />
          <div className='relative flex w-full flex-col items-center justify-center p-16 text-center font-bold text-white'>
            <Image
              src={SignUpImage}
              alt='Signup Image'
              layout='fill'
              objectFit='cover'
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
