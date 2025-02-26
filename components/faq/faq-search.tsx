"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Type Imports
import { faqSearchSchema } from "@/utils/validations/faq.validations";

const FaqSearch = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const form = useForm({
    resolver: yupResolver(faqSearchSchema),
    defaultValues: {
      query: searchParams.get("query") || "",
    },
  });

  function onSubmit(values: yup.InferType<typeof faqSearchSchema>) {
    const params = new URLSearchParams(searchParams);
    if (values.query) {
      params.set("query", values.query);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className='px-4 md:px-0 md:max-w-sm'>
      <div className='flex flex-col gap-1.5'>
        <div className='text-2xl md:text-3xl font-semibold text-white'>
          به دنبال چه پرسشی هستید؟
        </div>
        <div className='text-xs md:text-sm text-white'>
          پرسش موردنظرتان را جستجو کرده یا از دسته‌بندی زیر انتخاب کنید
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex'>
            <FormField
              control={form.control}
              name='query'
              render={({ field }) => (
                <FormItem className='flex-grow'>
                  <FormControl>
                    <Input
                      {...field}
                      className='rounded-l-none border-l-0'
                      placeholder='جستجو...'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='h-10 w-12 bg-white rounded-r-none border border-r-0 hover:bg-accent'
            >
              <Search className='size-5 stroke-[1.5] text-slate-500' />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default FaqSearch;
