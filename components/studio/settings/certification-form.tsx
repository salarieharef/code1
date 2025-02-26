"use client";

import Image from "next/image";
import { useState } from "react";

// Component imports
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

// Form imports
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

// Fetch imports
import routes from "@/utils/api/routes";
import { CertificationCreateType } from "@/types/certification-create";
import validations from "@/utils/validations";

//icons
import JpgImg from "@/static/icons/jpg.svg?url";

// Icon imports
import CustomDropzone from "@/components/global/dropzone/CustomDropzone";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { Loader2, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useSWRConfig } from "swr";

export function CertificationForm() {
  const { toast } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const { mutate } = useSWRConfig();
  const { data: session }: any = useSession();

  const form = useForm<CertificationCreateType>({
    resolver: yupResolver(validations.CertificationCreate),
    defaultValues: {
      image: "",
      title: "",
    },
  });
  const addCertification: SubmitHandler<CertificationCreateType> = async (
    data
  ) => {
    try {
      const fileFormData = new FormData();
      fileFormData.append("image", data?.image[0]);
      fileFormData.append("title", data?.title);

      // const res = await postFetcher(
      //   routes.userRoutes.addCertificate,
      //   fileFormData
      // );
      const res = await nextFetcher({
        url: routes.userRoutes.addCertificate,
        method: "POST",
        body: fileFormData,
        useToken: true,
      });
      if (res.success) {
        toast({
          variant: "success",
          title: res.msg,
        });

        mutate(routes.userRoutes.certificates(session?.user?.id));
        setFormOpen(false);
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

  const handleFileUpload = (file: File) => {
    form.setValue("image", [file]);
  };

  return (
    <Dialog open={formOpen} onOpenChange={setFormOpen}>
      <DialogTrigger asChild>
        <Button className='h-10 w-10 bg-blue-500 p-0 sm:h-auto sm:w-auto sm:px-8 sm:py-2 sm:text-lg'>
          <span className='hidden sm:block'>ایجاد گواهینامه جدید</span>
          <Plus className='sm:hidden' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form
            className='mt-4 flex w-full flex-col gap-4'
            onSubmit={form.handleSubmit(addCertification)}
            style={{ direction: "rtl" }}
          >
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomDropzone
                      onFileUpload={handleFileUpload}
                      placeholder='فایل JPG گواهینامه خود را برای آپلود بکشید و رها کنید.'
                      containerClassName='group h-32 w-full overflow-hidden rounded-xl border border-dashed border-slate-300 transition-colors duration-200 hover:bg-secondary'
                      labelClassName='flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg'
                      iconClassName='h-14 w-14'
                      instructionsClassName='mx-8 mt-2 text-center text-sm'
                      accept={{ "image/*": [] }}
                      multiple={false}
                    />
                  </FormControl>
                  {field?.value ? (
                    <div className='flex items-center gap-2'>
                      <div className='h-10 w-10 rounded-lg border p-1'>
                        <Image
                          src={JpgImg}
                          alt='jpg'
                          className='h-full w-full'
                          width={100}
                          height={100}
                        />
                      </div>
                      <span>{field?.value?.[0]?.name}</span>
                    </div>
                  ) : null}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عنوان گواهینامه:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={`col-span-3 border-0 bg-secondary text-slate-800 ${
                        form.formState.errors?.name
                          ? "border-r-destructive"
                          : ""
                      } w-full`}
                      placeholder='عنوان گواهینامه خود را وارد کنید...'
                    />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />

            <div className='flex justify-center'>
              <Button type='submit' className='h-8 bg-blue-500 px-8'>
                ایجاد
                {form.formState.isSubmitting ? (
                  <Loader2 className='h-5 w-5 animate-spin' />
                ) : null}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
