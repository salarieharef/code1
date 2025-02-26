// MiniStepContent.tsx
import statusConfigs from "@/constant/teaching-in-kateb/statusConfigs";
import { cn } from "@/utils/cn";
import { getUserFullName } from "@/utils/functions/getUserFullName";
import { StepStatus } from "@/components/ui/stepper/types";
import { useFormContext } from "react-hook-form";

interface MiniStepContentProps {
  status: StepStatus;
  step?: number;
  courseId?: string;
}

export default function MiniStepContent({
  status,
  step,
  courseId,
}: MiniStepContentProps) {
  const form = useFormContext();
  const firstName = form.watch("first_name");
  const lastName = form.watch("last_name");
  const gender = form.watch("gender");
  const userFullName = getUserFullName(firstName, lastName, gender);
  const courseName = form.watch("name");

  const config = statusConfigs[status];
  if (!config) return null;

  const Icon = config.icon;

  return (
    <div className='my-2 flex flex-col items-center justify-center space-y-4 rounded-md'>
      <Icon
        className={cn(
          "h-14 w-14 rounded-full stroke-1.5 ring-1 ring-opacity-65 ring-offset-4",
          config.iconClasses
        )}
      />
      <div className='text-center'>
        <h6 className={`text-xl font-bold ${config.titleColor}`}>
          {config.title}
        </h6>
        <p className='text-md py-2 font-semibold text-slate-600'>
          {config.introduction(userFullName)}
        </p>

        <p className='text-sm text-slate-500'>
          {config.heading ? config.heading(courseId, courseName) : ""}
        </p>
        <p className='text-sm text-slate-500'>{config.description(step)}</p>
      </div>
    </div>
  );
}
