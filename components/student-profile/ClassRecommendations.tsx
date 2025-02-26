// Component  imports
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronDown, MenuIcon } from "lucide-react";
import Link from "next/link";
import { ClassCard } from "./class-card";
import ClassImg from "@/static/images/global/class.webp";

export default function ClassRecommendations({ classData }: any) {
  return (
    <>
      <section className='mt-4'>
        <h2 className='text-2xl font-black text-blue-900'>
          دروس در حال یادگیری
        </h2>
        <div className='mt-6 grid w-full grid-cols-3-auto justify-between gap-4'>
          <Link className='w-fit' href={`class/1`}>
            <ClassCard
              image={ClassImg}
              title='ریاضی فیزیک ۳'
              teacher='وحید مرمری'
              duration={"۱ ساعت و ۲۰ دقیقه"}
              studentCount={`${2100} دانش آموز`}
            />
          </Link>
          <Link className='w-fit' href={`class/1`}>
            <ClassCard
              image={ClassImg}
              title='ریاضی فیزیک ۳'
              teacher='وحید مرمری'
              duration={"۱ ساعت و ۲۰ دقیقه"}
              studentCount={`${2100} دانش آموز`}
            />
          </Link>
          <Link className='w-fit' href={`class/1`}>
            <ClassCard
              image={ClassImg}
              title='ریاضی فیزیک ۳'
              teacher='وحید مرمری'
              duration={"۱ ساعت و ۲۰ دقیقه"}
              studentCount={`${2100} دانش آموز`}
            />
          </Link>
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
      <section className='mb-8 mt-4'>
        <h2 className='text-2xl font-black text-blue-900'>
          دروس به اتمام رسیده
        </h2>
        <div className='mt-6 grid grid-cols-3-auto justify-between gap-4'>
          <Link className='w-fit' href={`class/1`}>
            <ClassCard
              image={ClassImg}
              title='ریاضی فیزیک ۳'
              teacher='وحید مرمری'
              duration={"۱ ساعت و ۲۰ دقیقه"}
              studentCount={`${2100} دانش آموز`}
            />
          </Link>
          <Link className='w-fit' href={`class/1`}>
            <ClassCard
              image={ClassImg}
              title='ریاضی فیزیک ۳'
              teacher='وحید مرمری'
              duration={"۱ ساعت و ۲۰ دقیقه"}
              studentCount={`${2100} دانش آموز`}
            />
          </Link>
          <Link className='w-fit' href={`class/1`}>
            <ClassCard
              image={ClassImg}
              title='ریاضی فیزیک ۳'
              teacher='وحید مرمری'
              duration={"۱ ساعت و ۲۰ دقیقه"}
              studentCount={`${2100} دانش آموز`}
            />
          </Link>
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
    </>
  );
}
