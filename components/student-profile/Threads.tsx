// Component  imports
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import EllipsisCircleIcon from "@/static/icons/ellipsis-circle.svg?url";
import { ChevronDown, MessageCircle } from "lucide-react";
import Image from "next/image";
export default function Threads({ classData }: any) {
  return (
    <>
      <section className='mt-4'>
        <h2 className='text-2xl font-black text-blue-900'>
          مباحث ایجادشده یا شرکت‌کرده
        </h2>
        <div className='mt-6 grid grid-cols-1 gap-4'>
          <div className='flex flex-col justify-between rounded-[15px] border border-slate-300 bg-white px-4 pt-2 shadow lg:flex-row lg:px-6 lg:pt-3'>
            <div className='max-w-[48rem]'>
              <h4 className='text-right text-xl font-bold text-blue-400'>
                کتاب های مفید برای ریاضیات حساب دیفرانسیل و انتگرال
              </h4>
              <span className='text-sm font-light text-slate-400'>
                آخرین پاسخ به این مبحث
              </span>
              <span className='mr-1 text-sm font-medium text-slate-600'>
                5ساعت پیش
              </span>
              <p className='text-right text-lg font-normal leading-snug text-slate-500'>
                کتاب های مفید برای ریاضیات حساب دیفرانسیل و انتگرال رو اگر کسی
                نیاز داره من بصورت پی دی اف دارم و میتونم در اختیارتون بزارم.
                برای هماهنگی لطفا ....
              </p>
            </div>
            <div className='mt-4 flex flex-row-reverse items-center justify-center gap-x-4 self-end lg:mt-0 lg:flex-col lg:gap-x-0'>
              <div className='hidden flex-row lg:flex'>
                <Image
                  src={EllipsisCircleIcon}
                  alt='Teacher image'
                  className='relative h-9 w-9 rounded-full object-cover'
                  width={64}
                  height={64}
                />
                <Image
                  src='/static/images/avatar/avatar-3.webp'
                  alt='Teacher image'
                  className='relative -mr-3 h-9 w-9 rounded-full object-cover'
                  width={64}
                  height={64}
                />
                <Image
                  src='/static/images/avatar/avatar-3.webp'
                  alt='Teacher image'
                  className='relative -mr-3 h-9 w-9 rounded-full object-cover'
                  width={64}
                  height={64}
                />
                <Image
                  src='/static/images/avatar/avatar-3.webp'
                  alt='Teacher image'
                  className='relative -mr-3 h-9 w-9 rounded-full object-cover'
                  width={64}
                  height={64}
                />
              </div>
              <span className='flex flex-row lg:mt-2'>
                <MessageCircle className='h-6 w-6 text-slate-300 lg:h-8 lg:w-8' />
                <span className='text-right text-sm font-medium leading-8 text-slate-700 lg:text-base lg:leading-10'>
                  23 یادداشت
                </span>
              </span>
            </div>
          </div>
          <div className='flex flex-col justify-between rounded-[15px] border border-slate-300 bg-white px-4 pt-2 shadow lg:flex-row lg:px-6 lg:pt-3'>
            <div className='max-w-[48rem]'>
              <h4 className='text-right text-xl font-bold text-blue-400'>
                کتاب های مفید برای ریاضیات حساب دیفرانسیل و انتگرال
              </h4>
              <span className='text-sm font-light text-slate-400'>
                آخرین پاسخ به این مبحث
              </span>
              <span className='mr-1 text-sm font-medium text-slate-600'>
                5ساعت پیش
              </span>
              <p className='text-right text-lg font-normal leading-snug text-slate-500'>
                کتاب های مفید برای ریاضیات حساب دیفرانسیل و انتگرال رو اگر کسی
                نیاز داره من بصورت پی دی اف دارم و میتونم در اختیارتون بزارم.
                برای هماهنگی لطفا ....
              </p>
            </div>
            <div className='mt-4 flex flex-row-reverse items-center justify-center gap-x-4 self-end lg:mt-0 lg:flex-col lg:gap-x-0'>
              <div className='hidden flex-row lg:flex'>
                <Image
                  src={EllipsisCircleIcon}
                  alt='Teacher image'
                  className='relative h-9 w-9 rounded-full object-cover'
                  width={64}
                  height={64}
                />
                <Image
                  src='/static/images/avatar/avatar-3.webp'
                  alt='Teacher image'
                  className='relative -mr-3 h-9 w-9 rounded-full object-cover'
                  width={64}
                  height={64}
                />
                <Image
                  src='/static/images/avatar/avatar-3.webp'
                  alt='Teacher image'
                  className='relative -mr-3 h-9 w-9 rounded-full object-cover'
                  width={64}
                  height={64}
                />
                <Image
                  src='/static/images/avatar/avatar-3.webp'
                  alt='Teacher image'
                  className='relative -mr-3 h-9 w-9 rounded-full object-cover'
                  width={64}
                  height={64}
                />
              </div>
              <span className='flex flex-row lg:mt-2'>
                <MessageCircle className='h-6 w-6 text-slate-300 lg:h-8 lg:w-8' />
                <span className='text-right text-sm font-medium leading-8 text-slate-700 lg:text-base lg:leading-10'>
                  23 یادداشت
                </span>
              </span>
            </div>
          </div>
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
