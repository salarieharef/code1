"use client";

import CityAutocomplete from "@/components/global/form/city-autocomplete";
import FieldAutocomplete from "@/components/global/form/field-autocomplete";
import StateAutocomplete from "@/components/global/form/state-autocomplete";
import UniversityAutocomplete from "@/components/global/form/university-autocomplete";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils/cn";
import { Loader2 } from "lucide-react";
import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { InfoTooltip } from "@/components/global/InfoTooltip";
import Dropzone from "@/components/ui/dropzone";

interface RenderFieldProps {
  type: string;
  name: string;
  title: string;
  disabled?: boolean;
  required?: boolean; // Receive the required prop
  userInfoIsLoading?: boolean;
  options?: any[];
  onUploadEducation?: (data: any) => Promise<void>;
}

const RenderField: React.FC<RenderFieldProps> = memo(
  ({ type, name, title, disabled, options = [], required }) => {
    const form = useFormContext();
    const academicAffiliation = form.watch("academic_affiliation");

    switch (type) {
      case "text":
        return (
          <FormField
            control={form.control}
            name={name}
            disabled={disabled}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex items-center gap-2'>
                  {title}:
                  {required && <span className='text-destructive'>*</span>}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    {...form.register(name)}
                    className='w-full border-0 bg-slate-150 text-slate-800'
                    disabled={disabled}
                  />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
        );

      case "radio":
        return (
          <div className='grid grid-cols-2 items-center gap-4 md:grid-cols-4 lg:grid-cols-6'>
            <div
              className={cn(
                "col-span-full",
                form.watch("academic_affiliation") === "true"
                  ? "md:col-span-3"
                  : "md:col-span-2"
              )}
            >
              <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex gap-2'>
                      {title}
                      {required && <span className='text-destructive'>*</span>}
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={field.value ?? "nothing"}
                        onValueChange={field.onChange}
                        className='flex flex-row-reverse justify-between gap-x-8'
                        disabled={disabled}
                      >
                        <div className='flex flex-row-reverse items-center gap-4'>
                          <Label
                            className='flex cursor-pointer items-center gap-2 text-sm font-medium'
                            htmlFor='is-college-yes'
                          >
                            بله
                            <RadioGroupItem value='true' id='is-college-yes' />
                          </Label>
                          <Label
                            className='flex cursor-pointer items-center gap-2 text-sm font-medium'
                            htmlFor='is-college-no'
                          >
                            خیر
                            <RadioGroupItem value='false' id='is-college-no' />
                          </Label>
                        </div>
                        {form.watch(name) === "true" && (
                          <FormField
                            control={form.control}
                            name='academic_role'
                            render={({ field }) => (
                              <FormControl>
                                <Select
                                  dir='rtl'
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  disabled={disabled}
                                >
                                  <SelectTrigger className='w-full border-0 bg-slate-150'>
                                    <SelectValue placeholder='نوع پروفایل خود را انتخاب کنید...' />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectItem value='teacher_faculty'>
                                        استاد (هیات علمی)
                                      </SelectItem>
                                      <SelectItem value='teacher_adjunct'>
                                        استاد (حق التدریس)
                                      </SelectItem>
                                      <SelectItem value='student'>
                                        دانشجو
                                      </SelectItem>
                                      <SelectItem value='staff'>
                                        کارمند
                                      </SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            )}
                          />
                        )}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className='text-xs text-red-500' />
                  </FormItem>
                )}
              />
            </div>

            {/* Conditionally render job and workplace fields when "بله" is selected */}
            {form.watch(name) === "false" && (
              <>
                {/* Job Field */}
                <FormField
                  control={form.control}
                  name='job_title'
                  render={({ field }) => (
                    <FormItem className='col-span-full md:col-span-2'>
                      <FormLabel className='flex items-center gap-2 text-lg'>
                        شغل:
                        {/* {required && <span className='text-destructive'>*</span>} */}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className='w-full border-0 bg-slate-150 text-slate-800'
                          disabled={disabled}
                        />
                      </FormControl>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='workplace'
                  render={({ field }) => (
                    <FormItem className='col-span-full md:col-span-4'>
                      <FormLabel className='flex items-center gap-2 text-lg'>
                        محل کار:
                        {/* {required && <span className='text-destructive'>*</span>} */}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className='w-full border-0 bg-slate-150 text-slate-800'
                          disabled={disabled}
                        />
                      </FormControl>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
        );

      case "state_autocomplete":
        return (
          <StateAutocomplete
            required={true}
            className='bg-slate-150'
            valueLoading={form.watch("isLoading")}
            name={name}
            disabled={disabled}
          />
        );

      case "city_autocomplete":
        return (
          <CityAutocomplete
            required={true}
            className='bg-slate-150'
            valueLoading={form.watch("isLoading")}
            name={name}
            disabled={disabled}
          />
        );

      case "university_autocomplete":
        if (name === "university_id" || name === "university_title") {
          if (academicAffiliation === "true") {
            return (
              <UniversityAutocomplete
                required={true}
                className='bg-slate-150'
                valueLoading={form.watch("isLoading")}
                name='university_id'
                disabled={disabled}
              />
            );
          }
          if (academicAffiliation === "false") {
            return (
              <FormField
                control={form.control}
                name='university_title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-2'>
                      نام واحد دانشگاهی:
                      {required ? (
                        <span className='text-destructive'>*</span>
                      ) : null}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className='w-full border-0 bg-slate-150 text-slate-800'
                        disabled={disabled}
                      />
                    </FormControl>
                    <FormMessage className='text-xs' />
                  </FormItem>
                )}
              />
            );
          }
          return null;
        }

      case "field_autocomplete":
        return (
          <div className='flex flex-col gap-4'>
            <FieldAutocomplete
              // required={true}
              className='bg-slate-150'
              standAlone={true}
              name={name}
              disabled={disabled}
            />
            <FormField
              control={form.control}
              name='field_title'
              disabled={disabled}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex items-center gap-2'>
                    رشته جدید:
                    <InfoTooltip message='در صورتی که رشته تحصیلی مورد نظر شما در فهرست موجود نیست، لطفاً عنوان رشته را در این قسمت وارد فرمایید.' />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={field.onChange}
                      value={field.value}
                      className='w-full border-0 bg-slate-150 text-slate-800'
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
          </div>
        );

      case "bio":
        return (
          <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem className='text-right'>
                <FormLabel className='flex items-center gap-2'>
                  {title} :
                  {required && <span className='text-destructive'>*</span>}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className='w-full border-0 bg-slate-150 text-slate-800'
                    disabled={form.watch("isLoading") || disabled}
                  />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
        );

      case "nation_code":
        return (
          <FormField
            control={form.control}
            name='nation_code'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex items-center gap-2'>
                  کد ملی:
                  {required && <span className='text-destructive'>*</span>}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className={`col-span-3 text-slate-800 ${
                      form.formState.errors?.nation_code
                        ? "border-r-destructive"
                        : ""
                    } w-full border-0 bg-slate-150`}
                    type='number'
                    disabled={disabled}
                  />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
        );

      case "gender":
        return (
          <>
            <FormField
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem className='text-right'>
                  <FormLabel className='flex items-center gap-2'>
                    {title}:
                    {required && <span className='text-destructive'>*</span>}
                    {form.formState.isLoading ? (
                      <Loader2 className='h-5 w-5 animate-spin' />
                    ) : null}
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        value ? field.onChange(value) : null
                      }
                      value={field.value || ""}
                      dir='rtl'
                      disabled={disabled}
                    >
                      <SelectTrigger className='w-full border-0 bg-slate-150'>
                        <SelectValue placeholder='جنسیت خود را انتخاب کنید...' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {options.map((option, i) => (
                            <SelectItem value={option.value} key={i}>
                              {option.title}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
          </>
        );
      case "education_select":
        return (
          <>
            <FormField
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem className='text-right'>
                  <FormLabel className='flex items-center gap-2'>
                    {title}:
                    {required && <span className='text-destructive'>*</span>}
                    {form.formState.isLoading ? (
                      <Loader2 className='h-5 w-5 animate-spin' />
                    ) : null}
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        value ? field.onChange(value) : null
                      }
                      value={field.value || ""}
                      dir='rtl'
                      disabled={disabled}
                    >
                      <SelectTrigger className='w-full border-0 bg-slate-150'>
                        <SelectValue placeholder='مدرک تحصیلی خود را انتخاب کنید...' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {options.map((option, i) => (
                            <SelectItem value={option.value} key={i}>
                              {option.title}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />

            {!!form.watch("education_title") ? (
              <FormField
                control={form.control}
                name='education_image'
                render={({ field }) => (
                  <FormItem className='space-y-0'>
                    <FormLabel className='text-center'>تصویر مدرک:</FormLabel>
                    <FormControl>
                      {/* <EducationImageDropzone
                        placeholder='تصویر مدرک تحصیلی'
                        containerClassName={`bg-blue-100 ${
                          form.watch("education_image")?.length > 0
                            ? "h-44"
                            : "h-10"
                        } rounded-md border-blue-400`}
                        instructionsClassName='text-blue-400 text-center'
                        showIcon={false}
                        imageClassName={
                          "aspect-square h-full w-full object-contain"
                        }
                        showOverlayOnImage={true}
                        disabled={disabled}
                        onChange={(file: any) => field.onChange([file])}
                        value={field.value}
                        onDelete={() => field.onChange(null)}
                      /> */}
                      <Dropzone
                        placeholder='تصویر مدرک تحصیلی'
                        fileType='image'
                        value={field.value}
                        // showFileIcon
                        showFileName
                        showFileSize
                        styles={{
                          dropzone: `bg-blue-100 ${
                            form.watch("education_image")?.length > 0
                              ? "h-44"
                              : "h-10"
                          } rounded-md border-blue-400`,
                          previewContainer: "w-full",
                          preview: "aspect-video h-44 w-full object-cover",
                          instructions: "text-blue-400 text-center",
                        }}
                        onChange={field.onChange}
                        // onFileDelete={() => field.onChange(null)}
                        disabled={disabled}
                      />
                    </FormControl>
                    <FormMessage className='text-xs text-red-500' />
                  </FormItem>
                )}
              />
            ) : null}
          </>
        );

      default:
        return null;
    }
  }
);

RenderField.displayName = "RenderField";

export default RenderField;
