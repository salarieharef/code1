"use client";

// Component imports
import Sidebar from "@/components/layout/filterable-page/Sidebar";
import { PropsWithChildren } from "react";

type FilterablePageLayoutProps = PropsWithChildren<{
  className?: string;
  loading?: boolean;
  onChange?: (categories: any) => void;
  onSortChange?: (field: string, order: "asc" | "desc") => void;
  onSearchQueryChange?: (query: string) => void;
  sidebarContent?: any;
}>;
export default function FilterablePageLayout(props: FilterablePageLayoutProps) {
  return (
    <main
      className={`flex w-full grid-cols-3 flex-col gap-6 px-4 py-2 md:py-4 lg:grid lg:py-8 lg:pl-6 lg:pr-0 2xl:pl-10 ${props.className}`}
    >
      <Sidebar
        className='col-span-1'
        onSearchQueryChange={props.onSearchQueryChange}
        onSortChange={props.onSortChange}
      >
        {props.sidebarContent}
      </Sidebar>
      <div className={`col-span-2 min-w-0 px-6`}>{props.children}</div>
    </main>
  );
}
