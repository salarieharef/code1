"use client";
import { useParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import RecommendedTeacherClasses from "./recommended-teacher-classes";
const VideoPlayer = dynamic(() => import("./video-player"), { ssr: false });

import { useToast } from "../ui/use-toast";

// Fetch imports
import routes from "@/utils/api/routes";
import useSWR, { useSWRConfig } from "swr";

// Icon imports
import { Loader2, UserMinus2, UserPlus2, Users } from "lucide-react";
import UserNoImage from "@/static/icons/user-no-image.svg?url";
// Auth imports
import { nextFetcher } from "@/utils/api/next-fetcher";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useFollow } from "@/hooks/UseFollow";
import CertificateIcon from "@/static/icons/certificate.svg";

export default function AboutTeacher({ courseDetails, mutate }: any) {
  const { data: session }: any = useSession();
  const params = useParams();
  // Use useFollow hook
  const { following, Follow, UnFollow } = useFollow(mutate);

  // State for whether the teacher is followed
  const [isFollowed, setIsFollowed] = useState(
    courseDetails?.teacher?.stats?.is_followed
  );

  // Function to handle follow/unfollow
  const handleFollowToggle = async () => {
    if (isFollowed) {
      await UnFollow(courseDetails?.teacher?.id);
      setIsFollowed(false); // Optimistically update the UI to unfollowed state
    } else {
      await Follow(courseDetails?.teacher?.id);
      setIsFollowed(true); // Optimistically update the UI to followed state
    }
  };
  // const {
  //   data: classes,
  //   error,
  //   isLoading,
  // } = useSWR(
  //   routes.courseRoutes.coursesRelatedTeachers(courseDetails.id),
  //   fetcher,
  //   { revalidateOnFocus: false }
  // );
  const {
    data: classes,
    error,
    isLoading,
  } = useSWR(
    routes.courseRoutes.coursesRelatedTeachers(courseDetails.id),
    (url) =>
      nextFetcher({
        url,
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <section className='mt-4 rounded-xl bg-white p-4' id='teacher'>
      <div className='flex items-center gap-x-2'>
        <span className='flex h-6 w-6 items-center justify-center rounded-full bg-blue-400 font-medium text-white'>
          !
        </span>

        <h2 className='text-xl font-bold text-slate-700'>درمورد مدرس</h2>
      </div>

      <div className='flex w-full flex-col items-center justify-center'>
        <div className='w-full'>
          <div className='my-4 flex items-center justify-center gap-x-4 md:justify-normal'>
            {courseDetails ? (
              <Avatar className='h-20 w-20 border-b-2 border-amber-500 text-base text-muted-foreground'>
                <AvatarImage src={courseDetails?.teacher?.image}></AvatarImage>

                <AvatarFallback>
                  <Image
                    src={UserNoImage}
                    width={20}
                    height={20}
                    alt=''
                    className='h-full w-full'
                  />
                  <div className='absolute bottom-0 mb-2'>
                    {courseDetails?.teacher?.name
                      ? courseDetails?.teacher?.name.charAt(0).toUpperCase()
                      : null}
                    .
                    {courseDetails?.teacher?.family_name
                      ? courseDetails?.teacher?.family_name
                          .charAt(0)
                          .toUpperCase()
                      : null}
                  </div>
                </AvatarFallback>
              </Avatar>
            ) : (
              <Skeleton className='ml-3 h-28 w-28 rounded-full' />
            )}

            <div className='flex flex-col'>
              <div className='flex items-center gap-x-2'>
                {courseDetails ? (
                  <Link
                    className='text-lg font-medium leading-10 text-slate-700'
                    href={`/profile/${courseDetails?.teacher?.id}`}
                  >
                    {courseDetails?.teacher?.name}
                  </Link>
                ) : (
                  <Skeleton className='h-8 w-64 rounded' />
                )}

                {session?.user &&
                session?.user?.id !== courseDetails?.teacher?.id ? (
                  <Button
                    className='flex h-0 gap-2 rounded-sm bg-blue-400 px-2 py-2 text-xs hover:bg-blue-500 md:rounded md:px-4 md:py-4 md:text-base'
                    type='button'
                    size='sm'
                    onClick={handleFollowToggle}
                  >
                    {courseDetails?.teacher?.stats?.is_followed ? (
                      <>
                        {following ? (
                          <Loader2 className='animate-spin' />
                        ) : (
                          <UserMinus2 />
                        )}
                        <span>دنبال شده</span>
                      </>
                    ) : (
                      <>
                        {following ? (
                          <Loader2 className='animate-spin' />
                        ) : (
                          <UserPlus2 />
                        )}
                        <span>دنبال کنید</span>
                      </>
                    )}
                  </Button>
                ) : null}
              </div>

              {courseDetails ? (
                <div className='flex flex-row flex-wrap rounded-lg border border-slate-700 px-2 py-1 '>
                  {courseDetails?.teacher?.bio ? (
                    <span className='mx-2 flex items-center text-right font-medium text-slate-700'>
                      <Image
                        src={CertificateIcon}
                        alt='Certificate Icon'
                        width={64}
                        height={64}
                        className='ml-2 h-4 w-4'
                      />
                      <span className='text-sm'>
                        {courseDetails?.teacher?.bio}
                      </span>
                    </span>
                  ) : null}

                  {/* <span className="flex items-center mx-2 text-right text-slate-700 font-medium">
                    <Image
                      src="/static/icons/graduate.svg"
                      alt="Certificate Icon"
                      width={64}
                      height={64}
                      className="w-5 h-5 ml-2"
                    />
                    <span className="text-sm">{courseDetails?.teacher?.stats?.views_count} کاربر</span>
                  </span> */}

                  <span className='mx-2 flex items-center text-right font-medium text-slate-700'>
                    <Users className='ml-2 h-4 w-4 text-blue-400' />
                    <span className='text-sm'>
                      {courseDetails?.teacher?.stats?.followers} دنبال کننده
                    </span>
                  </span>

                  {/* <span className="flex items-center mx-2 text-right text-slate-700 font-medium">
                    <Image
                      src="/static/icons/level-2.svg"
                      alt="Certificate Icon"
                      width={64}
                      height={64}
                      className="w-5 h-5 ml-2"
                    />
                    <span className="text-sm">سطح حرفه ای</span>
                  </span> */}
                </div>
              ) : (
                <Skeleton className='mt-2 h-8 w-full rounded bg-white' />
              )}
            </div>
          </div>

          {courseDetails ? (
            <div
              className={`grid ${
                courseDetails?.teacher?.introduction_video ? "grid-cols-3" : ""
              }`}
            >
              <p
                className='col-span-2 text-center text-secondary-foreground md:text-start'
                dangerouslySetInnerHTML={{
                  __html: courseDetails?.teacher?.description,
                }}
              ></p>

              {courseDetails?.teacher?.introduction_video ? (
                <div>
                  <VideoPlayer
                    src={courseDetails?.teacher?.introduction_video}
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <>
              <Skeleton className='my-2 h-4 w-full bg-white' />
              <Skeleton className='my-2 h-4 w-full bg-white' />
              <Skeleton className='my-2 h-4 w-full bg-white' />
              <Skeleton className='my-2 h-4 w-full bg-white' />
              <Skeleton className='my-2 h-4 w-full bg-white' />
              <Skeleton className='my-2 h-4 w-full bg-white' />
            </>
          )}
        </div>

        {classes?.length ? (
          <>
            <Separator orientation='horizontal' className='my-4' />
            <div className='w-full'>
              <h2 className='text-xl font-bold text-slate-700'>
                دروس دیگر این مدرس
              </h2>
              <div>
                <RecommendedTeacherClasses
                  type='related-teachers'
                  courseDetails={courseDetails}
                  teacherImage={courseDetails?.teacher?.image}
                />
              </div>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
