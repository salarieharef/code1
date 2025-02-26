import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import SkeletonPaymentInfo from "./SkeletonPaymentInfo";
import { useCart } from "@/context/CartProvider";
import { usePathname, useSearchParams } from "next/navigation";
interface PaymentInfoProps {
  actionButton?: {
    label: string;
    onClick: () => void;
    href?: any;
    actionType?: any;
  };
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({ actionButton }) => {
  const { yourCartPaymentInfo, nextCartPaymentInfo, loading } = useCart();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      discountCode: "",
    },
  });

  const isNextCart = tab === "next-cart";
  const paymentInfo = isNextCart ? nextCartPaymentInfo : yourCartPaymentInfo;
  const itemCount = isNextCart
    ? nextCartPaymentInfo?.itemCount
    : yourCartPaymentInfo?.itemCount;

  if (loading) {
    return <SkeletonPaymentInfo />;
  }

  const onSubmit = async (data: any) => {
    // Handle discount code submission
    reset();
  };

  return (
    <div
      className={`sticky top-0 ${
        pathname === "/cart/review" && "sticky top-96 lg:top-60"
      }`}
    >
      <div className='flex w-full flex-col space-y-5 rounded-lg p-4 ring-1 ring-slate-300'>
        <div className='flex w-full flex-col items-start justify-center text-center md:items-center'>
          <h3 className='text-lg font-bold'>اطلاعات پرداخت</h3>
          <p className='text-xs text-slate-400'>
            (تمامی قیمت‌ها به تومان می‌باشد)
          </p>
        </div>
        <div className='flex flex-col space-y-3 pt-2 md:pt-0'>
          <div className='flex justify-between'>
            <p className='text-xs text-slate-400'>
            <p className='text-xs text-slate-400'>
              تعداد محصولات ({itemCount || 0}) 
            </p>            </p>
            <p className='text-xs font-medium text-black'>
              {paymentInfo?.totalPrice?.toLocaleString() || 0}
            </p>
          </div>
          {/* {paymentInfo?.discount > 0 && (
            <div className='flex justify-between'>
              <p className='text-xs text-slate-400'>تخفیف</p>
              <p className='text-xs text-blue-500'>
                {paymentInfo?.discount?.toLocaleString()}
              </p>
            </div>
          )} */}
        </div>
        <Separator
          orientation='horizontal'
          className='my-3 block h-px bg-slate-300'
        />
        <div className='flex flex-col space-y-3'>
          <div className='flex justify-between'>
            <p className='text-xs text-slate-400'>قابل پرداخت</p>
            <p className='text-md font-bold text-black'>
              {paymentInfo?.payableAmount?.toLocaleString() || 0}
            </p>
          </div>
        </div>
        <div className='flex items-center justify-start gap-x-1.5 md:pt-3'>
          <div className='w-6'>
            <AlertCircle className='size-6 text-slate-400' strokeWidth={1} />
          </div>
          <p className='text-xs text-slate-400'>
            بعد از پرداخت، محصولات خریداری شده به پروفایل شما اضافه خواهد شد.
          </p>
        </div>
      </div>

      {pathname === "/cart" && !isNextCart && (
        <div className='mt-5 flex w-full flex-col space-y-5 rounded-lg p-4 ring-1 ring-slate-300'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='discountCode' className='text-sm text-slate-400'>
              کد تخفیف دارید؟
            </label>
            <div className='relative mt-2 flex gap-2'>
              <Input
                id='discountCode'
                {...register("discountCode")}
                placeholder=''
              />
              <Button
                className='absolute left-0.5 top-0.5 z-20 h-9 bg-white text-xs text-blue-500'
                variant='ghost'
                type='submit'
                disabled={!watch("discountCode").trim()}
              >
                ثبت
              </Button>
            </div>
          </form>
        </div>
      )}

      {actionButton && (
        <Button
          variant={
            actionButton?.actionType === "payment_type" ? "outline" : "default"
          }
          type='button'
          className='relative mt-5 hidden w-full md:flex'
          href={actionButton.href}
          onClick={actionButton.onClick}
        >
          {actionButton.label}
        </Button>
      )}
    </div>
  );
};

export default PaymentInfo;
