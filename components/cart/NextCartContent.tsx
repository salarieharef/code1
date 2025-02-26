"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartProvider";
import { cn } from "@/utils/cn";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import ResponsiveImage from "../responsive-image/ResponsiveImage";
import SkeletonYourCartContent from "./SkeletonYourCartContent";
import NoImageIcon from "@/static/icons/no-image.svg?url";

const NextCartContent: React.FC = () => {
  const {
    nextCartItems,
    deleteCart,
    addToCart,
    deleteNextCartItem,
    loading,
  }: any = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const searchParams = useSearchParams();

  if (loading && session) return <SkeletonYourCartContent />;
  const handleAddToCart = async (item: any) => {
    const cartItemToLocalStorage = {
      id: item?.course?.id,
      price: item.price,
      quantity: 1,
      course: {
        id: item?.course?.id,
        name: item?.course?.name,
        image: item?.course?.image,
      },
      lesson_details: {
        lessons_time: item?.lesson_details?.lessons_time,
      },
      teacher: {
        name: item?.teacher?.name,
      },
    };

    const cartItemToServer = {
      course_id: item?.course?.id,
      mode: item?.mode,
    };

    await addToCart(cartItemToServer, cartItemToLocalStorage);
    await deleteNextCartItem(item?.course?.id);
    // router.push("/cart?tab=your-cart");
  };
  return (
    <div>
      {nextCartItems.length === 0 ? (
        <p className='pt-6 text-center'>سبد خرید بعدی شما خالی است.</p>
      ) : (
        <div className='mt-4 flex flex-col space-y-4'>
          {nextCartItems.map((item: any) => (
            <div key={item.id} className='rounded-lg p-4 ring-1 ring-slate-300'>
              <div className='flex flex-col items-start justify-between md:flex-row md:items-center'>
                <div className='flex w-full justify-start gap-2 md:w-1/2'>
                  <ResponsiveImage
                    src={item?.course?.image || NoImageIcon}
                    alt={item?.course?.name}
                    imageClassName='aspect-[5/4] w-full rounded-2xl object-cover md:aspect-square'
                    containerClassName='aspect-[5/4] w-full h-full max-w-28 md:aspect-square'
                  />
                  <div className='flex flex-col justify-center space-y-2'>
                    <p className='text-md text-slate-900'>
                      {item?.course?.name}
                    </p>
                    <div className='flex justify-start text-sm text-slate-500'>
                      <p>مدرس: </p>
                      <p>{item?.teacher?.name}</p>
                    </div>
                    <p className='mt-2 text-xs text-slate-500'>
                      {item?.lesson_details?.lessons_time}
                    </p>
                  </div>
                </div>
                <div className='flex w-full items-baseline justify-between gap-2 self-start pt-3 md:w-1/2 md:flex-wrap md:items-start md:justify-evenly '>
                  <div className='flex items-center gap-1.5 md:justify-center'>
                    <p className='pt-2 text-lg font-bold text-black'>
                      {item.price?.toLocaleString() || "0"}
                    </p>
                    <p className='pt-2 text-xs font-normal text-slate-400'>
                      تومان
                    </p>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div
                      className={cn(
                        "flex w-full items-center justify-between gap-1  md:gap-2 "
                      )}
                    >
                      <Button
                        size='sm'
                        variant={"ghost"}
                        className='mx-1 flex cursor-pointer justify-center rounded-md border border-input bg-background text-xs text-blue-400'
                        onClick={() => handleAddToCart(item)}
                      >
                        افزودن به سبد خرید
                      </Button>

                      <Button
                        variant='ghost'
                        size={"sm"}
                        className='mx-1 flex cursor-pointer justify-center rounded-md border border-input bg-background text-xs text-blue-600'
                        onClick={() => deleteNextCartItem(item?.course?.id)}
                      >
                        <Trash2 className='size-5' strokeWidth={1} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NextCartContent;
