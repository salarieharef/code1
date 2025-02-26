import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/utils/cn";
import Link from "next/link";

type SelectLinkItemProps = {
  className?: string;
  href: string;
  children?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
};

const SelectLinkItem = React.forwardRef<HTMLAnchorElement, SelectLinkItemProps>(
  ({ className, children, href, isActive, onClick, ...props }, ref) => (
    <Link
      ref={ref}
      href={href || ""}
      onClick={onClick}
      prefetch={false}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-secondary focus:bg-accent focus:text-accent-foreground",
        isActive && "bg-accent text-accent-foreground",
        className
      )}
      {...props}
    >
      <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
        {isActive ? (
          <span className='flex h-4 w-4'>
            <Check />
          </span>
        ) : (
          ""
        )}
      </span>
      <span>{children}</span>
    </Link>
  )
);
SelectLinkItem.displayName = "SelectLinkItem";

export default SelectLinkItem;
