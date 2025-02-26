import Image from "next/image";
import Link from "next/link";

// Component imports
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, BookA, Bookmark, GraduationCap, Heart } from "lucide-react";
// import LikeSvg from "../svg-icons/LikeSvg";
// import Level2Svg from "../svg-icons/Level2Svg";
// import CertificateSvg from "../svg-icons/CertificateSvg";
// import GraduateSvg from "../svg-icons/GraduateSvg";
import { Button } from "@/components/ui/button";

export function ClassSpecialCard({
  image,
  title,
  teacher,
  teacherImage,
  duration,
  studentCount,
}: any) {
  return (
    <Link href='/class' className='w-full p-2'>
      <Card className='h-64 w-full overflow-hidden rounded-lg bg-white shadow-md xl:h-72'>
        <CardContent className='flex h-full flex-row p-0'>
          <div className='relative basis-4/12 xl:basis-5/12'>
            {image && (
              <Image src={image} alt={title} fill className='object-cover' />
            )}
          </div>
          <div className='flex basis-8/12 flex-col xl:basis-7/12'>
            <div className='flex basis-2/3 flex-col justify-center gap-2 bg-blue-800 px-2 py-4 xl:basis-3/4 2xl:px-8'>
              <h1 className='text-[1.75rem] font-bold text-amber-400 lg:text-[2rem] xl:text-[3rem]'>
                {title}
              </h1>
              <div className='flex w-fit flex-col gap-2 rounded-xl border-2 border-white px-2 pb-1.5 pt-2 text-xs font-bold text-white md:flex-row 2xl:text-base'>
                <span className='flex flex-row flex-nowrap'>
                  <span className='mx-1 flex flex-nowrap items-center whitespace-nowrap text-right 2xl:mx-2'>
                    {/* <CertificateSvg className="fill-amber-400 w-5 h-5 ml-2" /> */}
                    <BookA className='ml-0 h-5 w-5 text-amber-400 2xl:ml-2' />
                    <span>دکترای ریاضی محض</span>
                  </span>
                  <span className='mx-1 flex flex-nowrap items-center whitespace-nowrap text-right 2xl:mx-2'>
                    {/* <GraduateSvg className="fill-amber-400 w-6 h-6 ml-2" /> */}
                    <GraduationCap className='ml-0 h-5 w-5 text-amber-400 2xl:ml-2' />
                    <span>۵۸ کاربر</span>
                  </span>
                </span>
                <span className='flex flex-row flex-nowrap'>
                  <span className='mx-1 flex flex-nowrap items-center whitespace-nowrap text-right 2xl:mx-2'>
                    {/* <LikeSvg className="fill-amber-400 w-5 h-5 ml-2" /> */}
                    <Heart className='ml-0 h-5 w-5 text-amber-400 2xl:ml-2' />
                    <span>۵.۵ از ۵۵ رأی</span>
                  </span>
                  <span className='mx-1 flex flex-nowrap items-center whitespace-nowrap text-right 2xl:mx-2'>
                    {/* <Level2Svg className="fill-amber-400 w-5 h-5 ml-2" /> */}
                    <BarChart className='ml-0 h-5 w-5 text-amber-400 2xl:ml-2' />
                    <span>سطح حرفه ای</span>
                  </span>
                </span>
              </div>
            </div>
            <div className='flex basis-1/3 flex-row xl:basis-1/4'>
              <div className='mt-2 flex h-16 w-full flex-row items-center justify-between md:mt-0 md:hidden'>
                <div className='flex flex-row items-center justify-center'>
                  <div>
                    {teacherImage && image && (
                      <Image
                        src={teacherImage}
                        alt={teacher}
                        className='relative mr-2 h-16 w-16 rounded-full border-b-4 border-orange-300 object-cover md:-top-6 md:mr-6 md:h-20 md:w-20'
                        width={64}
                        height={64}
                      />
                    )}
                  </div>
                  <div className='flex grow flex-row items-center justify-between gap-2 px-2 md:flex-row'>
                    <div className='flex flex-col'>
                      <h3 className='whitespace-nowrap text-lg font-black text-slate-700 md:text-xl'>
                        {teacher}
                      </h3>
                      {/* <div className="flex items-center text-right text-slate-700 text-lg font-bold">
                        <Image
                          src="/static/icons/graduate.svg"
                          alt="Graduate Icon"
                          width={64}
                          height={64}
                          className="w-5 h-5 ml-2"
                        />
                        <span className="">۵۸ کاربر</span>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className='flex h-full items-center justify-end pl-2 md:px-6'>
                  <Button className='md-text-sm h-8 bg-blue-400 pl-2 pr-1 text-xs text-white md:pl-4 md:pr-3'>
                    <Bookmark />
                    ذخیره کن
                  </Button>
                </div>
              </div>
              <div className='hidden w-full flex-row justify-between md:flex'>
                <div className='flex flex-row'>
                  {teacherImage && image && (
                    <Image
                      src={teacherImage}
                      alt={teacher}
                      className='relative top-2 mr-2 h-16 w-16 rounded-full border-b-4 border-orange-300 object-cover md:-top-6 md:mr-6 md:h-20 md:w-20'
                      width={64}
                      height={64}
                    />
                  )}
                  <div className='grow px-2'>
                    <h3 className='whitespace-nowrap text-lg font-black text-slate-700 md:text-xl'>
                      <span className='ml-1'>مدرس:</span>
                      {teacher}
                    </h3>
                    {/* <div className="flex items-center text-right text-slate-700 text-lg font-bold">
                    <Image
                      src="/static/icons/graduate.svg"
                      alt="Graduate Icon"
                      width={64}
                      height={64}
                      className="w-5 h-5 ml-2"
                    />
                    <span className="">۵۸ کاربر</span>
                  </div> */}
                  </div>
                </div>
                <div className='flex items-end px-6 py-4'>
                  <Button className='h-8 bg-blue-400 pl-4 pr-3 text-white'>
                    <Bookmark />
                    ذخیره کن
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
