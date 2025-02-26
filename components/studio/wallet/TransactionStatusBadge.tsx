import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/cn";
import { Check, X } from "lucide-react";

export default function TransactionStatusBadge({
  status,
}: {
  status: "approved" | "rejected";
}) {
  return (
    <Badge
      className={cn(
        "gap-0.5  py-1.5 font-normal",
        status === "approved"
          ? "bg-green-100 text-green-600 hover:bg-green-200"
          : "bg-red-100 text-red-600 hover:bg-red-200"
      )}
    >
      {status === "approved" ? (
        <>
          <span className='flex items-center justify-center rounded-full bg-green-700'>
            <Check className='size-4 text-white' />
          </span>
          <span className='pr-0.5'>تراکنش موفق</span>
        </>
      ) : (
        <>
          <span className='flex items-center justify-center rounded-full bg-red-700'>
            <X className='size-4 text-white' />
          </span>
          <span className='pr-0.5'>تراکنش ناموفق</span>
        </>
      )}
    </Badge>
  );
}
