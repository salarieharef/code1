"use client";

// Component imports
import IconTitleMaker from "@/components/agreement/icon-title-maker";
import AboutSimpleTable from "@/components/about/about-simple-table";
import ContactWays from "@/components/about/contact-ways";
import AboutSection from "@/components/about/about-section";
import Socials from "@/components/about/socials";
import ContactForm from "@/components/about/contact-form";
import SiteStats from "@/components/home/SiteStats";
import dynamic from "next/dynamic";

// Constant imports
import { sampleData } from "@/constant/about/list.constant";

// Type imports
import { contactProps } from "@/types/about";

//Icon imports
import TelephoneIcon from "@/static/icons/about/telephone-icon.svg";
import TicketIcon from "@/static/icons/about/ticket-icon.svg";
import ChatIcon from "@/static/icons/about/chat-icon.svg";
import CallIcon from "@/static/icons/about/call-icon.svg";
import SupportIcon from "@/static/icons/about/support-icon.svg";
import ContactICon from "@/static/icons/about/contact-icon.svg";
import MessageIcon from "@/static/icons/about/message-icon.svg";
import Link from "next/link";

// import Map from "@/components/global/Map";
const Map = dynamic(() => import("@/components/global/Map"), { ssr: false });

const contactSection: contactProps[] = [
  {
    title: "تماس تلفنی",
    icon: <TelephoneIcon className='size-16' />,
    description: "021-212122",
    phone: "021-212122",
  },
  {
    title: "پشتیبانی تیکت",
    icon: <TicketIcon className='size-16' />,
    description: "24ساعت",
  },
  {
    title: "گفتگوی آنلاین",
    icon: <ChatIcon className='size-16' />,
    description: "از طریق چت",
  },
];
const aboutIcons = {
  callIcon: <CallIcon className='size-7 md:size-9' />,
  supportIcon: <SupportIcon className='size-7 md:size-9' />,
  contactIcon: <ContactICon className='size-7 md:size-9' />,
  chatSupportIcon: <MessageIcon className='size-7 md:size-9' />,
};

const About = () => {
  return (
    <div className='mx-auto max-w-screen-xl px-4 py-6 md:py-12'>
      <AboutSection title={"تماس با کاتب"} icon={aboutIcons.callIcon}>
        <p className='text-center text-sm leading-relaxed md:text-right md:text-base'>
          تماس با کاتب، از طریق پورتال مشتریان، گفتگوی آنلاین و تماس تلفنی امکان
          پذیر است. بهترین و سریعترین روش، ارتباط از طریق پورتال مشتریان کاتب
          می‌باشد. چنانچه در پورتال مشتریان عضو هستید جهت استفاده از خدمات
          پشتیبانی می توانید به بخش ارسال تیکت مراجعه فرمایید.
        </p>

        <div className='flex justify-evenly pt-6'>
          {contactSection.map((item: contactProps) => (
            <div
              key={item.title}
              className='flex flex-col items-center justify-center gap-4 font-medium'
            >
              <IconTitleMaker
                key={item.title}
                icon={item.icon}
                title={item.title}
                className='gap-y-0 text-blue-400 *:bg-transparent *:font-semibold'
              />
              {item.phone ? (
                <Link href={`tel:${item.phone}`}>{item.description}</Link>
              ) : (
                <p>{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </AboutSection>

      <AboutSection icon={aboutIcons.supportIcon} title={"ساعات پاسخگویی ما"}>
        <div className='grid grid-cols-2 gap-x-20 gap-y-4 *:col-span-full md:my-4 md:gap-y-0 md:*:col-span-1'>
          <AboutSimpleTable data={sampleData} />
          <AboutSimpleTable data={sampleData} />
        </div>
      </AboutSection>

      <AboutSection icon={aboutIcons.contactIcon} title={"راه های ارتباطی"}>
        <div className='grid grid-cols-1 md:grid-cols-2'>
          <div>
            <ContactWays />
            <div className='mt-6'>
              <p className='text-center font-bold md:text-right'>
                کاتب را در صفحات مجازی دنبال کنید:
              </p>
              <Socials />
            </div>
          </div>
          <div className='h-[250px] w-full overflow-x-auto rounded-xl border shadow-xl'>
            <Map position={[35.6892, 51.389]} zoom={10} />
          </div>
        </div>
      </AboutSection>

      <AboutSection icon={aboutIcons.chatSupportIcon} title={"ارسال پیام"}>
        <p className='mb-10 text-center text-sm font-semibold md:text-right md:text-base'>
          جهت مشاوره و ارتباط با کارشناسان کاتب، فرم زیر را تکمیل نمایید.
        </p>
        <ContactForm />
      </AboutSection>

      <SiteStats
        className='bg-white pb-14'
        statClassName='m-1 shadow-xl shadow-blue-400/15'
        statHeader={
          <div className='mb-10 flex flex-col gap-2 text-center text-blue-800 '>
            <p className='text-xl font-semibold md:text-3xl '>
              مورد اعتماد مشتریانمان هستیم
            </p>
            <p className='text-sm md:text-base'>
              با سرویس های آموزشی کاتب با خیال راحت به تدریس یا آموزش دروس خود
              بپردازید
            </p>
          </div>
        }
      />
    </div>
  );
};

export default About;
