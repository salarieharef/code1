"use client";
import Image from "next/image";
import { useContext, useState } from "react";

// Component imports
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";

// Icon imports
import { Clock, Heart, Loader2, Play } from "lucide-react";

// Util imports
import { formatTime, videoTime } from "@/utils/time-formatter";

import filter from "lodash-es/filter";
import find from "lodash-es/find";

import Links from "./links";

// Fetch imports
import { nextFetcher } from "@/utils/api/next-fetcher";
import routes from "@/utils/api/routes";
import { usePathname } from "next/navigation";
import { useToast } from "../ui/use-toast";

import CourseNoteIcon from "@/static/icons/course-notes.svg?url";
import CoursePdfIcon from "@/static/icons/course-pdf.svg?url";

export default function LessonItem({ item, mutateLessons }: any) {
  const [likeLoading, setLikeLoading]: any = useState(false);

  const { toast } = useToast();

  const pathname = usePathname();

  const LikeCourse = async (id: number) => {
    try {
      setLikeLoading(id);
      const res = await nextFetcher({
        url: routes.lessonRoutes.like(id),
        method: "POST",
        useToken: true,
      });
      if (res?.success) {
        await mutateLessons();
      } else {
        toast({
          variant: "destructive",
          title: res?.msg,
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLikeLoading(false);
    }
  };

  const UnLikeCourse = async (id: number) => {
    try {
      setLikeLoading(id);
      const res = await nextFetcher({
        url: routes.lessonRoutes.unlike(id),
        method: "POST",
        useToken: true,
      });
      if (res?.success) {
        await mutateLessons();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLikeLoading(false);
    }
  };

  const videoDuration = find(item?.contents, { type: "video_topic" })?.extra
    ?.duration;

  // console.log(item);
  return (
    <AccordionItem
      value={item?.id}
      className='my-2 overflow-hidden rounded-xl bg-white p-0'
    >
      <AccordionTrigger className='group flex items-center justify-between rounded bg-white px-1.5 py-2 hover:no-underline data-[state=open]:border-b md:px-4'>
        <div className='flex grow items-center gap-x-0.5 md:gap-x-2'>
          <div className='flex items-center justify-center rounded-full p-1 group-data-[state=open]:bg-blue-400'>
            <Play className='stroke-[1.5] pl-1 group-data-[state=open]:fill-white group-data-[state=open]:text-blue-400' />
          </div>
          <span className='text-xs sm:text-base'>
            {item?.title ? `${item?.title} - ` : null}
            {item?.name}
          </span>
        </div>
        <div className='mx-1 flex grow-0 items-center justify-end gap-x-1 md:mx-2 md:gap-x-4'>
          <div className='flex items-center gap-x-0.5 text-muted-foreground md:gap-x-1'>
            {videoDuration ? (
              <>
                <Clock className='md:h- h-4 w-4 stroke-1.5 md:w-5' />
                <span className='hidden text-xs sm:block sm:text-sm'>
                  {formatTime(videoDuration)}
                </span>
                <span className='text-xs sm:hidden sm:text-sm'>
                  {videoTime(videoDuration)}
                </span>
              </>
            ) : (
              <span className='text-xs sm:text-sm'>ویدئو درحال پردازش است</span>
            )}
          </div>
          <div className='flex items-center gap-x-1 rounded p-1.5 text-muted-foreground md:p-2'>
            {likeLoading == item?.id ? (
              <Loader2 className='animate-spin' />
            ) : (
              <Heart
                onClick={(e) => {
                  e.preventDefault();
                  item?.stats?.is_liked
                    ? UnLikeCourse(item?.id)
                    : LikeCourse(item?.id);
                }}
                className={`h-4 w-4 stroke-1.5 md:h-5 md:w-5 ${
                  item?.stats?.is_liked ? "fill-current text-blue-400" : null
                }`}
              />
            )}
            {item?.stats?.likes_count}
            <span className='hidden text-xs sm:block sm:text-sm'>
              نفر پسندیدن{" "}
            </span>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className='flex flex-col p-0 px-4'>
        <div>
          {filter(item?.links, {
            type: "prerequisite",
          })?.length ? (
            <>
              <Links
                links={
                  filter(item?.links, {
                    type: "prerequisite",
                  }) || ""
                }
                title='پیش نیازهای این جلسه:'
              />
              <Separator />
            </>
          ) : null}

          {filter(item?.links, {
            type: "software",
          })?.length ? (
            <>
              <Links
                links={
                  filter(item?.links, {
                    type: "software",
                  }) || ""
                }
                title='نرم افزارهای مرتبط با جلسه:'
              />
              <Separator />
            </>
          ) : null}

          {filter(item?.links, {
            type: "use_case",
          })?.length ? (
            <>
              <Links
                links={
                  filter(item?.links, {
                    type: "use_case",
                  }) || ""
                }
                title='کاربرد جلسه در صنعت و بازار:'
              />
              <Separator />
            </>
          ) : null}
        </div>

        {/* Todo: Get lesson contents by api and show it down below */}
        <div className='my-2 flex flex-wrap items-start justify-center gap-10'>
          {filter(item?.contents, {
            type: "e_book",
          })?.length ? (
            <>
              {filter(item?.contents, {
                type: "e_book",
              }).map((ebook, i) => (
                <a
                  href={ebook?.file}
                  target='_blank'
                  key={i}
                  className='-mx-4 flex flex-col items-center justify-center gap-y-1'
                >
                  <div className='rounded-full bg-blue-100 p-4'>
                    <Image
                      src={CoursePdfIcon}
                      alt='PDF Icon'
                      width={64}
                      height={64}
                      className='h-8 w-8'
                    />
                  </div>
                  <span className='font-medium text-blue-400'>
                    کتاب الکترونیکی جلسه
                  </span>
                </a>
              ))}
            </>
          ) : null}

          {filter(item?.contents, {
            type: "handout",
          })?.length ? (
            <>
              {filter(item?.contents, {
                type: "handout",
              }).map((handout, i) => (
                <a
                  href={handout?.file}
                  key={i}
                  target='_blank'
                  className='flex flex-col items-center justify-center gap-y-1'
                >
                  <div className='rounded-full bg-blue-100 p-4'>
                    <Image
                      src={CourseNoteIcon}
                      alt='PDF Icon'
                      width={64}
                      height={64}
                      className='h-8 w-8'
                    />
                  </div>
                  <span className='font-medium text-blue-400'>جزوه جلسه</span>
                </a>
              ))}
            </>
          ) : null}

          {find(item?.contents, {
            type: "video_topic",
          })?.extra?.have_subtitle ? (
            <a
              href={`${process.env.NEXT_PUBLIC_SERVER}/v1/contents/folder/course/${
                find(item?.contents, {
                  type: "video_topic",
                })?.id
              }/transcription.tsv`}
              download={true}
              target='_blank'
              className='flex flex-col items-center justify-center gap-y-1'
            >
              <div className='rounded-full bg-blue-100 p-4'>
                <Image
                  src={CourseNoteIcon}
                  alt='PDF Icon'
                  width={64}
                  height={64}
                  className='h-8 w-8'
                />
              </div>
              <span className='font-medium text-blue-400'>
                جزوه اتومات جلسه
              </span>
            </a>
          ) : null}

          {filter(item?.contents, {
            type: "worksheet",
          })?.length ? (
            <>
              {filter(item?.contents, {
                type: "worksheet",
              }).map((worksheet, i) => (
                <a
                  href={worksheet?.file}
                  key={i}
                  target='_blank'
                  className='flex flex-col items-center justify-center gap-y-1'
                  title={worksheet?.title}
                >
                  <div className='rounded-full bg-blue-100 p-4'>
                    <Image
                      src={CourseNoteIcon}
                      alt='PDF Icon'
                      width={64}
                      height={64}
                      className='h-8 w-8'
                    />
                  </div>
                  <span className='font-medium text-blue-400'>کاربرگ</span>
                </a>
              ))}
            </>
          ) : null}
        </div>

        {item?.description ? (
          <div className='my-2'>
            <span className='text-md text-muted-foreground md:text-xl'>
              توضیحات:
            </span>
            <p
              dangerouslySetInnerHTML={{ __html: item?.description }}
              className='py-2 text-xs text-muted-foreground md:text-base'
            ></p>
          </div>
        ) : null}
      </AccordionContent>
    </AccordionItem>
  );
}
