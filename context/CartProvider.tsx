"use client";

import { toast } from "@/components/ui/use-toast";
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";

interface CartItem {
  id: number;
  name: string;
  teacher: string;
  sessions: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  imageUrl: string;
  course?: any;
}

interface PaymentInfo {
  totalPrice: number;
  discount: number;
  payableAmount: number;
  itemCount: number;
}

interface CartContextType {
  cartItems: CartItem[];
  nextCartItems: CartItem[];
  loading: boolean;
  deleteCart: (id: any) => Promise<void>;
  deleteNextCartItem: (id: number) => void;
  mutateCart: () => void;
  addToCart: (
    cartItemToServer: any,
    cartItemToLocalStorage: any
  ) => Promise<void>;
  moveToNextCart: (item: CartItem) => void;
  moveAllToYourCart: () => Promise<void>;
  yourCartPaymentInfo: PaymentInfo | null;
  nextCartPaymentInfo: PaymentInfo | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [localCartItems, setLocalCartItems] = useState<CartItem[]>([]);
  const [nextLocalCartItems, setNextLocalCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const { data, mutate, isLoading } = useSWR(
    session ? routes.cartRoutes.cart : null,
    (url: string) => nextFetcher({ url, method: "GET", useToken: true }),
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (!session) {
      // Load cart from localStorage if not logged in
      const storedCartItems = JSON.parse(
        localStorage.getItem("cartItems") || "[]"
      );
      setLocalCartItems(storedCartItems);

      const storedNextCartItems = JSON.parse(
        localStorage.getItem("nextCartItems") || "[]"
      );
      setNextLocalCartItems(storedNextCartItems);
      setLoading(false);
    } else {
      // Sync local cart with server if logged in
      const syncLocalCartWithServer = async () => {
        const storedCartItems = JSON.parse(
          localStorage.getItem("cartItems") || "[]"
        );
        if (storedCartItems.length > 0) {
          for (const item of storedCartItems) {
            try {
              await nextFetcher({
                url: routes.cartRoutes.add,
                method: "POST",
                body: {
                  course_id: item.course.id,
                  mode: item?.mode,
                },
                useToken: true,
              });
            } catch (error) {
              console.error("Error syncing cart with server:", error);
            }
          }
          localStorage.removeItem("cartItems");
          setLocalCartItems([]);
          window.dispatchEvent(new Event("localStorageChange"));
        }
        await mutate();
        setLoading(false);
      };

      syncLocalCartWithServer();
    }
  }, [session, mutate]);

  const calculatePaymentInfo = (items: CartItem[]): PaymentInfo => {
    const totalPrice = items.reduce((total, item) => total + item.price, 0);
    const discount = items.reduce(
      (total, item) =>
        total + (item.discountPrice ? item.price - item.discountPrice : 0),
      0
    );
    const payableAmount = totalPrice - discount;
    const itemCount = items.length; //

    return { totalPrice, discount, payableAmount, itemCount };
  };

  const yourCartPaymentInfo = calculatePaymentInfo(
    session ? data?.data?.carts || [] : localCartItems
  );
  const nextCartPaymentInfo = calculatePaymentInfo(nextLocalCartItems);

