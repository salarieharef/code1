"use client";
import { useToast } from "@/components/ui/use-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

// Component imports
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

// Icon imports
import { Loader2 } from "lucide-react";

// Fetch imports
import routes from "@/utils/api/routes";

// Util imports
import { InfoTooltip } from "@/components/global/InfoTooltip";
import ReusableFileDropzone from "@/components/global/dropzone/ReusableFileDropzone";

import { nextFetcher } from "@/utils/api/next-fetcher";
import validations from "@/utils/validations";
import { filter, find, first, flatten, get, map } from "lodash-es";
import SectionFieldsForm from "./SectionFieldsForm";
import { useSession } from "next-auth/react";
import useSWR, { useSWRConfig } from "swr";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";

const Tiptap = dynamic(() => import("@/components/global/editor/TipTap"), {
  ssr: false,
});

export type Inputs = yup.InferType<typeof validations.ClassCreate>;

export default function CreateClassForm() {
  const { toast } = useToast();
  const router = useRouter();
  const { classId } = useParams(); // Check if classId exists to determine edit mode
  const { data: session }: any = useSession();
  const { mutate } = useSWRConfig();
  const teacherId = session?.user?.id;

  const prevSection = useRef();

  // Fetch class details if editing
  const { data: details, isLoading: classDetailsIsLoading } = useSWR(
    classId ? routes.courseRoutes.detail(classId) : null,
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
      name: "",
      description: "",
      section: "university",
      // price: "",
      // price2: "",
      // price3: "",
      status: "public",
      // other_main_group_name: "",
      // other_side_group_name: "",
    },
    resolver: yupResolver(validations.ClassCreate),
  });

  const createCategories = (data: any) => {
    const categories = [
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

  const AddCourse: SubmitHandler<Inputs> = async (data: any) => {
    const categories = createCategories(data);
    if (data.grade) {
      categories.push(data.grade);
    }
    if (data.academic_branch) {
      categories.push(data.academic_branch);
    }

    try {
      const res = await nextFetcher({
        url: routes.courseRoutes.add,
        method: "POST",
        body: {
          name: data.name,
          description: data.description,
          status: data.status,
          price: data.price ? data.price.replace(/,/g, "") : 0,
          price2: data.price2 ? data.price2.replace(/,/g, "") : 0,
          price3: data.price3 ? data.price3.replace(/,/g, "") : 0,
          is_college: data?.is_college === "true",
          categories: [...categories],
        },
        useToken: true,
      });
      const imageFormData = new FormData();
      imageFormData.append("image", data.image[0]);
      const image = await nextFetcher({
        url: routes.courseRoutes.uploadImage(res?.data?.id),
        method: "POST",
        body: imageFormData,
        useToken: true,
      });

      if (res.success) {
        toast({
          variant: "success",
          title: res.msg,
        });
        router.push(`/studio/class/${res.data?.id}/lessons`);
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
          status: data.status,
          is_college: data.is_college === "true",
          categories: [...categories, data.academic_branch],
        },
        useToken: true,
      });

      if (res.success) {
        toast({
          variant: "success",
          title: res.msg,
        });
        mutate(routes.courseRoutes.detail(classId));
        router.push(`/studio/class/${classId}/lessons`);
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
    setFormValue("description", data?.description);
    setFormValue("status", data?.status);
    setFormValue("is_college", data?.is_college ? "true" : "false");
    setFormValue("is_college", data?.is_college ? "true" : "false");

    const setFormValueFromCategories = (type: any) =>
      setFormValue(type, filter(data?.categories, { type }));

    if (!setCommonFieldsOnly) {
      setFormValue(
        "section",
        get(first(data?.categories), "section") || "university"
      );
      //!TODO grade change select box change this
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

  // Watch the section and grade selected
  const section = form.watch("section");

  useEffect(() => {
    if (details?.data) {
      setFormValues(details?.data, false);
    }
  }, [details, form]);

  // useEffect(() => {
  //   // Store the previous section value
  //   prevSection.current = details?.data?.section;

  //   // Check if details.data exists
  //   if (details?.data) {
  //     // If the current section is different from the previous one,
  //     // pass true to setFormValues
  //     // Otherwise, pass false
  //     setFormValues(details?.data, section !== prevSection.current);
  //   } else {
  //     form.setValue("grade", "");
  //     form.setValue("branch", []);
  //     form.setValue("main_group", []);
  //     form.setValue("side_group", []);
  //     form.setValue("field", []);
  //     form.setValue("lesson", []);
  //   }
  // }, [section]);

  // Watch the value of main_group and side_group
  // const main_group = form.watch("main_group");
  // const side_group = form.watch("side_group");

  // Set the value if the maingroup selected id 0 and not losing the previous values
  // useEffect(() => {
  //   if (
  //     details?.data &&
  //     section === "skill" &&
  //     main_group?.some((item) => +item.id === 0)
  //   ) {
  //     const currentSideGroup = form.getValues("side_group");
  //     if (currentSideGroup && !currentSideGroup.some((item) => item.id === 0)) {
  //       form.setValue("side_group", [
  //         ...currentSideGroup,
  //         { type: "side_group", title: "سایر", id: 0 },
  //       ]);
  //     }
  //   }
  // }, [main_group]);

  // Determine if editing or creating
  const isEditing = !!classId;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(isEditing ? EditCourse : AddCourse)}
        className='flex flex-col gap-y-4'
      >
        {details?.data ? (
          <Badge
            className='w-max self-center sm:self-auto'
            variant={details?.data?.is_active ? "success" : "destructive"}
          >
            {details?.data?.is_active
              ? "درس شما از طرف ادمین فعال شده است"
              : "درس شما از طرف ادمین هنوز فعال نشده است"}
          </Badge>
        ) : null}

        <div className='grid gap-4 lg:grid-cols-6'>
          <div className='sm:col-span-2'>
            <ReusableFileDropzone />
          </div>

          <div className='grid gap-4 sm:col-span-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex items-center gap-2 text-center'>
                    عنوان درس: <span className='text-destructive'>*</span>
                    {classDetailsIsLoading ? (
                      <Loader2 className='ml-2 h-4 w-4 animate-spin' />
                    ) : null}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='عنوان درس خود را وارد کنید...'
                      {...field}
                      className='w-full border-0 bg-secondary'
                      type='text'
                    />
                  </FormControl>
                  <FormMessage className='text-xs text-red-500' />
                </FormItem>
              )}
            />

            <CategorySectionSelect
              tooltip='نوع درس خود را انتخاب کنید'
              required={true}
            />
          </div>

          <SectionFieldsForm section={section} />
        </div>

        <div className='sm:col-span-full'>
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel className='flex items-center gap-2 text-center'>
                  توضیحات:
                  <InfoTooltip message='توضیحات در صفحه نمایش درس قابل مشاهده خواهد بود.' />
                </FormLabel>
                <FormControl>
                  <Tiptap
                    description={field.value || ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage className='text-xs text-red-500' />
              </FormItem>
            )}
          />
        </div>

        <div className='flex items-center justify-center gap-2'>
          <Button
            className='h-8 w-24 rounded text-lg text-white'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2 className='ml-2 h-4 w-4 animate-spin' />
            )}
            {isEditing ? "ذخیره" : "ایجاد"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
