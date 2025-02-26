"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import YourCartContent from "./YourCartContent";
import NextCartContent from "./NextCartContent";
import { useCart } from "@/context/CartProvider";
import { Loader2 } from "lucide-react";

const CartTabs: React.FC = () => {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "your-cart";
  const { cartItems, nextCartItems, loading }: any = useCart();
  return (
    <Tabs value={activeTab} dir='rtl'>
      <TabsList className='flex w-full bg-slate-200/50 px-1 py-4 ring-1 ring-slate-300 md:px-2 md:py-6'>
        <TabsTrigger
          className={`data-[state=active]:sm:shadow- w-1/2 cursor-pointer rounded-none bg-transparent py-2.5 text-center text-sm  data-[state=active]:bg-transparent data-[state=active]:text-blue-400 md:py-2.5 md:text-lg ${
            activeTab === "your-cart"
              ? "border-b-2 border-blue-400 text-blue-500"
              : "text-slate-700"
          }`}
          value='your-cart'
          asChild
        >
          <Link className='block bg-transparent' href='?tab=your-cart'>
            سبد خرید شما (
            {loading ? (
              <Loader2 className='h-4 w-4 animate-spin text-blue-400' />
            ) : (
              cartItems?.length || 0
            )}
            )
          </Link>
        </TabsTrigger>
        <TabsTrigger
          value='next-cart'
          asChild
          className={`data-[state=active]:sm:shadow- w-1/2 cursor-pointer rounded-none bg-transparent py-2.5 text-center text-sm  data-[state=active]:bg-transparent data-[state=active]:text-blue-400 md:py-2.5 md:text-lg ${
            activeTab === "next-cart"
              ? "border-b-2 border-blue-400 text-blue-500"
              : "text-slate-700"
          }`}
        >
          <Link className='block' href='?tab=next-cart'>
            سبد خرید بعدی (
            {loading ? (
              <Loader2 className='h-4 w-4 animate-spin text-blue-400' />
            ) : (
              nextCartItems?.length || 0
            )}
            )
          </Link>
        </TabsTrigger>
      </TabsList>
      <TabsContent value='your-cart'>
        <YourCartContent />
      </TabsContent>
      <TabsContent value='next-cart'>
        <NextCartContent />
      </TabsContent>
    </Tabs>
  );
};

export default CartTabs;
