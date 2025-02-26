"use client";

import ResponsiveImage from "@/components/responsive-image/ResponsiveImage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/context/CartProvider"; // Import useCart
import { formatWithSeparator } from "@/utils/persian-tools/tools-function";
import { Loader2, Trash2 } from "lucide-react";
import NoImageIcon from "@/static/icons/no-image.svg?url";

import Link from "next/link";
import { useState } from "react";

export function CartCourseCard({ cart, link }: any) {
  const { toast } = useToast();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { deleteCart } = useCart(); // Use deleteCart from context

  // Handle delete action
  const handleDelete = async (courseId: number) => {
    try {
      setDeleteLoading(true);
      await deleteCart(courseId);
      toast({ variant: "success", title: "آیتم از سبد خرید حذف شد" });
    } catch (e: any) {
      toast({ variant: "destructive", title: e.message });
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <Link href={link || ""}>
      <Card className='rounded-2xl border-0 shadow-none'>
        <CardContent className='relative flex items-center gap-2 p-2'>
          <ResponsiveImage
            src={cart?.course?.image || NoImageIcon}
            alt={cart?.course?.name}
            blur={20}
            containerClassName='w-20 h-20'
            imageClassName='object-cover rounded-lg'
            sizes='(max-width: 400px) 300px,(max-width: 640px) 500px, (max-width: 1024px) 1000px, 1000px'
          />
          <div>
            <h3 className='text-md md:text-lg'>{cart?.course?.name}</h3>
            <small>{formatWithSeparator(cart?.price)} تومان</small>
          </div>
          <Button
            variant='ghost'
            size='icon'
            className='absolute left-0 top-0 mt-2 h-6 w-6 p-1'
            onClick={(e) => {
              e.preventDefault();
              handleDelete(cart?.course?.id); // Use cart?.course?.id as course_id
            }}
          >
            {deleteLoading ? <Loader2 className='animate-spin' /> : <Trash2 />}
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
