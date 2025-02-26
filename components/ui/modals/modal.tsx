import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/ui";
import { cn } from "@/utils/cn";
import { X } from "lucide-react";

interface ModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  asDrawerInMobile?: boolean;
  drawerDirection?: "top" | "right" | "bottom" | "left";
  title?: string;
  className?: string;
  showGrip?: boolean;
  closeBtnDrawer?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  children,
  size = "md",
  asDrawerInMobile = false,
  drawerDirection = "bottom",
  title,
  showGrip,
  closeBtnDrawer = false,
  className,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const sizeClasses: Record<string, string> = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  if (isMobile && asDrawerInMobile) {
    return (
      <Drawer
        open={open}
        onOpenChange={onOpenChange}
        direction={drawerDirection}
      >
        <DrawerContent
          className={cn(
            "teachingInKatebDrawerContent",
            "flex max-h-[96vh] flex-col p-0",
            className
          )}
          showGrip={showGrip}
        >
          <div className='relative border-b'>
            {title && <h2 className='text-center font-semibold'>{title}</h2>}
            {closeBtnDrawer ? (
              <button
                onClick={() => onOpenChange?.(false)}
                className='absolute right-2 top-1 rounded-xl p-1 hover:bg-slate-100'
              >
                <X size={20} />
              </button>
            ) : (
              <></>
            )}
          </div>
          <div className='flex-grow overflow-auto'>{children}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(sizeClasses[size], "p-2 md:p-4", className)}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
