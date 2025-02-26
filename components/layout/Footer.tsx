import Image from "next/image";
import Link from "next/link";

// Constant imports
import { footerMenu } from "@/constant/footer/menu";

//icons
import LogoIcon from "@/static/icons/logo.svg?url";

// Component imports
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function Footer() {
  return (
    <div className='-mb-8 w-full bg-blue-900 pb-14 dark:bg-blue-950 md:mb-0 md:pb-0'>
      <div className='hidden flex-col items-center justify-center gap-2 py-8 md:flex'>
        <ul className='flex flex-row justify-center gap-4 lg:gap-8'>
          {footerMenu.users.map((link, index) => (
            <li
              className='text-xs font-medium leading-11 text-white sm:text-base md:text-lg lg:text-xl'
              key={`footer-users-link-${index}`}
            >
              <Link
                href={link.disabled ? "/" : link.href}
                className={link.disabled ? "cursor-not-allowed opacity-80" : ""}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
        <ul className='flex flex-row justify-center gap-4 lg:gap-8'>
          {footerMenu.about.map((link, index) => (
            <li
              className='text-xs font-medium leading-11 text-white sm:text-base md:text-lg lg:text-xl'
              key={`footer-about-link-${index}`}
            >
              <Link
                href={link.disabled ? "/" : link.href}
                className={link.disabled ? "cursor-not-allowed opacity-80" : ""}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Separator className='hidden bg-white md:block' />

      <div className='flex items-center justify-center p-2 md:p-4'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href='/'
                className='text-3.5xl font-extrabold text-blue-400'
              >
                <Image
                  src={LogoIcon}
                  width={100}
                  height={100}
                  className='w-20 md:w-24'
                  alt='کاتب'
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent side='bottom' sideOffset={10}>
              <p>برو به صفحه اصلی</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className='pb-2'>
        <a
          href='https://isfahan.iau.ir/sarait'
          className='flex flex-col items-center justify-center px-4 pb-2 text-center text-blue-50 hover:underline'
        >
          <p className='text-sm md:text-lg'>دانشگاه آزاد اسلامی</p>
          <p className='text-xs md:text-sm'>
            طراحی و تولید: توسط سرای نوآوری فناوری اطلاعات و ارتباطات دانشگاه
            آزاد اسلامی واحد اصفهان
          </p>
        </a>
        <a
          target='_blank'
          href='#'
          // href='https://trustseal.enamad.ir/?id=544450&Code=FmTk9bp5WV0NKeeuVAF76nrgtW79h8Qt'
        >
          <img
            referrerPolicy='origin'
            src='https://trustseal.enamad.ir/logo.aspx?id=544450&Code=FmTk9bp5WV0NKeeuVAF76nrgtW79h8Qt'
            alt=''
            data-code='FmTk9bp5WV0NKeeuVAF76nrgtW79h8Qt'
            className='mx-auto aspect-square max-h-24 max-w-24 cursor-pointer rounded bg-white object-contain'
          />
        </a>
      </div>
    </div>
  );
}
