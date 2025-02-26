import * as yup from "yup";

export const AccountInfo = yup.object().shape(
  {
    // Basic info
    avatar: yup.mixed().nullable().notRequired(),
    academic_affiliation: yup.string().required("انتخاب این گزینه اجباری است."),
    academic_role: yup.string().when("academic_affiliation", {
      is: true,
      then: (schema) => schema.required("انتخاب این گزینه اجباری است."),
      otherwise: (schema) => schema.nullable().notRequired(),
    }),
    job_title: yup.string().nullable().notRequired(),
    workplace: yup.string().nullable().notRequired(),
    bio: yup.string().nullable().notRequired(),
    first_name: yup.string().required("نام نمیتواند خالی باشد"),
    last_name: yup.string().required("نام خانوادگی نمیتواند خالی باشد"),
    mobile: yup.string(),
    gender: yup.string().required("جنسیت خود را انتخاب کنید."),
    father_name: yup.string().required("نام پدر نمیتواند خالی باشد"),
    nation_code: yup
      .string()
      .required("کد ملی نمیتواند خالی باشد.")
      .matches(/^[0-9]{10}$/, "کد ملی باید دقیقاً ۱۰ رقم باشد"),
    state: yup.string().required("لطفا یک استان را انتخاب کنید"),
    city_id: yup.string().required("لطفا یک شهر را انتخاب کنید"),
    email: yup.string().email("آدرس ایمیل معتبر نیست").nullable(),
    university_id: yup.string().when("university_title", {
      is: (schema: string) => schema?.length,
      then: (schema) => schema.nullable().notRequired(),
      otherwise: (schema) =>
        schema.required("لطفا واحد دانشگاهی خود را انتخاب کنید"),
    }),
    university_title: yup.string().when("university_id", {
      is: (schema: string) => schema?.length,
      then: (schema) => schema.nullable().notRequired(),
      otherwise: (schema) =>
        schema.required("لطفا واحد دانشگاهی خود را وارد کنید"),
    }),
    // Optional field_id with transform
    field_id: yup
      .string()
      .nullable()
      .notRequired()
      .transform((value) =>
        typeof value === "object" && value?.id ? value.id : value
      ),

    education_tendency: yup
      .string()
      .required("گرایش تحصیلی نمیتواند خالی باشد."),
    last_degree_university: yup
      .string()
      .required("لطفا نام دانشگاه آخرین مدرک تحصیلی خود را وارد کنید."),
    education_title: yup
      .string()
      .required("آخرین مدرک تحصیلی خود را انتخاب کنید."),
    education_image: yup.mixed().nullable().notRequired(),

    // Activities
    education_activities: yup.array().of(
      yup.object().shape({
        organization: yup.string().required("نام سازمان الزامی می‌باشد."),
        position: yup.string().required("موقعیت و نوع همکاری الزامی می‌باشد."),
      })
    ),

    // Histories
    education_histories: yup.array().of(
      yup.object().shape({
        title: yup.string().required("عنوان الزامی می‌باشد."),
        type: yup.string().required("نوع سند الزامی می‌باشد."),
        url: yup.string().url("آدرس لینک معتبر نیست").nullable().notRequired(),
      })
    ),

    // Resume
    resume: yup.mixed().nullable().notRequired(),

    // Introduction video
    introduction_video: yup.mixed().nullable().notRequired(),
    is_introduction_video_public: yup.boolean().nullable().notRequired(),

    // Description
    description: yup.string().nullable().notRequired(),

    // About
    about_me: yup.string().nullable().notRequired(),

    // Rules
    rules_agreed: yup.boolean().oneOf([true], "موافقت با قوانین اجباری است."),
  },
  [["university_id", "university_title"]]
);
