// Component  imports
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import HeroChatIcon from "@/static/icons/hero-chat-bubble.svg?url";
import HeroDocIcon from "@/static/icons/hero-document.svg?url";
import HeroDocCheckIcon from "@/static/icons/hero-document-check.svg?url";
import HeroEyeIcon from "@/static/icons/hero-eye.svg?url";
import HeroPresentationIcon from "@/static/icons/hero-presentation.svg?url";

export default function Activities({ user }: any) {
  return (
    <>
      <section className='mt-4'>
        <h2 className='text-2xl font-black text-blue-900'>فعالیت‌ها</h2>
        <div className='mt-6 flex w-full flex-row flex-wrap justify-center gap-6 px-8 md:gap-8 md:px-12 lg:justify-start xl:gap-12 xl:px-20'>
          <div className='flex w-24 flex-col items-center justify-center gap-1 md:w-32 md:gap-2 xl:w-40 xl:gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 md:h-12 md:w-12 xl:h-16 xl:w-16'>
              <Image
                src={HeroEyeIcon}
                alt='Achievement Icon'
                width={64}
                height={64}
                className='h-7 w-7 md:h-8 md:w-8 xl:h-10 xl:w-10'
              />
            </div>
            <h4 className='whitespace-nowrap text-center text-xs font-bold text-black md:text-sm xl:text-lg'>
              {user?.stats?.learn_hour} ساعت یادگیری
            </h4>
          </div>
          <div className='flex w-24 flex-col items-center justify-center gap-1 md:w-32 md:gap-2 xl:w-40 xl:gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 md:h-12 md:w-12 xl:h-16 xl:w-16'>
              <Image
                src={HeroChatIcon}
                alt='Achievement Icon'
                width={64}
                height={64}
                className='h-7 w-7 md:h-8 md:w-8 xl:h-10 xl:w-10'
              />
            </div>
            <h4 className='whitespace-nowrap text-center text-xs font-bold text-black md:text-sm xl:text-lg'>
              {user?.stats?.topics} مبحث ایجادشده
            </h4>
          </div>
          <div className='flex w-24 flex-col items-center justify-center gap-1 md:w-32 md:gap-2 xl:w-40 xl:gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 md:h-12 md:w-12 xl:h-16 xl:w-16'>
              <Image
                src={HeroDocIcon}
                alt='Achievement Icon'
                width={64}
                height={64}
                className='h-7 w-7 md:h-8 md:w-8 xl:h-10 xl:w-10'
              />
            </div>
            <h4 className='whitespace-nowrap text-center text-xs font-bold text-black md:text-sm xl:text-lg'>
              {user?.stats?.learning_courses} درس درحال یادگیری
            </h4>
          </div>
          <div className='flex w-24 flex-col items-center justify-center gap-1 md:w-32 md:gap-2 xl:w-40 xl:gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 md:h-12 md:w-12 xl:h-16 xl:w-16'>
              <Image
                src={HeroPresentationIcon}
                alt='Achievement Icon'
                width={64}
                height={64}
                className='h-7 w-7 md:h-8 md:w-8 xl:h-10 xl:w-10'
              />
            </div>
            <h4 className='whitespace-nowrap text-center text-xs font-bold text-black md:text-sm xl:text-lg'>
              {user?.stats?.rates} نظرسنجی
            </h4>
          </div>
          <div className='flex w-24 flex-col items-center justify-center gap-1 md:w-32 md:gap-2 xl:w-40 xl:gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 md:h-12 md:w-12 xl:h-16 xl:w-16'>
              <Image
                src={HeroDocCheckIcon}
                alt='Achievement Icon'
                width={64}
                height={64}
                className='h-7 w-7 md:h-8 md:w-8 xl:h-10 xl:w-10'
              />
            </div>
            <h4 className='whitespace-nowrap text-center text-xs font-bold text-black md:text-sm xl:text-lg'>
              {user?.stats?.finished_courses} درس به اتمام رسیده
            </h4>
          </div>
        </div>
      </section>
      <Separator
        orientation='horizontal'
        className='mt-4 h-[2px] bg-slate-300'
      />
    </>
  );
}
