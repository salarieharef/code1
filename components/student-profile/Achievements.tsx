// Component  imports
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronDown, MenuIcon } from "lucide-react";
// Achievement icon
import BestTeacherSvg from "@/static/icons/achievements/best-teacher.svg?url";
import BestSellerSvg from "@/static/icons/achievements/best-seller.svg?url";
import FirstClassSvg from "@/static/icons/achievements/first-class.svg?url";
import PositiveCommentsSvg from "@/static/icons/achievements/positive-comments.svg?url";
import HighRatedSvg from "@/static/icons/achievements/high-rated.svg?url";
import CertificateExImg from "@/static/images/global/certificate-example.webp";

export default function Achievements({ classData }: any) {
  return (
    <>
      <section className='mt-4'>
        <h2 className='text-2xl font-black text-blue-900'>دستاوردها</h2>
        <div className='mt-6 flex flex-row flex-wrap justify-center gap-x-4 lg:justify-between lg:gap-2'>
          <Image
            src={BestTeacherSvg}
            alt='Achievement Icon'
            width={256}
            height={256}
            className='h-24 w-24 lg:h-40 lg:w-40'
          />

          <Image
            src={BestSellerSvg}
            alt='Achievement Icon'
            width={256}
            height={256}
            className='h-24 w-24 lg:h-40 lg:w-40'
          />

          <Image
            src={FirstClassSvg}
            alt='Achievement Icon'
            width={256}
            height={256}
            className='h-24 w-24 lg:h-40 lg:w-40'
          />

          <Image
            src={PositiveCommentsSvg}
            alt='Achievement Icon'
            width={256}
            height={256}
            className='h-24 w-24 lg:h-40 lg:w-40'
          />

          <Image
            src={HighRatedSvg}
            alt='Achievement Icon'
            width={256}
            height={256}
            className='h-24 w-24 lg:h-40 lg:w-40'
          />
        </div>
      </section>
      <Separator
        orientation='horizontal'
        className='mt-4 h-[2px] bg-slate-300'
      />
      <section className='mt-4'>
        <h2 className='text-2xl font-black text-blue-900'>
          گواهی‌نامه‌های دریافت‌شده
        </h2>
        <div className='mt-6 grid grid-cols-3 gap-4'>
          <Image
            src={CertificateExImg}
            alt='Certificate Image'
            width={512}
            height={375}
          />
          <Image
            src={CertificateExImg}
            alt='Certificate Image'
            width={512}
            height={375}
          />
          <Image
            src={CertificateExImg}
            alt='Certificate Image'
            width={512}
            height={375}
          />
        </div>
        <div className='text-center'>
          <Button
            variant='link'
            className='mt-8 text-lg font-bold text-slate-800'
          >
            مشاهده بیشتر
            <ChevronDown />
          </Button>
        </div>
      </section>
      <Separator
        orientation='horizontal'
        className='mt-4 h-[2px] bg-slate-300'
      />
    </>
  );
}
