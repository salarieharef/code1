// PhoneInputSection.tsx
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CountryType,
  FormInputs,
} from "@/types/authentication/verification-types";
import { AlertCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";

interface PhoneInputSectionProps {
  form: any;
  sendOTP: (data: FormInputs) => Promise<void>;
  selectedCountry: CountryType;
  setSelectedCountry: (country: CountryType) => void;
  countryList: CountryType[];
  countryListIsLoading: boolean;
  openedLoginDialogFromClassPage?: boolean;
}

const PhoneInputSection: React.FC<PhoneInputSectionProps> = ({
  form,
  sendOTP,
  selectedCountry,
  setSelectedCountry,
  countryList,
  countryListIsLoading,
  openedLoginDialogFromClassPage,
}) => {
  return (
    <Form {...form}>
      <form
        className='flex h-full w-full flex-col justify-center gap-y-2'
        onSubmit={form.handleSubmit(sendOTP)}
      >
        {openedLoginDialogFromClassPage && (
          <Alert variant='destructive' dir='rtl'>
            <AlertCircle className='h-4 w-4' />
            <AlertDescription>
              برای مشاهده ویدیوها، ابتدا باید وارد سامانه شوید.
            </AlertDescription>
          </Alert>
        )}
        <div className='flex w-full items-center justify-start'>
          <span className='text-right text-[0.65rem] text-slate-500 md:text-xs'>
            دانشجویان و اساتید دانشگاه آزاد اسلامی شماره موبایل ثبت شده در
            آموزشیار را وارد نمایند، تا بتوانند از شرایط ویژه استفاده کنند.
          </span>
        </div>
        <FormField
          control={form.control}
          name='number'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className={`col-span-3 flex`}>
                  <div className='w-35 ml-1 flex items-center justify-center'>
                    {countryListIsLoading && !selectedCountry ? (
                      <Loader2 className='mx-2 h-5 w-5 animate-spin' />
                    ) : (
                      <Select
                        dir='ltr'
                        value={selectedCountry?.code}
                        onValueChange={(v: string) => {
                          const selectedCountry = countryList.find(
                            (country: CountryType) => country.code === v
                          );
                          setSelectedCountry(selectedCountry as CountryType);
                        }}
                      >
                        <SelectTrigger
                          className={`rounded-r border-r-4 ${
                            form.formState.errors?.number
                              ? "border-r-destructive"
                              : "border-r-primary"
                          }`}
                        >
                          <SelectValue>
                            <Image
                              src={selectedCountry?.image}
                              alt={selectedCountry?.code}
                              width={20}
                              height={20}
                              className='mr-2 inline-block'
                            />
                            {"+" + selectedCountry?.code}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent position='popper'>
                          {countryList && countryList.length > 0
                            ? countryList.map(
                                (country: CountryType, index: number) => (
                                  <SelectItem key={index} value={country.code}>
                                    <Image
                                      src={country?.image}
                                      alt={country?.code}
                                      width={20}
                                      height={20}
                                      className='mr-2 inline-block'
                                    />
                                    {"+" + country?.code}
                                  </SelectItem>
                                )
                              )
                            : null}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                  <Input
                    className={`flex-grow rounded-r`}
                    type='number'
                    placeholder='شماره تلفن خود را وارد کنید...'
                    {...field}
                    autoFocus
                  />
                </div>
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />

        <Button
          className='mt-4 rounded-full px-6 text-lg font-bold md:mt-0'
          type='submit'
          disabled={form.formState.isSubmitting || countryListIsLoading}
          name='Verify'
        >
          {form.formState.isSubmitting && (
            <Loader2 className='ml-2 h-4 w-4 animate-spin' />
          )}
          ورود
        </Button>
      </form>
    </Form>
  );
};

export default PhoneInputSection;
