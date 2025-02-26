import validations from "@/utils/validations";

export type BankInfoType = yup.InferType<typeof validations.BankInfo>;
