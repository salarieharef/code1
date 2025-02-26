import * as yup from "yup";

export const CertificationCreate = yup.object({
	title: yup.string().required("عنوان نمیتواند خالی باشد"),
	image: yup
		.mixed()
		.required("تصویر نمیتواند خالی باشد")
		.test("fileFormat", "تصویر نمیتواند خالی باشد", (value: any) => {
			return value;
		}),
});
