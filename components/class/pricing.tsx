"use client";

// Component imports
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";

// Fetch imports

// Hook imports
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

// Util imports

// Icon imports
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, ShoppingBag } from "lucide-react";

// Authentication import
import { useCart } from "@/context/CartProvider";
import { formatWithSeparator } from "@/utils/persian-tools/tools-function";

// Define the validation schema
export const priceValidation = yup
  .object({
    price: yup.string(),
  })
  .required();

export type priceValidationType = yup.InferType<typeof priceValidation>;

export default function Price({ details }: any) {
  const { toast } = useToast();
  const { addToCart } = useCart();

  const form = useForm<priceValidationType>({
    resolver: yupResolver(priceValidation),
    defaultValues: {
      price: "normal",
    },
  });

  const handleAddToCart: SubmitHandler<priceValidationType> = async (data) => {
    let selectedPrice = 0;

    if (data.price === "normal") {
      selectedPrice = details?.price;
    } else if (data.price === "silver") {
      selectedPrice = details?.price2;
    } else if (data.price === "gold") {
      selectedPrice = details?.price3;
    }

    const cartItemToLocalStorage = {
      id: details?.id,
      mode: data?.price,
      price: selectedPrice,
      mode_id: data.price === "normal" ? 1 : data.price === "silver" ? 2 : 3,
      mode_title: data.price,
      course: {
        id: details?.id,
        name: details?.name,
        image: details?.image,
        price: details?.price,
        price2: details?.price2,
        price3: details?.price3,
      },
      lesson_details: {
        lessons_time: details?.lesson_details?.lessons_time,
      },
      teacher: {
        name: details?.teacher?.name,
      },
    };

    const cartItemToServer = {
      course_id: details?.id,
      mode: data?.price,
    };

    await addToCart(cartItemToServer, cartItemToLocalStorage);
  };

  return (
    <Form {...form}>
      <form
        className='mt-2 flex items-start gap-x-2 rounded-xl bg-white p-4 sm:flex-col sm:justify-end sm:gap-y-4 sm:px-10 sm:py-6 md:items-end'
        onSubmit={form.handleSubmit(handleAddToCart)}
      >
        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem className='-mt-2 w-full'>
              <FormControl className='w-full'>
                <>
                  <RadioGroup
                    defaultValue={field.value}
                    dir='rtl'
                    className='hidden flex-col gap-y-4 sm:flex'
                    {...field}
                    onValueChange={field.onChange}
                  >
                    {details?.price ? (
                      <Label
                        htmlFor='normal'
                        className='flex cursor-pointer items-center justify-between rounded-lg'
                      >
                        <div className='flex items-center gap-2'>
                          <RadioGroupItem value='normal' id='normal' />
                          <div className='flex items-center gap-2'>
                            <h4 className='text-lg font-medium'>
                              پکیج معمولی{" "}
                            </h4>
                            <span className='text-accent-foreground'>
                              شامل ویدیو تمام دروس
                            </span>
                          </div>
                        </div>

                        <p className='font-bold text-primary md:text-lg'>
                          {formatWithSeparator(details?.price)} تومان
                        </p>
                      </Label>
                    ) : null}

                    {details?.price2 ? (
                      <Label
                        htmlFor='silver'
                        className='flex cursor-pointer items-center justify-between rounded-lg'
                      >
                        <div className='items=center flex gap-2'>
                          <RadioGroupItem value='silver' id='silver' />
                          <div>
                            <h4>
                              <span className='text-lg font-medium'>
                                پکیج نقره ای{" "}
                              </span>
                              <span className='text-accent-foreground'>
                                شامل ویدیو تمام دروس و مقاله های مورد نیاز
                              </span>
                            </h4>
                          </div>
                        </div>
                        <p className='font-bold text-primary md:text-lg'>
                          {formatWithSeparator(details?.price2)} تومان
                        </p>
                      </Label>
                    ) : null}

                    {details?.price3 ? (
                      <Label
                        htmlFor='gold'
                        className='flex cursor-pointer items-center justify-between rounded-lg'
                      >
                        <div className='items=center flex gap-2'>
                          <RadioGroupItem value='gold' id='gold' />
                          <div>
                            <h4>
                              <span className='text-lg font-medium'>
                                پکیج طلایی{" "}
                              </span>
                              <span className='text-accent-foreground'>
                                شامل ویدیو تمام دروس و مقاله های مورد نیاز و
                                کتاب های مربوطه به صورت PDF
                              </span>
                            </h4>
                          </div>
                        </div>
                        <p className='font-bold text-primary md:text-lg'>
                          {formatWithSeparator(details?.price3)} تومان
                        </p>
                      </Label>
                    ) : null}
                  </RadioGroup>

                  <Select
                    dir='rtl'
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id='framework'
                      className='-mt-4 focus:ring-0 focus:ring-offset-0 sm:hidden'
                    >
                      <SelectValue placeholder='Select' />
                    </SelectTrigger>
                    <SelectContent className='w-full'>
                      {details?.price ? (
                        <SelectItem value='normal' className='w-full'>
                          <div className='flex w-full items-center justify-between gap-2'>
                            <div className='flex flex-col'>
                              <span>پکیج معمولی</span>
                              <span className='text-xs'>ویدیو تمام دروس</span>
                            </div>
                            <span className='text-blue-500'>
                              {formatWithSeparator(details?.price)} تومان
                            </span>
                          </div>
                        </SelectItem>
                      ) : null}

                      {details?.price2 ? (
                        <SelectItem value='silver' className='w-full'>
                          <div className='items=center flex w-full justify-between gap-2'>
                            <div className='flex flex-col'>
                              <span>پکیج نقره ای</span>
                              <span className='text-xs'>
                                شامل ویدیو تمام دروس و مقاله های مورد نیاز
                              </span>
                            </div>
                            <span className='text-blue-500'>
                              {formatWithSeparator(details?.price2)} تومان
                            </span>
                          </div>
                        </SelectItem>
                      ) : null}

                      {details?.price3 ? (
                        <SelectItem value='gold' className='w-full'>
                          <div className='items=center flex w-full justify-between gap-2'>
                            <div className='flex flex-col'>
                              <span>پکیج طلایی</span>
                              <span className='text-xs'>
                                شامل ویدیو تمام دروس و مقاله های مورد نیاز و
                                کتاب های مربوطه به صورت PDF
                              </span>
                            </div>
                            <span className='text-blue-500'>
                              {formatWithSeparator(details?.price3)} تومان
                            </span>
                          </div>
                        </SelectItem>
                      ) : null}
                    </SelectContent>
                  </Select>
                </>
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />

        <div>
          <Button
            className='h-10 w-10 bg-blue-400 p-0 text-lg text-white hover:bg-blue-500 sm:h-auto sm:w-auto sm:px-14 sm:py-3'
            size='sm'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className='mx-2 animate-spin' />
            ) : (
              <ShoppingBag className='sm:hidden' />
            )}
            <span className='hidden sm:block'>اضافه کردن به سبد خرید</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
