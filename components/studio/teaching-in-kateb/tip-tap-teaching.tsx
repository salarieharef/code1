import { InfoTooltip } from "@/components/global/InfoTooltip";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import dynamic from "next/dynamic";
import { useFormContext } from "react-hook-form";
import { WrapperOutlineText } from "./WrapperOutlineText";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Tiptap = dynamic(() => import("@/components/global/editor/TipTap"), {
  ssr: false,
});
export default function TipTapTeaching({
  TextLabelCard,
  name = "description",
  type,
  checkboxName,
  read_only = false,
}: any) {
  const form = useFormContext();

  return (
    <WrapperOutlineText
      titleBorder={TextLabelCard}
      className='mt-6 px-2 sm:mt-0 sm:px-6'
      type={type}
    >
      <Card className='border-none bg-transparent p-1 shadow-none md:p-4'>
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className='h-full text-right'>
              <FormControl>
                <Tiptap
                  description={field.value || ""}
                  onChange={field.onChange}
                  readonly={read_only}
                />
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />

        {/*//!/TODO FIX This after merge reusable checkbox in advertise  */}
        {checkboxName && !read_only ? (
          <FormField
            control={form.control}
            name={checkboxName}
            render={({ field }) => (
              <FormItem className='mt-2'>
                <div className='flex items-center gap-x-1'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id={checkboxName}
                    />
                  </FormControl>
                  <Label
                    htmlFor={checkboxName}
                    className='text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    مایل به نمایش متن {TextLabelCard} به عموم هستم.
                  </Label>
                </div>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
        ) : null}
      </Card>
    </WrapperOutlineText>
  );
}
