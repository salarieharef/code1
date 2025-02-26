import validations from "@/utils/validations";

export type AccountInfoType = yup.InferType<typeof validations.AccountInfo>;
