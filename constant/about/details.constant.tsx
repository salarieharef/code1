// Icon imports
import TelephoneIcon from "@/static/icons/about/telephone-icon.svg";
import TicketIcon from "@/static/icons/about/ticket-icon.svg";
import ChatIcon from "@/static/icons/about/chat-icon.svg";

// Type imports
import { contactProps } from "@/types/about";
import CallIcon from "@/static/icons/about/call-icon.svg";
import SupportIcon from "@/static/icons/about/support-icon.svg";
import ContactICon from "@/static/icons/about/contact-icon.svg";
import MessageIcon from "@/static/icons/about/message-icon.svg";

const contactSection = (): contactProps[] => [
  {
    title: "تماس تلفنی",
    icon: <TelephoneIcon className='size-16' />,
    description: "021-212122",
  },
  {
    title: "پشتیبانی تیکت",
    icon: <TicketIcon className='size-16' />,
    description: "021-212122",
  },
  {
    title: "گفتگوی آنلاین",
    icon: <ChatIcon className='size-16' />,
    description: "021-212122",
  },
];

const aboutIcons = () => {
  return {
    callIcon: <CallIcon className='size-9' />,
    supportIcon: <SupportIcon className='size-9' />,
    contactIcon: <ContactICon className='size-9' />,
    chatSupportIcon: <MessageIcon className='size-9' />,
  };
};

export { contactSection, aboutIcons };
