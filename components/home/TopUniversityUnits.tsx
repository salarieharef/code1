"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Component imports
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import TopUniversities from "./top-universities";
import { Separator } from "../ui/separator";

// Form imports
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// Icon imports
import { Search } from "lucide-react";
import NoImageIcon from "@/static/icons/no-image.svg?url";
import GradeOneImg from "@/static/images/global/grade-1.webp";

const FormSchema = yup.object({
  q: yup.string().optional(),
});

export default function TopUniversityUnits() {
  const router = useRouter();

  const form = useForm<yup.InferType<typeof FormSchema>>({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      q: "",
    },
  });

  const onSubmit = (data: yup.InferType<typeof FormSchema>) => {
    router.push(`/universities?q=${data.q}`);
  };

  return (
    <div className={`w-full pb-4 md:pb-8`}>
      {/* Top Classes */}
      <div className='hidden w-full items-center justify-center md:flex'>
        <div className='mb-2 flex justify-between px-2 sm:mt-5 sm:w-4/5'>
          <h1 className='md:text-1xl hidden text-lg font-bold text-slate-700 md:flex md:text-amber-400 lg:text-4xl'>
            معرفی واحد ها
          </h1>
          <div className='flex items-center gap-2 md:w-1/2'>
            <Link href={"/universities"} className='flex items-center'>
              <Button className='text-md md:text-md whitespace-nowrap bg-blue-500 font-medium lg:text-lg'>
                مشاهده تمام واحد ها
              </Button>
            </Link>

            <div className='relative w-full'>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name='q'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder='جستجو عنوان واحد...' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>

              <div className='absolute left-0 top-0 z-10 flex h-full items-center justify-center gap-2 px-2'>
                <Separator
                  orientation='vertical'
                  className='h-6 bg-slate-300'
                />
                <Search className='stroke-1.5' />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Desktop top classes */}
      <TopUniversities
        placeholderSrc={NoImageIcon}
        className='hidden md:flex'
        mobileView={false}
      />

      {/* Mobile top classes */}
      <TopUniversities
        subtitle='واحد‌های'
        title='دانشـــــــــگاهی'
        imageSrc={GradeOneImg}
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
    </div>
  );
}
