import * as yup from "yup";

export const LessonCreate = yup.object({
  // courses: yup
  // 	.array()
  // 	.required("حداقل یک درس انتخاب کنید")
  // 	.min(1, "حداقل یک درس اجباری است."),
  // courses: yup.number().required("حداقل یک جلسه انتخاب کنید"),
  course_id: yup.string(),
  selectedCourseSection: yup.string().nullable(),
  image: yup.mixed().nullable(),
  // title: yup.string().when("selectedCourseSection", {
  //   is: "university",
  //   then: (schema) => schema.required("هفته نمیتوانم خالی باشد."),
  //   otherwise: (schema) => schema.nullable(),
  // }),
  title: yup.string().required("تعداد هفته‌های آموزشی الزامی است"),
  name: yup.string().required("عنوان نمیتواند خالی باشد"),
  level: yup.string().nullable().notRequired(),
  status: yup.string().nullable(),
  description: yup.string().notRequired().nullable(),
  file: yup.mixed().required("ویدئو نمیتواند خالی باشد"),
});
