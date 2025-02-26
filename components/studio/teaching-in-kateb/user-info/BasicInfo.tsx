import { DeleteAlert } from "@/components/global/DeleteAlert";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import {
  DeleteAvatar,
  UploadAvatar,
} from "@/utils/functions/user/avatarOperations.function";
import { FileImage, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useFormContext } from "react-hook-form";
import { useSWRConfig } from "swr";
import { WrapperOutlineText } from "../WrapperOutlineText";
import RenderFieldTeaching from "./RenderFieldTeaching";
import { useContext, useEffect } from "react";
import { course_form_context } from "@/context/course/form.context";
import Dropzone from "@/components/ui/dropzone";

// BasicInfo component for user details
export default function BasicInfo({ type }: any) {
  const { formDisabledSteps, stepPath }: any = useContext(course_form_context);
  const isFormDisabled = formDisabledSteps?.includes(stepPath);

  const form = useFormContext<any>();

  const fields = [
    //
    {
      type: "radio",
      name: "academic_affiliation",
      title: "آیا جزو جامعه دانشگاه آزاد اسلامی هستید؟",
      required: true,
      disabled: isFormDisabled,
    },
    {
      type: "job",
      name: "job_title",
      title: "شغل",
      disabled: isFormDisabled,
    },
    {
      type: "workplace",
      name: "workplace",
      title: "محل کار",
      disabled: isFormDisabled,
    },
    //
    {
      type: "bio",
      name: "bio",
      title: "حوزه فعالیت",
      disabled: isFormDisabled,
    },
    {
      type: "text",
      name: "first_name",
      title: "نام",
      required: true,
      disabled: isFormDisabled,
    },
    {
      type: "text",
      name: "last_name",
      title: "نام خانوادگی",
      required: true,
      disabled: isFormDisabled,
    },
    {
      type: "text",
      name: "mobile",
      title: "شماره تلفن",
      disabled: true,
      // disabled: isFormDisabled,
    },
    {
      type: "gender",
      name: "gender",
      title: "جنسیت",
      options: [
        { title: "آقا", value: "man" },
        { title: "خانم", value: "woman" },
      ],
      required: true,
      disabled: isFormDisabled,
    },
    {
      type: "text",
      name: "father_name",
      title: "نام پدر",
      required: true,
      disabled: isFormDisabled,
    },
    {
      type: "nation_code",
      name: "nation_code",
      title: "کد ملی",
      required: true,
      disabled: isFormDisabled,
    },
    {
      type: "state_autocomplete",
      name: "state",
      title: "استان",
      required: true,
      disabled: isFormDisabled,
    },
    {
      type: "city_autocomplete",
      name: "city_id",
      title: "شهر",
      required: true,
      disabled: isFormDisabled,
    },
    {
      type: "text",
      name: "email",
      title: "پست الکترونیک",
      disabled: isFormDisabled,
    },
    {
      type: "university_autocomplete",
      name: "university_id",
      title: "واحد دانشگاهی",
      required: true,
      disabled: isFormDisabled,
    },
    {
      type: "university_title",
      name: "university_title",
      title: "نام واحد دانشگاهی",
      disabled: isFormDisabled,
      required: form.watch("academic_affiliation") == true ? true : false,
    },
    {
      type: "field_autocomplete",
      name: "field_id",
      title: "رشته",
      // required: true,
      disabled: isFormDisabled,
    },
    {
      type: "text",
      name: "education_tendency",
      title: "گرایش تحصیلی",
      required: true,
      disabled: isFormDisabled,
    },
    {
      type: "text",
      name: "last_degree_university",
      title: "نام دانشگاه آخرین مدرک تحصیلی",
      required: true,
      disabled: isFormDisabled,
    },
    {
      type: "education_select",
      name: "education_title",
      title: "آخرین مدرک تحصیلی",
      options: [
        { title: "دیپلم", value: "دیپلم" },
        { title: "کاردانی", value: "کاردانی" },
        { title: "کارشناسی", value: "کارشناسی" },
        { title: "کارشناسی ارشد", value: "کارشناسی ارشد" },
        { title: "دکتری عمومی", value: "دکتری عمومی" },
        { title: "دکتری تخصصی", value: "دکتری تخصصی" },
      ],
      required: true,
      disabled: isFormDisabled,
    },
  ];
  const { toast } = useToast();
  const { data: session, update } = useSession();
  const { mutate } = useSWRConfig();

  return (
    <WrapperOutlineText
      titleBorder='اطلاعات پایه'
      className='mt-6 px-2 sm:mt-0 sm:px-6'
      type={type}
    >
      <div dir='rtl' className='my-4 flex w-full flex-col items-center gap-4'>
        {/* Profile Image Section */}
        <div className='flex justify-center'>
          <FormField
            control={form.control}
            name='avatar'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='relative w-max'>
                    <Dropzone
                      fileType='image'
                      readOnly={isFormDisabled}
                      showDeleteButton={false}
                      canDropOnPreview
                      onChange={(file: any) => {
                        field.onChange(file);
                        UploadAvatar(file, toast, mutate);
                      }}
                      placeholder='آپلود تصویر پروفایل'
                      value={field.value}
                      styles={{
                        container: "w-40 h-40",
                        dropzone: "rounded-full w-full h-full",
                        previewContainer: "overflow-hidden w-full h-full",
                        preview: "rounded-full aspect-square object-cover",
                      }}
                      icon={
                        <FileImage
                          className={"h-12 w-12 stroke-1 text-muted-foreground"}
                        />
                      }
                    />

                    {field.value && !isFormDisabled ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <DeleteAlert
                              title='حذف عکس پروفایل'
                              message='آیا مطمئن هستید میخواهید عکس پروفایل خود را حذف کنید؟'
                              onAccept={async () => {
                                await DeleteAvatar(
                                  toast,
                                  mutate,
                                  session,
                                  update
                                );
                                field.onChange(null);
                              }}
                            >
                              <Button
                                size='icon'
                                variant='destructive'
                                type='button'
                                className='absolute bottom-0 left-0 z-20 rounded-full'
                              >
                                <Trash2 />
                              </Button>
                            </DeleteAlert>
                          </TooltipTrigger>
                          <TooltipContent side='bottom'>
                            حذف عکس پروفایل
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : null}
                  </div>
                </FormControl>
                <FormMessage className='text-xs dark:text-red-500' />
              </FormItem>
            )}
          />
        </div>
        {/* Render first two fields in a 4-column grid */}
        <div className='grid w-full grid-cols-1 gap-4'>
          {fields.slice(0, 2).map((field, index) => (
            <div key={index} className='lg:col-span-2'>
              <RenderFieldTeaching
                required={field.required}
                key={`basic-${index}`}
                type={field.type}
                name={field.name}
                disabled={field.disabled}
                title={field.title}
                // form={form}
                options={field.options || []}
              />
            </div>
          ))}
        </div>
        {/* Render the rest of the fields in a 3-column grid */}
        <div className='grid w-full gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {fields.slice(2).map((field, index) => (
            <RenderFieldTeaching
              required={field.required}
              key={`main-${index}`}
              type={field.type}
              name={field.name}
              title={field.title}
              disabled={field.disabled}
              // form={form}
              options={field.options || []}
              // onUploadEducation={UploadEducationCertificate}
            />
          ))}
        </div>
      </div>
    </WrapperOutlineText>
  );
}
