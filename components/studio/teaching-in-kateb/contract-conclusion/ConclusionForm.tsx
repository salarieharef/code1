"use client";

import { useFormContext } from "react-hook-form";
// Component imports
import CollaborationForm from "../collaboration/CollaborationForm";
import CustomFileDropzone from "../CustomFileDropzone";
import RulesAcceptance from "../user-info/RulesAcceptance";
import UserSignForm from "../SignForm";
import { WrapperOutlineText } from "../WrapperOutlineText";
import DownloadPdf from "./DownloadPdf";
import { useContext } from "react";
import { course_form_context } from "@/context/course/form.context";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Dropzone from "@/components/ui/dropzone";

interface CourseFormProps {
  type?: string;
  courseId?: string;
  name?: string;
}

const ConclusionForm: React.FC<CourseFormProps> = ({
  type,
  name = "signed_contract",
}) => {
  const form = useFormContext();
  const signed_contract = form.watch("signed_contract");
  const signed_contract_rules_agreed = form.watch(
    "signed_contract_rules_agreed"
  );

  //disabled readonly Step without submit form
  const { formDisabledSteps, stepPath }: any = useContext(course_form_context);
  const isFormDisabled = formDisabledSteps.includes(stepPath);

  return (
    <div className='space-y-6'>
      <CollaborationForm readonly={true} type={type} showRule={false} />

      <WrapperOutlineText titleBorder='قرارداد همکاری شما با کاتب' type={type}>
        <DownloadPdf />

        <div className='w-full px-2 md:px-8'>
          {/* <CustomFileDropzone
            name={name}
            placeholder='آپلود امضاء الکترونیک'
            containerClassName='md:w-80 mt-6 p-0 text-primary'
            accept={{ "image/*": [] }}
            // accept={{ "application/pdf": [".pdf"], "image/*": [] }}
            showIcon={true}
            showPreview={true}
            showImagePreview={true}
            showDeleteButton={true}
            buttonStyleDelete='absolute top-0 left-0'
            StyleWrapperImage='max-w-80 mt-6'
            instructionsClassName='text-primary'
            isSingImage={true}
            read_only={isFormDisabled}
          /> */}
          <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem className='space-y-0'>
                <FormControl>
                  {/* <Dropzone
                    placeholder='آپلود امضاء الکترونیک'
                    fileType='image'
                    value={field.value}
                    showFileIcon
                    showFileName
                    showFileSize
                    styles={{
                      dropzone: `bg-blue-100 ${
                        form.watch("education_image")?.length > 0
                          ? "h-44"
                          : "h-10"
                      } rounded-md border-blue-400`,
                      previewContainer: "w-80",
                      preview: "aspect-video h-44 w-full object-cover",
                      instructions: "text-blue-400 text-center",
                    }}
                    onChange={field.onChange}
                    // onFileDelete={() => field.onChange(null)}
                    readOnly={isFormDisabled}
                  /> */}
                  <Dropzone
                    fileType='image'
                    name={name}
                    placeholder='آپلود امضاء الکترونیک'
                    value={field.value}
                    // showFileIcon
                    styles={{
                      container:
                        "flex mx-auto justify-center items-center mt-2",
                      dropzone: `bg-blue-100 h-10 rounded-md md:w-80 border-primary`,
                      previewContainer:
                        " rounded-md border border-slate-300 px-2 py-2 w-80 ",
                      instructions: "text-primary text-center",
                      deleteButton: "left-0 -top-0.5",
                      preview: "w-72",
                    }}
                    onChange={(file: any) => {
                      field.onChange(file);
                    }}
                    readOnly={isFormDisabled}
                  />
                </FormControl>
                <FormMessage className='text-xs text-red-500' />
              </FormItem>
            )}
          />
          <p className='py-2 text-center text-sm text-muted-foreground'>
            تصویر امضاء الکترونیک خود را آپلود کنید.
          </p>
        </div>
      </WrapperOutlineText>
      <div className='my-8'>
        <RulesAcceptance
          rule_type='user_sign_contract'
          name='signed_contract_rules_agreed'
          readonly={isFormDisabled}
        />

        <UserSignForm
          isDisabled={
            isFormDisabled == true ||
            !signed_contract ||
            !signed_contract_rules_agreed
          }
          containerClassName={"space-y-0.5"}
          styleButtonOtp={"my-1 flex justify-center gap-1"}
          containerOtpClassName={
            "my-1 flex flex-col items-center justify-center space-y-1"
          }
          otpGroupClassName={"gap-1"}
          styleItemOtp={"border-slate-600 p-1 h-9 w-9 "}
          otpPosition='top'
        />
      </div>
    </div>
  );
};
export default ConclusionForm;
