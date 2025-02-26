"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

// Component imports
import CategorySidebar from "@/components/category/CategorySidebar";
import ClassesList from "@/components/category/classes-list";
import TeachersList from "@/components/category/teachers-list";
import SortFilter from "@/components/global/filters/sort-filter";
import Sidebar from "@/components/layout/filterable-page/Sidebar";
import { Separator } from "@/components/ui/separator";

// Fetch imports
import CategoryContextProvider, {
  CategoryContext,
} from "@/context/CategoryContext";
import { useDebounce } from "@/hooks/ui";

export default function Category() {
  const searchParams = useSearchParams();
  const paramSection = searchParams.get("section");
  const paramSort = searchParams.get("sort");
  const paramType = searchParams.get("type");
  const paramQ = searchParams.get("q");
  const paramUniversity = searchParams.get("university");
  const { categories = [] }: any = CategoryContext;

  // get categories on URL
  // const paramCategories = searchParams.get("categories");
  // const categories = paramCategories
  //   ? paramCategories.split(",").map((id) => Number(id))
  //   : [];

  const [section, setSection] = useState(paramSection || "");
  const [sort, setSort] = useState(paramSort || "most_liked");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

  useEffect(() => {
    setSearchQuery(paramQ || "");
  }, [paramQ]);

  useEffect(() => {
    setSection(paramSection || ""); // Update section from URL params
  }, [paramSection]);

  useEffect(() => {
    if (debouncedSearchQuery.length > 2) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [debouncedSearchQuery]);

  const categoryFilterSubmitted = (categories: any, section: any) => {
    setSection(section);
    setLoading(true);
  };

  const teacherSortOptions = [
    { value: "most_liked", label: "پرمخاطب‌ترین" },
    { value: "most_followed", label: "محبوب‌ترین" },
    { value: "most_viewed", label: "پربازدیدترین" },
  ];

  return (
    <Suspense>
      <CategoryContextProvider>
        <main
          className={`flex w-full grid-cols-3 flex-col gap-4 px-4 py-2 md:py-4 lg:grid lg:py-8 lg:pl-6 lg:pr-0 2xl:pl-10`}
        >
          {
            // Sidebar
          }
          <Sidebar
            className='col-span-1'
            open={isSidebarOpen}
            onToggle={toggleSidebar}
            onSearchQueryChange={setSearchQuery}
            onSortChange={setSort}
          >
            <CategorySidebar
              className=''
              loading={loading}
              onSubmit={categoryFilterSubmitted}
              categories={categories}
              section={searchParams.get("section")}
            />
          </Sidebar>
          {
            // Desktop Main Content Section
          }
          <div className={`col-span-full min-w-0 md:col-span-2 md:px-6 `}>
            <SortFilter
              searchPlaceHolder={
                section == "field_introducer"
                  ? "عنوان رشته یا نام مدرس را جستجو کنید..."
                  : "عنوان درس یا نام مدرس را جستجو کنید..."
              }
              sort={sort}
              setSort={setSort}
              onSearch={setSearchQuery}
              rowReverse={true}
              className='my-2 md:my-4'
              sortOptions={
                paramType == "teachers" ? teacherSortOptions : undefined
              }
              onToggle={toggleSidebar}
              // isLoading={isLoading}
            />
            <Separator
              orientation='horizontal'
              className='my-3 hidden h-[2px] bg-slate-300 lg:block'
            />
            {
              // Classes List
            }
            {paramType == "teachers" ? (
              <TeachersList
                loading={loading}
                sort={sort}
                searchQuery={debouncedSearchQuery}
                categories={categories}
                section={section}
                onLoad={() => {
                  setLoading(false);
                }}
                university={paramUniversity}
                className='lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
              />
            ) : (
              <ClassesList
                loading={loading}
                sort={sort}
                searchQuery={debouncedSearchQuery}
                categories={categories}
                section={section}
                onLoad={() => {
                  setLoading(false);
                }}
                university={paramUniversity}
                className='lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
              />
            )}
          </div>
        </main>
      </CategoryContextProvider>
    </Suspense>
  );
}
