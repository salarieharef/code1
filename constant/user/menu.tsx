import {
  BookPlus,
  FilePlus,
  LayoutDashboard,
  PlusSquare,
  User,
  UserCog,
  Wallet,
} from "lucide-react";

export const UserMenu = (id: string) => [
  {
    path: `/profile/${id}`,
    title: "مشاهده پروفایل",
    icon: <User className='h-5 w-5 stroke-1.5 text-muted-foreground' />,
    tooltip: "مشاهده پروفایل عمومی خود.",
    rule: "any",
  },
  {
    path: `/studio/dashboard`,
    title: "داشبورد مدیریت",
    icon: (
      <LayoutDashboard className='h-5 w-5 stroke-1.5 text-muted-foreground' />
    ),
    tooltip: "داشبورد پروفایل شما.",
    rule: "any",
  },
  {
    path: `/studio/class/create`,
    title: "ایجاد درس جدید",
    icon: <PlusSquare className='h-5 w-5 stroke-1.5 text-muted-foreground' />,
    tooltip: "فرم ساخت درس جدید.",
    rule: "teacher",
  },
  {
    path: `/studio/field/create`,
    title: "معرفی رشته جدید",
    icon: <BookPlus className='h-5 w-5 stroke-1.5 text-muted-foreground' />,
    tooltip: "فرم ساخت رشته جدید.",
    rule: "teacher",
  },
  {
    path: `/studio/settings`,
    title: "تنظیمات پروفایل",
    icon: <UserCog className='h-5 w-5 stroke-1.5 text-muted-foreground' />,
    tooltip: "تنظیمات پروفایل شما.",
    rule: "any",
  },
  {
    path: `/studio/wallet`,
    title: "کیف پول",
    icon: <Wallet className='h-5 w-5 stroke-1.5 text-muted-foreground' />,
    tooltip: "کیف پول شما.",
    rule: "any",
  },
];
