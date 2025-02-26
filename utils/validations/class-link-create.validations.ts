import * as yup from "yup";

export const ClassLinkCreate = yup.object({
	type: yup.string().required("نوع نمیتواند خالی باشد"),
	title: yup.string().required("عنوان نمیتواند خالی باشد"),
	link: yup.string().required("لینک نمیتواند خالی باشد"),
});
