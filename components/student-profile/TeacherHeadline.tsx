"use client";
import { useParams } from "next/navigation";
import { useState } from "react";

// Component  imports
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";
import VideoPlayer from "../class/video-player";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useToast } from "../ui/use-toast";

// Fetch imports
import routes from "@/utils/api/routes";
import { useSWRConfig } from "swr";

// Icon imports
import { Loader2, UserMinus2, UserPlus2 } from "lucide-react";

// Auth imports
import { nextFetcher } from "@/utils/api/next-fetcher";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useFollow } from "@/hooks/UseFollow";

export default function HeadLine({ user, mutate }: any) {
  const params = useParams();
  const { data: session }: any = useSession();

  // Use useFollow hook
  const { following, Follow, UnFollow } = useFollow(mutate);

  const [isFollowed, setIsFollowed] = useState(user?.stats?.is_followed);

  // Function to handle follow/unfollow
  const handleFollowToggle = async () => {
    if (isFollowed) {
      await UnFollow(user?.id);
      setIsFollowed(false);
    } else {
      await Follow(user?.id);
      setIsFollowed(true);
    }
  };

  return (
    <>
      <div className='-mt-20 flex items-start justify-between py-0 sm:-mt-32'>
        <div className='flex items-center gap-4 sm:items-start'>
          <Avatar className='h-14 w-14 border-b-2 border-amber-500 sm:h-40 sm:w-40 sm:border-b-4'>
            <AvatarImage
              src={user?.image || "/static/images/avatar/teacher-avatar.svg"}
            ></AvatarImage>

            <AvatarFallback>
              <Image
                src={"/static/images/avatar/teacher-avatar.svg"}
                width={20}
                height={20}
                alt=''
                className='h-full w-full'
              />
              <div className='absolute bottom-0 mb-2'>
                {user?.first_name
                  ? user?.first_name.charAt(0).toUpperCase()
                  : null}
                ‌.
                {user?.last_name
                  ? user?.last_name.charAt(0).toUpperCase()
                  : null}
              </div>
            </AvatarFallback>
          </Avatar>

          <div className='flex flex-col justify-start sm:mt-10'>
            {user?.name ? (
              <h1 className='z-[2] text-right text-xl font-bold text-white sm:text-4xl'>
                {user?.name}
              </h1>
            ) : (
              <Skeleton className='h-8 w-full' />
            )}

            <h3 className='text-right text-base font-medium text-white sm:text-xl'>
              {user?.bio}
            </h3>
          </div>
        </div>

        {/* <div className="sm:mt-18">
          <Button className="px-0" variant="link">
            <MenuIcon className="sm:w-10 sm:h-10 text-white mb-1" />
          </Button>
        </div> */}
      </div>

      <div className='flex flex-col sm:-mt-8'>
        <div className='flex w-full flex-row items-start justify-between'>
          <div className='mr-44 flex gap-4 py-0'>
            <div className='flex gap-1 font-medium text-muted-foreground'>
              <span className='text-slate-800'>{user?.stats?.followers}</span>
              دنبال‌کننده
            </div>
            <div className='flex gap-1 font-medium text-muted-foreground'>
              <span className='text-slate-800'>{user?.stats?.followings}</span>
              دنبال‌شونده
            </div>
          </div>

          {session?.user && session?.user?.id !== user?.id ? (
            <Button
              className='flex h-0 gap-2 rounded-sm bg-blue-400 px-2 py-2 text-xs hover:bg-blue-500 md:rounded md:px-4 md:py-4 md:text-base'
              type='button'
              onClick={handleFollowToggle}
            >
              {user?.stats?.is_followed ? (
                <>
                  {following ? (
                    <Loader2 className='h-5 w-5 animate-spin' />
                  ) : (
                    <UserMinus2 />
                  )}
                  <span>دنبال شده</span>
                </>
              ) : (
                <>
                  {following ? (
                    <Loader2 className='h-5 w-5 animate-spin' />
                  ) : (
                    <UserPlus2 />
                  )}
                  <span>دنبال کنید</span>
                </>
              )}
            </Button>
          ) : null}
        </div>

        <div>
          {/* <div className="flex flex-row w-40 justify-center">
            <Image
              src="/static/icons/star-slate.svg"
              alt="Star Icon"
              width={64}
              height={64}
              className="w-6 h-6 "
            />
            <Image
              src="/static/icons/star.svg"
              alt="Star Icon"
              width={64}
              height={64}
              className="w-6 h-6 "
            />
            <Image
              src="/static/icons/star.svg"
              alt="Star Icon"
              width={64}
              height={64}
              className="w-6 h-6 "
            />
            <Image
              src="/static/icons/star.svg"
              alt="Star Icon"
              width={64}
              height={64}
              className="w-6 h-6 "
            />
            <Image
              src="/static/icons/star.svg"
              alt="Star Icon"
              width={64}
              height={64}
              className="w-6 h-6 "
            />
          </div> */}
        </div>
        <div className='mt-4 flex flex-col gap-4 sm:mt-14 lg:flex-row'>
          <div className='lg:basis-7/12'>
            <h3 className='text-xl font-bold text-slate-800'>درباره من</h3>
            <p
              className='text-justify text-lg font-normal text-slate-700'
              dangerouslySetInnerHTML={{ __html: user?.description }}
            ></p>
            {/* <Separator
              orientation="horizontal"
              className="h-[1px] bg-slate-300 mt-2 max-w-[32rem]"
            />
            <div className="flex md:flex-row flex-wrap rounded-xl border-2  border-slate-700 pt-2 pb-1.5 px-2 mt-4 w-fit text-white text-xs xl:text-base font-bold">
              <span className="flex items-center mx-2 text-right text-slate-700 font-medium">
                <Image
                  src="/static/icons/certificate.svg"
                  alt="Certificate Icon"
                  width={64}
                  height={64}
                  className="w-4 h-4 ml-2"
                />
                دکترای ریاضی محض
              </span>
              <span className="flex items-center mx-2 text-right text-slate-700 font-medium">
                <Image
                  src="/static/icons/graduate.svg"
                  alt="Certificate Icon"
                  width={64}
                  height={64}
                  className="w-5 h-5 ml-2"
                />
                ۵۸ کاربر
              </span>
              <span className="flex items-center mx-2 text-right text-slate-700 font-medium">
                <Image
                  src="/static/icons/like.svg"
                  alt="Certificate Icon"
                  width={64}
                  height={64}
                  className="w-5 h-5 ml-2"
                />
                ۵.۵ از ۵۵ رأی
              </span>
              <span className="flex items-center mx-2 text-right text-slate-700 font-medium">
                <Image
                  src="/static/icons/level-2.svg"
                  alt="Certificate Icon"
                  width={64}
                  height={64}
                  className="w-5 h-5 ml-2"
                />
                سطح حرفه ای
              </span>
            </div> */}
          </div>

          {user?.introduction_video?.length ? (
            <div className='grow lg:basis-5/12'>
              <Separator
                orientation='horizontal'
                className='mb-4 h-[1px] bg-slate-300 lg:hidden'
              />
              {user?.introduction_video?.length ? (
                <VideoPlayer src={user?.introduction_video} />
              ) : (
                <Skeleton className='aspect-video bg-slate-900' />
              )}
            </div>
          ) : null}
        </div>

        <Separator orientation='horizontal' className='h-[2px]' />
      </div>
    </>
  );
}
