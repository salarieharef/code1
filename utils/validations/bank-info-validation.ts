import * as yup from "yup";
import { removeSeparators } from "../persian-tools/tools-function";

// Define the validation schema
export const BankInfo = yup.object().shape(
  {
    ibanNumber: yup.string().when("cardNumber", {
      is: (val: string) => val == "",
      then: (schema) =>
        schema
          .matches(/^\d{24}$/, "شماره شبا باید ۲۴ رقم باشد")
          .required("شماره شبا اجباری است"),
      otherwise: (schema) => schema.nullable(),
    }),
    cardNumber: yup.string().when("ibanNumber", {
      is: (val: string) => val == "",
      then: (schema) =>
        schema
          .test("cardNumber", "شماره کارت باید ۱۶ رقم باشد", (value) => {
            const cleanedValue = value?.replace(/[-\s]/g, "");
            return cleanedValue?.length === 16;
          })
          .required("شماره کارت اجباری است"),
      otherwise: (schema) => schema.nullable(),
    }),
    withdrawAmount: yup
      .string()
      .test(
        "min-max",
        "مبلغ باید بین ۱۰,۰۰۰ و ۱۰۰,۰۰۰,۰۰۰ تومان باشد",
        (value) => {
          const numValue = Number(removeSeparators(value || "0", ","));
          return numValue >= 10000 && numValue <= 100000000;
        }
      )
      .required("این فیلد را پر کنید"),
  },
  [["cardNumber", "ibanNumber"]]
);
