"use client";
import Link from "next/link";

// Component imports
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import LessonList from "@/components/studio/lessons/LessonList";

// Icon imports
import { Edit2 } from "lucide-react";

export default function StudioClassLessons({
  params,
}: {
  params: { classId: string };
}) {
  return (
    <div className='mb-10 w-full rounded-lg bg-white p-4 shadow-xl sm:mt-10 sm:px-12 sm:py-8'>
      <div className='flex items-center justify-between'>
        <h1 className='flex items-center gap-1 text-xl font-medium text-blue-900 sm:text-3xl'>
          <Edit2 className='text-blue-400 sm:h-10 sm:w-10' />
          جلسات این تدریس
        </h1>

        <Link href={`/studio/lesson/create?classId=${params.classId}`}>
          <Button size='sm'>ایجاد جلسه جدید</Button>
        </Link>
      </div>

      <Separator orientation='horizontal' className='my-4' />

      <LessonList />
    </div>
  );
}
