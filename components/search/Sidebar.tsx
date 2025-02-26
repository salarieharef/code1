"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { homeRoutes } from "@/utils/api/routes/home.routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { Filter, GalleryVerticalEnd, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import ClassesFilter from "./search-filter";
import teacherIconCategories from "@/static/icons/categories-teachers.svg";
import categoriesPriseIcon from "@/static/icons/categories-price.svg?url";

export default function Sidebar({ className }: any) {
  const [isOpen, setIsOpen] = useState(false);
  // const { data: teachers } = useSWR(
  // 	homeRoutes.teachers?.url,
  // 	(url) => apiFetcher(url, homeRoutes.teachers?.method),
  // 	{
  // 		revalidateOnFocus: false,
  // 	}
  // );
  const { data: teachers } = useSWR(
    homeRoutes.teachers?.url,
    (url) =>
      nextFetcher({
        url,
        method: homeRoutes.teachers?.method,
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className='justify-right align-center flex flex-row flex-wrap items-center gap-2 lg:hidden'>
        <Button
          onClick={toggleMenu}
          variant='link'
          className='relative z-50 flex h-fit w-fit flex-row gap-2 border-1 border-blue-400 bg-transparent py-1 pl-4 pr-3 text-lg font-medium text-blue-400 lg:hidden lg:text-xl'
        >
          <Filter className='h-6 w-6' />
          فیلتر
        </Button>

        <ClassesFilter className='w-full items-center gap-6 lg:hidden' />
      </div>
      <aside
        className={`fixed inset-y-0 right-0 z-50 min-w-full transform overflow-y-auto overflow-x-hidden rounded-2xl border border-slate-400 bg-white py-4 transition-transform duration-300 lg:relative lg:z-auto lg:min-w-[18rem] lg:translate-x-0 xl:min-w-[18rem] 2xl:min-w-[24rem] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } ${className}`}
      >
        <Button
          onClick={toggleMenu}
          className='relative right-4 top-4 z-50 mb-12 flex h-fit w-fit flex-row gap-2 border-1 border-blue-400 bg-transparent px-2 py-2 text-3xl text-blue-400 lg:hidden'
        >
          <X className='h-10 w-10' />
        </Button>
        <Accordion type='single' collapsible className='mt-4'>
          <AccordionItem
            value='categories-main'
            className='p-y-0 my-2 overflow-hidden pl-6 pr-7'
          >
            <AccordionTrigger className='flex justify-between border-0 bg-transparent text-blue-400 hover:no-underline'>
              <span className='flex flex-row items-center text-lg font-bold text-blue-900 xl:text-xl 2xl:text-2xl'>
                <GalleryVerticalEnd className='ml-2 mt-2 h-5 w-5 text-blue-400' />
                براساس سطح
              </span>
            </AccordionTrigger>
            <AccordionContent className='p-0 pr-1'>
              <RadioGroup dir='rtl' defaultValue=''>
                <div className='flex w-full flex-row items-center'>
                  <RadioGroupItem
                    className='h-[18px] w-[18px]'
                    value=''
                    id='search-level-all'
                  />
                  <label
                    htmlFor='search-level-all'
                    className='mr-2 text-sm font-bold text-slate-800 2xl:text-base'
                  >
                    همه
                  </label>
                </div>
                <Separator
                  orientation='horizontal'
                  className='mb-3 ml-4 mr-6 mt-2 h-[1px] bg-slate-300'
                />
                <div className='flex w-full flex-row items-center'>
                  <RadioGroupItem
                    className='h-[18px] w-[18px]'
                    value='beginner'
                    id='search-level-beginner'
                  />
                  <label
                    htmlFor='search-level-beginner'
                    className='mr-2 text-sm font-bold text-slate-800 2xl:text-base'
                  >
                    مبتدی
                  </label>
                </div>
                <Separator
                  orientation='horizontal'
                  className='mb-3 ml-4 mr-6 mt-2 h-[1px] bg-slate-300'
                />
                <div className='flex w-full flex-row items-center'>
                  <RadioGroupItem
                    className='h-[18px] w-[18px]'
                    value='medium'
                    id='search-level-medium'
                  />
                  <label
                    htmlFor='search-level-medium'
                    className='mr-2 text-sm font-bold text-slate-800 2xl:text-base'
                  >
                    متوسط
                  </label>
                </div>
                <Separator
                  orientation='horizontal'
                  className='mb-3 ml-4 mr-6 mt-2 h-[1px] bg-slate-300'
                />
                <div className='flex w-full flex-row items-center'>
                  <RadioGroupItem
                    className='h-[18px] w-[18px]'
                    value='intermediate'
                    id='search-level-intermediate'
                  />
                  <label
                    htmlFor='search-level-intermediate'
                    className='mr-2 text-sm font-bold text-slate-800 2xl:text-base'
                  >
                    پیشرفته
                  </label>
                </div>
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value='categories-teachers'
            className='p-y-0 my-2 overflow-hidden pl-6 pr-7'
          >
            <AccordionTrigger className='flex justify-between border-0 bg-transparent text-blue-400 hover:no-underline'>
              <span className='flex flex-row text-lg font-bold text-blue-900 xl:text-xl 2xl:text-2xl'>
                <Image
                  src={teacherIconCategories}
                  alt='Certificate Icon'
                  width={64}
                  height={64}
                  className='ml-2 mt-2 h-5 w-5'
                />
                براساس نام مدرس
              </span>
            </AccordionTrigger>
            <AccordionContent className='p-0 pb-2 pr-1'>
              {teachers?.data?.map((teacher: any, index: number) => (
                <>
                  <div
                    key={`search-sidebar-teacher-${index}`}
                    className='flex flex-row items-center'
                  >
                    <Checkbox
                      id={`search-sidebar-teacher-${index}`}
                      className='h-[18px] w-[18px]'
                    />
                    <label
                      htmlFor={`search-sidebar-teacher-${index}`}
                      className='mr-2 text-sm font-bold text-slate-800 xl:text-base 2xl:text-lg'
                    >
                      {teacher.name}
                    </label>
                  </div>
                  <Separator
                    orientation='horizontal'
                    className='mb-3 ml-4 mr-6 mt-2 h-[1px] bg-slate-300 last:hidden'
                  />
                </>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value='categories-price'
            className='p-y-0 my-2 overflow-hidden border-b-0 pl-6 pr-7'
          >
            <AccordionTrigger className='flex justify-between border-0 bg-transparent text-blue-400 hover:no-underline'>
              <span className='flex flex-row text-lg font-bold text-blue-900 xl:text-xl 2xl:text-2xl'>
                <Image
                  src={categoriesPriseIcon}
                  alt='Certificate Icon'
                  width={64}
                  height={64}
                  className='ml-2 mt-2 h-5 w-5'
                />
                رایگان / غیررایگان
              </span>
            </AccordionTrigger>
            <AccordionContent className='p-0 pr-1'>
              <div className='flex flex-row items-center'>
                <Checkbox id='category-1' className='h-[18px] w-[18px]' />
                <label
                  htmlFor='category-1'
                  className='mr-2 text-sm font-bold text-slate-800 xl:text-base 2xl:text-lg'
                >
                  رایگان
                </label>
              </div>
              <Separator
                orientation='horizontal'
                className='mb-3 ml-4 mr-6 mt-2 h-[1px] bg-slate-300'
              />
              <div className='flex flex-row items-center'>
                <Checkbox id='category-1' className='h-[18px] w-[18px]' />
                <label
                  htmlFor='category-1'
                  className='mr-2 text-sm font-bold text-slate-800 xl:text-base 2xl:text-lg'
                >
                  غیر رایگان
                </label>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </aside>
    </>
  );
}
