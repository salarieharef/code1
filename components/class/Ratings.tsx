import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Construction } from "lucide-react";

export default function Ratings() {
  return (
    <section className='mt-4 rounded-xl bg-white p-4' id='ratings'>
      <div className='flex flex-col items-center justify-center'>
        <Construction className='h-28 w-28 stroke-1 text-muted-foreground' />
        <span>به زودی تکمیل میشود</span>
      </div>
      {/* <div className="flex items-center gap-x-2">
        <span className="bg-blue-400 w-6 h-6 font-medium rounded-full flex items-center justify-center text-white">
          !
        </span>
        <h2 className="text-slate-700 text-xl font-bold">رتبه‌بندی درس</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-y-8 gap-x-12 mt-6">
        <div className="bg-white rounded-xl p-4">
          <h4 className="text-slate-700 text-xl font-bold mb-6">
            انتظارات برآورده شد؟
          </h4>
          <div className="flex flex-row gap-x-2 mt-4">
            <span className="flex-none ml-1 text-black text-base font-medium leading-7 min-w-[4rem] w-16">
              فراتر رفت
            </span>
            <Progress
              className="h-7 rounded bg-slate-200"
              indicatorClassName="bg-blue-400"
              value={57}
            />
            <span className="flex-none text-black text-base font-medium leading-7 min-w-[2rem] w-8">
              57%
            </span>
          </div>
          <div className="flex flex-row gap-x-2 mt-4">
            <span className="flex-none ml-1 text-black text-base font-medium leading-7 min-w-[4rem] w-16">
              بله
            </span>
            <Progress
              className="h-7 rounded bg-slate-200"
              indicatorClassName="bg-blue-400"
              value={33}
            />
            <span className="flex-none text-black text-base font-medium leading-7 min-w-[2rem] w-8">
              33%
            </span>
          </div>
          <div className="flex flex-row gap-x-2 mt-4">
            <span className="flex-none ml-1 text-black text-base font-medium leading-7 min-w-[4rem] w-16">
              تا حدی
            </span>
            <Progress
              className="h-7 rounded bg-slate-200"
              indicatorClassName="bg-blue-400"
              value={7}
            />
            <span className="flex-none text-black text-base font-medium leading-7 min-w-[2rem] w-8">
              7%
            </span>
          </div>
          <div className="flex flex-row gap-x-2 mt-4">
            <span className="flex-none ml-1 text-black text-base font-medium leading-7 min-w-[4rem] w-16">
              خیر
            </span>
            <Progress
              className="h-7 rounded bg-slate-200"
              indicatorClassName="bg-blue-400"
              value={3}
            />
            <span className="flex-none text-black text-base font-medium leading-7 min-w-[2rem] w-8">
              3%
            </span>
          </div>
        </div>

        <div className="rounded-xl p-4">
          <h4 className="text-slate-700 text-xl font-bold mb-6">
            بیشتر پسندیدن شده
          </h4>
          <div className="flex flex-row rounded border-2 border-slate-30 items-center pl-2 pr-4 py-1 mb-2">
            <span className="grow text-black text-lg font-medium">
              پر انرژی بودن مدرس
            </span>
            <span className="flex flex-row items-center text-black text-lg font-bold ">
              ۵۸۹
              <Image
                src="/static/icons/like.svg"
                alt="Certificate Icon"
                width={64}
                height={64}
                className="w-5 h-5 mx-2"
              />
            </span>
          </div>
          <div className="flex flex-row rounded border-2 border-slate-30 items-center pl-2 pr-4 py-1 mb-2">
            <span className="grow text-black text-lg font-medium">
              صدا و تصویر با کیفیت
            </span>
            <span className="flex flex-row items-center text-black text-lg font-bold ">
              ۱,۲۲۱
              <Image
                src="/static/icons/like.svg"
                alt="Certificate Icon"
                width={64}
                height={64}
                className="w-5 h-5 mx-2"
              />
            </span>
          </div>
          <div className="flex flex-row rounded border-2 border-slate-30 items-center pl-2 pr-4 py-1 mb-2">
            <span className="grow text-black text-lg font-medium">
              وضوح دستورالعمل‌ها
            </span>
            <span className="flex flex-row items-center text-black text-lg font-bold ">
              ۱۹۰
              <Image
                src="/static/icons/like.svg"
                alt="Certificate Icon"
                width={64}
                height={64}
                className="w-5 h-5 mx-2"
              />
            </span>
          </div>
          <div className="flex flex-row rounded border-2 border-slate-30 items-center pl-2 pr-4 py-1 mb-2">
            <span className="grow text-black text-lg font-medium">
              اطلاعات کامل و مفید
            </span>
            <span className="flex flex-row items-center text-black text-lg font-bold ">
              ۹۹۵
              <Image
                src="/static/icons/like.svg"
                alt="Certificate Icon"
                width={64}
                height={64}
                className="w-5 h-5 mx-2"
              />
            </span>
          </div>
        </div>
      </div> */}
    </section>
  );
}
