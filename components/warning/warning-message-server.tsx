import { cn } from "@/utils/cn";
import { AlertCircle } from "lucide-react";

type Props = {
  children: any;
  className?: string;
};

export default function WarningMessageServer({ children, className }: Props) {
  return (
    <div className='flex items-center justify-start gap-2'>
      <AlertCircle color='orange' size={30} />
      <p className={cn("py-4 text-center text-xl text-slate-500", className)}>
        {children}
      </p>
    </div>
  );
}
