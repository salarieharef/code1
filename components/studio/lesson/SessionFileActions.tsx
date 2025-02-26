import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Expand, Eye, MoreVertical, Trash2 } from "lucide-react";
import Link from "next/link";

type SessionFileActionsProps = {
  courseId: number | string | null;
  sessionId: number;
};

export function SessionFileActions({
  courseId,
  sessionId,
}: SessionFileActionsProps) {
  return (
    <DropdownMenu dir='rtl'>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>باز کردن منو</span>
          <MoreVertical className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel className='text-muted-foreground'>
          عملیات‌ها
        </DropdownMenuLabel>

        <DropdownMenuItem>
          <Button
            href={`/studio/lesson/${sessionId}/details?classId=${courseId}`}
            variant='ghost'
            className='flex h-fit w-full cursor-pointer flex-row justify-start gap-x-2 p-0 py-0 font-normal text-slate-700 hover:text-slate-600'
          >
            <Expand className='h-4 w-4' />
            ویرایش و بارگذاری
          </Button>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link
            href={`/class/${courseId}?lesson=${sessionId}`}
            className='flex cursor-pointer flex-row gap-x-2 text-slate-700 hover:text-slate-600'
          >
            <Eye className='h-4 w-4' />
            مشاهده در کاتب
          </Link>
        </DropdownMenuItem>

        {/* <DropdownMenuItem
          onClick={onDelete}
          className='flex cursor-pointer gap-x-2 text-destructive hover:text-destructive'
        >
          <Trash2 className='h-4 w-4' />
          حذف
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
