import * as yup from "yup";
import {
  CategoryBaseFormSchema,
  CollegeBaseFormSchema,
} from "./category/category.validations";

export const ClassCreate = yup.object({
  image: yup.mixed().nullable(),
  name: yup.string().required("عنوان نمیتواند خالی باشد"),
  // level: yup.string().nullable(),
  description: yup.string().nullable(),
  status: yup.string().required("وضعیت درس نمیتواند خالی باشد"),
  section: yup.string().required("بخش اجباری است."),

  ...CategoryBaseFormSchema.shape,

  // price: yup.string(),
  // price2: yup.string(),
  // price3: yup.string(),

  // other_main_group_name: yup.string().when(["main_group", "section"], {
  //   is: (main_group: any, section: string) =>
  //     some(main_group, (val) => val.id == 0) && section === "skill",
  //   then: (schema) => schema.required("نام گروه اصلی نمیتواند خالی باشد."),
  //   otherwise: (schema) => schema.nullable(),
  // }),
  // other_side_group_name: yup.string().when(["side_group", "section"], {
  //   is: (side_group: any, section: string) =>
  //     some(side_group, (val) => val.id == 0) && section === "skill",
  //   then: (schema) => schema.required("نام گروه فرعی نمیتواند خالی باشد."),
  //   otherwise: (schema) => schema.nullable(),
  // }),

  //new validation teaching
  // courseType: yup.string().required("نوع درس الزامی است"),
  prerequisite_title: yup.string().required("درس پیش‌نیاز الزامی است"),
  week_count: yup
    .number()
    .required("تعداد هفته‌های آموزشی الزامی است")
    .positive("تعداد هفته باید مثبت باشد")
    .integer("تعداد هفته باید عدد صحیح باشد"),
  avg_lesson_time: yup
    .number()
    .required("مدت زمان آموزش الزامی است")
    .positive("مدت زمان باید مثبت باشد"),
  theoretical_count: yup
    .number()
    .required("تعداد واحد نظری الزامی است")
    .positive("تعداد واحد باید مثبت باشد"),
  practical_count: yup
    .number()
    .required("تعداد واحد عملی الزامی است")
    .positive("تعداد واحد باید مثبت باشد"),
  // titleLesson: yup.string().required("عنوان درس خالی است"),
  // basic_info: yup.string().required("معلومات پایه‌ای الزامی است"),
  rules_agreed: yup.boolean().required("موافقت با قوانین اجباری میباشد"),
});

