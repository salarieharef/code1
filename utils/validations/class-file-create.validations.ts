import * as yup from "yup";

export const ClassFileCreate = yup.object({
	type: yup.string().required("نوع نمیتواند خالی باشد"),
	file: yup.mixed().required("فایل نمیتواند خالی باشد"),
	title: yup.string().required("عنوان نمیتواند خالی باشد"),
});
