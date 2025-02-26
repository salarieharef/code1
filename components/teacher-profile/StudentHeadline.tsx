"use client";
import { useParams } from "next/navigation";
import { useState } from "react";

// Component  imports
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// Icon imports
import { Loader2, UserMinus2, UserPlus2 } from "lucide-react";
import UserNoImageIcon from "@/static/icons/user-no-image.svg?url";

// Auth imports
import { nextFetcher } from "@/utils/api/next-fetcher";
import { useFollow } from "@/hooks/UseFollow";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function StudentHeadLine({ user, mutate }: any) {
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
            <AvatarImage src={user?.image || UserNoImageIcon}></AvatarImage>

            <AvatarFallback>
              <Image
                src={UserNoImageIcon}
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

        {/* <div className="sm:mt-10 md:mt-12 xl:mt-18">
          <ProfileDropdown />
        </div> */}
      </div>

      <div className='-mt-2 flex flex-col md:-mt-4 xl:-mt-8'>
        <div className='flex w-full flex-row items-start justify-between'>
          <div className='mr-28 flex flex-row gap-1 py-0 md:mr-32 md:gap-2 xl:mr-44 xl:gap-4'>
            <span className='text-xs font-bold text-slate-500 md:text-base xl:text-lg'>
              <span className='ml-1 text-sm font-black text-slate-800 md:text-lg xl:text-xl'>
                {user?.stats?.followers}
              </span>
              دنبال‌کننده
            </span>
            <span className='text-xs font-bold text-slate-500 md:text-base xl:text-lg'>
              <span className='ml-1 text-sm font-black text-slate-800 md:text-lg xl:text-xl'>
                {user?.stats?.followings}
              </span>
              دنبال‌شونده
            </span>
          </div>

          {session?.user && session?.user?.id !== user?.id ? (
            <Button
              className='flex h-0 gap-2 rounded-sm bg-blue-400 px-2 py-2 text-xs hover:bg-blue-500 md:rounded md:px-4 md:py-4 md:text-base'
              type='button'
              onClick={handleFollowToggle} // Use the toggle function
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

        <div className='mt-4 flex flex-col gap-4 sm:mt-14 lg:flex-row'>
          <div>
            <h3 className='text-xl font-bold text-slate-800'>درباره من</h3>
            <p
              className='text-justify text-lg font-normal text-slate-700'
              dangerouslySetInnerHTML={{ __html: user?.description }}
            ></p>
          </div>
        </div>

        <Separator
          orientation='horizontal'
          className='mt-4 h-[2px] bg-slate-300'
        />
      </div>
    </>
  );
}
