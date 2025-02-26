// Icon imports
import YtIcon from "@/static/icons/social/youtube-icon.svg";
import FacebookIcon from "@/static/icons/social/facebook-icon.svg";
import InstagramIcon from "@/static/icons/social/instagram-icon.svg";
import LinkedinIcon from "@/static/icons/social/linkedin-icon.svg";
import TelegramIcon from "@/static/icons/social/telegram-icon.svg";
import XIcon from "@/static/icons/social/x-icon.svg";
import Link from "next/link";

// Type imports
import { socialType } from "@/types/about";

const socialLinks: socialType[] = [
  {
    page_url: "https://www.facebook.com",
    name: "Facebook",
    icon: (
      <FacebookIcon className='transition-ease-in size-7 duration-200 hover:size-8' />
    ),
  },
  {
    page_url: "https://www.facebook.com",
    name: "YouTube",
    icon: (
      <YtIcon className='transition-ease-in size-7 duration-200 hover:size-8' />
    ),
  },
  {
    page_url: "https://www.facebook.com",
    name: "Instagram",
    icon: (
      <InstagramIcon className='transition-ease-in size-7 duration-200 hover:size-8' />
    ),
  },
  {
    page_url: "https://www.facebook.com",
    name: "Linkedin",
    icon: (
      <LinkedinIcon className='transition-ease-in size-7 duration-200 hover:size-8' />
    ),
  },
  {
    page_url: "https://www.facebook.com",
    name: "Telegram",
    icon: (
      <TelegramIcon className='transition-ease-in size-7 duration-200 hover:size-8' />
    ),
  },
  {
    page_url: "https://www.facebook.com",
    name: "XIcon",
    icon: (
      <XIcon className='transition-ease-in size-7 duration-200 hover:size-8' />
    ),
  },
];

const Socials = () => {
  return (
    <div className='my-3 flex justify-center gap-1.5 md:my-2 md:justify-start'>
      {socialLinks.map((item: socialType, index) => (
        <Link key={index} target='_blank' href={item.page_url}>
          {item.icon}
        </Link>
      ))}
    </div>
  );
};

export default Socials;