// Validation schema for CourseForm
export const CourseFormSchema = yup.object().shape(
  {
    ...CategoryBaseFormSchema.fields,
    ...CollegeBaseFormSchema.fields,
    name: yup.string().required("عناوین دروس الزامی است"),
    prerequisite_title: yup.mixed().nullable().notRequired(),
    week_count: yup
      .number()
      .required("تعداد هفته‌های آموزشی الزامی است")
      .positive("تعداد هفته باید مثبت باشد")
      .integer("تعداد هفته باید عدد صحیح باشد")
      .min(1, "حداقل یک هفته الزامی است.")
      .max(25, "حداکثر ۲۵ هفته قابل انتخاب می‌باشد."),
    avg_lesson_time: yup
      .number()
      .min(1, "مدت زمان آموزش الزامی است")
      .required("مدت زمان آموزش الزامی است"),
    theoretical_count: yup
      .number()
      .when("section", {
        is: "university",
        then: (schema) => schema.required("تعداد واحد نظری الزامی است"),
        otherwise: (schema) => schema.notRequired().nullable(),
      })
      .when(["practical_count", "section"], {
        is: (practical: number, section: string) =>
          practical === 0 && section === "university",
        then: (schema) =>
          schema.test(
            "not-both-zero",
            "تعداد واحد نظری نمیتواند صفر باشد اگر تعداد واحد عملی صفر است.",
            function (value) {
              return value !== 0;
            }
          ),
        otherwise: (schema) => schema,
      }),
    practical_count: yup
      .number()
      .when("section", {
        is: "university",
        then: (schema) => schema.required("تعداد واحد عملی الزامی است"),
        otherwise: (schema) => schema.notRequired().nullable(),
      })
      .when(["theoretical_count", "section"], {
        is: (theoretical: number, section: string) =>
          theoretical === 0 && section === "university",
        then: (schema) =>
          schema.test(
            "not-both-zero",
            "تعداد واحد عملی نمیتواند صفر باشد اگر تعداد واحد نظری صفر است.",
            function (value) {
              return value !== 0;
            }
          ),
        otherwise: (schema) => schema,
      }),
    basic_info: yup.string().notRequired().nullable(),
    description: yup.string().required("معرفی درس الزامی است."),
    references: yup.object().shape({
      main_references: yup
        .array()
        .of(
          yup.object().shape(
            {
              reference: yup.string().when("file", {
                is: (schema: any) => !schema,
                then: (schema) =>
                  schema.required(
                    "نام مرجع الزامی می‌باشد اگر فایل مرجع خالی می‌باشد."
                  ),
                otherwise: (schema) => schema.nullable().notRequired(),
              }),
              file: yup.mixed().when("reference", {
                is: (schema: any) => !schema?.length,
                then: (schema) =>
                  schema.required(
                    "فایل مرجع الزامی می‌باشد اگر نام مرجع خالی می‌باشد."
                  ),
                otherwise: (schema) => schema.nullable().notRequired(),
              }),
            },
            [["reference", "file"]]
          )
        )
        .min(1, "حداقل یک مرجع اصلی الزامی می‌باشد"),
      additional_references: yup.array().of(
        yup.object().shape(
          {
            reference: yup.string().nullable().notRequired(),
            // .when("file", {
            //   is: (schema: any) => !schema,
            //   then: (schema) =>
            //     schema.required(
            //       "نام مرجع الزامی می‌باشد اگر فایل مرجع خالی می‌باشد."
            //     ),
            //   otherwise: (schema) => schema.nullable().notRequired(),
            // }),
            file: yup.mixed().nullable().notRequired(),
            // .when("reference", {
            //   is: (schema: any) => !schema?.length,
            //   then: (schema) =>
            //     schema.required(
            //       "فایل مرجع الزامی می‌باشد اگر نام مرجع خالی می‌باشد."
            //     ),
            //   otherwise: (schema) => schema.nullable().notRequired(),
            // }),
          },
          [["reference", "file"]]
        )
      ),
    }),
  },
  [["practical_count", "theoretical_count"]]
);

// Validation schema for HeadlineForm
export const HeadlineFormSchema = yup.object({
  week_count: yup
    .number()
    .required("تعداد هفته‌های آموزشی الزامی است")
    .positive("تعداد هفته باید مثبت باشد")
    .integer("تعداد هفته باید عدد صحیح باشد")
    .min(1, "حداقل یک هفته الزامی است.")
    .max(25, "حداکثر ۲۵ هفته قابل انتخاب می‌باشد."),
  avg_lesson_time: yup.number().required("مدت زمان آموزش الزامی است"),
  headlines: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.mixed().notRequired().nullable(), // Assuming 'id' can be any type, but required
        title: yup.string().required("هفته سرفصل الزامی می‌باشد"), // Assuming 'title' is also required
        name: yup.string().required("موضوع سرفصل الزامی می‌باشد"), // 'name' must be a required string
      })
    )
    .min(1, "حداقل یک هفته الزامی می‌باشد."), // Ensure the array is not empty
});

// Validation schema for SampleForm
export const SampleFormSchema = yup.object({
  part_of_video: yup
    .mixed()
    .required("آپلود ویدیو الزامی است")
    .test("is-valid", "آپلود ویدیو الزامی است", (value) => {
      return !!value;
    }),
});

// Validation schema for CollaborationForm
export const CollaborationFormSchema = yup.object({
  estimate_price: yup.string().required("ارزش محتوا الزامی است"),
  contract_type: yup.string().required("انتخاب روش همکاری الزامی است"),
  course_creation_rules_agreed: yup
    .boolean()
    .oneOf([true], "موافقت با قوانین اجباری میباشد")
    .required("موافقت با قوانین اجباری میباشد"),
});

export const ConclusionFormSchema = yup.object({
  contract: yup.mixed().notRequired().nullable(),
  signed_contract: yup.mixed().required("قرارداد امضاء شده نمیتواند خالی باشد"),
  signed_contract_rules_agreed: yup
    .boolean()
    .oneOf([true], "موافقت با قوانین اجباری میباشد")
    .required("موافقت با قوانین اجباری میباشد"),
  otp: yup.string().nullable().notRequired(),
});
