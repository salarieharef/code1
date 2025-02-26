import * as yup from "yup";

export const UserInfo = yup.object({
  first_name: yup.string().required("نام نمیتواند خالی باشد"),
  last_name: yup.string().required("نام خانوادگی نمیتواند خالی باشد"),
  mobile: yup.string(),
  avatar: yup.mixed().nullable(),
  introduction_video: yup.mixed().nullable(),
  resume: yup.mixed().nullable(),
  bio: yup.string().nullable(),
  // Optional field_id with transform
  field_id: yup
    .string()
    .nullable()
    .notRequired()
    .transform((value) =>
      typeof value === "object" && value?.id ? value.id : value
    ),
  city_id: yup.string().required("انتخاب شهر اجباری است"),
  state: yup.string().required("انتخاب استان اجباری است"),
  university_id: yup.string().required("انتخاب واحد دانشگاهی اجباری است"),
  gender: yup.string().required("جنسیت خود را انتخاب کنید."),
  father_name: yup.string().required("نام پدر نمیتواند خالی باشد"),
  nation_code: yup
    .string()
    .required("کد ملی نمیتواند خالی باشد.")
    .matches(/^[0-9]{10}$/, "کد ملی باید دقیقاً ۱۰ رقم باشد"),
  education_number: yup.string().nullable(),
  academic_affiliation: yup.string().nullable(),
  academic_role: yup.string().nullable(),
  education_activities: yup.array().nullable(),
  education_histories: yup.array().nullable(),
  education_tendency: yup.string().required("گرایش تحصیلی نمیتواند خالی باشد"),
  education_title: yup
    .string()
    .required("آخرین مدرک تحصیلی نمیتواند خالی باشد"),
  education_image: yup.mixed().nullable(),
  email: yup.string().email("آدرس ایمیل معتبر نیست").nullable(),
  description: yup.string().nullable().notRequired(),
  rules_agreed: yup
    .boolean()
    .oneOf([true], "موافقت با قوانین اجباری میباشد")
    .required("موافقت با قوانین اجباری میباشد"),
});
