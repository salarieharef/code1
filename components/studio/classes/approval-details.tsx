import WaitingIcon from "@/static/icons/waiting.svg";
import { Check } from "lucide-react";
import { WrapperOutlineText } from "../teaching-in-kateb/WrapperOutlineText";
import { Badge } from "@/components/ui/badge";

const ApprovalDetails = () => {
  const sections = [
    {
      title: "طرح اولیه درس",
      items: [
        "تایید ادمین ۱",
        "تایید ادمین ۲",
        "تایید ادمین ۳",
        "تایید ادمین ۴",
      ],
    },
    {
      title: "سرفصل ها",
      items: [
        "تایید ادمین ۱",
        "تایید ادمین ۲",
        "تایید ادمین ۳",
        "تایید ادمین ۴",
      ],
    },
    {
      title: "نمونه درس",
      items: [
        "تایید ادمین ۱",
        "تایید ادمین ۲",
        "تایید ادمین ۳",
        "تایید ادمین ۴",
      ],
    },
    {
      title: "روش همکاری",
      items: [
        "تایید ادمین ۱",
        "تایید ادمین ۲",
        "تایید ادمین ۳",
        "تایید ادمین ۴",
      ],
    },
    {
      title: "انعقاد قرارداد",
      items: [
        "تایید ادمین ۱",
        "تایید ادمین ۲",
        "تایید ادمین ۳",
        "تایید ادمین ۴",
      ],
    },
    {
      title: "ویدیوهای آپلود شده",
      items: [
        "تایید ادمین ۱",
        "تایید ادمین ۲",
        "تایید ادمین ۳",
        "تایید ادمین ۴",
      ],
    },
  ];

  return (
    <div className='max-h-full space-y-4 md:max-h-[85vh] md:overflow-y-auto'>
      {sections.map((section, index) => (
        <div
          key={index}
          // className='border-b border-slate-200 pb-4 last:border-b-0 last:pb-0'
        >
          <WrapperOutlineText
            titleBorder={section.title}
            className='mt-8 px-2  sm:px-6'
          >
            <div className='grid grid-cols-1 gap-1 space-y-1 sm:grid-cols-2 md:gap-5'>
              {section.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className='flex items-center justify-between gap-2 px-1 md:justify-evenly md:gap-5  '
                >
                  <label
                    htmlFor={`${section.title}-${itemIndex}`}
                    className='text-sm'
                  >
                    {item}
                  </label>
                  {itemIndex === 1 && section.title === "سرفصل ها" ? (
                    <Badge
                      className='flex items-center justify-center p-1'
                      variant='waiting'
                    >
                      <WaitingIcon className='rounded-ful h-4 w-4 fill-orange-100' />
                    </Badge>
                  ) : (
                    <Badge
                      className='flex items-center justify-center p-1 text-green-200'
                      variant='success'
                    >
                      <Check className='rounded-ful h-4 w-4' />
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </WrapperOutlineText>
        </div>
      ))}
    </div>
  );
};

export default ApprovalDetails;
