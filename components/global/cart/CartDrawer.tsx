"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/context/CartProvider"; // Import useCart from context
import { formatWithSeparator } from "@/utils/persian-tools/tools-function";
import { ShoppingBasket } from "lucide-react";
import { CartCourseCard } from "./cart-course-card";

export function CartDrawer({
  handleCartDrawerClick = () => {},
  labelClass = "",
  mobileView = false,
}: any) {
  const { cartItems, deleteCart, mutateCart } = useCart(); // Get cartItems and actions from context

  // Handle delete action
  const handleDelete = async (courseId: number) => {
    await deleteCart(courseId);
  };

  return (
    <Sheet>
      <SheetTrigger asChild onClick={handleCartDrawerClick}>
        <Button variant='ghost' size='icon' className='relative mb-1.5 w-full'>
          <div className='flex flex-col items-center justify-center md:flex-row'>
            <ShoppingBasket
              className={`${labelClass} mx-auto mb-1 md:mx-0 md:mb-0`}
            />
            <span className={`${labelClass} mx-1 text-xs`}>سبد خرید</span>
          </div>
          {cartItems.length ? (
            <Badge className='absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center bg-blue-500 p-0 pt-[.2rem] hover:bg-blue-500'>
              {cartItems.length}
            </Badge>
          ) : null}
        </Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader className='flex items-center justify-center'>
          <SheetTitle>سبد خرید</SheetTitle>
          <Separator />
        </SheetHeader>

        <ScrollArea className='mt-4 h-[calc(100vh-13rem)] pl-2' dir='rtl'>
          {cartItems.length ? (
            cartItems.map((cart: any, i: number) => (
              <CartCourseCard
                cart={cart}
                mutate={mutateCart}
                key={i}
                link={`/class/${cart?.course?.id}`}
                deleteItem={() => handleDelete(cart.course.id)}
              />
            ))
          ) : (
            <div className='flex h-full flex-col items-center justify-center'>
              <ShoppingBasket className='h-max w-1/2 stroke-1' />
              <span>سبد خرید شما خالی میباشد.</span>
            </div>
          )}
        </ScrollArea>

        {cartItems.length ? (
          <SheetFooter className='mt-4 flex flex-col'>
            <Separator className='mb-4' />
            <div className='flex gap-2'>
              <span>قیمت کل:</span>
              <span>
                {formatWithSeparator(
                  cartItems.reduce(
                    (total: any, item: any) => total + item?.price,
                    0
                  )
                )}{" "}
                تومان
              </span>
            </div>
            <SheetClose asChild>
              <Button type='button' href='/cart' className='mt-4 w-full'>
                به پرداخت ادامه دهید
              </Button>
            </SheetClose>
          </SheetFooter>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
