import Link from "next/link";

import Offline_classes from "@/static/icons/diff/offline_classes.svg";
import Online_classes from "@/static/icons/online_classes.svg";
import Live_classes from "@/static/icons/live_classes.svg";
import In_person_classes from "@/static/icons/in_person_classes.svg";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const infoData = [
  {
    icon: <Offline_classes className='m-1' />,
    title: "درس های آفلاین",
    description:
      "درس های آفلاین شامل محتواهای آپلود شده در سایت در قالب ویدیو هستند که از طرف اساتید بارگذاری میشوند و میتواند شامل آزمون در حین مشاهده ویدیو، تکلیف، زیرنویس با قابلیت جستجو در محتوا برای دانشجویان باشد. امکان ترجمه محتوا به زبان های دیگر، تحلیل آزمون، مشخص شدن نقاط ضعف و قوت دانشجویان، پیشنهاد مشاهده محتوا هدفمند به دانشجو در جهت کاهش نقاط ضعف او از جمله موارد دیگری است که بزودی در سامانه فعال خواهد شد.",
    soon: false,
  },
  {
    icon: <Online_classes className='m-4' />,
    title: "درس های آنلاین",
    description:
      "در درس های آنلاین دانشجویان به صورت برخط در درس شرکت می کنند. هدف اصلی از اینگونه درس ها ارتباط مستقیم با استاد در جهت رفع سوالات و ابهامات به صورت تعامل دو طرفه است.",
    soon: true,
  },
  {
    icon: <Live_classes className='m-4' />,
    title: "درس های زنده",
    description:
      "درس های زنده شامل ویدیوهایی هستند که با اعلام قبلی بصورت برخط در سامانه پخش می شوند.",
    soon: true,
  },
  {
    icon: <In_person_classes className='m-4' />,
    title: "درس های حضوری",
    description:
      "در درس های حضوری، دانشجو می تواند درخواست درس خصوصی با یک استاد دلخواه را داشته باشد. اینگونه درس ها در مکان های مورد تایید واحد دانشگاهی برگزار خواهد شد.",
    soon: true,
  },
];

const ClassInfo: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className='mb-10 grid gap-4 px-8 md:px-14 lg:grid-cols-2'>
    {infoData.map((info, index) => (
      <Card key={index} className='flex gap-4 p-4'>
        {/* <CardContent className='flex items-start'> */}
        <div className='flex flex-col items-center gap-2'>
          <div className='-mt-8 w-16 rounded-full bg-blue-400 md:mt-0 md:h-16'>
            {info?.icon}
          </div>
          <Link href='/category' className='block font-medium text-blue-400'>
            مشاهده
          </Link>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between'>
            <CardTitle className='text-lg font-normal'>{info.title}</CardTitle>
            {info?.soon ? (
              <Badge variant='destructive' className='py-0'>
                به زودی
              </Badge>
            ) : null}
          </div>

          <CardDescription>{info.description}</CardDescription>
        </div>
        {/* </CardContent> */}
      </Card>
    ))}
  </div>
);

export default ClassInfo;
