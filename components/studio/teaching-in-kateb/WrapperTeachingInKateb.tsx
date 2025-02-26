"use client";
import { BreadcrumbComponent } from "@/components/global/BreadcrumbComponent";
import { stepList } from "@/constant/course/form.constant";
import { course_form_context } from "@/context/course/form.context";
import { cn } from "@/utils/cn";
import { useSearchParams } from "next/navigation";
import { useContext } from "react";

interface WrapperTeachingInKatebProps {
  children: React.ReactNode;
  showProgress?: JSX.Element;
  subtitleStep?: string;
}

const WrapperTeachingInKateb: React.FC<WrapperTeachingInKatebProps> = ({
  children,
  showProgress,
  subtitleStep,
}) => {
  const searchParams = useSearchParams();
  const stepPath = Number(searchParams.get("step")) || 1;
  const currentSubtitle = stepList[stepPath - 1]?.label || "";

  return (
    <>
      {/* Breadcrumb */}
      <BreadcrumbSection />

      <div className='relative'>
        <div className='mx-auto md:container md:px-6 md:py-4'>
          <Header showProgress={showProgress} subtitleStep={subtitleStep} />
          {children}
        </div>
      </div>
    </>
  );
};

const BreadcrumbSection = () => (
  <div className='mx-4 my-2 mb-3 hidden justify-start rounded-lg bg-slate-150 py-2 md:mx-8 md:my-4 md:block md:px-1 lg:px-4'>
    <BreadcrumbComponent
      links={[
        { type: "link", href: "/", label: "سامانه آموزشی کاتب" },
        { type: "link", href: "/studio", label: "استودیو" },
        { type: "page", label: "تدریس در کاتب" },
      ]}
    />
  </div>
);

const Header = ({
  showProgress,
  subtitleStep,
}: {
  showProgress?: JSX.Element;
  subtitleStep?: string;
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-slate-150 px-2 text-center md:bg-transparent",
        showProgress && "justify-between gap-1 md:justify-center"
      )}
    >
      <div className='py-4 text-right'>
        <h1
          className={cn(
            "bg-slate-150 text-xl font-bold md:bg-transparent md:text-2xl",
            showProgress && "text-xl font-bold md:text-2xl"
          )}
        >
          تدریس در کاتب
        </h1>
        {subtitleStep && (
          <p className='py-0.5 text-xs font-normal text-slate-500 md:hidden'>
            {subtitleStep}
          </p>
        )}
      </div>
      {/* just for md */}
      {showProgress}
    </div>
  );
};

export default WrapperTeachingInKateb;
