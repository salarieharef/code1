"use client";

// Util imports
import * as yup from "yup";
import RenderField from "../RenderField";
import { useFormContext } from "react-hook-form";
import { cn } from "@/utils/cn";
import validations from "@/utils/validations";
import { useContext, useEffect } from "react";
import { generateWeekOptions } from "@/utils/functions/generateWeekOptions";
import { course_form_context } from "@/context/course/form.context";

export type Inputs = yup.InferType<typeof validations.ClassCreate>;

interface CourseFormContentProps {
  type?: string;
}

const CourseFormContent: React.FC<CourseFormContentProps> = ({ type }) => {
  const form = useFormContext<Inputs>();

  //disabled readonly Step without submit form
  const { formDisabledSteps, stepPath }: any = useContext(course_form_context);
  const isFormDisabled = formDisabledSteps.includes(stepPath);

  const fields = [
    {
      type: "file",
      name: "image",
      placeholder: "تصویر مورد نظر خود را برای آپلود بکشید و رها کنید.",
      required: false,
      disabled: isFormDisabled,
    },
    {
      type: "category",
      name: "section",
      title: "بخش:",
      tooltip: "بخش دسته‌بندی درس را انتخاب کنید",
      required: true,
      disabled: isFormDisabled,
    },
    {
      type: "text",
      name: "name",
      title: "عنوان درس:",
      placeholder: "عنوان درس خود را وارد کنید",
      required: true,
      disabled: isFormDisabled,
    },
    {
      type: "tag",
      name: "prerequisite_title",
      title: "عناوین دروس پیش‌نیاز:",
      placeholder: "درس پیش‌نیاز را وارد کنید",
      required: false,
      disabled: isFormDisabled,
    },
    {
      type: "select",
      name: "week_count",
      title: "تعداد هفته آموزشی:",
      placeholder: "تعداد هفته‌ها را انتخاب کنید",
      required: true,
      options: generateWeekOptions({
        maxWeek: 25,
        appendedText: form.watch("section") === "skill" ? "جلسه" : "هفته",
        valueType: "default",
        formatType: "simple",
      }),
      disabled: isFormDisabled,
    },
    {
      type: "durationPicker",
      name: "avg_lesson_time",
      title: "مدت زمان آموزش:",
      placeholder: "مدت زمان به ساعت",
      required: true,
      disabled: isFormDisabled,
    },
    {
      type: "categories",
      name: "categories",
      title: "",
      section: form.watch("section"),
      disabled: isFormDisabled,
    },
    {
      type: "select",
      name: "theoretical_count",
      title: "تعداد واحد نظری:",
      tooltip: "فقط عدد وارد کنید.",
      placeholder: "تعداد واحد نظری...",
      required: true,
      options: Array.from({ length: 10 }, (_, i) => ({
        value: String(i),
        label: String(i),
      })),
      disabled: isFormDisabled,
    },
    {
      type: "select",
      name: "practical_count",
      title: "تعداد واحد عملی:",
      tooltip: "فقط عدد وارد کنید.",
      placeholder: "تعداد واحد عملی...",
      required: true,
      options: Array.from({ length: 10 }, (_, i) => ({
        value: String(i),
        label: String(i),
      })),
      disabled: isFormDisabled,
    },

    {
      type: "text",
      name: "basic_info",
      title: "معلومات پایه‌ای موردنیاز:",
      placeholder: "معلومات پایه‌ای را وارد کنید",
      // required: true,
      disabled: isFormDisabled,
    },
    {
      type: "editor",
      name: "description",
      title: "معرفی درس (اهداف درس، توضیحات کلی در خصوص درس و کاربردهای آن):",
      placeholder: "توضیحات.",
      required: true,
      disabled: isFormDisabled,
    },
  ];

  console.log("course image", form.watch("image"));

  return (
    <div className='space-y-6'>
      <div className='items-center gap-4 sm:grid sm:grid-cols-3'>
        {fields.slice(0, 1).map((field) => (
          <RenderField key={`course-${field.name}`} {...field} />
        ))}

        <div className='col-span-2 items-center gap-4 space-y-4'>
          {fields.slice(1, 3).map((field, index) => (
            <div
              className={cn("w-full sm:w-full", index + 1 === 1 && "sm:w-1/2")}
              key={`course-${field.name}`}
            >
              <RenderField {...field} />
            </div>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        {fields.slice(3, fields.length - 1).map((field, index) => (
          <RenderField key={`course-one-${index}`} {...field} />
        ))}
      </div>

      <div className='grid grid-cols-1'>
        {fields.slice(fields.length - 1).map((field, index) => (
          <RenderField key={`course-two${index}`} {...field} />
        ))}
      </div>
    </div>
  );
};

export default CourseFormContent;
