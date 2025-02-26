import * as yup from "yup";

export const faqSearchSchema = yup.object({
  query: yup.string().required("لطفاً عبارت جستجو را وارد کنید."),
});
