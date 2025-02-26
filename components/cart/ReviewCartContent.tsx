"use client";

import ResponsiveImage from "@/components/responsive-image/ResponsiveImage";
import React from "react";
import SkeletonYourCartContent from "./SkeletonYourCartContent";
import { useCart } from "@/context/CartProvider";
import NoImageIcon from "@/static/icons/no-image.svg?url";

const ReviewCartContent: React.FC = () => {
  const { cartItems, loading }: any = useCart();

  if (loading) return <SkeletonYourCartContent />;

  if (!cartItems || cartItems.length === 0) {
    return <p className='pt-6 text-center'>سبد خرید شما خالی است.</p>;
  }

  return (
    <div className='mt-4 flex flex-col space-y-4'>
      {cartItems?.map((item: any) => (
        <div key={item.id} className='rounded-lg p-4 ring-1 ring-slate-300'>
          <div className='flex flex-row items-start justify-between md:items-center'>
            <div className='flex w-full justify-start gap-2 md:w-1/2'>
              <ResponsiveImage
                src={item?.course?.image || NoImageIcon}
                alt={item?.course?.name}
                imageClassName='aspect-[5/4] w-full rounded-2xl object-cover md:aspect-square'
                containerClassName='aspect-[5/4] w-full h-full max-w-28 md:aspect-square'
              />
              <div className='flex flex-col justify-center space-y-2'>
                <p className='text-md text-slate-900'>{item?.course?.name}</p>
                <div className='flex justify-start text-sm text-slate-500'>
                  <p>مدرس: </p>
                  <p>{item?.teacher?.name}</p>
                </div>
                <p className='mt-2 text-xs text-slate-500'>{item?.sessions}</p>{" "}
              </div>
            </div>
            <div className='flex w-full items-baseline justify-end gap-2 self-start pt-3 md:w-1/2 md:flex-wrap md:items-start '>
              <div className='flex items-center gap-1.5 md:justify-center'>
                <p className='pt-2 text-lg font-bold text-black'>
                  {item?.price?.toLocaleString()}
                </p>
                <p className='pt-2 text-xs font-normal text-slate-400'>تومان</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewCartContent;
