import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useContext } from "react";
import { global_context } from "@/context/global";

import TeachingIcon from "@/static/icons/teaching-in-kateb/teaching-kateb.svg?url";
const data = [
  {
    title: "تدریس در کاتب",
    description:
      "استاد ها دو ترفند برای آموزش در اختیار دارند در سایت یکی از محبوب ترین روش ها کلاس های آنلاین هست. آنچه می یابید ممکن است شما را شگفت زده و الهام بخش کند",
    image: TeachingIcon,
    link: "",
    modal: "teaching-in-kateb",
    reverse: true,
  },
  // {
  //   title: "دسته بندی کلاس‌ها",
  //   description:
  //     "تمام کلاس ها دسته بندی شده اند و شما می توانید تمام کلاس های مربوط به رشته خود را به راحتی پیدا کنید",
  //   image: "/static/images/teaching/category-class.svg",
  //   link: "/",
  //   reverse: false,
  // },
];

const Section = ({ title, description, image, link, modal, reverse }: any) => {
  const { setTeachingHelpDialog }: any = useContext(global_context);

  return (
    <div
      className={`flex flex-row ${
        reverse ? "flex-row-reverse " : ""
      } sm:gag-4 my-4 items-center gap-1 rounded-xl border bg-white px-1 md:gap-0 md:rounded-none md:border-none md:bg-transparent md:px-8`}
    >
      <div className='py-1.5 md:p-4 '>
        <div
          className={cn(
            "flex flex-col",
            reverse ? "items-start " : "items-end"
          )}
        >
          <div
            className={cn(
              "px-1.5 md:px-4",
              reverse
                ? "border-r-4 border-slate-200"
                : "border-l-4 border-slate-200 text-left"
            )}
          >
            <div
              className={cn(
                "flex items-center justify-between",
                reverse ? "flex-row" : "flex-row-reverse"
              )}
            >
              <h2 className='mb-4 text-sm font-bold text-blue-700 md:text-xl'>
                {title}
              </h2>
              {link ? (
                <Link
                  href={link}
                  className='mb-4 flex rounded-xl bg-blue-500 px-1.5 py-1.5 text-center text-white md:hidden'
                >
                  مشاهده
                </Link>
              ) : (
                <Button
                  className='mb-4 flex rounded-xl bg-blue-500 px-1.5 py-1.5 text-center text-white md:hidden'
                  onClick={
                    modal == "teaching-in-kateb"
                      ? () => setTeachingHelpDialog(true)
                      : () => {}
                  }
                >
                  مشاهده
                </Button>
              )}
            </div>

            <p className='text-xs text-slate-600 md:text-lg'>{description}</p>
          </div>
          <div>
            {link ? (
              <Link
                href={link}
                className='my-2 hidden w-32 rounded-3xl bg-blue-500 px-2 py-2 text-center text-white md:inline-block'
              >
                مشاهده
              </Link>
            ) : (
              <Button
                className='my-2 hidden w-32 rounded-3xl bg-blue-500 px-2 py-2 text-center text-white md:inline-block'
                onClick={
                  modal == "teaching-in-kateb"
                    ? () => setTeachingHelpDialog(true)
                    : () => {}
                }
              >
                مشاهده
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className='w-1/3 p-1 md:w-1/2 md:p-4'>
        <Image
          src={image}
          alt={title}
          width={200}
          height={200}
          className='h-auto max-h-96 w-full min-w-24 md:max-w-96'
        />
      </div>
    </div>
  );
};

const FeatureSection = () => {
  return (
    <div className='container mb-14 w-full bg-slate-50 px-2 pt-0 dark:bg-slate-900 md:px-5 md:pt-8 lg:px-16 '>
      {data.map((item, index) => (
        <Section
          key={index}
          title={item.title}
          description={item.description}
          image={item.image}
          link={item.link}
          modal={item.modal}
          reverse={item.reverse}
        />
      ))}
    </div>
  );
};

export default FeatureSection;
