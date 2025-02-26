"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

// Component imports
import SettingsTabs from "@/components/studio/settings/SettingsTabs";
import { CertificationForm } from "@/components/studio/settings/certification-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Util imports
import includes from "lodash-es/includes";
import find from "lodash-es/find";

// Icon imports
import { Settings } from "lucide-react";

// Auth imports
import { useSession } from "next-auth/react";

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const { data: session }: any = useSession();

  const [selectedTab, setSelectedTab] = useState(
    searchParams.get("tab") || "account_info"
  );

  const tabs = [
    {
      title: "اطلاعات‌ پایه",
      value: "account_info",
      userTypes: ["organ", "teacher", "student"],
    },
    {
      title: "گواهینامه ها",
      value: "certificates",
      userTypes: ["organ", "teacher", "student"],
    },
    {
      title: "دسترسی‌ها",
      value: "access",
      userTypes: ["organ"],
    },
    // {
    //   title: "تغییر رمزعبور",
    //   value: "password",
    //   userTypes: ["organ", "teacher", "student"],
    // },
  ];

  return (
    <Suspense>
      <div className='min-h[100rem] mb-10 min-h-screen w-full rounded-[7px] bg-white p-4 shadow-xl sm:mt-10 sm:px-12 sm:py-8'>
        <div className='flex h-16 flex-row items-center justify-between'>
          <div className='flex flex-row items-center gap-1 text-xl font-medium leading-10 text-blue-900 sm:text-3xl'>
            <Settings className='stroke-1.5 text-blue-400 sm:h-10 sm:w-10' />
            تنظیمات
            <span className='hidden sm:block'>
              {selectedTab
                ? ` - ${find(tabs, { value: selectedTab })?.title}`
                : null}
            </span>
          </div>

          <div className='flex items-center gap-2'>
            {selectedTab == "certificates" ? <CertificationForm /> : null}

            <Select
              dir='rtl'
              value={selectedTab}
              onValueChange={(v: any) => setSelectedTab(v)}
            >
              <SelectTrigger className='w-max gap-2 rounded-full border-0 bg-primary text-primary-foreground focus:ring-0 focus:ring-offset-0 sm:hidden'>
                <SelectValue placeholder='Select' />
              </SelectTrigger>
              <SelectContent position='popper'>
                {tabs.map((tab: any, i: number) => {
                  const access = includes(tab.userTypes, session?.user?.type);
                  return (
                    <SelectItem
                      value={tab.value}
                      key={i}
                      className={`${access ? "" : "hidden"}`}
                    >
                      {tab.title}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator orientation='horizontal' className='mb-4 h-[2px]' />

        <SettingsTabs
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          tabs={tabs}
        />
      </div>
    </Suspense>
  );
}
