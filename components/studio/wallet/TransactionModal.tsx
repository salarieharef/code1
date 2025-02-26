import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modals/modal";
import { Check, X } from "lucide-react";

export default function TransactionModal({
  isOpen,
  onOpenChange,
  transaction,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void; // Changed from onClose to onOpenChange
  transaction: any;
}) {
  return (
    <Modal
      open={isOpen}
      onOpenChange={onOpenChange}
      size='sm'
      title='وضعیت تراکنش'
      asDrawerInMobile={true}
      showGrip={false}
      closeBtnDrawer={true}
      className='md:py-4'
    >
      {/* Display different icons based on transaction status */}
      {transaction.status === "approved" ? (
        <div className='flex flex-col items-center justify-center'>
          <span className='my-2 flex items-center justify-center rounded-full bg-green-500 p-2 outline outline-offset-8 outline-green-300/20'>
            <Check className='size-10 text-white' />
          </span>
          <p className='py-1 text-lg  text-green-500'>تراکنش موفق</p>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center'>
          <span className='my-2 flex items-center justify-center rounded-full bg-red-600 p-2 outline outline-offset-8 outline-red-300/20'>
            <X className='size-10 text-white' />
          </span>
          <p className='py-1 text-lg  text-red-500'>تراکنش ناموفق</p>
        </div>
      )}

      {/* Display transaction amount */}
      <p className='my-2 pb-2 text-center text-2xl font-bold'>
        {transaction.amount}
      </p>

      {/* Transaction details section */}
      <div className='rounded-lg border border-slate-200 p-1.5'>
        <div className='my-4 rounded-lg bg-slate-100 p-2'>
          <p className='text-right text-lg'>جزئیات تراکنش</p>
        </div>
        <div className='flex w-full flex-col space-y-2'>
          <div className='flex justify-between'>
            <p className='text-sm text-slate-400'>عنوان تراکنش</p>
            <p>{transaction.title}</p>
          </div>
          <div className='flex justify-between'>
            <p className='text-sm text-slate-400'>کد رهگیری</p>
            <p className='text-sm text-slate-800'>
              {transaction.trackingCode || "-"}
            </p>
            <p>نام پرداخت‌کننده</p>
            {transaction.payerName}
          </div>
          <div className='flex justify-between'>
            <p className='text-sm text-slate-400'>تاریخ و زمان</p>
            <p className='text-sm text-slate-800'>
              {`${transaction.time} - ${transaction.date}`}
            </p>
          </div>
          <div className='flex justify-between'>
            <p className='text-sm text-slate-400'>نام پرداخت‌کننده</p>
            <p className='text-sm text-slate-800'>
              {/* {transaction.name}  */}
            </p>
          </div>
          <div className='flex justify-between'>
            <p className='text-sm text-slate-400'>شماره حساب</p>
            <p className='text-sm text-slate-800'>
              {transaction.accountNumber}
            </p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className='flex flex-col space-y-2 py-2'>
        <Button className='bg-blue-400 text-white'>دانلود PDF</Button>
        <Button
          className='border-blue-400 text-blue-400 hover:text-blue-400'
          variant='outline'
          onClick={() => onOpenChange(false)}
        >
          تایید و بازگشت
        </Button>
      </div>
    </Modal>
  );
}
