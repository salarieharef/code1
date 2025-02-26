import Link from "next/link";

interface TitleSectionProps {
  title: string;
  linkHref: string;
  linkText: string;
  className?: string;
}

export default function TitleSection({
  title,
  linkHref,
  linkText,
  className = "",
}: TitleSectionProps) {
  return (
    <div className={`hidden md:flex w-full items-center justify-center ${className}`}>
      <div className='mx-2 mb-2 mt-5 flex justify-between px-2 py-2 sm:w-4/5'>
        <h1 className='md:text-1xl hidden text-lg font-bold text-slate-700 md:flex md:text-amber-400 lg:text-4xl'>
          {title}
        </h1>
        <Link href={linkHref||""} className='flex items-center'>
          <span className='text-md md:text-md font-medium text-white lg:text-lg'>
            {linkText}
          </span>
        </Link>
      </div>
    </div>
  );
}