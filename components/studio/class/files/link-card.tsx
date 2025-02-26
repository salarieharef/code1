"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Component imports
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { useToast } from "@/components/ui/use-toast";

// Hook imports
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

// Icon imports
import { Loader2, Trash2 } from "lucide-react";

// Util imports

// Fetch imports
import { DeleteAlert } from "@/components/global/DeleteAlert";
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import validations from "@/utils/validations";

const fileTypes = [
  {
    name: "پیش نیازها",
    value: "prerequisite",
  },
  {
    name: "نرم افزارهای مرتبط",
    value: "software",
  },
  {
    name: "کاربرد در صنعت و بازار",
    value: "use_case",
  },
];

export type Inputs = yup.InferType<typeof validations.ClassLinkCreate>;

export function LinkCard({ removeFile, mutate, data }: any) {
  const { toast } = useToast();
  const params = useParams();
  const [deleting, setDeleting] = useState(false);

  const form = useForm<Inputs>({
    resolver: yupResolver(validations.ClassLinkCreate),
    defaultValues: {
      type: "",
      title: "",
    },
  });
  const AddLink: SubmitHandler<Inputs> = async (data: any) => {
    if (!data?.id) {
      try {
        // const res = await postFetcher(
        //   routes.courseRoutes.addLink(params.classId),
        //   {
        //     type: data.type,
        //     title: data.title,
        //     link: data.link,
        //   }
        // );
        const res = await nextFetcher({
          url: routes.courseRoutes.addLink(params.classId),
          method: "POST",
          body: {
            type: data.type,
            title: data.title,
            link: data.link,
          },
          useToken: true,
        });
        if (res.success) {
          toast({
            variant: "success",
            title: res.msg,
          });

          mutate();
        } else if (res.error) {
          throw Error(res.error);
        }
      } catch (e: any) {
        toast({
          variant: "destructive",
          title: e.message,
        });
      }
    }
  };

  const removeRemote = async () => {
    try {
      setDeleting(true);
      // const res = await postFetcher(
      //   routes.courseRoutes.deleteLink(params?.classId, data?.id)
      // );
      const res = await nextFetcher({
        url: routes.courseRoutes.deleteLink(params?.classId, data?.id),
        method: "POST",
        useToken: true,
      });

      if (res.success) {
        toast({
          variant: "success",
          title: res.msg,
        });

        mutate();
      } else if (res.error) {
        throw Error(res.error);
      }
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: e.message,
      });
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    form.setValue("type", data?.type || "");
    form.setValue("title", data?.title);
    form.setValue("link", data?.link);
  }, [data]);

  return (
    <Card className='h-max overflow-hidden rounded-xl'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(AddLink)}>
          <CardContent className='flex flex-col gap-y-4 pt-4'>
            <div className='flex items-center gap-2'>
              <div>
                <DeleteAlert
                  title='حذف لینک'
                  message='آیا مطمئن هستید قصد حذف این لینک را دارید؟'
                  onAccept={() => (data?.id ? removeRemote() : removeFile())}
                >
                  <Button variant='destructive' size='icon'>
                    {deleting ? (
                      <Loader2 className='animate-spin' />
                    ) : (
                      <Trash2 />
                    )}
                  </Button>
                </DeleteAlert>
              </div>

              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <Select
                      dir='rtl'
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={`w-full border-0 bg-secondary focus:ring-0 focus:ring-offset-0`}
                        >
                          <SelectValue placeholder='نوع لینک...' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {fileTypes.map((type, key) => (
                          <SelectItem value={type.value} key={key}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className='text-xs' />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex items-center gap-2'>
                    عنوان:
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='عنوان خود را وارد کنید...'
                      {...field}
                      type='text'
                      className='border-0 bg-secondary'
                    />
                  </FormControl>
                  <FormMessage className='text-xs dark:text-red-500' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='link'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex items-center gap-2'>
                    لینک:
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='لینک خود را وارد کنید...'
                      {...field}
                      type='text'
                      className='border-0 bg-secondary'
                    />
                  </FormControl>
                  <FormMessage className='text-xs dark:text-red-500' />
                </FormItem>
              )}
            />
          </CardContent>

          {!data?.id ? (
            <CardFooter className='flex justify-between p-0'>
              <Button
                className='w-full rounded-none'
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className='ml-2 h-4 w-4 animate-spin' />
                ) : null}
                <span>ثبت</span>
              </Button>
            </CardFooter>
          ) : null}
        </form>
      </Form>
    </Card>
  );
}
