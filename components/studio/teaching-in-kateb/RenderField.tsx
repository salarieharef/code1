"use client";

// Component imports
import ReusableFileDropzone from "@/components/global/dropzone/ReusableFileDropzone";
import Tiptap from "@/components/global/editor/TipTap";
import CategorySectionSelect from "@/components/global/form/category-section-select";
import { InfoTooltip } from "@/components/global/InfoTooltip";
import {
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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TagInput } from "@/components/ui/tag/tag-input";
import { Textarea } from "@/components/ui/textarea";
import RenderSkillFields from "../class/RenderSkillFields";
import RenderUniversityFields from "../class/RenderUniversityFields";
import SchoolFieldsForm from "../class/SchoolFieldsForm";

// Form imports
import { TimePicker } from "@/components/ui/time-picker";
import { useFormContext } from "react-hook-form";
import DurationPicker from "@/components/global/duration-picker";
import Dropzone from "@/components/ui/dropzone";
import UploadIcon from "@/static/icons/upload.svg?url";
import Image from "next/image";

interface RenderFieldProps {
  type: string;
  name: string;
  title?: string;
  section?: string;
  options?: any;
  placeholder?: string;
  required?: boolean;
  tooltip?: string;
  className?: string;
  form?: any;
  read_only?: boolean;
  disabled?: boolean;
}

