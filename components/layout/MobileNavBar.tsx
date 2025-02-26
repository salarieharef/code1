"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Component imports
import { CartDrawer } from "@/components/global/cart/CartDrawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Config imports
import { mobileNavMenu } from "@/constant/studio/menus";

//icons
import UserNoImageIcon from "@/static/icons/user-no-image.svg?url";

// Util imports
import includes from "lodash-es/includes";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useContext } from "react";
import { global_context } from "@/context/global";

export default function MobileNavBar() {
  const pathname = usePathname();
  const menuItems = mobileNavMenu;
  const { data: session }: any = useSession();

  const { setTeachingHelpDialog, setSignupUserType }: any =
    useContext(global_context);

  return (
    <div className='sticky bottom-0 z-20 grid w-full grid-cols-5 items-end overflow-hidden rounded-t-3xl bg-blue-900 py-2 shadow md:hidden'>
      {menuItems.map((item: any, index: number) => {
        const includesItem = includes(pathname, item.path)
          ? "text-white"
          : "text-slate-300";

        const home = item.path == pathname ? "text-white" : "text-slate-300";

        const textColor = item.path == "/" ? home : includesItem;

        // If the current item's path is '/cart', render the CartDrawer component
        if (item.path === "/cart") {
          return <CartDrawer key={index} labelClass={textColor} />;
        }
        if (item.path === "/studio/teaching-in-kateb") {
          return (
            <div
              key={index}
              className={`${textColor} flex flex-col items-center justify-center gap-1 text-sm`}
              onClick={() => {
                setSignupUserType("teacher");
                setTeachingHelpDialog(true);
              }}
            >
              {item.icon}
              <span>{item.title}</span>
            </div>
          );
        }

        if (item.path === "/studio/dashboard" && session?.user) {
          return (
            <Link
              key={index}
              href={item?.path || ""}
              className={`${textColor} flex flex-col items-center justify-center gap-1 text-xs`}
            >
              <Avatar className='h-7 w-7 border-b-2 border-amber-500'>
                <AvatarImage src={session?.user?.image}></AvatarImage>

                <AvatarFallback>
                  <Image
                    src={UserNoImageIcon}
                    width={20}
                    height={20}
                    alt=''
                    className='h-full w-full'
                  />
                  <div className='absolute bottom-0 mb-2'>
                    {session?.user?.first_name
                      ? session?.user?.first_name.charAt(0).toUpperCase()
                      : null}
                    ‌.
                    {session?.user?.last_name
                      ? session?.user?.last_name.charAt(0).toUpperCase()
                      : null}
                  </div>
                </AvatarFallback>
              </Avatar>
              <span>{item.title}</span>
            </Link>
          );
        }

        // Otherwise, render the Link component as usual
        return (
          <Link
            key={index}
            href={item?.path}
            className={`${textColor} flex flex-col items-center justify-center gap-1 text-sm`}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        );
      })}
    </div>
  );
}
