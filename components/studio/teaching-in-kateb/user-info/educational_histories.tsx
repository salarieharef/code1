import { documentTypeOptions } from "@/constant/teaching-in-kateb/documentOptions.constant";
import ReusableFormTable from "./ReusableFormTable";

export default function EducationalHistories({ type, read_only = false }: any) {
  const columns = [
    {
      key: "title",
      label: "عنوان",
      span: 3,
      placeholder: "عنوان سند را وارد کنید...",
      visible: true,
    },
    {
      key: "type",
      label: "نوع سند",
      span: 3,
      type: "select",
      placeholder: "نوع سند...",
      options: documentTypeOptions,
      visible: true,
    },
    {
      key: "url",
      label: "لینک اطلاعات تکمیلی",
      span: 3,
      placeholder: "لینک اطلاعات تکمیلی را وارد کنید...",
      visible: true,
    },
  ];

  return (
    <ReusableFormTable
      title='سابقه تهیه محتوای متنی یا آموزش ویدئویی'
      fields={["title", "type", "url"]}
      columns={columns}
      name='education_histories'
      type={type}
      read_only={read_only}
    />
  );
}
