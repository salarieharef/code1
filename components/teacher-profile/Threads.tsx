import Image from "next/image";

// Component  imports
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
// import EllipsisCircleIcon from "@/static/icons/ellipsis-circle.svg";


// Icon imports
import { ChevronDown, MessageCircle, MessagesSquare } from "lucide-react";

export default function Threads({ user }: any) {
  return (
    <section className='mt-4'>
      <h2 className='text-xl font-bold text-blue-900 sm:text-2xl'>
        مباحث ایجادشده یا شرکت‌کرده
      </h2>

      <div className='mt-6 grid grid-cols-1 gap-4'>
        {/* <div className="flex flex-col lg:flex-row justify-between bg-white rounded-[15px] shadow border border-slate-300 px-4 pt-2 lg:px-6 lg:pt-3">
          <div className="max-w-[48rem]">
            <h4 className="text-right text-blue-400 text-xl font-bold">
              کتاب های مفید برای ریاضیات حساب دیفرانسیل و انتگرال
            </h4>
            <span className="text-slate-400 text-sm font-light">
              آخرین پاسخ به این مبحث
            </span>
            <span className="text-slate-600 text-sm font-medium mr-1">
              5ساعت پیش
            </span>
            <p className="text-right text-slate-500 text-lg font-normal leading-snug">
              کتاب های مفید برای ریاضیات حساب دیفرانسیل و انتگرال رو اگر کسی
              نیاز داره من بصورت پی دی اف دارم و میتونم در اختیارتون بزارم. برای
              هماهنگی لطفا ....
            </p>
          </div>
          <div className="flex flex-row-reverse gap-x-4 lg:gap-x-0 lg:flex-col items-center justify-center self-end mt-4 lg:mt-0">
            <div className="hidden lg:flex flex-row ">
              <Image
                src="/static/icons/ellipsis-circle.svg"
                alt="Teacher image"
                className="object-cover relative w-9 h-9 rounded-full"
                width={64}
                height={64}
              />
              <Image
                src="/static/images/avatar/avatar-3.webp"
                alt="Teacher image"
                className="object-cover relative w-9 h-9 rounded-full -mr-3"
                width={64}
                height={64}
              />
              <Image
                src="/static/images/avatar/avatar-3.webp"
                alt="Teacher image"
                className="object-cover relative w-9 h-9 rounded-full -mr-3"
                width={64}
                height={64}
              />
              <Image
                src="/static/images/avatar/avatar-3.webp"
                alt="Teacher image"
                className="object-cover relative w-9 h-9 rounded-full -mr-3"
                width={64}
                height={64}
              />
            </div>
            <span className="flex flex-row lg:mt-2">
              <MessageCircle className="text-slate-300 w-6 h-6 lg:w-8 lg:h-8" />
              <span className="text-right text-slate-700 text-sm lg:text-base font-medium leading-8 lg:leading-10">
                23 یادداشت
              </span>
            </span>
          </div>
        </div> */}

        <div className='flex flex-col items-center justify-center'>
          <MessagesSquare className='h-24 w-24 stroke-[.5] sm:h-36 sm:w-36' />
          <span>{user?.name} در هیچ مبحثی شرکت نکرده است.</span>
        </div>
      </div>

      {/* <div className="text-center">
          <Button
            variant="link"
            className="text-slate-800 text-lg font-bold mt-8"
          >
            مشاهده بیشتر
            <ChevronDown />
          </Button>
        </div> */}

      <Separator
        orientation='horizontal'
        className='mt-4 h-[2px] bg-slate-300'
      />
    </section>
  );
}
