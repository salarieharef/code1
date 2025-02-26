import { DataTable } from "@/components/global/DataTable";
import { Button } from "@/components/ui/button";
import { nextFetcher } from "@/utils/api/next-fetcher";
import routes from "@/utils/api/routes";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import useSWR from "swr";
import TransactionCardMobile from "./TransactionCardMobile";
import TransactionModal from "./TransactionModal";
import TransactionStatusBadge from "./TransactionStatusBadge";

export type Transaction = {
  id: number;
  title: string;
  date: string;
  time: string;
  discountPercentage?: string;
  amount: string;
  discountedAmount?: string;
  status: "approved" | "rejected";
};

export default function TransactionsTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const {
    data: apiData,
    error,
    isLoading,
  } = useSWR(
    routes.paymentRoutes.userTransactions(),
    (url) =>
      nextFetcher({
        url,
        useToken: true,
      }),
    { revalidateOnFocus: false }
  );

  const transactions: Transaction[] =
    apiData?.data.map((item: any) => ({
      id: item.type_id,
      title: item.type_title,
      date: item.created_date,
      time: item.created_time,
      amount: item.price.toLocaleString("fa-IR") + " تومان",
      discountedAmount: null,
      discountPercentage: null,
      status: item.is_income ? "approved" : "rejected",
    })) || [];

  const openModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "title",
      header: "عنوان تراکنش",
      cell: ({ row }) => (
        <div className='font-medium'>{row.original.title}</div>
      ),
    },
    {
      accessorKey: "date",
      header: "تاریخ و زمان",
      cell: ({ row }) => (
        <div>{`${row.original.time} - ${row.original.date}`}</div>
      ),
    },
    {
      accessorKey: "discountPercentage",
      header: "درصد تخفیف",
      cell: ({ row }) => (
        <div className='text-center'>
          {row.original.discountPercentage || "-"}
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: "مبلغ",
      cell: ({ row }) => {
        const { amount, discountedAmount } = row.original;
        return discountedAmount ? (
          <div className='flex flex-col items-start'>
            <span className='font-bold text-slate-700'>{discountedAmount}</span>
            <span className='text-sm text-slate-400 line-through'>
              {amount}
            </span>
          </div>
        ) : (
          <span className='font-bold text-slate-700'>{amount}</span>
        );
      },
    },
    {
      accessorKey: "status",
      header: "وضعیت",
      cell: ({ row }) => (
        <div className='flex w-max items-center'>
          <TransactionStatusBadge status={row.original.status} />
        </div>
      ),
    },
    {
      id: "actions",
      header: "اقدامات",
      cell: ({ row }) => (
        <Button
          variant='default'
          className='h-9 rounded-3xl bg-blue-400 px-4 text-sm text-white'
          onClick={() => openModal(row.original)}
        >
          مشاهده
        </Button>
      ),
    },
  ];

  return (
    <>
      <DataTable
        className={"hidden border-none py-8 md:block"}
        columns={columns}
        data={transactions}
        loading={isLoading}
        pageSize={20}
      />
      {/* mobile */}
      {transactions.map((transaction, index) => (
        <TransactionCardMobile
          className='block md:hidden'
          key={index}
          transaction={transaction}
          openModal={openModal}
        />
      ))}

      {selectedTransaction && (
        <TransactionModal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          transaction={selectedTransaction}
        />
      )}
    </>
  );
}
