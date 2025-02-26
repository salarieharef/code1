"use client";

// Component imports
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ArrowUp, Loader2 } from "lucide-react";
import { Input } from "../ui/input";

// Hook imports
import { useToast } from "@/components/ui/use-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

// Util imports
import validations from "@/utils/validations";

// Fetch imports
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { useParams } from "next/navigation";

export type Inputs = yup.InferType<typeof validations.CommentCreate>;

export default function CommentForm({ commentMutate }: any) {
  const { toast } = useToast();
  const { id } = useParams();

  const form = useForm<Inputs>({
    defaultValues: {
      msg: "",
    },
    resolver: yupResolver(validations.CommentCreate),
  });

  const AddComment: SubmitHandler<Inputs> = async (data: any) => {
    try {
      // const res = await postFetcher(routes.courseRoutes.addComment(id), {
      // 	msg: data.msg,
      // });

      const res = await nextFetcher({
        url: routes.courseRoutes.addComment(id),
        method: "POST",
        body: {
          msg: data.msg,
        },
        useToken: true,
      });

      if (res.success) {
        toast({
          variant: "success",
          title: res.msg,
        });

        await commentMutate();
      } else if (!res.success) {
        toast({
          variant: "destructive",
          title: res.msg,
        });
      } else if (res.error) {
        throw Error(res.error);
      }
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: e.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className='relative mb-2 overflow-hidden rounded-xl bg-white'
        onSubmit={form.handleSubmit(AddComment)}
      >
        <FormField
          control={form.control}
          name='msg'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {/* <Input
                  placeholder='شما هم نظر خود را بنویسید...'
                  className='border-0 text-wrap h-auto'
                  {...field}
                /> */}
                <Input
                  placeholder='شما هم نظر خود را بنویسید...'
                  className='h-auto overflow-y-auto border-0 py-3 pl-10 md:pl-12'
                  {...field}
                  // onInput={(e) => {
                  //   const target = e.target as HTMLInputElement;
                  //   target.scrollTop = target.scrollHeight; // scroll x to end line
                  // }}
                />
              </FormControl>
              <FormMessage className='text-xs text-red-500' />
            </FormItem>
          )}
        />

        <Button
          variant='ghost'
          size='icon'
          className='max-h-auto absolute left-0 top-0.5 m-1.5 h-7 w-7 rounded-full bg-blue-400 p-1 text-white md:left-1'
          type='submit'
        >
          {form.formState.isSubmitting ? (
            <Loader2 className='h-5 w-5 animate-spin py-4' />
          ) : (
            <ArrowUp />
          )}
        </Button>
      </form>
    </Form>
  );
}
