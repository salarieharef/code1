"use client";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";

// Hook imports
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

// Component imports
import AcademicBranchAutocomplete from "@/components/global/form/academic-branch-autocomplete";
import AcademicFieldMultiselector from "@/components/global/form/academic-field-multiselector";
import AcademicGroupMultiselector from "@/components/global/form/academic-group-multiselector";
import CategorySectionSelect from "@/components/global/form/category-section-select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
const Tiptap = dynamic(() => import("@/components/global/editor/TipTap"), {
  ssr: false,
});

// Icon imports
import { Loader2 } from "lucide-react";

// Fetch imports
import routes from "@/utils/api/routes";
import { useSession } from "next-auth/react";
import useSWR, { useSWRConfig } from "swr";

// Util imports
import { InfoTooltip } from "@/components/global/InfoTooltip";
import ReusableFileDropzone from "@/components/global/dropzone/ReusableFileDropzone";
import BranchMultiselector from "@/components/global/form/branch-multiselector";
import FieldMultiselector from "@/components/global/form/field-multiselector";
import GradeMultiselector from "@/components/global/form/grade-multiselector";
import LessonMultiselector from "@/components/global/form/lesson-multiselector";
import MainGroupMultiselector from "@/components/global/form/main-group-multiselector";
import PriceInput from "@/components/global/form/price-input";
import SideGroupMultiselector from "@/components/global/form/side-group-multiselector";
import { Badge } from "@/components/ui/badge";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { formatWithSeparator } from "@/utils/persian-tools/tools-function";
import validations from "@/utils/validations";
import { filter, find, first, flatten, get, map } from "lodash-es";

export type Inputs = yup.InferType<typeof validations.ClassCreate>;

