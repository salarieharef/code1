import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";

type StepStatus =
  | "default"
  | "approved"
  | "rejected"
  | "revision"
  | "conditional_approval";

interface AlertInfoTeachingProps {
  styleWrapper?: string;
  description?: string;
  title?: string;
  className?: string;
  position?: "inline" | "default";
  sub_description?: string;
  stepStatus?: StepStatus;
}

type StatusConfig = {
  variant: StepStatus;
  text: string;
  badgeVariant:
    | "default"
    | "destructive"
    | "secondary"
    | "success"
    | "waiting"
    | "outline";
};

const STATUS_CONFIG: Record<StepStatus, StatusConfig> = {
  default: {
    variant: "default",
    text: "در انتظار بررسی",
    badgeVariant: "secondary",
  },
  approved: { variant: "approved", text: "تایید شده", badgeVariant: "success" },
  rejected: {
    variant: "rejected",
    text: "رد شده",
    badgeVariant: "destructive",
  },
  revision: {
    variant: "revision",
    text: "نیاز به بازبینی",
    badgeVariant: "waiting",
  },
  conditional_approval: {
    variant: "conditional_approval",
    text: "تایید به شرط اصلاحات",
    badgeVariant: "waiting",
  },
} as const;

export function AlertInfoTeaching({
  styleWrapper = "",
  description = "",
  sub_description = "",
  title = "جواب درخواست:",
  className = "",
  position = "default",
  stepStatus,
}: AlertInfoTeachingProps) {
  const status: StatusConfig = stepStatus
    ? STATUS_CONFIG[stepStatus]
    : STATUS_CONFIG["default"];

  const renderContent = () => (
    <div>
      <div className='flex items-center space-x-2 pb-1'>
        <div className='flex w-full justify-between'>
          <AlertTitle className='flex justify-between'>{title}</AlertTitle>
          <Badge variant={status.badgeVariant}>{status.text}</Badge>
        </div>
      </div>
      <div>
        <AlertDescription dangerouslySetInnerHTML={{ __html: description }} />
        {sub_description && (
          <AlertDescription
            dangerouslySetInnerHTML={{ __html: sub_description }}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className={styleWrapper}>
      <Alert className={className}>
        <AlertCircle className='h-5 w-5 stroke-blue-400' />
        {position === "inline" ? (
          renderContent()
        ) : (
          <>
            <AlertTitle>
              {title} <Badge variant={status.badgeVariant}>{status.text}</Badge>
            </AlertTitle>
            <AlertDescription
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </>
        )}
      </Alert>
    </div>
  );
}
