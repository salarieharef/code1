"use client";
import { usePathname, useRouter } from "next/navigation";

// Component imports
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CertificationList from "./certification-list";

// Auth imports
import { useSession } from "next-auth/react";

// Util imports
import includes from "lodash-es/includes";
import FormUserInfo from "../teaching-in-kateb/user-info/FormUserInfo";

export default function SettingsTabs({
  selectedTab,
  setSelectedTab,
  tabs,
}: any) {
  const { data: session }: any = useSession();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Tabs
      value={selectedTab}
      onValueChange={(v) => {
        setSelectedTab(v);
        // router.push(`${pathname}?tab=${v}`);
      }}
      className='w-full'
      dir='rtl'
    >
      <div className='hidden justify-center sm:flex'>
        <TabsList className='divide-x-1 divide-x-reverse overflow-hidden border border-blue-500 bg-transparent p-0'>
          {tabs.map((tab: any, i: number) => {
            const access = includes(tab.userTypes, session?.user?.type);
            return (
              <TabsTrigger
                value={tab.value}
                key={i}
                className={`rounded-none border-blue-500 px-10 text-lg font-normal text-slate-600 data-[state=active]:bg-blue-500 data-[state=active]:font-medium data-[state=active]:text-white ${
                  access ? "" : "hidden"
                }`}
              >
                {tab.title}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>
      <TabsContent value='account_info'>
        <FormUserInfo />
      </TabsContent>
      <TabsContent value='certificates'>
        <CertificationList />
      </TabsContent>
      <TabsContent value='access'></TabsContent>
      {/* <TabsContent value="password">
        <ChangePassword />
      </TabsContent> */}
    </Tabs>
  );
}