const RenderField = ({
  type,
  name,
  title,
  // form,
  section,
  options = [],
  placeholder = "",
  required = false,
  tooltip = "",
  className = "",
  read_only = false,
  disabled,
}: RenderFieldProps) => {
  const form: any = useFormContext();
  const sectionValue = form.watch("section");

  // If section is "university", include these fields
  const universitySpecificFields = [
    "theoretical_count",
    "practical_count",
    "basic_info",
  ];

  // If section is not university, and the field is one of the university-specific fields, don't render it
  if (
    sectionValue !== "university" &&
    universitySpecificFields.includes(name)
  ) {
    return null;
  }

  switch (type) {
    case "text":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className={className}>
              <FormLabel className='flex items-center gap-1'>
                {title}{" "}
                {required && <span className='text-destructive'>*</span>}
              </FormLabel>
              <FormControl>
                <Input
                  className='w-full border-0 bg-slate-150 text-slate-800'
                  placeholder={placeholder}
                  {...field}
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "tag":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className={`${className} space-y-2`}>
              <FormLabel className='flex items-center gap-1'>
                {title}{" "}
                {required && <span className='text-destructive'>*</span>}
              </FormLabel>
              <FormControl>
                <TagInput
                  placeholder={placeholder}
                  inputFieldPosition='top'
                  className={`w-full border-0 bg-secondary`}
                  tags={field.value || []}
                  shortcut='Enter'
                  setTags={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "number":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className={className}>
              <FormLabel className='flex items-center gap-1'>
                {title}
                {tooltip ? <InfoTooltip message={tooltip} /> : null}
                {required && <span className='text-destructive'>*</span>}
              </FormLabel>
              <FormControl>
                <Input
                  disabled={read_only === true || disabled}
                  className='w-full border-0 bg-slate-150 text-slate-800'
                  type='number'
                  placeholder={placeholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case "select":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className={`${className} space-y-0`}>
              <FormLabel>
                {title}
                {required && <span className='text-destructive'>*</span>}
              </FormLabel>
              <FormControl>
                <Select
                  dir='rtl'
                  value={field.value}
                  onValueChange={(value) =>
                    value ? field.onChange(value) : null
                  }
                  disabled={disabled}
                >
                  <SelectTrigger
                    className='w-full border-0 bg-slate-150'
                    disabled={disabled}
                  >
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {options.map((option: any, index: number) => (
                        <SelectItem key={index} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case "textarea":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className={className}>
              <FormLabel>
                {title}{" "}
                {required && <span className='text-destructive'>*</span>}
              </FormLabel>
              <FormControl>
                <Textarea
                  disabled={disabled}
                  placeholder={placeholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case "timePicker":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className={className}>
              <FormLabel>
                {title}{" "}
                {required && <span className='text-destructive'>*</span>}
              </FormLabel>
              <FormControl>
                <TimePicker
                  date={field.value}
                  setDate={field.onChange}
                  showHours={true}
                  showMinutes={true}
                  showSeconds={true}
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case "durationPicker":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className={`${className} space-y-0`}>
              <FormLabel>
                {title}{" "}
                {required && <span className='text-destructive'>*</span>}
              </FormLabel>
              <FormControl>
                <DurationPicker
                  disabled={disabled}
                  value={field.value}
                  onChange={field.onChange}
                  max_hours={100}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case "editor":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className={className}>
              <FormLabel>
                {title}{" "}
                {required && <span className='text-destructive'>*</span>}
              </FormLabel>
              <FormControl>
                <Tiptap
                  description={field.value || ""}
                  onChange={field.onChange}
                  readonly={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case "file":
      return (
        // <ReusableFileDropzone
        //   name={name}
        //   placeholder={placeholder}
        //   containerClassName='aspect-video h-auto'
        //   readonly={disabled}
        //   showPreview={true}
        // />
        <FormField
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Dropzone
                  placeholder={placeholder}
                  fileType='image'
                  readOnly={disabled}
                  value={field.value}
                  icon={
                    <Image
                      src={UploadIcon}
                      alt=''
                      width={100}
                      height={100}
                      className='h-12 w-12'
                    />
                  }
                  canDropOnPreview
                  styles={{
                    container: "md:mb-0 mb-4",
                    dropzone:
                      "group my-2 flex aspect-video h-auto max-w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300  ",
                    previewContainer:
                      " rounded-md w-full border border-slate-300 px-2 py-2 ",
                    preview: "w-full aspect-video object-cover",
                    instructions:
                      "text-primary text-center group-hover:text-blue-600",
                    deleteButton: "left-0 -top-0.5",
                  }}
                  onChange={(file: any) => {
                    if (file) {
                      field.onChange(file);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    // TODO: delete the commented section
    // case "select":
    //   return (
    //     <FormField
    //       control={form.control}
    //       name={name}
    //       render={({ field }) => (
    //         <FormItem className={className}>
    //           <FormLabel>
    //             {title}{" "}
    //             {required && <span className='text-destructive'>*</span>}
    //           </FormLabel>
    //           <FormControl>
    //             <Select value={field.value} onValueChange={field.onChange}>
    //               <SelectTrigger className='w-full border-0 bg-slate-150'>
    //                 <SelectValue placeholder={placeholder} />
    //               </SelectTrigger>
    //               <SelectContent>
    //                 <SelectGroup>
    //                   {options.map((option: any, index: number) => (
    //                     <SelectItem key={index} value={option.value}>
    //                       {option.label}
    //                     </SelectItem>
    //                   ))}
    //                 </SelectGroup>
    //               </SelectContent>
    //             </Select>
    //           </FormControl>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />
    //   );

    case "category":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className={className}>
              <CategorySectionSelect
                disabled={disabled}
                tooltip={tooltip}
                {...field}
              />
            </FormItem>
          )}
        />
      );

    case "categories":
      return (
        <div className='col-span-full grid gap-4 md:grid-cols-3'>
          {section === "university" ||
          section === "deep_learn" ||
          section === "teaching_assistants" ? (
            <RenderUniversityFields disabled={disabled} />
          ) : null}

          {section === "school" ? (
            <SchoolFieldsForm disabled={disabled} />
          ) : null}

          {section === "skill" ? (
            <RenderSkillFields disabled={disabled} />
          ) : null}
        </div>
      );

    default:
      return null;
  }
};

RenderField.displayName = "RenderField";

export default RenderField;
