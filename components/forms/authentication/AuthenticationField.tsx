"use client";

import Image from "next/image";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export const PhoneNumberField = ({
  form,
  countryList,
  countryListIsLoading,
  selectedCountry,
  setSelectedCountry,
}: any) => (
  <FormField
    control={form.control}
    name="number"
    render={({ field }: any) => (
      <FormItem>
        <FormControl>
          <div className={`col-span-3 flex`}>
            <div className="w-35 ml-1 flex items-center justify-center">
              {countryListIsLoading ? (
                <Loader2 className="mx-2 h-5 w-5 animate-spin" />
              ) : (
                <Select
                  dir="ltr"
                  value={selectedCountry?.code}
                  onValueChange={(v: any) => {
                    const selectedCountry = countryList.find(
                      (country: any) => country.code === v
                    );
                    setSelectedCountry(selectedCountry);
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
                        className="mr-2 inline-block"
                      />
                      {"+" + selectedCountry?.code}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {countryList && countryList.length > 0
                      ? countryList.map((country: any, index: number) => (
                          <SelectItem key={index} value={country.code}>
                            <Image
                              src={country?.image}
                              alt={country?.code}
                              width={20}
                              height={20}
                              className="mr-2 inline-block"
                            />
                            {"+" + country?.code}
                          </SelectItem>
                        ))
                      : null}
                  </SelectContent>
                </Select>
              )}
            </div>
            <Input
              className={`flex-grow rounded-r`}
              type="number"
              placeholder="شماره تلفن خود را وارد کنید..."
              {...field}
            />
          </div>
        </FormControl>
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />
);

export const PasswordField = ({ form }: any) => (
  <FormField
    control={form.control}
    name="password"
    render={({ field }: any) => (
      <FormItem>
        <FormControl>
          <Input
            placeholder="رمز ورود خود را وارد کنید..."
            {...field}
            className={`col-span-3 border-r-4 ${
              form.formState.errors?.password
                ? "border-r-destructive"
                : "border-r-primary"
            } w-full`}
            type="password"
          />
        </FormControl>
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />
);
