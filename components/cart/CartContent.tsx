"use client";

import ResponsiveImage from "@/components/responsive-image/ResponsiveImage";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartProvider";
import { cn } from "@/utils/cn";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation"; // Adding useRouter
import React from "react";
import SkeletonYourCartContent from "./SkeletonYourCartContent";
// Icon imports
import NoImageIcon from "@/static/icons/no-image.svg?url";

interface CartItem {
  id: number;
  name: string;
  teacher: string;
  sessions: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartContentProps {
  showAddToCartButton: boolean;
  showNextCartButton: boolean;
}

const CartContent: React.FC<CartContentProps> = ({
  showAddToCartButton,
  showNextCartButton,
}) => {
  const { cartItems, deleteCart, moveToNextCart, loading }: any = useCart();
  // const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "your-cart";

  if (loading) return <SkeletonYourCartContent />;

  // Handle moving item to next cart
  const handleMoveToNextCart = (item: any) => {
    moveToNextCart(item);
    // Redirect to the next cart
    // router.push("/cart?tab=next-cart");
  };

  return (
    <div>
      {cartItems?.length === 0 ? (
        <p className='pt-6 text-center'>سبد خرید شما خالی است.</p>
      ) : (
        <div className='mt-4 flex flex-col space-y-4'>
          {cartItems.map((item: any) => (
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
                      {showNextCartButton && (
                        <Button
                          size='sm'
                          variant={"ghost"}
                          className='mx-1 flex cursor-pointer justify-center rounded-md border border-input bg-background text-xs text-blue-400'
                          onClick={() => handleMoveToNextCart(item)}
                        >
                          {/* {form.formState.isSubmitting && (
                            <Loader2 className='ml-2 h-4 w-4 animate-spin' />
                          )} */}
                          انتقال به سبد خرید بعدی
                        </Button>
                      )}
                      <Button
                        variant='ghost'
                        size={"sm"}
                        className='mx-1 flex cursor-pointer justify-center rounded-md border border-input bg-background text-xs text-blue-600'
                        onClick={() => deleteCart(item?.course?.id)}
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

export default CartContent;
