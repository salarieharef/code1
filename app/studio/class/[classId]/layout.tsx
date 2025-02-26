"use client";

// Component imports
import ClassSidebar from "@/components/studio/ClassSidebar";
import { SidebarSheet } from "@/components/studio/SidebarSheet";
import CreateDropdown from "@/components/studio/create-dropdown";
import CourseFormContextProvider from "@/context/course/form.context";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className='h-28 justify-between bg-blue-800 p-4 md:h-80'>
        <div className='flex w-full justify-between sm:hidden'>
          <SidebarSheet>
            <ClassSidebar />
          </SidebarSheet>

          <CreateDropdown />
        </div>
      </div>

      <div className='relative -mt-8 grid grid-cols-8 justify-evenly gap-x-8 px-4 sm:-mt-80 sm:px-14'>
        <div className='col-span-2 hidden sm:block'>
          <ClassSidebar />
        </div>

        <main className='col-span-full flex flex-1 sm:col-span-6'>
          <CourseFormContextProvider>{children}</CourseFormContextProvider>
        </main>
      </div>
    </main>
  );
}
