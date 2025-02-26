"use client";

// Icon imports
import { GalleryVerticalEnd, LibraryBig, Plus, Upload } from "lucide-react";

// Component imports
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "../ui/button";
// Fetch imports
import { useSession } from "next-auth/react";

export default function CreateDropdown() {
  const { data: session }: any = useSession();

  return (
    <DropdownMenu dir='rtl'>
      <DropdownMenuTrigger asChild className='cursor-pointer'>
        <Button
          className='sm:text-md flex items-center justify-center gap-x-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 px-8 text-white'
          size='sm'
        >
          <Plus className='text-white' />
          <span>ایجاد کردن</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='sm:w-56'>
        <Link href='/studio/class/create'>
          <DropdownMenuItem className='flex cursor-pointer items-center justify-center gap-x-2 text-base'>
            <GalleryVerticalEnd className='stroke-1.5 text-muted-foreground' />
            <span className=''>درخواست تدریس جدید</span>
          </DropdownMenuItem>
        </Link>
        {session?.user?.access_to_field_introduce ? (
          <Link href='/studio/field/create'>
            <DropdownMenuItem className='flex cursor-pointer items-center justify-center gap-x-2 text-base'>
              <LibraryBig className='stroke-1.5 text-muted-foreground' />
              <span className=''>معرفی رشته جدید</span>
            </DropdownMenuItem>
          </Link>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
