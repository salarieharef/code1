// Component imports
import Image from "next/image";
import { useState } from "react";

import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";
import { Separator } from "../ui/separator";
import ActionButton from "./action-button";

// Icon imports
import CourseNoteIcon from "@/static/icons/course-notes.svg";
import CoursePdfIcon from "@/static/icons/course-pdf.svg";
import { BarChart, Bookmark, Clock, Eye, Heart, Loader2 } from "lucide-react";
// import PdfSvg from "@/static/icons/pdf.svg";

// Util imports
import filter from "lodash-es/filter";
import Links from "./links";

// Fetch imports
import routes from "@/utils/api/routes";

// Context imports
import { nextFetcher } from "@/utils/api/next-fetcher";

export default function AboutClass({ courseDetails, mutateCourse }: any) {
  const [saving, setSaving] = useState(false);
  const [liking, setLiking] = useState(false);

  const SaveLesson = async () => {
    try {
      setSaving(true);
      const res = await nextFetcher({
        url: routes.courseRoutes.save(courseDetails?.id),
        method: "POST",
        useToken: true,
      });
      if (res?.success) {
        await mutateCourse();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const UnSaveLesson = async () => {
    try {
      setSaving(true);
      const res = await nextFetcher({
        url: routes.courseRoutes.unsave(courseDetails?.id),
        method: "POST",
        useToken: true,
      });
      if (res?.success) {
        await mutateCourse();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const LikeLesson = async () => {
    try {
      setLiking(true);
      const res = await nextFetcher({
        url: routes.courseRoutes.like(courseDetails?.id),
        method: "POST",
        useToken: true,
      });
      if (res?.success) {
        await mutateCourse();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLiking(false);
    }
  };

  const UnLikeLesson = async () => {
    try {
      setLiking(true);
      const res = await nextFetcher({
        url: routes.courseRoutes.unlike(courseDetails?.id),
        method: "POST",
        useToken: true,
      });
      if (res?.success) {
        await mutateCourse();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLiking(false);
    }
  };

  const prerequisites = filter(courseDetails?.links, {
    type: "prerequisite",
  });

  const softwares = filter(courseDetails?.links, {
    type: "software",
  });

  const usecases = filter(courseDetails?.links, {
    type: "use_case",
  });

  const eBooks = filter(courseDetails?.contents, {
    type: "e_book",
  });

  const handouts = filter(courseDetails?.contents, {
    type: "handout",
  });

  const worksheets = filter(courseDetails?.contents, {
    type: "worksheet",
  });

  return (
    <section className='mt-4 rounded-xl bg-white p-4' id='about'>
      <div className='mb-3 flex justify-between'>
        <div className='flex items-center gap-x-2'>
          <span className='hidden h-6 w-6 items-center justify-center rounded-full bg-blue-400 font-medium text-white md:flex'>
            !
          </span>
          <h2 className='text-start text-lg font-bold text-slate-700 md:text-xl'>
            درباره درس
          </h2>
        </div>

        {courseDetails ? (
          <ul className='flex w-full flex-wrap items-center justify-center gap-x-3 rounded-lg border border-secondary-foreground px-2 py-1 xl:w-max'>
            <li className='flex w-max items-center gap-x-1'>
              <Clock className='h-4 w-4 text-blue-400' />
              <span className='text-sm'>
                {courseDetails?.lesson_details?.lessons_count} جلسه (
                {courseDetails?.lesson_details?.lessons_time})
              </span>
            </li>
            <li className='flex w-max items-center gap-x-1'>
              <Eye className='h-4 w-4 text-blue-400' />
              <span className='text-sm'>
                {courseDetails?.stats?.views_count} بازدید
              </span>
            </li>
            <li className='flex w-max items-center gap-x-1'>
              <Heart className='h-4 w-4 text-blue-400' />
              <span className='text-sm'>
                {courseDetails?.stats?.likes_count} پسندیدن
              </span>
            </li>
            <li className='flex w-max items-center gap-x-1'>
              <BarChart className='h-4 w-4 text-blue-400' />
              <span className='text-sm'>سطح {courseDetails?.level}</span>
            </li>
          </ul>
        ) : (
          <Skeleton className='mt-2 h-8 w-96 rounded bg-white' />
        )}
      </div>

      {courseDetails ? (
        <>
          <div className='mb-2 flex flex-row-reverse gap-2'>
            <ActionButton
              icon={
                saving ? (
                  <Loader2 className='h-5 w-5 animate-spin text-blue-400' />
                ) : (
                  <Bookmark
                    className={`stroke-1.5 text-blue-400 ${
                      courseDetails?.stats?.is_saved ? "fill-current" : ""
                    }`}
                  />
                )
              }
              onClick={() =>
                courseDetails?.stats?.is_saved ? UnSaveLesson() : SaveLesson()
              }
              tooltip='ذخیره'
              loading={saving}
            />

            <ActionButton
              icon={
                liking ? (
                  <Loader2 className='h-5 w-5 animate-spin text-blue-400' />
                ) : (
                  <Heart
                    className={`stroke-1.5 text-blue-400 ${
                      courseDetails?.stats?.is_liked ? "fill-current" : ""
                    }`}
                  />
                )
              }
              onClick={() =>
                courseDetails?.stats?.is_liked ? UnLikeLesson() : LikeLesson()
              }
              tooltip='پسندیدن'
              loading={liking}
            />
          </div>

          {/* Links */}
          <div className='mt-4'>
            {prerequisites?.length ? (
              <>
                <Separator />
                <Links
                  links={prerequisites || ""}
                  title='پیش نیازهای این درس:'
                />
                <Separator />
              </>
            ) : null}

            {softwares?.length ? (
              <>
                <Links
                  links={softwares || ""}
                  title='نرم افزارهای مرتبط با درس:'
                />
                <Separator />
              </>
            ) : null}

            {usecases?.length ? (
              <>
                <Links
                  links={usecases || ""}
                  title='کاربرد درس در صنعت و بازار:'
                />
                <Separator />
              </>
            ) : null}
          </div>

          <div className='mb-4 mt-2 flex flex-wrap items-start justify-center gap-10'>
            {eBooks?.length
              ? eBooks.map((eBook, i) => (
                  <a
                    href={eBook?.file}
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
                      کتاب الکترونیکی درس
                    </span>
                  </a>
                ))
              : null}

            {handouts?.length
              ? handouts.map((handout, i) => (
                  <a
                    href={handout?.file}
                    className='flex flex-col items-center justify-center gap-y-1'
                    key={i}
                    target='_blank'
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
                    <span className='font-medium text-blue-400'>جزوه درس</span>
                  </a>
                ))
              : null}

            {worksheets?.length ? (
              <>
                {worksheets.map((worksheet, i) => (
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

          <p
            className='text-justify text-lg text-muted-foreground'
            dangerouslySetInnerHTML={{ __html: courseDetails?.description }}
          ></p>
        </>
      ) : (
        <>
          <Skeleton className='my-2 h-8 w-full' />
          <Skeleton className='my-2 h-8 w-full' />
          <Skeleton className='my-2 h-8 w-full' />
          <Skeleton className='my-2 mt-6 h-4 w-full' />
          <Skeleton className='my-2 h-4 w-full' />
          <Skeleton className='my-2 h-4 w-full' />
        </>
      )}
    </section>
  );
}
