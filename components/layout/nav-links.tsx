"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { forwardRef, useContext } from "react";
// import { Separator } from "@/components/ui/separator";
// local components
import { CartDrawer } from "@/components/global/cart/CartDrawer";

// icon imports
import Teaching from "@/components/global/icons/Teaching";
import { FilePieChart, Home, LayoutGrid, MessagesSquare } from "lucide-react";

// auth imports
import { useSession } from "next-auth/react";

// navigation
import { global_context } from "@/context/global";
import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useSWRImmutable from "swr/immutable";
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";

// divided for better readability
const navigationMenuLinkClass =
  "text-customGray text-sm lg:text-sm font-medium transition-colors focus:text-accent-foreground focus:outline-none" +
  "hover:bg-accent hover:text-accent-foreground focus:bg-accent cursor-pointer" +
  " disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50" +
  "bg-transparent hover:bg-transparent focus:bg-transparent text-black data-[state=open]:bg-transparent dark:text-muted-foreground";
export function NavLinks() {
  const { data: session }: any = useSession();
  const pathname = usePathname();
  const { setTeachingHelpDialog, setSignupUserType }: any =
    useContext(global_context);

  const { data: userInfo } = useSWRImmutable(
    session?.user ? routes.userRoutes.me : null,
    (url) => nextFetcher({ url, useToken: true })
  );

  // declaring the paths
  const teacherStudioPaths = ["/studio/classes", "/studio/dashboard"];
  const isHome = pathname === "/";
  const isCategory = pathname === "/category";
  const isDiscussions = pathname === "/discussions";
  const isTeaching = teacherStudioPaths.includes(pathname);

  return (
    <>
      <NavigationMenu dir='rtl' className='flex w-full'>
        <NavigationMenuList className='flex w-full items-center'>
          <div className='flex gap-x-8'>
            <NavigationMenuItem>
              <Link href='/' legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuLinkClass}>
                  <div
                    className={`flex items-center ${isHome ? "font-bold" : ""} dark:text-muted-foreground`}
                  >
                    {/* must use in class not the fill prop, or it will change color from fill black to gray with delay */}
                    <Home
                      className={`ml-1 ${isHome ? "fill-current text-customGray dark:text-muted-foreground" : "fill-none text-customGray dark:text-muted-foreground"}`}
                    />
                    صفحه اصلی
                  </div>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href='/category?section=university' legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuLinkClass}>
                  <div
                    className={`flex items-center ${isCategory ? "font-bold" : ""} dark:text-muted-foreground`}
                  >
                    <LayoutGrid
                      className={`ml-1 ${isCategory ? "fill-current text-customGray dark:text-muted-foreground" : "fill-none text-customGray dark:text-muted-foreground"}`}
                    />
                    دسته بندی
                  </div>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem className='gap-x-5'>
              <Link href='/discussions' legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuLinkClass}>
                  <div
                    className={`flex items-center ${isDiscussions ? "font-bold" : ""} dark:text-muted-foreground`}
                  >
                    <MessagesSquare
                      className={`ml-1 ${isDiscussions ? "fill-current text-customGray dark:text-muted-foreground" : "fill-none text-customGray dark:text-muted-foreground"}`}
                    />
                    مباحث
                  </div>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {userInfo?.data?.type == "teacher" &&
            userInfo?.data?.teaching_in_kateb ? (
              <NavigationMenuItem className='gap-x-5'>
                <DropdownMenu dir='rtl'>
                  <DropdownMenuTrigger className='focus:outline-none'>
                    <NavigationMenuLink className={navigationMenuLinkClass}>
                      <div className='flex items-center'>
                        <Teaching className='ml-1 ' />
                        تدریس در کاتب
                      </div>
                    </NavigationMenuLink>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link
                        href={
                          userInfo?.data?.last_teaching_course_id
                            ? `/studio/teaching-in-kateb/course/${userInfo?.data?.last_teaching_course_id}/edit`
                            : "/studio/teaching-in-kateb/course/add"
                        }
                      >
                        ایجاد درخواست تدریس جدید
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href='/studio/classes'>درخواست های تدریس قبلی</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuLink
                className={navigationMenuLinkClass}
                onClick={() => setTeachingHelpDialog(true)}
              >
                <div className='flex items-center'>
                  <Teaching className='ml-1 ' />
                  تدریس در کاتب
                </div>
              </NavigationMenuLink>
            )}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu dir='rtl' className='flex w-full'>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuLinkClass}>
              <CartDrawer labelClass={navigationMenuLinkClass} />
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
