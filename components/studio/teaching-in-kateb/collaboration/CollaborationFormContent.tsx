"use client";

// Component imports
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import SelectableCardGroup from "../SelectableCardGroup";
import PriceEstimator from "./PriceEstimator";

// Form imports
import { useFormContext } from "react-hook-form";

// Util imports
import { map, find } from "lodash-es";
import { useEffect } from "react";
import useSWR from "swr";
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";

// SVG imports
import Commission from "@/static/images/checkout/commission.svg";
import Members from "@/static/images/checkout/members.svg";
import Wallet from "@/static/images/checkout/wallet.svg";

const cardOptions = [
  {
    id: "full_payment",
    title: "طرح پرداخت کامل یکجا",
    description:
      "حق‌الزحمه این درس با ضریب جدول پیوست و به صورت حق التدریس دانشگاه آزاد اسلامی برای شما محاسبه می‌شود.",
    icon: <Wallet className='m-1 h-10 w-10 fill-blue-500' />,
  },
  {
    id: "member_exclusive",
    title: "طرح ویژه اعضای هیات علمی",
    description:
      "در صورتی که عضو هیأت علمی دانشگاه آزاد اسلامی هستید، مطابق قوانین، شامل کسر موظفی و کسر ساعت حضور خواهید شد.",
    icon: <Members className='m-1 h-10 w-10 fill-blue-500' />,
  },
  {
    id: "partnership",
    title: "طرح مشارکتی (درصد مشارکت در فروش)",
    description:
      "در این طرح، مدرس در بازه‌های مشخص، درصد مشخصی از فروش را تا زمانی که آموزش به فروش می‌رسد، دریافت می‌کند.",
    icon: <Commission className='m-1 h-10 w-10 fill-blue-500' />,
  },
];

interface CollaborationFormContentProps {
  courseId?: string;
  readonly?: boolean;
  name?: string;
}

const CollaborationFormContent: React.FC<CollaborationFormContentProps> = ({
  courseId,
  readonly = false,
  name = "contract_type",
}) => {
  const form = useFormContext();
  const cardOptionsWithLinks = form.watch("cardOptionsWithLinks");

  const { data: contractFiles } = useSWR(
    courseId ? routes.filesRoutes.contract_files({}).url : null,
    (url) =>
      nextFetcher({
        url,
        method: routes.filesRoutes.contract_files({}).method,
        useToken: true,
      }),
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (contractFiles?.data) {
      form.setValue(
        "cardOptionsWithLinks",
        map(cardOptions, (option) => ({
          ...option,
          pdfLink: find(contractFiles.data, { usage: option.id })?.file,
        }))
      );
    }
  }, [contractFiles]);

  return (
    <div
      className={`space-y-6 p-1 sm:p-4 ${readonly ? "pointer-events-none opacity-80" : ""}`}
    >
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <SelectableCardGroup
                options={cardOptionsWithLinks || cardOptions}
                selectedValue={field.value}
                onChange={(value) => {
                  field.onChange(value);
                }}
                readonly={readonly}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <PriceEstimator readonly={readonly} name='estimate_price' />
    </div>
  );
};

export default CollaborationFormContent;
