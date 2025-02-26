"use client";
import { X } from "lucide-react";
import { PropsWithChildren } from "react";
import { Button } from "../../ui/button";

type SidebarProps = PropsWithChildren<{
  className?: string;
  open?: boolean;
  onSortChange?: (field: string, order: "asc" | "desc") => void;
  onSearchQueryChange?: (query: string) => void;
  onToggle?: (open: boolean) => void;
}>;

export default function Sidebar({
  className,
  onSortChange,
  onSearchQueryChange,
  children,
  open,
  onToggle,
}: SidebarProps) {
  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className='z-40 bg-primary/30 fixed inset-0 backdrop-blur-sm transition-opacity duration-300 lg:hidden'
          onClick={() => onToggle && onToggle(false)} // Clicking on the backdrop closes the sidebar
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 min-w-[80%] transform overflow-y-auto overflow-x-hidden bg-blue-800 py-4 pb-16 transition-transform duration-300 
        md:pb-4 lg:relative lg:z-auto lg:min-w-[22rem] lg:translate-x-0 lg:rounded-l-2xl xl:min-w-[24rem]
         2xl:min-w-[28rem] ${open ? "translate-x-0" : "translate-x-full"} ${className}`}
      >
        {/* Close Button (X) */}
        <Button
          onClick={(e: any) => {
            onToggle && onToggle(!open); // Toggling sidebar visibility on click
          }}
          className='relative right-1 top-0 z-50 flex h-fit w-fit flex-row gap-2 border-1 border-blue-400 bg-transparent px-2 py-2 text-3xl text-blue-400 lg:hidden'
        >
          <X className='h-5 w-5' />
        </Button>

        {/* Sidebar content */}
        {children}
      </aside>
    </>
  );
}
