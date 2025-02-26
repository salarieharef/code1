import Image from "next/image";
import SignUpImage from "@/static/images/global/signup_image.webp";

export default function AuthCover() {
  return (
    <div className='relative hidden h-full w-full flex-col items-center justify-center p-16 text-center font-bold text-white md:flex'>
      <Image
        alt='auth'
        src={SignUpImage}
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
  );
}
