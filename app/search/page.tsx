"use client";
import { useState } from "react";

// Component imports
import CategorySidebar from "@/components/category/CategorySidebar";
import Sidebar from "@/components/layout/filterable-page/Sidebar";
import SearchResults from "@/components/search/SearchResults";
import CategoryContextProvider from "@/context/CategoryContext";

export default function Search() {
  const [categories, setCategories] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const categoryFilterSubmitted = (categories: any) => {
    setCategories(categories);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <main className='flex w-full grid-cols-3 flex-col py-8 md:grid lg:py-10'>
      <CategoryContextProvider>
        <Sidebar
          className='col-span-1'
          open={isSidebarOpen}
          onToggle={toggleSidebar}
        >
          <CategorySidebar className='' onSubmit={categoryFilterSubmitted} />
        </Sidebar>

        <SearchResults
          className='col-span-full pl-12 pr-6 lg:col-span-2 2xl:px-16'
          categories={categories}
        />
      </CategoryContextProvider>
    </main>
  );
}
