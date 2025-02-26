"use client";

import { useState } from "react";
import SelectableCardGroup from "../studio/teaching-in-kateb/SelectableCardGroup";
import Shetab from "@/static/images/checkout/wallet.svg";
import Wallet from "@/static/images/checkout/wallet.svg";

const PaymentSelectOptions = [
  {
    id: "bank",
    title: "درگاه بانکی",
    description: "پرداخت از تمامی بانک‌های عضو شتاب",
    icon: <Shetab className='h-10 w-10 fill-blue-500' />,
  },
  {
    id: "wallet",
    title: "کیف پول",
    description: "پرداخت از کیف پول کاتب (موجودی: ۱,۰۰۰,۰۰۰ تومان)",
    icon: <Wallet className='m-1 h-10 w-10 fill-blue-500' />,
    walletLink: "/wallet-increase", // This link will be shown for the wallet option
  },
];

const PaymentSelectionContent: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>("bank");

  return (
    <div className='w-full md:p-4'>
      <h2 className='mb-4 text-xl font-semibold'>انتخاب روش پرداخت</h2>

      <SelectableCardGroup
        options={PaymentSelectOptions} // Passing the payment options
        selectedValue={selectedMethod} // Passing the selected value state
        onChange={setSelectedMethod} // Handling selection changes
      />
    </div>
  );
};

export default PaymentSelectionContent;
