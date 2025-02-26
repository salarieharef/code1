"use client";
import { useContext, useEffect, useState } from "react";

// Component imports
import CategorySidebarLevel1 from "@/components/layout/filterable-page/sidebar-level1";
import { ButtonWithTooltip } from "@/components/ui/button-with-tooltip";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TagInput } from "@/components/ui/tag/tag-input";

// Icon imports
import { global_context } from "@/context/global";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

// Util imports
import { CategorySidebarProps, Inputs } from "@/types/category-sidebar";
import join from "lodash-es/join";
import map from "lodash-es/map";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CategoryContext } from "@/context/CategoryContext";

export default function CategorySidebar({
  loading,
  onChange = () => {},
  onSubmit = () => {},
  section,
}: CategorySidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paramSection = searchParams.get("section");

  const {
    setCategoryTags,
    setCategoryIntroducers,
    setCategories,
    categories = [], // categories is the actual array for the final categories
  }: any = useContext(CategoryContext);

  const [tabsLoading, setTabsLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState(section || "university");

  // State for holding temporary categories before applying filters
  const [tempCategories, setTempCategories] = useState<any[]>([]);

  const form = useForm<Inputs>({});

  useEffect(() => {
    setCategories([]); // Reset categories when section changes
    const queryParams = new URLSearchParams(searchParams.toString());
    queryParams.delete("categories"); // Remove old categories from URL
  }, [currentTab]);

  // Handle changing the current tab
  const handleTabChange = (newTab: string) => {
    setCurrentTab(newTab);
    setTempCategories([]); // Clear the temporary categories
    setTabsLoading(true);

    const queryParams = new URLSearchParams(searchParams.toString());
    queryParams.delete("categories"); // Remove old categories from URL
    queryParams.set("section", newTab); // Set the new section

    const queryString = queryParams.toString().replace(/%2C/g, ",");
    router.push(`${pathname}?${queryString}`);
  };

  // Handle filter submit (when the filter button is clicked)
  const handleFilterSubmit = () => {
    setCategories(tempCategories); // Apply the temporary categories

    const queryParams = new URLSearchParams(searchParams.toString());
    queryParams.set("categories", tempCategories.join(",")); // Use `tempCategories` for URL
    queryParams.set("section", currentTab); // Update section in URL

    const queryString = queryParams.toString().replace(/%2C/g, ",");
    router.push(`${pathname}?${queryString}`);
  };

  // When selections change, update temporary categories without filtering yet
  const selectionChanged = (selection: any) => {
    setTempCategories(selection); // Update the temporary categories
  };

  useEffect(() => {
    setCategories([]); // Clear the categories
  }, [paramSection]);

  return (
    <div>
      <div className='flex items-center gap-1 px-10'>
        <Select
          dir='rtl'
          value={currentTab}
          defaultValue={currentTab}
          onValueChange={handleTabChange} //handle change section
        >
          <SelectTrigger
            className='rounded-full text-lg font-medium focus:ring-0 
          focus:ring-offset-0'
          >
            <SelectValue placeholder='بخش خود را انتخاب کنید...' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='university'>دانشگاهی</SelectItem>
              <SelectItem value='school'>مدرسه‌ای</SelectItem>
              <SelectItem value='college'>دانشکدگان</SelectItem>
              <SelectItem value='skill'>مهارتی</SelectItem>
              <SelectItem value='deep_learn'>یادگیری عمیق</SelectItem>
              <SelectItem value='teaching_assistants'>
                دستیاران آموزشی
              </SelectItem>
              <SelectItem value='field_introducer'>معرفی رشته</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <ButtonWithTooltip
          disabled={loading}
          className='disable: mx-auto my-4 flex items-center justify-center rounded-full bg-slate-100 px-8 py-2 text-base font-bold text-blue-500 hover:bg-slate-100'
          tooltip='فیلتر‌کردن براساس دسته بندی‌ها'
          onClick={handleFilterSubmit} //
        >
          {loading ? <Loader2 className='animate-spin' /> : "فیلترکردن"}
        </ButtonWithTooltip>
      </div>

      <Tabs
        onValueChange={(v) => {
          setCurrentTab(v);
          setTabsLoading(true);
        }}
        defaultValue={currentTab}
        value={currentTab}
        className='mt-4'
        dir='rtl'
      >
        <TabsContent value='university'>
          <CategorySidebarLevel1
            tabsLoading={tabsLoading}
            types={["academic_branch", "academic_group", "academic_field"]}
            section='university'
            defaultValue={categories}
            onChange={(selection: any) => {
              selectionChanged(selection.children);
            }}
          />
        </TabsContent>
        <TabsContent value='school'>
          <CategorySidebarLevel1
            tabsLoading={tabsLoading}
            types={["grade", "branch", "field", "main_group", "side_group"]}
            section='school'
            defaultValue={categories}
            onChange={(selection: any) => {
              selectionChanged(selection.children);
            }}
          />
        </TabsContent>
        <TabsContent value='college'>
          <CategorySidebarLevel1
            tabsLoading={tabsLoading}
            types={["main_group"]}
            section='college'
            defaultValue={categories}
            onChange={(selection: any) => {
              selectionChanged(selection.children);
            }}
          />
        </TabsContent>
        <TabsContent value='skill'>
          <CategorySidebarLevel1
            tabsLoading={tabsLoading}
            types={["main_group", "side_group"]}
            section='skill'
            defaultValue={categories}
            onChange={(selection: any) => {
              selectionChanged(selection.children);
            }}
          />
        </TabsContent>
        <TabsContent value='deep_learn'>
          <CategorySidebarLevel1
            tabsLoading={tabsLoading}
            types={["academic_branch", "academic_group", "academic_field"]}
            section='deep_learn'
            defaultValue={categories}
            onChange={(selection: any) => {
              selectionChanged(selection.children);
            }}
          />
        </TabsContent>
        <TabsContent value='field_introducer'>
          <CategorySidebarLevel1
            tabsLoading={tabsLoading}
            types={["academic_branch", "academic_group", "academic_field"]}
            section='field_introducer'
            defaultValue={categories}
            onChange={(selection: any) => {
              selectionChanged(selection.children);
            }}
          />
          {/* only for field introducer */}
          <Form {...form}>
            <form
              className='flex w-full flex-col gap-y-4 px-8'
              onSubmit={form.handleSubmit(() => {})}
            >
              <div className='w-full'>
                <FormField
                  control={form.control}
                  name='introducers'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TagInput
                          placeholder='معرفی کننده خود را وارد کنید...'
                          // {...field}
                          inputFieldPosition='top'
                          className={`w-full border-0 bg-secondary`}
                          tags={field.value || []}
                          setTags={(tags: any) => {
                            field.onChange(tags);
                            setCategoryTags(join(map(tags, "text"), ", "));
                          }}
                        />
                      </FormControl>
                      <FormMessage className='text-xs text-red-500' />
                    </FormItem>
                  )}
                />
              </div>
              <div className='w-full'>
                <FormField
                  control={form.control}
                  name='tags'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TagInput
                          placeholder='برچسب های خود را وارد کنید...'
                          // {...field}
                          inputFieldPosition='top'
                          className={`w-full border-0 bg-secondary`}
                          tags={field.value || []}
                          setTags={(introducers: any) => {
                            field.onChange(introducers);
                            setCategoryIntroducers(
                              join(map(introducers, "text"), ", ")
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage className='text-xs text-red-500' />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
