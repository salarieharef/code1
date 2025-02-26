"use client";

import { Separator } from "../ui/separator";
import ClassesFilter from "./classes-filter";
import ClassesList from "./classes-list";

export default function Classes({
  className,
  categories,
  onLoad,
  filters,
  onSortChange,
}: any) {
  return (
    <div className={`min-w-0 px-6 ${className}`}>
      <ClassesFilter
        // onChange={onSortChange}
        key='desktop'
        className='hidden lg:flex'
      />
      <Separator
        orientation='horizontal'
        className='mt-2 h-[2px] bg-slate-300'
      />
      <ClassesList
        filters={filters}
        categories={categories}
        onLoad={onLoad}
        className='lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
      />
    </div>
  );
}
