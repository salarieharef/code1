import * as yup from "yup";

export const CategoryBaseFormSchema = yup.object({
  section: yup.string().required("بخش اجباری است."),
  grade: yup.string().when("section", {
    is: (val: string) => val == "school",
    then: (schema) => schema.required().min(1, "حداقل یک مقطع اجباری است."),
    otherwise: (schema) => schema.nullable(),
  }),
  branch: yup.array().when("section", {
    is: (val: string) => val == "school",
    // then: (schema) => schema.required().min(1, "حداقل یک شاخه اجباری است."),
    then: (schema) => schema.nullable(),
    otherwise: (schema) => schema.nullable(),
  }),
  main_group: yup.array().when("section", {
    is: (val: string) => val == "school" || val == "skill",
    // then: (schema) =>
    //   schema.required().min(1, "حداقل یک گروه اصلی اجباری است."),
    then: (schema) => schema.nullable(),
    otherwise: (schema) => schema.nullable(),
  }),
  side_group: yup.array().when("section", {
    is: (val: string) => val == "school" || val == "skill",
    // then: (schema) =>
    //   schema.required().min(1, "حداقل یک گروه فرعی اجباری است."),
    then: (schema) => schema.nullable(),
    otherwise: (schema) => schema.nullable(),
  }),
  field: yup.array().when("section", {
    is: (val: string) => val == "school",
    // then: (schema) => schema.required().min(1, "حداقل یک رشته اجباری است."),
    then: (schema) => schema.nullable(),
    otherwise: (schema) => schema.nullable(),
  }),
  lesson: yup.array().nullable(),
  academic_branch: yup.string().when("section", {
    is: (val: string) => val == "university" || val == "deep_learn",
    then: (schema) => schema.required("دسته‌بندی اجباری است."),
    otherwise: (schema) => schema.optional(),
  }),
  academic_group: yup.array().when("section", {
    is: (val: string) => val == "university" || val == "deep_learn",
    then: (schema) =>
      schema
        .required("دسته‌بندی اجباری است.")
        .min(1, "حداقل یک دسته اجباری است."),
    otherwise: (schema) => schema.nullable(),
  }),
  academic_field: yup.array().when("section", {
    is: (val: string) => val == "university" || val == "deep_learn",
    then: (schema) =>
      schema
        .required("دسته‌بندی اجباری است.")
        .min(1, "حداقل یک دسته اجباری است."),
    otherwise: (schema) => schema.nullable(),
  }),
});

export const CollegeBaseFormSchema = yup.object({
  is_college: yup.string().when("section", {
    is: "university",
    then: (schema) => schema.required("انتخاب یکی از گزینه ها اجباری است."),
    otherwise: (schema) => schema.nullable(),
  }),
  colleges: yup.array().when("is_college", {
    is: "true",
    then: (schema) =>
      schema
        .required("دانشکده اجباری است.")
        .min(1, "حداقل یک دانشکده اجباری است."),
    otherwise: (schema) => schema.nullable(),
  }),
});
