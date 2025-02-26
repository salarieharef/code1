import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface ModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
  withoutClose?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  children,
  withoutClose,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay className='pointer-events-none fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50' />
      <Dialog.Content className='fixed left-1/2 top-1/2 z-[55] w-11/12 max-w-5xl -translate-x-1/2  -translate-y-1/2  transform rounded-lg md:w-full'>
        {!withoutClose && (
          <Dialog.Close asChild>
            <button className='absolute right-1 top-1 p-1 text-slate-400 hover:text-slate-600'>
              <X size={16} />
            </button>
          </Dialog.Close>
        )}

        {children}
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Modal;
