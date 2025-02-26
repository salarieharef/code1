"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { nextFetcher } from "@/utils/api/next-fetcher";
import routes from "@/utils/api/routes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import useSWR, { mutate } from "swr";
import ScrollableAgreement from "./ScrollableAgreement";

export default function RulesAcceptance({
  rule_type,
  name,
  rule_id,
  readonly,
}: any) {
  const form = useFormContext();
  const { toast } = useToast();
  const [isModalRules, setIsModalRules] = useState(false);

  const params = useParams();
  const courseId = params?.id || params?.classId;
  const object_id = rule_id || courseId;

  const { data: ruleData, isLoading: ruleLoading } = useSWR(
    [routes.rulesRoutes.checkObjectRule({}).url, object_id, rule_type],
    ([url]) =>
      nextFetcher({
        url,
        useToken: true,
        method: routes.rulesRoutes.checkObjectRule({}).method,
        body: {
          rule_type: rule_type,
          object_id: object_id,
        },
      })
  );

  useEffect(() => {
    if (ruleData?.data) {
      form.setValue(name, ruleData?.data?.is_accepted);
    }
  }, [ruleData]);

  const handleCheckboxChange = async (checked: boolean) => {
    if (checked) {
      try {
        await nextFetcher({
          url: routes.rulesRoutes.addRules({}).url,
          method: routes.rulesRoutes.addRules({}).method,
          body: {
            rule_type: rule_type,
            object_id: object_id,
          },
          useToken: true,
        });

        form.setValue(name, true);
        mutate(routes.rulesRoutes.checkObjectRule({}).url);
        toast({ variant: "success", title: "قوانین با موفقیت پذیرفته شد" });
      } catch (error) {
        toast({ variant: "destructive", title: "خطا در ثبت قوانین" });
        form.setValue(name, false);
      }
    }
  };

  if (ruleLoading) return <p className='text-center'>در حال بارگذاری...</p>;

  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className='mx-auto w-max'>
            <FormControl>
              <div className='flex items-center justify-center gap-2'>
                <Checkbox
                  checked={field.value}
                  onClick={() => setIsModalRules(true)}
                  disabled={field.value || readonly}
                />
                <label
                  className='ml-2 cursor-pointer text-sm'
                  onClick={() => setIsModalRules(true)}
                >
                  من با قوانین و مقررات موافقم.
                </label>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <ScrollableAgreement
        title={ruleData?.data?.rule?.title}
        content={
          ruleData?.data?.rule?.description || "در حال بارگذاری قوانین..."
        }
        isModalRules={isModalRules}
        setIsModalRules={setIsModalRules}
        initialAccepted={form.watch(name)}
        onAccept={handleCheckboxChange}
      />
    </>
  );
}
