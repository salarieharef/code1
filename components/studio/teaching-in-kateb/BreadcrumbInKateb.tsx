// components/BreadcrumbInKateb.tsx
import React from "react";
import { BreadcrumbComponent } from "@/components/global/BreadcrumbComponent";

export const BreadcrumbInKateb = () => (
  <div className='py-4'>
    <div className='col-span-full mx-4 my-2 sm:mx-8 sm:my-4 lg:col-span-8'>
      <div className='mb-3 flex justify-start rounded-lg bg-slate-150 py-2 sm:px-1 md:px-4'>
        <BreadcrumbComponent
          links={[
            { type: "link", href: "/", label: "سامانه آموزشی کاتب" },
            { type: "page", label: "تدریس در کاتب" },
          ]}
        />
      </div>
    </div>
  </div>
);
