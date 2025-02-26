"use client";

// Util imports
import * as yup from "yup";
import RenderField from "../RenderField";

import { course_form_context } from "@/context/course/form.context";
import {
  generateLessonWeekOptions,
  generateWeekOptions,
} from "@/utils/functions/generateWeekOptions";
import validations from "@/utils/validations";
import { memo, useContext, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import HeadlineTable from "./HeadlineTable";

export type Inputs = yup.InferType<typeof validations.ClassCreate>;

interface CourseFormProps {
  type?: string;
  courseId?: string;
  read_only?: boolean;
}

const HeadlineForm: React.FC<CourseFormProps> = memo(
  ({ type, courseId, read_only }) => {
    const form = useFormContext();
    const { formDisabledSteps, stepPath }: any =
      useContext(course_form_context);
    const isFormDisabled: boolean = formDisabledSteps.includes(stepPath);

    const fields = [
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
        disabled: read_only || isFormDisabled,
      },
      {
        type: "durationPicker",
        name: "avg_lesson_time",
        title: "مدت زمان آموزش:",
        placeholder: "مدت زمان",
        required: true,
        disabled: read_only || isFormDisabled,
      },
    ];

    const weekCount = form.getValues("week_count");
    const headlines = form.getValues("headlines");

    const previousHeadlinesRef = useRef(0);

    useEffect(() => {
      const newHeadlines = generateLessonWeekOptions(
        Number(weekCount),
        form.watch("section") == "skill" ? "جلسه" : "هفته"
      );

      newHeadlines.forEach((option, i) => {
        option.name = headlines[i]?.name;
      });

      form.setValue("headlines", newHeadlines);
    }, [weekCount]);

    useEffect(() => {
      const currentHeadlines = form.getValues("headlines");
      if (previousHeadlinesRef.current !== currentHeadlines?.length) {
        form.setValue("week_count", String(currentHeadlines?.length));
        previousHeadlinesRef.current = currentHeadlines?.length;
      }
    }, [headlines]);

    return (
      <>
        <div className='space-y-6'>
          <div className='grid-cols-1 items-center gap-4 px-2 py-2 md:grid md:grid-cols-2 md:px-6  lg:grid-cols-3'>
            {fields.map((field, i) => (
              <div className='col-span-1' key={i}>
                <RenderField
                  read_only={read_only || isFormDisabled}
                  key={field.name}
                  {...field}
                />
              </div>
            ))}
          </div>
        </div>
        <HeadlineTable type={type} read_only={read_only || isFormDisabled} />
      </>
    );
  }
);

HeadlineForm.displayName = "HeadlineForm";

export default HeadlineForm;
