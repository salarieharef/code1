"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategoryTabs from "./category-tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Link from "next/link";
// import TeacherStar from "@/static/images/achievements/teacher-star.svg";
import { useRouter } from "next/navigation";

type TabInfo = {
  value: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  link?: string;
  tooltip?: string;
};

// Define the tabs data array
const tabs: TabInfo[] = [
  {
    value: "university",
    label: "دانشگاهی",
    content: (
      <CategoryTabs section='university' type='academic_branch' version='2' />
    ),
  },
  {
    value: "school",
    label: "مدرسه‌ای",
    content: <CategoryTabs section='school' type='grade' version='2' />,
    disabled: true,
    tooltip: "در حال حاضر، در این بخش، دسته بندی وجود ندارد",
  },
  {
    value: "college",
    label: "دانشکدگان",
    content: <CategoryTabs section='college' type='main_group' version='2' />,
  },

  {
    value: "skill",
    label: "مهارتی",
    content: <CategoryTabs section='skill' type='main_group' version='2' />,
    disabled: true,
    tooltip: "در حال حاضر، در این بخش، دسته بندی وجود ندارد",
  },
  {
    value: "deep_learn",
    label: "یادگیری عمیق",
    content: (
      <CategoryTabs section='deep_learn' type='academic_branch' version='2' />
    ),
  },
  {
    value: "teaching_assistants",
    label: "دستیاران آموزشی",
    content: <></>, // Placeholder for content if needed
    link: "/category?section=teaching_assistants",
  },
];

export default function TopCategories() {
  const [currentTab, setCurrentTab] = useState("university");
  const router = useRouter();
  // Handle tab and select changes
  const handleTabChange = (value: string) => {
    const selectedTab = tabs.find((tab) => tab.value === value);
    if (selectedTab?.link) {
      router.push(selectedTab.link);
    } else {
      setCurrentTab(value);
    }
  };

  return (
    <div className='bg-gradient-to-b from-blue-600 to-blue-900 py-4 md:from-transparent md:to-transparent md:px-12 lg:px-18'>
      <div className='mx-auto flex flex-row items-center justify-center md:px-12 lg:px-10 lg:pt-0 xl:px-40'>
        <h1 className='flex-1 bg-inherit px-4 py-2 text-right text-sm font-bold text-amber-400 md:text-center md:text-3xl lg:text-5xl'>
          دسته بندی‌های کاتب
        </h1>

        {/* SelectBox for Mobile */}
        <div className='block  max-w-80 flex-1 px-4 md:hidden'>
          <Select dir='rtl' value={currentTab} onValueChange={handleTabChange}>
            <SelectTrigger className='rounded-full font-medium focus:ring-0 focus:ring-offset-0'>
              <SelectValue placeholder='بخش خود را انتخاب کنید...' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {tabs.map((tab, index) => (
                  <SelectItem
                    key={`mobile_select_${tab.value}`}
                    value={tab.value}
                    disabled={tab.disabled} // Disables the item if needed
                    className={
                      tab.disabled ? "cursor-not-allowed opacity-50" : ""
                    }
                  >
                    {tab.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs and TabsContent for Larger Screens */}
      <Tabs
        value={currentTab}
        className='mt-4'
        dir='rtl'
        onValueChange={handleTabChange}
      >
        <TabsList className='scrollbar-none mx-4 hidden h-auto justify-between overflow-hidden overflow-x-scroll rounded-full border bg-white p-0 text-blue-500 dark:bg-slate-900 dark:text-blue-400 md:mx-auto md:flex md:w-3/4'>
          {tabs.map((tab) =>
            tab.disabled ? (
              <Tooltip key={`desktop_view_disabled_${tab.value}`}>
                <TooltipTrigger className='md:text-md m-0 basis-1/6 cursor-not-allowed rounded-full py-2 text-xs font-bold opacity-50 lg:text-lg'>
                  {tab.label}
                </TooltipTrigger>
                <TooltipContent>{tab.tooltip}</TooltipContent>
              </Tooltip>
            ) : (
              <TabsTrigger
                key={`desktop_view_${tab.value}`}
                value={tab.value}
                className='md:text-md m-0 basis-1/6 rounded-full py-2 text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-white lg:text-lg'
              >
                {tab.link ? (
                  <Link href={tab.link}>{tab.label}</Link>
                ) : (
                  tab.label
                )}
              </TabsTrigger>
            )
          )}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={`other_tabs_${tab.value}`} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
