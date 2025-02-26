import Teaching from "@/static/icons/teaching.svg";
import {
  Badge,
  Edit2,
  Files,
  GalleryVerticalEnd,
  Grid2X2,
  Heart,
  History,
  Home,
  LayoutDashboard,
  LibraryBig,
  LineChart,
  LogOut,
  MessagesSquare,
  MonitorPlay,
  PencilRuler,
  PlayCircle,
  SaveAll,
  Settings,
  ShoppingCart,
  User2,
  Wallet,
} from "lucide-react";

export const studioTeacherMenu = [
  {
    path: `/studio/dashboard`,
    title: "داشبورد",
    icon: <LayoutDashboard className='ml-1 h-7 w-7 stroke-2 opacity-90' />,
    rule: "any",
  },
  {
    path: `/studio/classes`,
    title: "تدریس",
    icon: <GalleryVerticalEnd className='ml-1 h-7 w-7 stroke-2 opacity-90' />,
    rule: "teacher",
  },
  {
    path: `/studio/fields`,
    title: "رشته‌ها",
    icon: <LibraryBig className='ml-1 h-7 w-7 stroke-2 opacity-90' />,
    rule: "teacher",
  },
  {
    path: `/studio/lessons`,
    title: "جلسات",
    icon: <PlayCircle className='ml-1 h-7 w-7 stroke-2 opacity-90' />,
    rule: "teacher",
  },
  {
    path: `/studio/comments`,
    title: "نظرات",
    icon: <MessagesSquare className='ml-1 h-7 w-7 stroke-2 opacity-90' />,
    rule: "teacher",
  },
  {
    path: `/studio/history`,
    title: "تاریخچه",
    icon: <History className='ml-1 h-7 w-7 stroke-2 opacity-90' />,
    rule: "any",
  },
  {
    path: `/studio/favorites`,
    title: "پسندیدن",
    icon: <Heart className='ml-1 h-7 w-7 stroke-2 opacity-90' />,
    rule: "any",
  },
  {
    path: `/studio/recommendation`,
    title: "پیشنهاد‌ها",
    icon: <Badge className='ml-1 h-7 w-7 stroke-2 opacity-90' />,
    rule: "any",
  },
  {
    path: `/studio/saved`,
    title: "ذخیره‌ها",
    icon: <SaveAll className='ml-1 h-7 w-7 stroke-2 opacity-90' />,
    rule: "any",
  },
  {
    path: `/studio/wallet`,
    title: "کیف‌پول",
    icon: <Wallet className='ml-1 h-7 w-7 stroke-2 opacity-90' />,
    rule: "any",
  },
  {
    path: `/studio/settings`,
    title: "تنظیمات",
    icon: <Settings className='ml-1 h-7 w-7 stroke-2 opacity-90' />,
    rule: "any",
  },
  {
    path: `/`,
    title: "خروج",
    icon: <LogOut className='ml-1 h-7 w-7 stroke-2 opacity-90' />,
    rule: "any",
    action: "signOut",
  },
];

export const studioClassMenu = (classId: any) => [
  {
    path: `/studio/class/${classId}/details`,
    title: "جزئیات",
    icon: <Edit2 className='ml-1 h-7 w-7 stroke-2' />,
  },
  {
    path: `/studio/class/${classId}/lessons`,
    title: "جلسات",
    icon: <PlayCircle className='ml-1 h-7 w-7 stroke-2' />,
  },

  {
    path: `/studio/class/${classId}/comments`,
    title: "نظرات",
    icon: <MessagesSquare className='ml-1 h-7 w-7 stroke-2' />,
  },
  {
    path: `/studio/class/${classId}/analytics`,
    title: "تجزیه‌وتحلیل",
    icon: <LineChart className='ml-1 h-7 w-7 stroke-2' />,
  },
  {
    path: `/studio/class/${classId}/files`,
    title: "موارد مرتبط",
    icon: <Files className='ml-1 h-7 w-7 stroke-2' />,
  },
];

export const studioFieldMenu = (fieldId: any) => [
  {
    path: `/studio/field/${fieldId}/details`,
    title: "جزئیات",
    icon: <Edit2 className='ml-1 h-7 w-7 stroke-2' />,
  },
  {
    path: `/studio/field/${fieldId}/lessons`,
    title: "جلسات",
    icon: <PlayCircle className='ml-1 h-7 w-7 stroke-2' />,
  },
  {
    path: `/studio/field/${fieldId}/comments`,
    title: "نظرات",
    icon: <MessagesSquare className='ml-1 h-7 w-7 stroke-2' />,
  },
  {
    path: `/studio/field/${fieldId}/analytics`,
    title: "تجزیه‌وتحلیل",
    icon: <LineChart className='ml-1 h-7 w-7 stroke-2' />,
  },
  {
    path: `/studio/field/${fieldId}/files`,
    title: "موارد مرتبط",
    icon: <Files className='ml-1 h-7 w-7 stroke-2' />,
  },
];

export const studioLessonMenu = (lessonId: any) => [
  {
    path: `/studio/lesson/${lessonId}/details`,
    title: "جزئیات",
    icon: <Edit2 className='ml-1 h-7 w-7 stroke-2' />,
  },
  // {
  //   path: `/studio/class/${lessonId}/lessons`,
  //   title: "دروس",
  //   icon: <PlayCircle className="w-7 h-7 ml-1 stroke-2" />,
  // },
  // {
  //   path: `/studio/class/${lessonId}/comments`,
  //   title: "نظرات",
  //   icon: <MessagesSquare className="w-7 h-7 ml-1 stroke-2" />,
  // },
  {
    path: `/studio/lesson/${lessonId}/files`,
    title: "موارد مرتبط",
    icon: <Files className='ml-1 h-7 w-7 stroke-2' />,
  },
  {
    path: `/studio/lesson/${lessonId}/analytics`,
    title: "تجزیه‌وتحلیل",
    icon: <LineChart className='ml-1 h-7 w-7 stroke-2' />,
  },
];

export const mobileNavMenu = [
  {
    path: `/`,
    title: "خانه",
    icon: <Home />,
    rule: "any",
  },
  {
    path: `/category`,
    title: "دسته‌بندی",
    icon: <Grid2X2 />,
    rule: "any",
  },
  {
    path: `/studio/teaching-in-kateb`,
    title: "تدریس",
    icon: <Teaching className='h-6 w-6' />,
    rule: "any",
  },
  {
    path: `/cart`,
    title: "سبد‌خرید",
    icon: <ShoppingCart />,
    rule: "any",
  },
  {
    path: `/studio/dashboard`,
    title: "کاتب‌من",
    icon: <User2 />,
    rule: "any",
  },
];
