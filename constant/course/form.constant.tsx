// Validations imports
import { AccountInfo } from "@/utils/validations/account-info.validations";
import {
  CollaborationFormSchema,
  ConclusionFormSchema,
  CourseFormSchema,
  HeadlineFormSchema,
  SampleFormSchema,
} from "@/utils/validations/class-create.validations";

// Icon imports
import { Check, Clock, Hourglass, X } from "lucide-react";

// Type imports
import { StepItem } from "@/components/ui/stepper";
import { StepInfo, StepStatus } from "@/components/ui/stepper/types";
import { cn } from "@/utils/cn";

const stepList: StepItem[] = [
  {
    id: 1,
    label: "۱. اطلاعات پایه",
    status: "idle",
    bgClassName: "h-full w-full bg-slate-50",
    formSchema: AccountInfo,
    containerClassName: "",
  },
  {
    id: 2,
    label: "۲. طرح اولیه درس",
    status: "idle",
    bgClassName: "h-full w-full bg-slate-50",
    formSchema: CourseFormSchema,
    containerClassName: "",
  },
  {
    id: 3,
    label: "۳. سرفصل‌ها",
    status: "idle",
    bgClassName: "h-full w-full bg-slate-50",
    formSchema: HeadlineFormSchema,
    containerClassName: "",
  },
  {
    id: 4,
    label: (
      <div>
        ۴. نمونه تدریس <br /> <small>(برش ویدیو)</small>
      </div>
    ),
    status: "idle",
    bgClassName: "h-full w-full bg-slate-50",
    formSchema: SampleFormSchema,
    containerClassName: "",
  },
  {
    id: 5,
    label: "۵. روش همکاری",
    status: "idle",
    bgClassName: "h-full w-full  bg-slate-50",
    formSchema: CollaborationFormSchema,
    send_admin: true,
    containerClassName: "",
  },
  {
    id: 5.5,
    label: "تاییدیه کاتب",
    status: "confirmed",
    type: "mini",
    bgClassName: "h-full w-full bg-slate-50 border-l border-slate-300",
    containerClassName: "",
  },
  {
    id: 6,
    label: "۶. انعقاد قرارداد",
    status: "idle",
    bgClassName: "h-full w-full bg-slate-100",
    formSchema: ConclusionFormSchema,
    send_admin: true,
    containerClassName: "",
  },
  {
    id: 6.5,
    label: "تاییدیه کاتب",
    status: "idle",
    type: "mini",
    bgClassName: "h-full w-full border-l border-slate-300 bg-slate-100",
    containerClassName: "",
  },
  {
    id: 7,
    label: "۷. جلسات درس",
    status: "idle",
    bgClassName: "h-full w-full bg-slate-150",
    containerClassName: "",
  },
];

const stepInfoByStatus: Record<StepStatus, StepInfo> = {
  idle: {
    icon: Clock,
    label: null,
    className: "scale-75",
  },
  pending: {
    icon: Hourglass,
    label: "درحال داوری",
    className:
      "scale-75 bg-amber-500 hover:bg-amber-600 text-amber-50 data-[current=true]:bg-amber-500 data-[current=true]:border-amber-500 data-[current=true]:outline-amber-500",
  },
  confirmed: {
    icon: Check,
    label: "تایید شده",
    className:
      "scale-75 bg-primary text-primary-foreground hover:bg-primary/80",
  },
  rejected: {
    icon: X,
    label: "رد شده",
    className:
      "scale-75 bg-destructive text-destructive-foreground hover:bg-destructive/80",
  },
};

function stepListStatus(
  steps: StepItem[],
  pendingStep: number,
  confirmedStepIds: number[] = []
) {
  steps.forEach((step) => {
    if (confirmedStepIds.includes(step.id)) {
      step.iconClassName = cn(
        "data-[active=true]:border-primary data-[active=true]:bg-primary data-[active=true]:text-primary-foreground",
        "data-[current=true]:border-primary data-[current=true]:bg-primary data-[current=true]:outline-primary"
      );
      // step.containerClassName =
      //   "data-[completed=true]:[&:not(:last-child)]:after:bg-success";
      step.status = "confirmed";
    } else if (Math.floor(step.id) == pendingStep) {
      step.status = "pending";
    } else {
      step.status = "idle";
    }
  });

  return steps;
}

export { stepInfoByStatus, stepList, stepListStatus };
