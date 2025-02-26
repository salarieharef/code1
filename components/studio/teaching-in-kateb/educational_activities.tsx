import React from "react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { WrapperOutlineText } from "./WrapperOutlineText";

interface RowData {
  organization: string;
  position: string;
}

interface FormData {
  education_activities: RowData[];
}

export default function EducationalActivities({
  loading,
  setLoading,
  type,
}: {
  loading?: boolean;
  setLoading?: (loading: boolean) => void;
  type?: string;
}) {
  const { control } = useFormContext<FormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education_activities",
  });

  const handleDelete = (index: number) => {
    remove(index);
  };

  return (
    <WrapperOutlineText
      titleBorder='فعالیت علمی، پژوهشی، مهارتی و ...'
      className='mt-6 px-2 sm:mt-0 sm:px-6'
      type={type}
    >
      <Card className='border-none bg-transparent p-1 shadow-none md:p-4'>
        {/* Header for Desktop */}
        <div className='hidden gap-4 rounded-xl bg-slate-150 p-4 text-center text-sm font-normal md:grid md:grid-cols-12 '>
          <span className='col-span-1'>ردیف</span>
          <span className='col-span-5 truncate text-nowrap'>
            نام سازمان، دانشگاه، شرکت صنعتی، فناوری و خصوصی
          </span>
          <span className='col-span-4'>موقعیت و نوع همکاری</span>
          <span className='col-span-2'>اقدامات</span>
        </div>

        {/* Table Education_activities */}
        <CardContent className='p-1 pt-0 md:p-4'>
          {fields.map((field, index) => (
            <div key={field.id}>
              {/* Layout for Desktop */}
              <div className='my-4 hidden grid-cols-12 items-center gap-4 text-center md:grid'>
                <div className='col-span-1'>
                  <p>{index + 1}</p>
                </div>
                <div className='col-span-5'>
                  <Controller
                    name={`education_activities.${index}.organization`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        className='mt-1 w-full rounded-md border bg-slate-150 p-2'
                        placeholder='نام سازمان را وارد کنید'
                      />
                    )}
                  />
                </div>
                <div className='col-span-4'>
                  <Controller
                    name={`education_activities.${index}.position`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        className='mt-1 w-full rounded-md border bg-slate-150 p-2'
                        placeholder='موقعیت و نوع همکاری را وارد کنید'
                      />
                    )}
                  />
                </div>
                <div className='col-span-2'>
                  <Button
                    variant='destructive'
                    onClick={() => handleDelete(index)}
                    disabled={loading}
                    className='w-24 rounded-3xl border border-red-500 bg-slate-50 px-8 text-sm text-red-500 hover:bg-red-200'
                  >
                    حذف
                  </Button>
                </div>
              </div>

              {/* Layout for Mobile */}
              <div className='grid grid-cols-1 gap-4 md:hidden'>
                <div>
                  <label className='block py-1 text-sm font-medium text-slate-700'>
                    نام سازمان، دانشگاه، شرکت صنعتی، فناوری و خصوصی:
                  </label>
                  <Controller
                    name={`education_activities.${index}.organization`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        className='mt-1 w-full rounded-md border bg-slate-150 p-2'
                        placeholder='نام سازمان را وارد کنید'
                      />
                    )}
                  />
                </div>
                <div>
                  <label className='block py-1 text-sm font-medium text-slate-700'>
                    موقعیت و نوع همکاری:
                  </label>
                  <Controller
                    name={`education_activities.${index}.position`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        className='mt-1 w-full rounded-md border bg-slate-150 p-2'
                        placeholder='موقعیت و نوع همکاری را وارد کنید'
                      />
                    )}
                  />
                </div>
                <Button
                  variant='destructive'
                  onClick={() => handleDelete(index)}
                  disabled={loading}
                  className='w-full rounded-3xl border border-red-500 bg-slate-50 text-sm text-red-500 hover:bg-red-200 md:w-24'
                >
                  حذف
                </Button>
              </div>

              <Separator orientation='horizontal' className='my-4' />
            </div>
          ))}

          {/* Add Button */}
          <div className='flex justify-end md:px-8'>
            <Button
              className='mt-4 w-full items-center rounded-3xl border border-dashed border-blue-400 bg-blue-100 p-4 text-sm text-blue-400 hover:bg-blue-200 hover:text-blue-500 md:w-24'
              variant='outline'
              type='button'
              onClick={() => append({ organization: "", position: "" })}
            >
              افزودن
            </Button>
          </div>
        </CardContent>
      </Card>
    </WrapperOutlineText>
  );
}
