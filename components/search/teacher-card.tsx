"use client";
import Link from "next/link";

// Component imports
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

// Auth imports
import { useSession } from "next-auth/react";

// Fetch imports
import routes from "@/utils/api/routes";
import { useSWRConfig } from "swr";

// Icon imports
import UserNoImageIcon from "@/static/icons/user-no-image.svg?url";

import { nextFetcher } from "@/utils/api/next-fetcher";
import { Loader2, UserMinus2, UserPlus2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function TeacherCard({ data, className }: any) {
  const { data: session }: any = useSession();
  const { toast } = useToast();
  const { mutate } = useSWRConfig();
  const [following, setFollowing] = useState("");

  const Follow = async (id: string) => {
    try {
      setFollowing(id);

      // const res = await postFetcher(routes.userRoutes.follow, {
      //   user_id: id,
      // });
      const res = await nextFetcher({
        url: routes.userRoutes.follow,
        method: "POST",
        body: { user_id: id },
        useToken: true,
      });
      if (res?.success) {
        await mutate(routes.teacherRoutes.teachers({}));

        toast({
          variant: "success",
          title: res.msg,
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setFollowing("");
    }
  };

  const UnFollow = async (id: string) => {
    try {
      setFollowing(id);

      // const res = await postFetcher(routes.userRoutes.unFollow, {
      //   user_id: id,
      // });
      const res = await nextFetcher({
        url: routes.userRoutes.unFollow,
        method: "POST",
        body: { user_id: id },
        useToken: true,
      });

      if (res?.success) {
        await mutate(routes.teacherRoutes.teachers({}));

        toast({
          variant: "success",
          title: res.msg,
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setFollowing("");
    }
  };

  return (
    <Card className={`w-full rounded-2xl border-0 shadow-none ${className}`}>
      <Link href={`/profile/${data?.id}`}>
        <CardContent className='flex h-full flex-col items-center justify-center p-4'>
          <Avatar className='h-36 w-36 border-b-4 border-b-amber-500'>
            <AvatarImage
              src={data?.image || "/static/images/avatar/teacher-avatar.webp"}
              alt={data?.name}
            />
            <AvatarFallback>
              <Image
                src={UserNoImageIcon}
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

      <CardFooter className='flex flex-col p-0'>
        {session?.user && session?.user?.id !== data?.id ? (
          <Button
            className='hidden w-full items-center justify-center rounded-b-2xl rounded-t-none bg-blue-400 p-0 text-center text-white dark:bg-blue-600 md:flex'
            onClick={() => {
              data?.stats?.is_followed ? UnFollow(data?.id) : Follow(data?.id);
            }}
          >
            {data?.stats?.is_followed ? (
              <div className='flex items-center gap-2'>
                {following == data.id ? (
                  <Loader2 className='animate-spin' />
                ) : (
                  <UserMinus2 />
                )}
                <span>دنبال شده</span>
              </div>
            ) : (
              <div className='flex items-center gap-2'>
                {following == data.id ? (
                  <Loader2 className='animate-spin' />
                ) : (
                  <UserPlus2 />
                )}
                <span>دنبال کنید</span>
              </div>
            )}
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}
