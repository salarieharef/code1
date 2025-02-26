"use client";
import { useSession } from "next-auth/react";

// Component imports
import { Separator } from "../ui/separator";
import TopUniversityUnits from "./TopUniversityUnits";
import TopClasses from "./top-classes";
import TopTeachers from "./top-teachers";

// Icon imports
import NoImageIcon from "@/static/icons/no-image.svg?url";
import TopTeacherImg from "@/static/images/global/teachers.webp";
import UniversityImg from "@/static/images/global/university.webp";

import TopCategories from "./top-categories";
import TopFields from "./top-fields";

export default function TopContent() {
  const { data: session }: any = useSession();

  return (
    <div
      className={`w-full bg-slate-50 pt-3 md:bg-gradient-to-b md:from-blue-600 md:to-blue-900 dark:md:from-blue-900 dark:md:to-blue-950 ${!session?.user ? "md:pt-20 lg:pt-44" : null} mb-1 pb-1 md:mb-0 md:pb-28`}
    >
      {/* Top categories */}
      <TopCategories />

      <div className='hidden px-4 md:flex md:px-28 lg:px-28 '>
        <Separator className='mx-auto bg-white ' />
      </div>

      {/* Top Classes */}
      {/* <div className='flex w-full items-center justify-center'>
        <div className='mx-2 mb-2 mt-12 flex justify-between px-2 py-2 sm:w-3/4'>
          <h1 className='md:text-1xl hidden text-lg font-bold text-slate-700 md:flex md:text-amber-400 lg:text-4xl'>
            دروس برتر کاتب
          </h1>
          <Link
            href={"/category?sort=most_score"}
            className='flex items-center'
          >
            <span className='text-md md:text-md font-medium text-white lg:text-lg'>
              مشاهده همه
            </span>
          </Link>
        </div>
      </div> */}
      {/* Desktop top classes */}
      <TopClasses
        placeholderSrc={NoImageIcon}
        className='hidden md:flex'
        mobileView={false}
        subtitle='دروس برتر'
        title='دانشـــــــــگاهی'
        titleSection={"دروس برتر کاتب"}
        linkSection={"/category?sort=most_score"}
        linkText={"مشاهده همه"}
      />

      {/* Mobile top classes */}
      <TopClasses
        subtitle='دروس برتر'
        title='دانشـــــــــگاهی'
        imageSrc={UniversityImg}
        placeholderSrc={NoImageIcon}
        className='mt-3 flex md:hidden'
        section='university'
        mobileView={true}
      />
      {/* <TopClasses
        subtitle="دروس برتر"
        title="مدرســـــــــــــــه"
        imageSrc="/static/images/global/school.webp"
        className="flex md:hidden mt-3"
        section="school"
      />
      <TopClasses
        subtitle="دروس برتر"
        title="مهـــــــــــــــارتی"
        imageSrc="/static/images/global/skill.webp"
        className="flex md:hidden mt-3"
        section="skill"
      /> */}

      {/* Top Teachers */}
      <div className='hidden px-6 md:flex md:px-24'>
        <Separator className='my-4 flex bg-white' />
      </div>

      {/* Desktop top classes */}
      <TopTeachers
        placeholderSrc={NoImageIcon}
        className='hidden md:flex'
        mobileView={false}
        subtitle='دروس برتر'
        title='دانشـــــــــگاهی'
        titleSection='اساتید برتر کاتب'
        linkSection='/category?type=teachers&sort=teacher_most_score'
        linkText='مشاهده همه'
      />

      {/* Mobile top classes */}
      <TopTeachers
        imageSrc={TopTeacherImg}
        placeholderSrc={NoImageIcon}
        subtitle='اساتید برتر'
        title='کـــــــــاتب'
        className='mt-3 flex md:hidden'
        section='teachers'
        mobileView={true}
      />

      <div className='hidden px-6 md:flex md:px-24'>
        <Separator className='my-4 flex bg-white' />
      </div>

      <TopUniversityUnits />

      <div className='hidden px-6 md:flex md:px-24'>
        <Separator className='my-4 flex bg-white' />
      </div>

      <TopFields />
    </div>
  );
}
