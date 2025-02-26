"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/cn";
import { Calendar, CheckCircle, Clock, XCircle } from "lucide-react";
import TransactionStatusBadge from "./TransactionStatusBadge";
import { Button } from "@/components/ui/button";

export default function TransactionCardMobile({
  transaction,
  className,
  openModal,
}: {
  transaction: any;
  className?: string;
  openModal: (transaction: any) => void; // Define the type for the openModal function
}) {
  return (
    <Card className={cn("border-none shadow-none", className)}>
      <CardContent className='px-0.5 py-1'>
        {/* Transaction Header */}
        <div className='flex items-center justify-between space-y-2'>
          {/* Transaction Details */}
          <div className='flex flex-col items-start space-y-2'>
            <p className='text-sm font-medium'>{transaction.title}</p>
            {/* Transaction Status */}
            <div className='flex items-center gap-0.5'>
              <TransactionStatusBadge status={transaction.status} />
              <div className='flex justify-start'>
                <p className='text-xxm text-slate-500'>{transaction.date}</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-end space-y-2'>
            <div className='text-sm font-bold'>
              <span className='font-light'>{`(%5)`}</span> {transaction.amount}
            </div>
            <Button
              variant='default'
              className='h-9 rounded-3xl bg-blue-400 px-4 text-sm text-white'
              onClick={() => openModal(transaction)} // Open modal when button is clicked
            >
              مشاهده
            </Button>
          </div>

          {/* Dropdown Menu */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='p-2'>
                <MoreVertical className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Eye className='mr-2 h-4 w-4' />
                مشاهده
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash2 className="w-4 h-4 mr-2 text-red-600" />
                حذف
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
        <Separator
          orientation='horizontal'
          className='my-1 h-[1px] bg-slate-300'
        />

        {/* Transaction Body */}
      </CardContent>
    </Card>
  );
}
