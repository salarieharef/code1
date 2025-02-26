import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
} from "@/components/ui/dialog";
import { cn } from "@/utils/cn";
import React from "react";

interface ModalProps {
  isOpen: any;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  handleCrop: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  description,
  handleCrop,
  className,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm' />
      <DialogContent
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleCrop();
          }
        }}
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-2 shadow-xl",
          className
        )}
      >
        {/* <DialogHeader>
          <DialogTitle className='text-lg font-semibold text-slate-900'>
            {title}
          </DialogTitle>
        </DialogHeader> */}
        <DialogDescription className='text-sm text-slate-600'>
          {description}
        </DialogDescription>
        <div className='mt-4'>{children}</div>
        <div className='flex justify-center gap-4'>
          <Button variant='default' onClick={handleCrop}>
            تنظیم عکس تبلیغ
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
