import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { WrapperOutlineText } from "./WrapperOutlineText";
import { documentTypeOptions } from "@/constant/teaching-in-kateb/documentOptions.constant";

interface DocumentRow {
  title: string;
  type: string;
  url: string;
}

interface FormData {
  education_histories: DocumentRow[];
}

export default function AcademicAffiliation({ type }: any) {
  const { control } = useFormContext<FormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education_histories",
  });

  return (
    <WrapperOutlineText
      titleBorder='سابقه تهیه محتوای متنی یا آموزش ویدئویی'
      className='mt-6 px-2 sm:mt-0 sm:px-6'
      type={type}
    >
      <Card className='border-none bg-transparent p-1 shadow-none md:p-4'>
        <CardContent className='p-1 pt-0 md:p-4'>
          {/* Header for Desktop */}
          <div className='my-4 hidden gap-4 rounded-xl bg-slate-100 p-4 text-center text-sm font-normal md:grid md:grid-cols-12'>
            <span className='col-span-1'>ردیف</span>
            <span className='col-span-3 truncate text-nowrap'>عنوان</span>
            <span className='col-span-3'>نوع سند</span>
            <span className='col-span-3'>لینک اطلاعات تکمیلی</span>
            <span className='col-span-2'>اقدامات</span>
          </div>

          {/* Dynamic Fields */}
          {fields.map((field, index) => (
            <div key={field.id}>
              <div className='grid gap-4 md:grid-cols-12 md:items-center md:text-center'>
                <div className='hidden md:col-span-1 md:block'>
                  <p>{index + 1}</p>
                </div>

                <div className='md:col-span-3'>
                  <Controller
                    name={`education_histories.${index}.title`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        className='mt-1 w-full rounded-md border bg-slate-100 p-2'
                        placeholder='عنوان سند را وارد کنید...'
                      />
                    )}
                  />
                </div>

                <div className='md:col-span-3'>
                  <Controller
                    name={`education_histories.${index}.type`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        dir='rtl'
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className='w-full bg-slate-100'>
                          <SelectValue
                            className='placeholder:text-muted-foreground'
                            placeholder='نوع سند...'
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {documentTypeOptions.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className='md:col-span-3'>
                  <Controller
                    name={`education_histories.${index}.url`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        className='mt-1 w-full rounded-md border bg-slate-100 p-2'
                        placeholder='لینک اطلاعات تکمیلی را وارد کنید...'
                      />
                    )}
                  />
                </div>

                <div className='md:col-span-2'>
                  <Button
                    variant='destructive'
                    onClick={() => remove(index)}
                    className='w-full rounded-3xl border border-red-500 bg-slate-50 px-8 text-sm text-red-500 hover:bg-red-200 md:w-24'
                  >
                    حذف
                  </Button>
                </div>
              </div>

              <Separator className='my-4' />
            </div>
          ))}

          {/* Add Button */}
          <div className='flex justify-end md:px-8'>
            <Button
              variant='outline'
              type='button'
              className='mt-4 w-full items-center rounded-3xl border border-dashed border-blue-400 bg-blue-100 p-4 text-sm text-blue-400 hover:bg-blue-200 hover:text-blue-500 md:w-24'
              onClick={() =>
                append({
                  title: "",
                  type: "",
                  url: "",
                })
              }
            >
              افزودن
            </Button>
          </div>
        </CardContent>
      </Card>
    </WrapperOutlineText>
  );
}
