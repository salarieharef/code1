import { generateWeekOptions } from "@/utils/functions/generateWeekOptions";
import ReusableFormTable from "../user-info/ReusableFormTable";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useContext } from "react";
import { course_form_context } from "@/context/course/form.context";

export default function HeadlineTable({
  type,
  name = "headlines",
  read_only = false,
}: any) {
  const form = useFormContext();
  const section = form.watch("section");

  const { formDisabledSteps, stepPath }: any = useContext(course_form_context);
  const isFormDisabled: boolean = formDisabledSteps.includes(stepPath);

  const columns = [
    {
      key: "id",
      label: "id",
      span: 0,
      visible: false,
    },
    {
      key: "title",
      label: "هفته",
      span: 3,
      placeholder: "هفته را انتخاب کنید.",
      // type: "select",
      options: generateWeekOptions({
        maxWeek: form.watch("week_count") || 16,
        appendedText: section === "skill" ? "جلسه" : "هفته",
      }),

      visible: true,
      disabled: true,
    },
    {
      key: "name",
      label: "موضوعات سرفصل‌ ها",
      span: 6,
      type: "textarea",
      placeholder: "موضوع سرفصل را وارد کنید...",
      visible: true,
      disabled: isFormDisabled,
    },
  ];

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <ReusableFormTable
              wrapperClassName='md:mt-6 px-2 sm:mt-0  border-none shadow-none'
              cardClassName='p-1 md:p-0 shadow-none'
              fields={["title", "name"]}
              columns={columns}
              name={name}
              type={type}
              read_only={read_only}
              max={25}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
