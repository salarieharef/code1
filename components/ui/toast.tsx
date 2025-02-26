import { cn } from "@/utils/cn";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";

// Position variants for toast
const positions = {
  "top-right":
    "top-0 left-1/2 -translate-x-1/2 sm:top-0 sm:right-0 sm:translate-x-0",
  "top-left":
    "top-0 left-1/2 -translate-x-1/2 sm:top-0 sm:left-0 sm:translate-x-0",
  "top-center": "top-0 left-1/2 -translate-x-1/2",
  "bottom-right":
    "top-0 left-1/2 -translate-x-1/2 sm:bottom-10 sm:right-0 sm:translate-x-0",
  "bottom-left":
    "top-0 left-1/2 -translate-x-1/2 sm:bottom-10 sm:left-0 sm:translate-x-0",
  "bottom-center":
    "top-0 left-1/2 -translate-x-1/2 sm:bottom-10 sm:left-1/2 sm:-translate-x-1/2",
} as const;

type ToastPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

const ToastProvider = ToastPrimitives.Provider;

const viewportVariants = cva(
  [
    "fixed z-[100] flex w-full flex-col-reverse p-4",
    "sm:max-w-[420px]",
    "pointer-events-none hover:pointer-events-auto",
  ],
  {
    variants: {
      position: positions,
    },
    defaultVariants: {
      position: "bottom-right",
    },
  }
);

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport> & {
    position?: ToastPosition;
  }
>(({ className, position = "bottom-right", ...props }, ref) => {
  const mobilePositionClass = viewportVariants({ position: "top-center" });
  const desktopPositionClass = viewportVariants({ position });

  return (
    <ToastPrimitives.Viewport
      ref={ref}
      className={cn(mobilePositionClass, desktopPositionClass, className)}
      {...props}
    />
  );
});
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
        success:
          "bg-green-500 text-green-50 group border-green-500 bg-green-500",
        warn: "bg-amber-500 text-amber-50 group border-amber-500 bg-amber-500",
        info: "bg-blue-500 text-blue-50 group border-blue-500 bg-blue-500",
      },
      position: {
        "top-right": [
          "data-[state=closed]:sm:slide-out-to-right-full data-[state=open]:sm:slide-in-from-right-full",
          "data-[swipe=end]:sm:translate-x-[100%]",
        ],
        "top-left": [
          "data-[state=closed]:sm:slide-out-to-left-full data-[state=open]:sm:slide-in-from-left-full",
          "data-[swipe=end]:sm:translate-x-[-100%]",
        ],
        "top-center": [
          "data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full",
          "data-[swipe=end]:translate-x-[100%]",
        ],
        "bottom-right": [
          "data-[state=closed]:sm:slide-out-to-right-full data-[state=open]:sm:slide-in-from-right-full",
          "data-[swipe=end]:sm:translate-x-[100%]",
        ],
        "bottom-left": [
          "data-[state=closed]:sm:slide-out-to-left-full data-[state=open]:sm:slide-in-from-left-full",
          "data-[swipe=end]:sm:translate-x-[-100%]",
        ],
        "bottom-center": [
          "data-[state=closed]:sm:slide-out-to-bottom-full data-[state=open]:sm:slide-in-from-bottom-full",
          "data-[swipe=end]:translate-y-[100%]",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
      position: "bottom-right",
    },
  }
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, position = "bottom-right", ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(
        `${toastVariants({ variant, position: "top-center" })} ${toastVariants({ variant, position })}`,
        className
      )}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=''
    {...props}
  >
    <X className='h-4 w-4' />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast> & {
  position?: ToastPosition;
};

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  type ToastActionElement,
  type ToastPosition,
  type ToastProps,
};
