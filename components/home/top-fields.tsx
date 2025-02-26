"use client";
import Link from "next/link";

// Component imports
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import TopClasses from "./top-classes";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Icon imports
import { Search } from "lucide-react";
import NoImageIcon from "@/static/icons/no-image.svg?url";
import RingImg from "@/static/images/global/ring.webp";

// Form imports
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

const FormSchema = yup.object({
  q: yup.string().optional(),
});

export default function TopFields() {
  const router = useRouter();

  const form = useForm<yup.InferType<typeof FormSchema>>({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      q: "",
    },
  });

  const onSubmit = (data: yup.InferType<typeof FormSchema>) => {
    router.push(
      `/category?section=field_introducer&sort=most_liked&q=${data.q}`
    );
  };

  return (
    <>
      {/* Top Fields */}
      <div className='hidden w-full items-center justify-center md:flex'>
        <div className='mb-2 flex justify-between px-2 sm:mt-5 sm:w-4/5'>
          <h1 className='hidden text-2xl font-bold text-amber-400 md:flex lg:text-4xl'>
            معرفی رشته
          </h1>
          <div className='flex items-center gap-2 md:w-1/2'>
            <Link
              href={"/category?section=field_introducer&sort=most_liked"}
              className='flex items-center'
            >
              <Button className='text-md md:text-md whitespace-nowrap bg-blue-500 font-medium lg:text-lg'>
                مشاهده تمام رشته ها
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
                          <Input placeholder='جستجو عنوان رشته...' {...field} />
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
      {/* Desktop top fields */}
      <TopClasses
        className='hidden md:flex'
        mobileView={false}
        section='field_introducer'
        placeholderSrc={NoImageIcon}
      />

      {/* Mobile top fields */}
      <TopClasses
        subtitle='معرفی رشته'
        imageSrc={RingImg}
        placeholderSrc={NoImageIcon}
        className='flex md:hidden'
        mobileView={true}
        section='field_introducer'
      />
    </>
  );
}
