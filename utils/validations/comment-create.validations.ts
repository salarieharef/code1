import * as yup from "yup";

export const CommentCreate = yup.object({
	msg: yup.string().required("پیام نمیتواند خالی باشد"),
});
