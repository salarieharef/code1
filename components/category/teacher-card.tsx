"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";

import { useFollow } from "@/hooks/UseFollow";
import { Loader2, UserMinus2, UserPlus2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import NoImageIcon from "@/static/icons/no-image.svg?url";

export default function TeacherCard({ className, data, mutate }: any) {
  const { data: session }: any = useSession();

  const { following, Follow, UnFollow } = useFollow(mutate);
  const [isFollowed, setIsFollowed] = useState(data.stats.is_followed);

  // Function to handle follow/unfollow
  const handleFollowToggle = async () => {
    if (isFollowed) {
      await UnFollow(data?.id);
      setIsFollowed(false); // Optimistically update the UI to unfollowed state
    } else {
      await Follow(data?.id);
      setIsFollowed(true); // Optimistically update the UI to followed state
    }
  };

  return (
    <Card
      className={`h-full w-full rounded-2xl border-0 shadow-none ${className}`}
      title={data?.name}
    >
      <CardContent className='p-0'>
        <Link href={`/profile/${data?.id}`}>
          <CardContent className='flex h-full flex-col items-center justify-center text-nowrap p-4 '>
            <Avatar className='size-20 border-b-4 border-b-amber-500 sm:size-36'>
              <AvatarImage
                src={data?.image || "/static/images/avatar/teacher-avatar.webp"}
                alt={data?.name}
              />
              <AvatarFallback>
                <Image
                  src={NoImageIcon}
                  width={20}
                  height={20}
                  alt=''
                  className='h-full w-full'
                />
                <div className='absolute bottom-0 mb-2'>
                  {data?.first_name
                    ? data?.first_name.charAt(0).toUpperCase()
                    : null}
                  ‌.
                  {data?.last_name
                    ? data?.last_name.charAt(0).toUpperCase()
                    : null}
                </div>
              </AvatarFallback>
            </Avatar>

            <h1 className='mt-3 w-full truncate text-center text-base font-medium'>
              {data?.name}
            </h1>

            <div className='mt-2 flex flex-wrap justify-around gap-x-4 gap-y-2'>
              <span className='text-xs text-primary'>
                {data?.stats?.followers} دنبال کننده
              </span>
              <span className='text-xs text-primary'>
                {data?.stats?.likes_count || 0} پسندیدن
              </span>
              <span className='text-xs text-primary'>
                {data?.stats?.views_count || 0} بازدید
              </span>
            </div>
          </CardContent>
        </Link>
        <CardFooter className='flex w-full flex-col p-0'>
          {session?.user && session?.user?.id !== data?.id ? (
            <Button
              className='hidden w-full items-center justify-center rounded-b-2xl rounded-t-none bg-blue-400 p-0 text-center text-white dark:bg-blue-600 md:flex'
              onClick={handleFollowToggle} // Use the toggle function
            >
              {following === data?.id ? (
                <Loader2 className='animate-spin' />
              ) : isFollowed ? (
                <div className='flex items-center gap-2'>
                  <UserMinus2 />
                  <span>دنبال شده</span>
                </div>
              ) : (
                <div className='flex items-center gap-2'>
                  <UserPlus2 />
                  <span>دنبال کنید</span>
                </div>
              )}
            </Button>
          ) : null}
        </CardFooter>
      </CardContent>
    </Card>
  );
}