  const deleteCart = async (id: number) => {
    try {
      if (session) {
        const res = await nextFetcher({
          url: routes.cartRoutes.delete,
          method: "POST",
          body: { course_id: id },
          useToken: true,
        });

        if (res.success) {
          toast({ variant: "success", title: res.msg });
          await mutate();
        } else {
          throw new Error(res.error);
        }
      } else {
        const updatedCartItems = localCartItems.filter(
          (item) => item.id !== id
        );
        setLocalCartItems(updatedCartItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        mutate();
      }
    } catch (error: any) {
      toast({ variant: "destructive", title: error.message });
    }
  };

  const deleteNextCartItem = (id: number) => {
    const updatedNextCartItems = nextLocalCartItems.filter(
      (item) => item?.course?.id !== id
    );
    setNextLocalCartItems(updatedNextCartItems);
    localStorage.setItem("nextCartItems", JSON.stringify(updatedNextCartItems));
  };

  const addToCart = async (
    cartItemToServer: any,
    cartItemToLocalStorage: any
  ) => {
    try {
      if (session) {
        const res = await nextFetcher({
          url: routes.cartRoutes.add,
          method: "POST",
          body: cartItemToServer,
          useToken: true,
        });

        if (res.success) {
          toast({ variant: "success", title: res.msg });
          await mutate(routes.cartRoutes.cart);
        } else if (res.error) {
          throw new Error(res.error);
        }
      } else {
        const existingCart = JSON.parse(
          localStorage.getItem("cartItems") || "[]"
        );
        const itemIndex = existingCart.findIndex(
          (item: any) => item.course.id === cartItemToLocalStorage.course.id
        );

        if (itemIndex !== -1) {
          existingCart[itemIndex] = cartItemToLocalStorage;
        } else {
          existingCart.push(cartItemToLocalStorage);
        }

        localStorage.setItem("cartItems", JSON.stringify(existingCart));
        window.dispatchEvent(new Event("localStorageChange"));
        toast({ variant: "success", title: "به سبد خریدتان اضافه شد" });

        setLocalCartItems(existingCart);
        mutate();
      }
    } catch (e: any) {
      toast({ variant: "destructive", title: e.message });
    }
  };

  const moveToNextCart = async (item: CartItem) => {
    if (session) {
      try {
        await deleteCart(Number(item?.course?.id));
      } catch (error) {
        console.error("Error moving item to next cart:", error);
        return;
      }
    }

    const existingIndex = nextLocalCartItems.findIndex(
      (nextItem) => nextItem.id === item.id
    );

    let updatedNextCartItems;
    if (existingIndex === -1) {
      updatedNextCartItems = [...nextLocalCartItems, item];
    } else {
      updatedNextCartItems = nextLocalCartItems.map((nextItem, index) =>
        index === existingIndex ? item : nextItem
      );
    }

    setNextLocalCartItems(updatedNextCartItems);
    localStorage.setItem("nextCartItems", JSON.stringify(updatedNextCartItems));

    const updatedCartItems = localCartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setLocalCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    mutate();
  };

  const moveAllToYourCart = async () => {
    if (session) {
      try {
        for (const item of nextLocalCartItems) {
          await addToCart({ course_id: item.course.id }, item);
        }

        setNextLocalCartItems([]);
        localStorage.removeItem("nextCartItems");
        window.dispatchEvent(new Event("localStorageChange"));
        await mutate(routes.cartRoutes.cart);
        toast({
          variant: "success",
          title: "همه آیتم‌ها به سبد خرید شما منتقل شدند",
        });
      } catch (error) {
        console.error("Error moving all items to your cart:", error);
        toast({
          variant: "destructive",
          title: "خطا در انتقال آیتم‌ها به سبد خرید شما",
        });
      }
    } else {
      // Move all items locally
      const updatedCartItems = [...localCartItems, ...nextLocalCartItems];
      setLocalCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      // Clear the next cart
      setNextLocalCartItems([]);
      localStorage.removeItem("nextCartItems");

      window.dispatchEvent(new Event("localStorageChange"));
      toast({
        variant: "success",
        title: "همه آیتم‌ها به سبد خرید شما منتقل شدند",
      });

      mutate(); // Update the cart data
    }
  };

  const cartItems = session ? data?.data?.carts || [] : localCartItems;
  const nextCartItems = nextLocalCartItems;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        nextCartItems,
        loading: isLoading || loading,
        deleteCart,
        deleteNextCartItem,
        mutateCart: mutate,
        addToCart,
        moveToNextCart,
        moveAllToYourCart,
        yourCartPaymentInfo,
        nextCartPaymentInfo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
