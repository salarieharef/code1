"use client";
// VerificationForm.tsx
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

import { useToast } from "@/components/ui/use-toast";
import { global_context } from "@/context/global";
import { useSubmitForm } from "@/hooks/api";
import {
  CountryType,
  FormInputs,
  VerificationFormProps,
} from "@/types/authentication/verification-types";
import { nextFetcher } from "@/utils/api/next-fetcher";
import routes from "@/utils/api/routes";
import { useVerificationFunctions } from "@/utils/functions/authentication/useVerification.function";
import { validationVerificationSchema } from "@/utils/validations/authentication.validation";

// import { VerificationFormProps, FormInputs, CountryType } from "./types";
// import { validationSchema } from "./validationSchema";
// import { useVerificationFunctions } from "./verificationFunctions";
import PhoneInputSection from "./PhoneInputSection";
import StudentSignupForm from "./student-signup-form";
import ValidationForm from "./validation-form";
// import PhoneInputSection from "./PhoneInputSection";
import LogoImg from "@/static/images/global/logo.webp";

export function VerificationForm({
  openedLoginDialogFromClassPage,
}: VerificationFormProps) {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  const submitForm = useSubmitForm();

  const [validationStep, setValidationStep] = useState(false);
  const [signupStep, setSignupStep] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [newUser, setNewUser] = useState<any>(null);

  const { signupUserType }: any = useContext(global_context);

  const [selectedCountry, setSelectedCountry] = useState<CountryType>({
    id: "",
    name: "",
    code: "",
    image: "",
  });

  const { data: { data: countryList } = {}, isLoading: countryListIsLoading } =
    useSWR(
      routes.authRoutes.getCountries,
      (url) => nextFetcher({ url, method: "GET", useToken: true }),
      { revalidateOnFocus: false }
    );

  useEffect(() => {
    if (countryList?.length > 0) {
      const iran = countryList.find(
        (country: CountryType) => country.code === "98"
      );
      if (iran) setSelectedCountry(iran);
    }
  }, [countryList]);

  const form = useForm<FormInputs>({
    resolver: yupResolver(
      validationVerificationSchema(signupStep, signupUserType, validationStep)
    ),
  });

  const { sendOTP, validate, signup, login } = useVerificationFunctions({
    form,
    submitForm,
    setIsNewUser,
    setValidationStep,
    setSignupStep,
    setNewUser,
    toast,
    searchParams,
    router,
    newUser,
  });

  return (
    <div className='w-full p-0 md:p-8'>
      <div className='flex h-full flex-col items-center justify-center p-10 md:p-0'>
        <Image src={LogoImg} alt='Kateb logo' width={200} height={200} />
        {signupStep ? (
          <StudentSignupForm
            openedLoginDialogFromClassPage={openedLoginDialogFromClassPage}
            submitFunction={signup}
          />
        ) : validationStep ? (
          <ValidationForm
            form={form}
            submitFunction={
              isNewUser ? validate : () => login(form.getValues())
            }
            data={form.getValues()}
          />
        ) : (
          <PhoneInputSection
            form={form}
            sendOTP={sendOTP}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            countryList={countryList}
            countryListIsLoading={countryListIsLoading}
            openedLoginDialogFromClassPage={openedLoginDialogFromClassPage}
          />
        )}
      </div>
    </div>
  );
}
