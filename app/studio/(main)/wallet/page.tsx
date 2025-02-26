"use client";

import ChargeTab from "@/components/studio/wallet/ChargeTab";
import TransactionsTab from "@/components/studio/wallet/TransactionsTab";
import WithdrawTab from "@/components/studio/wallet/withdraw-tab/WithdrawTab";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Enum to define the possible wallet tabs
enum WalletActiveTab {
  charge = "charge",
  withdraw = "withdraw",
  transactions = "transactions",
}

// Object containing tab names and links
const walletTabs = {
  charge: {
    name: "افزایش اعتبار",
    link: "?tab=charge",
  },
  withdraw: {
    name: "برداشت از کیف‌پول",
    link: "?tab=withdraw",
  },
  transactions: {
    name: "تاریخچه تراکنش",
    link: "?tab=transactions",
  },
};

export default function StudioWallet() {
  const searchParams = useSearchParams(); // Get search params from the URL
  const [activeTab, setActiveTab] = useState(WalletActiveTab.charge); // Default tab
  const [isSelectOpen, setSelectOpen] = useState(false); // Control select open state

  // Sync the active tab with URL search params or fallback to 'charge'
  useEffect(() => {
    const tabFromUrl = searchParams.get("tab"); // Get 'tab' query param
    if (tabFromUrl && Object.keys(WalletActiveTab).includes(tabFromUrl)) {
      setActiveTab(tabFromUrl as WalletActiveTab);
    } else {
      setActiveTab(WalletActiveTab.charge); // Default to 'charge' if no valid tab in URL
    }
  }, [searchParams]);

  const handleLinkClick = () => {
    setSelectOpen(false); // Close the select menu after link is clicked
  };

  return (
    <div className='mb-10 min-h-screen w-full rounded-[7px] bg-white p-4 shadow-xl sm:mt-10 sm:px-12 sm:py-8'>
      <div className='flex h-16 flex-row items-center justify-between'>
        <div className='flex items-center gap-1 text-xl font-bold leading-10 text-blue-900 sm:text-3xl'>
          <Wallet className='text-blue-400 sm:h-10 sm:w-10' />
          <h1>کیف‌پول</h1>
        </div>

        {activeTab !== "transactions" ? (
          <>
            <Select dir='rtl' open={isSelectOpen} onOpenChange={setSelectOpen}>
              <SelectTrigger className='flex w-max justify-between gap-2 rounded-full border-0 bg-primary text-xs text-primary-foreground focus:ring-0 focus:ring-offset-0 md:hidden'>
                <SelectValue placeholder={walletTabs[activeTab].name} />
              </SelectTrigger>
              <SelectContent position='popper'>
                {Object.entries(walletTabs).map(([key, { name, link }]) => (
                  <Link
                    key={key}
                    className={`block cursor-pointer py-1.5  text-xs ease-in hover:bg-secondary ${activeTab === key && "bg-secondary"}`}
                    href={link}
                    onClick={handleLinkClick}
                  >
                    {name}
                  </Link>
                ))}
              </SelectContent>
            </Select>
          </>
        ) : (
          <>
            <Button variant={"default"} className='bg-blue-400'>
              دانلود به صورت PDF
            </Button>
          </>
        )}
      </div>
      <Separator orientation='horizontal' className='mb-4 h-[2px]' />

      <Tabs value={activeTab} className='w-full' dir='rtl'>
        <div className='hidden justify-center md:flex'>
          <TabsList className='divide-x-1 divide-x-reverse overflow-hidden border border-blue-500 bg-transparent p-0'>
            {Object.entries(walletTabs).map(([key, { name, link }]) => (
              <Link key={key} href={link}>
                <TabsTrigger
                  onClick={() => setActiveTab(key as WalletActiveTab)}
                  value={key as WalletActiveTab}
                  className='rounded-none border-blue-500 text-lg font-normal text-slate-600 data-[state=active]:bg-blue-500 data-[state=active]:font-medium data-[state=active]:text-white md:px-5 lg:px-10'
                >
                  {name}
                </TabsTrigger>
              </Link>
            ))}
          </TabsList>
        </div>
        <TabsContent value={WalletActiveTab.charge}>
          <ChargeTab initialCredit={300000000} />
        </TabsContent>
        <TabsContent value={WalletActiveTab.withdraw}>
          <WithdrawTab />
        </TabsContent>
        <TabsContent value={WalletActiveTab.transactions}>
          <TransactionsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
