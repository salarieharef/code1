import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import UserNoImageIcon from "@/static/icons/user-no-image.svg?url";

// Component imports
// import { Button } from "@/components/ui/button";

export default function CommentCard({ comment }: any) {
  return (
    <div className='rounded-xl bg-white px-6 py-2'>
      <div className='flex max-w-fit items-start'>
        <Avatar className='ml-3 h-10 w-10 text-base text-muted-foreground'>
          <AvatarImage
            src={comment?.user?.image || UserNoImageIcon}
          ></AvatarImage>

          <AvatarFallback>
            <Image
              src={UserNoImageIcon}
              width={20}
              height={20}
              alt=''
              className='h-full w-full'
            />
            <div className='absolute bottom-0 mb-2'>
              {comment?.user?.first_name
                ? comment?.user?.first_name.charAt(0).toUpperCase()
                : null}
              ‌.
              {comment?.user?.last_name
                ? comment?.user?.last_name.charAt(0).toUpperCase()
                : null}
            </div>
          </AvatarFallback>
        </Avatar>

        <div className='flex flex-col items-start'>
          <div className='flex items-center gap-x-2'>
            <span className='font-medium'>{comment?.user?.name}</span>
            <span className='text-xs text-muted-foreground'>
              {comment?.created_at_str}
            </span>
          </div>

          <p className='text-sm text-muted-foreground sm:text-base'>
            {comment?.msg}
          </p>

          {/* <Button variant="link" className="text-blue-400 p-0">
            پاسخ دادن
          </Button> */}
        </div>
      </div>
    </div>
  );
}
