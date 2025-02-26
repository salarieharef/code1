// statusConfigs.ts
import { Check, Clock, Hourglass, X } from "lucide-react";
import contentByType from "./contentByType";

export type StepStatus = "idle" | "rejected" | "confirmed" | "pending";

interface StatusConfig {
  icon: React.ElementType;
  iconClasses: string;
  title: string;
  titleColor: string;
  introduction: (userFullName: string) => string;
  heading?: (courseId?: any, courseName?: string) => string;
  description: (step?: number) => string;
}

const statusConfigs: Record<StepStatus, StatusConfig> = {
  idle: {
    icon: Clock,
    iconClasses:
      "bg-muted text-muted-foreground ring-muted-foreground ring-offset-0 w-18 h-18 p-1",
    title: "تاییدیه کاتب",
    titleColor: "text-muted-foreground",
    introduction: (userFullName) => `${userFullName}؛`,
    description: () => "درخواست شما در صف بررسی قرار دارد.",
  },
  rejected: {
    icon: X,
    iconClasses: "bg-destructive text-white ring-destructive",
    title: "ردشده",
    titleColor: "text-destructive",
    introduction: (userFullName) =>
      `${userFullName}؛ متاسفانه درخواست شما رد شده است.`,
    description: () => "درخواست شما توسط کاتب مورد تایید قرار نگرفته است.",
  },
  confirmed: {
    icon: Check,
    iconClasses: "bg-success text-white ring-success",
    title: "تایید شده",
    titleColor: "text-success",
    introduction: (userFullName) => `${userFullName}؛`,
    // heading: (courseId, courseName) => {
    //   return contentByType?.["contractSubmission"]?.title(courseId, courseName);
    // },
    description: (step) => {
      return `این درخواست با موفقیت ثبت شد.`;
    },
  },
  pending: {
    icon: Hourglass,
    iconClasses: "bg-amber-100 text-amber-400 ring-amber-400 p-1",
    title: "در حال داوری",
    titleColor: "text-amber-400",
    introduction: (userFullName) => `${userFullName}؛`,
    heading: (courseId, courseName) => {
      return contentByType?.["pendingRequest"]?.title(courseId, courseName);
    },
    description: (step) => {
      return contentByType?.["pendingRequest"]?.description(step);
    },
  },
};

export default statusConfigs;
