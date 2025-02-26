import AchievementsIcon from "@/static/icons/agreement/achievements-icon.svg";
import BookIcon from "@/static/icons/agreement/book-icon.svg";
import CategoryIcon from "@/static/icons/agreement/category-icon.svg";
import DiscussionsIcon from "@/static/icons/agreement/discussions-icon.svg";
import ShoppingIcon from "@/static/icons/agreement/shopping-icon.svg";
import StackIcon from "@/static/icons/agreement/stack-icon.svg";
import UniversityIcon from "@/static/icons/agreement/university.svg";
import UserIcon from "@/static/icons/agreement/user-icon.svg";
import CertificateIcon from "@/static/icons/agreement/certificate-icon.svg";

// Type imports
import { agreementItem } from "@/types/agreement/list";
import { cn } from "@/utils/cn";
const agreementList = (
  className: string = "fill-muted-foreground stroke-muted-foreground"
): agreementItem[] => {
  return [
    {
      id: "registration",
      title: "ورود و ثبت‌نام",
      icon: <UserIcon className={cn("size-7", className)} />,
    },
    {
      id: "categories",
      title: "دسته‌بندی ها",
      icon: <CategoryIcon className={cn("size-7", className)} />,
    },
    {
      id: "discussions",
      title: "مباحث",
      icon: <DiscussionsIcon className={cn("size-7", className)} />,
    },
    {
      id: "shopping-and-discounts",
      title: "خرید و تخفیف",
      icon: <ShoppingIcon className={cn("size-7", className)} />,
    },
    {
      id: "course-creation-process",
      title: "روند ایجاد درس",
      icon: <StackIcon className={cn("size-7", className)} />,
    },
    {
      id: "general-rules-and-regulations",
      title: "قوانین و مقررات عمومی",
      icon: <BookIcon className={cn("size-7", className)} />,
    },
    {
      id: "certificates",
      title: "گواهی‌نامه ها",
      icon: <AchievementsIcon className={cn("size-7", className)} />,
    },
    {
      id: "achievements",
      title: "دستاورد ها",
      icon: <CertificateIcon className={cn("size-7", className)} />,
    },
    {
      id: "studio",
      title: "استودیو",
      icon: <CategoryIcon className={cn("size-7", className)} />,
    },
    {
      id: "universities",
      title: "دانشگاه ها",
      icon: <UniversityIcon className={cn("size-7", className)} />,
    },
  ];
};

export { agreementList };
