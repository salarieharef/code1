"use client";
import Link from "next/link";

// Component imports
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Icon imports
import { LogOut } from "lucide-react";
import UserNoImageIcon from "@/static/icons/user-no-image.svg?url";

// Auth imports
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { signOut, useSession } from "next-auth/react";

// Config imports
import { UserMenu } from "@/constant/user/menu";
import { getImageUrlBase } from "@/utils/imageUtils";
import Image from "next/image";

// Api imports
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { useEffect } from "react";

export default function AccountDropdown() {
  const { data: session, update }: any = useSession();

  const { data: userInfo } = useSWRImmutable(
    session?.user ? routes.userRoutes.me : null,
    (url) => nextFetcher({ url, useToken: true })
  );

  useEffect(() => {
    if (userInfo?.data) {
      update({ user: { data: userInfo?.data } });
    }
  }, [userInfo]);

  return (
    <DropdownMenu dir='rtl'>
      <DropdownMenuTrigger asChild className='ml-2 cursor-pointer'>
        <Avatar className='border-b-2 border-amber-500'>
          <AvatarImage
            src={getImageUrlBase(userInfo?.data?.image)}
            className=' object-cover'
          ></AvatarImage>

          <AvatarFallback>
            <Image
              src={UserNoImageIcon}
              width={20}
              height={20}
              alt=''
              className='h-full w-full'
            />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mx-4 w-56'>
        <DropdownMenuLabel className='flex flex-col items-center justify-center'>
          <Avatar className='h-24 w-24 border-b-2 border-amber-500'>
            <AvatarImage
              src={getImageUrlBase(userInfo?.data?.image)}
              className=' object-cover'
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
                {userInfo?.data?.first_name
                  ? userInfo?.data?.first_name.charAt(0).toUpperCase()
                  : null}
                ‌.
                {userInfo?.data?.last_name
                  ? userInfo?.data?.last_name.charAt(0).toUpperCase()
                  : null}
              </div>
            </AvatarFallback>
          </Avatar>
          <span>{userInfo?.data?.name}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {UserMenu(userInfo?.data?.id).map((item, index) => (
          <div key={index}>
            {(item.rule == "any" || userInfo?.data?.type == item.rule) &&
            (item.title !== "معرفی رشته جدید" ||
              userInfo?.data?.access_to_field_introduce) ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={item.path || ""}>
                      <DropdownMenuItem className='flex cursor-pointer items-center gap-x-4 text-base'>
                        {item.icon}
                        <span>{item.title}</span>
                      </DropdownMenuItem>
                    </Link>
                  </TooltipTrigger>
                  {item?.tooltip ? (
                    <TooltipContent side='right'>
                      <p>{item.tooltip}</p>
                    </TooltipContent>
                  ) : null}
                </Tooltip>
              </TooltipProvider>
            ) : null}
          </div>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => signOut()}
          className='flex cursor-pointer items-center gap-x-4 text-base'
        >
          <LogOut className='h-5 w-5 stroke-1.5 text-muted-foreground' />
          خروج از حساب
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
