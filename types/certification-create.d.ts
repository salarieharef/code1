import validations from "@/utils/validations";

export type CertificationCreateType = yup.InferType<
	typeof validations.CertificationCreate
>;
