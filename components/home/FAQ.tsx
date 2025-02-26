// components/home/FAQ.tsx
"use client";

import Image from "next/image";
import { Separator } from "../ui/separator";
import FAQAccordion from "./faq-accordion";
import FaqBackgroundImg from "@/static/images/global/faq-background.webp";

interface FAQProps {
  className?: string;
}

const FAQ: React.FC<FAQProps> = ({ className }) => {
  return (
    <div className={`relative mb-8 w-full ${className}`}>
      <Image
        src={FaqBackgroundImg}
        fill
        alt='FAQ background image'
        className='fill-width relative object-contain brightness-50'
      />
      <div
        id='faq-content'
        className='relative mx-18 text-center sm:px-28 md:px-4'
      >
        <h1 className='mb-4 mt-[25%] inline-block text-center text-3xl font-bold text-white sm:text-5xl md:text-6xl'>
          پرسش‌های پرتکرار
        </h1>

        <FAQAccordion />

        <Separator className='mt-10 bg-slate-500' />
      </div>
    </div>
  );
};

export default FAQ;