export default function EditClass({}: any) {
  const { toast } = useToast();
  const { classId } = useParams();
  const { data: session }: any = useSession();
  const { mutate } = useSWRConfig();

  // this array is filled when the user is selecting other category in skill section only
  // else it will be empty
  let addedOtherCategoryIds = useMemo(() => [] as any, []);

  const teacherId = session?.user?.id;

  const prevSection = useRef();

  // const { data: details, isLoading: classDetailsIsLoading } = useSWR(
  //   routes.courseRoutes.detail(classId),
  //   fetcher,
  //   {
  //     revalidateOnFocus: false,
  //   }
  // );
  const { data: details, isLoading: classDetailsIsLoading } = useSWR(
    routes.courseRoutes.detail(classId),
    (url) =>
      nextFetcher({
        url,
        method: "GET",
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );
  const form = useForm<Inputs>({
    defaultValues: {
      image: [],
      // academic_branch: "",
      // academic_field: [],
      // academic_group: [],
      name: "",
      description: "",
      // level: "",
      status: "public",
    },
    resolver: yupResolver(validations.ClassCreate),
  });

  const createCategories = (data: any) => {
    const categories = [
      "grade",
      "branch",
      "main_group",
      "side_group",
      "field",
      "lesson",
      "colleges",
      "academic_group",
      "academic_field",
    ];
    return filter(
      flatten(
        categories.map((category) =>
          data[category]
            ? map(
                filter(data[category], (item) => item?.id && item.id !== 0),
                "id"
              )
            : undefined
        )
      ),
      (id) => +id !== 0
    );
  };

  const EditCourse: SubmitHandler<Inputs> = async (data: any) => {
    const categories = createCategories(data);

    try {
      const res = await nextFetcher({
        url: routes.courseRoutes.edit(classId),
        method: "POST",
        body: {
          name: data.name,
          description: data.description,
          teacher_id: teacherId,
          level: data.level,
          status: data.status,
          is_college: data.is_college == "true",
          categories: [...categories, data?.academic_branch],
        },
        useToken: true,
      });

      if (typeof data?.image == "object") {
        const imageFormData = new FormData();
        imageFormData.append("image", data?.image?.[0]);
        // const image = await postFetcher(
        //   routes.courseRoutes.uploadImage(classId),
        //   imageFormData,
        //   {
        //     "Content-Type": "multipart/form-data",
        //   }
        // );
        const image = await nextFetcher({
          url: routes.courseRoutes.uploadImage(classId),
          method: "POST",
          body: imageFormData,
          useToken: true,
        });
      }
      if (res.success) {
        toast({
          variant: "success",
          title: res.msg,
        });

        mutate(routes.courseRoutes.detail(classId));
      } else if (res.error) {
        throw Error(res.error);
      }
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: e.message,
      });
    }
  };

  const setFormValues = (data: any, setCommonFieldsOnly: boolean) => {
    const setFormValue = (key: any, value: any) => form.setValue(key, value);

    setFormValue("image", data?.image);
    setFormValue("name", data?.name);
    setFormValue("level", data?.level);
    setFormValue("price", formatWithSeparator(data?.price));
    setFormValue("price2", formatWithSeparator(data?.price2));
    setFormValue("price3", formatWithSeparator(data?.price3));
    setFormValue("description", data?.description);
    setFormValue("status", data?.status);
    setFormValue("is_college", data?.is_college == true ? "true" : "false");

    const setFormValueFromCategories = (type: any) =>
      setFormValue(type, filter(data?.categories, { type }));

    if (!setCommonFieldsOnly) {
      setFormValue(
        "section",
        get(first(data?.categories), "section") || "university"
      );
      setFormValueFromCategories("grade");
      setFormValueFromCategories("branch");
      setFormValueFromCategories("main_group");
      setFormValueFromCategories("side_group");
      setFormValueFromCategories("field");
      setFormValueFromCategories("lesson");
      setFormValue(
        "academic_branch",
        find(data?.categories, { type: "academic_branch" })?.id
      );
      setFormValueFromCategories("academic_group");
      setFormValueFromCategories("academic_field");
    } else {
      setFormValue("grade", undefined);
      setFormValue("branch", undefined);
      setFormValue("main_group", undefined);
      setFormValue("side_group", undefined);
      setFormValue("field", undefined);
      setFormValue("lesson", undefined);
    }

    setFormValue(
      "colleges",
      filter(data?.categories, { section: "college", type: "main_group" })
    );
  };

  const levels = [
    {
      title: "مبتدی",
      value: "مبتدی",
    },
    {
      title: "متوسط",
      value: "متوسط",
    },
    {
      title: "پیشرفته",
      value: "پیشرفته",
    },
  ];

  // const status = [
  //   {
  //     title: "عمومی",
  //     value: "public",
  //   },
  //   {
  //     title: "خصوصی",
  //     value: "private",
  //   },
  // ];

  const section = form.watch("section");

  useEffect(() => {
    if (details?.data) {
      setFormValues(details?.data, false);
    }
  }, [details, form]);

  // handling if the user changes the section,
  // the data from the previous section must not be available on the new section fields
  useEffect(() => {
    // Store the previous section value
    prevSection.current = details?.data?.section;

    // Check if details.data exists
    if (details?.data) {
      // If the current section is different from the previous one,
      // pass true to setFormValues
      // Otherwise, pass false
      setFormValues(details?.data, section !== prevSection.current);
    }
  }, [section]);

  // Watch the value of main_group and side_group
  // const main_group = form.watch("main_group");
  // const side_group = form.watch("side_group");

  // setting the value if the maingroup selected id 0 and not losing the previous values
  // useEffect(() => {
  //   if (section === "skill" && main_group?.some((item) => +item.id === 0)) {
  //     const currentSideGroup = form.getValues("side_group");
  //     if (currentSideGroup && !currentSideGroup.some((item) => item.id === 0)) {
  //       form.setValue("side_group", [
  //         ...currentSideGroup,
  //         { type: "side_group", title: "سایر", id: 0 },
  //       ]);
  //     }
  //   }
  // }, [main_group]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(EditCourse)}
        className='flex flex-col gap-y-4'
      >
        <Badge
          className={`w-max self-center sm:self-auto`}
          variant={details?.data?.is_active ? "success" : "destructive"}
        >
          {details?.data?.is_active
            ? "درس شما از طرف ادمین فعال شده است"
            : "درس شما از طرف ادمین هنوز فعال نشده است"}
        </Badge>

        <div className='grid gap-y-4 sm:gap-4 lg:grid-cols-6'>
          <div className='sm:col-span-2'>
            <ReusableFileDropzone />
          </div>

          <div className='flex flex-col gap-y-4 sm:col-span-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex items-center gap-2'>
                    عنوان درس: <span className='text-destructive'>*</span>
                    {classDetailsIsLoading ? (
                      <Loader2 className='ml-2 h-4 w-4 animate-spin' />
                    ) : null}
                    <InfoTooltip message='نام درس خود را با دقت وارد کنید زیرا کاربران بهتر متوجه محتوا درس شما شوند و در سرچ کاتب به راحتی درس شما مشاهده شود.' />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='عنوان درس خود را وارد کنید...'
                      {...field}
                      className={`w-full border-0 bg-secondary`}
                      type='text'
                      disabled={classDetailsIsLoading}
                    />
                  </FormControl>
                  <FormMessage className='text-xs text-red-500' />
                </FormItem>
              )}
            />

            <div className='grid gap-2 md:grid-cols-2'>
              <CategorySectionSelect
                tooltip='نوع درس خود را انتخاب کنید'
                required={true}
              />

              {/* {section == "skill" ? (
                <FormField
                  control={form.control}
                  name='level'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center gap-2'>
                        سطح درس:
                        {classDetailsIsLoading ? (
                          <Loader2 className='ml-2 h-4 w-4 animate-spin' />
                        ) : null}
                      </FormLabel>
                      <FormControl>
                        <Select
                          dir='rtl'
                          onValueChange={field.onChange}
                          value={field.value || ""}
                          disabled={classDetailsIsLoading}
                        >
                          <FormControl>
                            <SelectTrigger
                              className={`border-0 bg-secondary font-medium focus:ring-0 focus:ring-offset-0`}
                            >
                              <SelectValue placeholder='سطح درس خود را انتخاب کنید...' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {levels.map((type, key) => (
                              <SelectItem value={type.value} key={key}>
                                {type.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className='text-xs text-red-500' />
                    </FormItem>
                  )}
                />
              ) : null} */}

              {/* <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      وضعیت نمایش درس:
                      {classDetailsIsLoading ? (
                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      ) : null}
                    </FormLabel>
                    <FormControl>
                      <Select
                        dir="rtl"
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={classDetailsIsLoading}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={`focus:ring-0 focus:ring-offset-0 font-medium bg-secondary border-0`}
                          >
                            <SelectValue placeholder="وضعیت درس خود را انتخاب کنید..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {status.map((type, key) => (
                            <SelectItem value={type.value} key={key}>
                              {type.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              /> */}
            </div>
          </div>

          {/* {section == "university" ? (
            <div className='col-span-full grid gap-4 md:grid-cols-3'>
              // {/* <FormField
              //   control={form.control}
              //   name='is_college'
              //   render={({ field }) => (
              //     <FormItem>
              //       <FormLabel className='flex gap-2 text-center'>
              //         تولید شده در دانشکدگان؟
              //         <span className='text-destructive'>*</span>
              //       </FormLabel>
              //       <FormControl>
              //         <RadioGroup
              //           defaultValue={field.value}
              //           className='flex flex-row-reverse'
              //           onValueChange={field.onChange}
              //         >
              //           <div className='flex items-center gap-2 text-sm font-medium'>
              //             بله
              //             <RadioGroupItem value='true' id='most-popular' />
              //           </div>
              //           <div className='flex items-center gap-2 text-sm font-medium'>
              //             خیر
              //             <RadioGroupItem value='false' id='latest' />
              //           </div>
              //         </RadioGroup>
              //       </FormControl>
              //       <FormMessage className='text-xs text-red-500' />
              //     </FormItem>
              //   )}
              // /> 

              {form.watch("is_college") == "true" ? (
                <div className='col-span-2'>
                  <CollegeMultiselector required={true} />
                </div>
              ) : null}
            </div>
          ) : null} */}

          <div className='col-span-full grid gap-4 md:grid-cols-3'>
            {section == "university" ? (
              <AcademicBranchAutocomplete required={true} />
            ) : null}

            {section == "university" ? (
              <AcademicGroupMultiselector required={true} />
            ) : null}

            {section == "university" ? (
              <AcademicFieldMultiselector required={true} />
            ) : null}

            {section !== "skill" ? (
              <GradeMultiselector required={true} />
            ) : null}

            {section == "school" ? (
              <BranchMultiselector required={true} />
            ) : null}

            <MainGroupMultiselector required={true} />

            <SideGroupMultiselector required={true} />

            {section !== "skill" ? (
              <div
                className={`${
                  section == "school" ? "row-start-2" : "sm:col-span-full"
                }`}
              >
                <FieldMultiselector required={true} />
              </div>
            ) : null}

            {section == "university" || section == "deep_learn" ? (
              <div className='sm:col-span-3'>
                <LessonMultiselector required={true} />
              </div>
            ) : null}
          </div>

          <div className='grid gap-4 sm:col-span-full md:grid-cols-3'>
            {/* {main_group?.some((item: any) => +item.id === 0) &&
              section === "skill" && (
                <FormField
                  control={form.control}
                  name='other_main_group_name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center gap-2 text-center'>
                        <span>
                          نام گروه اصلی سایر:
                          <span className='text-destructive'>*</span>
                        </span>
                        <InfoTooltip message='نامی برای گروه اصلی خود انتخاب کنید' />
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='نام گروه اصلی را وارد کنید...'
                          {...field}
                          className={`w-full border-0 bg-secondary`}
                          type='text'
                        />
                      </FormControl>
                      <FormMessage className='text-xs text-red-500' />
                    </FormItem>
                  )}
                />
              )} */}

            {/* <div className='col-start-2'>
              {side_group?.some((item: any) => +item.id === 0) &&
                section === "skill" && (
                  <FormField
                    control={form.control}
                    name='other_side_group_name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='flex items-center gap-2 text-center'>
                          <span>
                            نام گروه فرعی سایر:
                            <span className='text-destructive'>*</span>
                          </span>
                          <InfoTooltip message='نامی برای گروه فرعی خود انتخاب کنید' />
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='نام گروه فرعی را وارد کنید...'
                            {...field}
                            className={`w-full border-0 bg-secondary`}
                            type='text'
                          />
                        </FormControl>
                        <FormMessage className='text-xs text-red-500' />
                      </FormItem>
                    )}
                  />
                )}
            </div> */}
          </div>

          <div className='sm:col-span-2'>
            <PriceInput
              name='price'
              label='قیمت پکیج معمولی:'
              // placeholder="قیمت پکیج معمولی درس خود را وارد کنید..."
              description='پکیج معمولی شامل ویدیو تمام دروس میشود.'
              disabled={true}
            />
          </div>

          <div className='sm:col-span-2'>
            <PriceInput
              name='price2'
              label='قیمت پکیج نقره ای:'
              // placeholder="قیمت پکیج نقره ای درس خود را وارد کنید..."
              description='پکیج نقره ای شامل ویدیو تمام دروس و مقاله های مورد نیاز
              میشود.'
              disabled={true}
            />
          </div>

          <div className='sm:col-span-2'>
            <PriceInput
              name='price3'
              label='قیمت پکیج طلایی:'
              // placeholder="قیمت پکیج طلایی درس خود را وارد کنید..."
              description='پکیج طلایی شامل ویدیو تمام دروس و مقاله های مورد نیاز و کتاب
              های مربوطه به صورت PDF میشود.'
              disabled={true}
            />
          </div>

          <div className='col-span-full'>
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel className='flex items-center gap-2'>
                    توضیحات:
                    {classDetailsIsLoading ? (
                      <Loader2 className='ml-2 h-4 w-4 animate-spin' />
                    ) : null}
                    <InfoTooltip message='توضیحات در صفحه نمایش درس قابل مشاهده خواهد بود.' />
                  </FormLabel>
                  <FormControl>
                    {field.value ? (
                      <Tiptap
                        description={field.value || ""}
                        onChange={field.onChange}
                      />
                    ) : (
                      <Tiptap
                        description={field.value || ""}
                        onChange={field.onChange}
                      />
                    )}
                  </FormControl>
                  <FormMessage className='text-xs text-red-500' />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className='self-center'>
          <Button
            className='rounded px-8 text-lg text-white'
            disabled={form.formState.isSubmitting}
            name='Create'
          >
            {form.formState.isSubmitting && (
              <Loader2 className='ml-2 h-4 w-4 animate-spin' />
            )}
            ذخیره
          </Button>
        </div>
      </form>
    </Form>
  );
}
