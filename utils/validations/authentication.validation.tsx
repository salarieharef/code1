import * as yup from "yup";

export const loginValidationSchema = (selectedCountry: any) => {
  const countryCodeLength = selectedCountry?.code?.length;
  const requiredDigits = 11 - countryCodeLength + 1;

  return yup.object({
    number: yup
      .string()
      .required("شماره موبایل نباید خالی باشد")
      .test(
        "number",
        `شماره موبایل باید ${requiredDigits} رقم و بدون صفر اول باشد`,
        (value) => {
          const regex = new RegExp(`^[1-9][0-9]{${requiredDigits - 1}}$`);
          return regex.test(value);
        }
      ),
    password: yup
      .string()
      .min(8, "رمز ورود باید حداقل ۸ رقم باشد")
      .max(20, "رمز ورود باید حداکثر ۲۰ رقم باشد")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/,
        "رمز ورود باید دارای کلمات کوچک و بزرگ باشد"
      )
      .required("لطفا رمز خود را وارد کنید"),
  });
};

export const signUpValidationSchema = yup
  .object({
    user_type: yup.string().required("نقش کاربری خود را انتخاب کنید."),
    first_name: yup.string().when("user_type", {
      is: (val: string) => val == "organization" || val == "student",
      then: (schema) => schema.nullable(),
      otherwise: (schema) => schema.required("نام نباید خالی باشد"),
    }),
    last_name: yup.string().when("user_type", {
      is: (val: string) => val == "organization" || val == "student",
      then: (schema) => schema.nullable(),
      otherwise: (schema) => schema.required("نام خانوادگی نباید خالی باشد"),
    }),
    rules_agreed: yup
      .boolean()
      .oneOf([true], "لطفا قوانین را مطالعه و تایید کنید.")
      .required("لطفا قوانین را مطالعه و تایید کنید."),
    organ_name: yup.string().when("user_type", {
      is: "organization",
      then: (schema) => schema.required("نام ارگان نباید خالی باشد"),
      otherwise: (schema) => schema.nullable(),
    }),
    organ_type: yup.string().when("user_type", {
      is: "organization",
      then: (schema) => schema.required("نوع ارگان نباید خالی باشد"),
      otherwise: (schema) => schema.nullable(),
    }),
  })
  .required();

export const validationVerificationSchema = (
  signupStep: boolean,
  signupUserType: string,
  validationStep: boolean
) =>
  yup
    .object({
      first_name:
        signupStep && signupUserType !== "organization"
          ? yup.string().required("نام نباید خالی باشد")
          : yup.string(),
      last_name:
        signupStep && signupUserType !== "organization"
          ? yup.string().required("نام خانوادگی نباید خالی باشد")
          : yup.string(),
      user_type: signupStep
        ? yup.string().required("نقش کاربری نباید خالی باشد")
        : yup.string(),
      number: yup
        .string()
        .required("شماره موبایل نباید خالی باشد")
        .min(10, "شماره نمیتواند کمتر از ۱۰ رقم باشد")
        .max(11, "شماره نمیتواند بیشتر از ۱۱ رقم باشد."),
      rules_agreed: signupStep
        ? yup
            .boolean()
            .oneOf([true], "لطفا قوانین را مطالعه و تایید کنید.")
            .required("لطفا قوانین را مطالعه و تایید کنید.")
        : yup.boolean(),
      organ_name:
        signupStep && signupUserType == "organization"
          ? yup.string().required("نام ارگان نباید خالی باشد")
          : yup.string(),
      organ_type:
        signupStep && signupUserType == "organization"
          ? yup.string().required("نوع ارگان نباید خالی باشد")
          : yup.string(),
      otp: validationStep
        ? yup.string().required("کد تایید نباید خالی باشد")
        : yup.string(),
    })
    .required();
