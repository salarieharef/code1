"use client";
import Link from "next/link";

// Component imports
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

// Auth imports
import { useSession } from "next-auth/react";
import AccountDropdown from "./account-dropdown";
import { SearchBox } from "./search-box";

// Context imports
import { SignUpLoginModal } from "../authentication/SignUpLoginModal";

// Hook imports
import IntroducerDialog from "../studio/teaching-in-kateb/introduce/introducer-dialog";
import NavLinksWrapper from "./NavLinksWrapper";

//icons
import LogoIconFooter from "@/static/icons/logo.svg?url";

export default function Header() {
  const { data: session }: any = useSession();

  // const MemoizedNavLinksWrapper = memo(NavLinksWrapper);

  return (
    <header className='z-30 flex w-full flex-col pb-0 md:sticky md:top-0'>
      <div className='z-30 flex w-full items-center justify-between bg-blue-900 px-4 pr-7 md:py-2 lg:gap-x-4 xl:gap-x-28'>
        {/* Logo and search */}
        <div className='hidden items-center gap-x-4 md:flex md:w-2/3 lg:w-1/2'>
          <nav className='hidden items-center md:flex'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href='/'
                    className='text-3.5xl font-extrabold text-blue-400'
                  >
                    <Image
                      src={LogoIconFooter}
                      width={125}
                      height={125}
                      alt='کاتب'
                    />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side='bottom' sideOffset={10}>
                  <p>برو به صفحه اصلی</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Desktop Search input */}
          </nav>
          <SearchBox className='hidden w-full md:flex' />
        </div>

        {/* Sign up and login */}
        <div className='hidden items-center gap-x-2 md:flex'>
          {session?.token ? (
            <>
              <AccountDropdown />
            </>
          ) : (
            <>
              <SignUpLoginModal />
              {/* <ForgotPasswordModal /> */}
            </>
          )}
        </div>
      </div>

      {/* New full-width row white background */}
      <NavLinksWrapper />
      <IntroducerDialog />

      {/* Tablet Search input */}
      <SearchBox className='mx-3 my-4 flex md:mx-32  md:my-6  md:hidden' />
    </header>
  );
}
