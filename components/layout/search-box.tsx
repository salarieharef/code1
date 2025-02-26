import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { yupResolver } from "@hookform/resolvers/yup";
import { Camera, Loader2, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Form, FormControl, FormField, FormItem } from "../ui/form";

type SearchBoxAdditionalProps = {
  className?: string;
};
type SearchBoxProps = React.PropsWithChildren<SearchBoxAdditionalProps>;

const validation = yup.object({
  query: yup.string().required(),
  topic: yup.string(),
});

type Inputs = yup.InferType<typeof validation>;

export function SearchBox(props: SearchBoxProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const defaultQuery = pathname.includes("/search")
    ? searchParams.get("q") || ""
    : "";
  const defaultTopic = defaultQuery
    ? searchParams.get("topic") || "courses"
    : "courses";

  const { watch, ...form } = useForm<Inputs>({
    resolver: yupResolver(validation),
    defaultValues: {
      query: defaultQuery,
      topic: defaultTopic,
    },
  });

  const search = (data: Inputs) => {
    const queries = `topic=${data.topic}&q=${data.query}`;
    router.push(`/search?${queries}`);
  };

  return (
    <div className='relative bg-blue-900 md:bg-transparent lg:w-full'>
      <Suspense>
        <Form watch={watch} {...form}>
          <form
            className={`${props.className} flex grow items-center overflow-hidden rounded bg-white dark:bg-slate-950`}
            onSubmit={form.handleSubmit(search)}
          >
            <FormField
              control={form.control}
              name='topic'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      dir='rtl'
                      name='Search search topic'
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className='w-15 md:w-25 rounded-none border-0 text-sm focus-visible:ring-0 md:text-base'>
                        <SelectValue placeholder='نوع سرچ' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem
                            value='courses'
                            className='cursor-pointer'
                          >
                            تدریس‌ها{" "}
                          </SelectItem>
                          <SelectItem
                            value='lessons'
                            className='cursor-pointer'
                          >
                            جلسات
                          </SelectItem>
                          <SelectItem
                            value='teachers'
                            className='cursor-pointer'
                          >
                            مدرس
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <Separator
              orientation='vertical'
              className='h-6 bg-slate-300 dark:bg-slate-600'
            />

            <FormField
              control={form.control}
              name='query'
              render={({ field }) => {
                return (
                  <FormItem className='w-full'>
                    <FormControl>
                      <Input
                        type='text'
                        {...field}
                        placeholder={`اسم ${
                          watch("topic") === "courses"
                            ? "درس"
                            : watch("topic") === "lessons"
                              ? "جلسه"
                              : "مدرس"
                        } مدنظر خود را سرچ کنید...`}
                        className='mx-3 rounded-none border-0 text-xs focus-visible:ring-0 focus-visible:ring-offset-0 md:text-sm'
                        autoComplete='off'
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />

            <div className='flex items-center'>
              <Button
                variant='ghost'
                size='icon'
                className='mx-1 hover:bg-transparent'
                name='Camera'
                type='button'
              >
                <Camera className='stroke-[1.5] text-slate-600' />
              </Button>

              <Separator orientation='vertical' className='h-6 bg-slate-300' />

              <Button
                variant='ghost'
                size='icon'
                className='mx-1 hover:bg-transparent'
                name='Search'
                type='submit'
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className='animate-spin' />
                ) : (
                  <Search className='stroke-[1.5] text-slate-600' />
                )}
              </Button>
            </div>
          </form>
        </Form>
      </Suspense>
    </div>
  );
}
