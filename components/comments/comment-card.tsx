import Image from "next/image";

// Component imports
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";

// Icon imports
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import UserNoImageIcon from "@/static/icons/user-no-image.svg?url";

export function CommentCard({
  image,
  title,
  comment,
  username,
  userAvatar,
  date,
  classVideosCount,
}: any) {
  return (
    <Card className='w-full rounded-2xl border-0 p-0 shadow-none'>
      <CardContent className='flex w-full flex-row items-center justify-between p-0'>
        <div className='flex w-full flex-row items-center justify-start gap-x-4'>
          {/* <Checkbox className="w-6 h-6 rounded-[5px] border-2 border-slate-800" /> */}
          <Avatar className='border-b-2 border-amber-500 sm:h-16 sm:w-16'>
            <AvatarImage src={userAvatar || UserNoImageIcon}></AvatarImage>
            <AvatarFallback>
              {username ? username?.charAt(0).toUpperCase() : username}
            </AvatarFallback>
          </Avatar>
          <div className='flex w-full flex-1 flex-col items-start justify-start'>
            <h1 className='mt-1 flex flex-row items-center font-medium text-slate-700 sm:text-lg lg:mt-3'>
              {title ? (
                <>
                  {title}
                  <div className='mx-2 h-[0.3125rem] w-[0.3125rem] rounded-full bg-slate-500' />
                </>
              ) : null}
              <span className='text-sm font-medium text-slate-500'>{date}</span>
            </h1>
            <div className='inline-grid'>
              <span className='overflow-hidden truncate text-xs font-medium text-muted-foreground sm:text-base sm:text-black'>
                {comment}
              </span>
            </div>
          </div>
        </div>

        {image && (
          <Image
            src={image}
            alt={title}
            className='mr-24 hidden h-16 w-24 rounded-md object-cover sm:block'
            width={240}
            height={160}
          />
        )}
      </CardContent>
    </Card>
  );
}

export function CommentCardSkeleton() {
  return (
    <div className='flex w-full items-center gap-x-4'>
      {/* <Skeleton className="rounded w-6 h-6" /> */}
      <Skeleton className='h-16 w-16 rounded-full' />
      <div className='flex flex-1 flex-col items-start gap-y-4'>
        <Skeleton className='h-2 w-1/2' />
        <Skeleton className='h-2 w-full' />
      </div>
      <Skeleton className='mr-24 h-16 w-24 rounded-md' />
    </div>
  );
}
