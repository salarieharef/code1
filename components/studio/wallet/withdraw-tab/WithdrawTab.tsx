"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { getBankFromCard, getBankFromIBAN } from "@/utils/bankUtils";
import { removeSeparators } from "@/utils/persian-tools/tools-function";

import { BankInfoType } from "@/types/bank-info";
import { BankInfo } from "@/utils/validations/bank-info-validation";
import WrapperPriceInput from "../WrapperPriceInput";
import { CardInput } from "./CardInput";
import { CreditDisplay } from "./CreditDisplay";
import { IBANInput } from "./IBANInput";
import { MobileNumberDisplay } from "./MobileNumberDisplay";
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";

const WithdrawTab: React.FC = () => {
  // Fetch user info
  const { data: userInfo, isLoading: userInfoLoading } = useSWR(
    routes.userRoutes.me,
    (url) => nextFetcher({ url, useToken: true })
  );

  // Form setup
  const form = useForm<BankInfoType>({
    resolver: yupResolver(BankInfo),
    defaultValues: {
      withdrawAmount: "1,000,000",
      ibanNumber: "",
      cardNumber: "",
    },
  });

  const { handleSubmit, watch, control } = form;

  // State management
  const [identifiedIBANBank, setIdentifiedIBANBank] = useState<any>(null);
  const [identifiedCardBank, setIdentifiedCardBank] = useState<any>(null);

  const ibanNumber = watch("ibanNumber");
  const cardNumber = watch("cardNumber");

  // Bank identification effect
  useEffect(() => {
    identifyBanks(ibanNumber, cardNumber);
  }, [ibanNumber, cardNumber]);

  // Bank identification function
  const identifyBanks = (iban: string, card: string) => {
    // IBAN identification
    if (iban.length >= 6) {
      const ibanBank = getBankFromIBAN(`IR${iban}`);
      setIdentifiedIBANBank(ibanBank);
      form.setError("ibanNumber", {
        message: ibanBank ? "" : "اطلاعات شبا درست نمیباشد.",
      });
    } else {
      setIdentifiedIBANBank(null);
    }

    // Card identification
    const cleanCard = card.replace(/\s|-/g, "");
    if (cleanCard.length >= 6) {
      const cardBank = getBankFromCard(cleanCard);
      setIdentifiedCardBank(cardBank);

      form.setError("cardNumber", {
        message: cardBank ? "" : "اطلاعات کارت درست نمیباشد.",
      });
    } else {
      setIdentifiedCardBank(null);
    }
  };

  // Form submission handler
  const onSubmit = (data: BankInfoType) => {
    identifyBanks(data.ibanNumber, data.cardNumber);
    const cleanedData = {
      ...data,
      cardNumber: removeSeparators(data.cardNumber, "-"),
    };
    console.log("Form submitted with cleaned data:", cleanedData);
  };

  // Card number formatter
  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.match(/(\d{1,4})/g)?.join("-") || "";
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mx-auto max-w-xl py-6'>
          <div
            className='flex w-full flex-col items-center justify-center space-y-6 text-slate-700 md:p-4'
            dir='rtl'
          >
            <CreditDisplay credit={userInfo?.credit || "146000000"} />

            <div className='w-full'>
              <p className='text-center text-xl font-bold'>
                برای برداشت وجه از کاتب
              </p>
              <p className='mb-2 text-center text-sm'>
                ابتدا اطلاعات حساب و سپس مبلغ را وارد کنید.
              </p>

              <IBANInput
                control={control}
                identifiedBank={identifiedIBANBank}
              />

              <CardInput
                control={control}
                identifiedBank={identifiedCardBank}
                formatCardNumber={formatCardNumber}
              />

              <p className='mb-3 px-1 text-xs'>
                شماره باید متعلق به شماره کارت
                <MobileNumberDisplay
                  mobileNumber={userInfo?.mobile}
                  isLoading={userInfoLoading}
                />
                باشد.
              </p>

              <WrapperPriceInput
                name='withdrawAmount'
                form={form}
                minAmount={10000}
                maxAmount={100000000}
                step={1000}
                separator=','
                separateAtDigit={3}
                unit='toman'
              />

              <Button
                type='submit'
                className='mt-10 w-full rounded-lg py-3 font-bold text-white md:mt-2'
              >
                ادامه
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default WithdrawTab;
