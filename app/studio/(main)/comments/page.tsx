"use client";
import { useState } from "react";

// Component imports
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Icon imports
import { MessagesSquare } from "lucide-react";

// Auth imports
import CourseCommentList from "@/components/comments/CourseCommentList";
import FieldCommentList from "@/components/comments/FieldCommentList";

export default function StudioComments() {
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [selectedTab, setSelectedTab] = useState<string | undefined>(
    "courseComments"
  );

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  return (
    <div className='mb-10 w-full rounded-md bg-white p-4 shadow-xl sm:mt-10 sm:px-12 sm:py-8'>
      <h1 className='flex gap-x-2 text-xl font-medium text-blue-900 sm:text-3xl'>
        <MessagesSquare className='text-blue-400 sm:h-10 sm:w-10' />
        نظرات
      </h1>

      {/* desktop tabs */}
      <Tabs
        defaultValue='courseComments'
        className='hidden w-full md:block'
        dir='rtl'
        onValueChange={handleTabChange}
        value={selectedTab}
      >
        <div className='flex justify-center'>
          <TabsList className='h-auto divide-x-1 divide-x-reverse overflow-hidden border border-blue-500 bg-transparent p-0'>
            <TabsTrigger
              value='courseComments'
              className={`rounded-none border-blue-500 font-normal text-slate-600 data-[state=active]:bg-blue-500 data-[state=active]:font-medium data-[state=active]:text-white sm:px-10 sm:text-lg`}
            >
              نظرات دروس
            </TabsTrigger>
            <TabsTrigger
              value='fieldComments'
              className={`rounded-none border-blue-500 font-normal text-slate-600 data-[state=active]:bg-blue-500 data-[state=active]:font-medium data-[state=active]:text-white sm:px-10 sm:text-lg`}
            >
              نظرات رشته‌ها
            </TabsTrigger>
          </TabsList>
        </div>
        <Separator orientation='horizontal' className='my-4' />

        <TabsContent value='courseComments'>
          <CourseCommentList />
        </TabsContent>
        <TabsContent value='fieldComments'>
          <FieldCommentList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
