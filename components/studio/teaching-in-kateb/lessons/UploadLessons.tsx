"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { BookOpenText } from "lucide-react";
import { WrapperOutlineText } from "../WrapperOutlineText";
import LessonList from "./LessonsList";

export default function UploadLessons({ courseInfo, type }: any) {
  return (
    <>
      <WrapperOutlineText
        titleBorder='آپلود جلسات درس'
        subtitle_border='(می‌توانید جلسات درس را جابجا کنید)'
        WrapperOutlineLink={
          <Button
            className='h-8 md:h-10'
            href={`/studio/lesson/create?classId=${courseInfo?.id}`}
          >
            ایجاد جلسه جدید
          </Button>
        }
        type={type}
        className='my-6 md:my-4 '
      >
        <div>
          <p className='m-2 text-xs text-muted-foreground md:m-3'>
            خواهشمند است توجه فرمایید که ترتیب تعیین شده در این بخش، به عنوان
            ترتیب نمایش دروس در صفحه اصلی درس در نظر گرفته خواهد شد. لذا،
            خواهشمندیم در انتخاب ترتیب دروس دقت کافی مبذول فرمایید.
          </p>
          <div className='my-6 md:my-4'>
            <LessonList />
          </div>
        </div>
      </WrapperOutlineText>
    </>
  );
}
