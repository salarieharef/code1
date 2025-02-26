"use client";

import { BreadcrumbSpecial } from "@/components/global/BreadcrumbSpecial";
import React from "react";
import { usePathname } from "next/navigation";
import AboutHeroSection from "@/components/about/about-hero-section";

const AboutLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  const links: any = [
    { type: "link", href: "/", label: "صفحه اصلی" },
    { type: "link", href: "/about", label: "درباره ما" },
  ];

  const currentStepIndex = links.findIndex(
    (link: any) => link.href === pathname
  );

  const filteredLinks = links
    .slice(0, currentStepIndex + 1)
    .map((link: any, index: number) => ({
      ...link,
      type: index === currentStepIndex ? "page" : "link",
    }));

  return (
    <div className='bg-white'>
      <div className='mx-auto my-2 px-0.5 md:my-4 md:px-7 lg:mr-0'>
        <div className='mb-3 flex justify-start rounded-lg bg-slate-200/50 py-2 sm:px-1 md:px-4'>
          <BreadcrumbSpecial links={filteredLinks} />
        </div>
      </div>
      <AboutHeroSection />
      {children}
    </div>
  );
};

export default AboutLayout;
