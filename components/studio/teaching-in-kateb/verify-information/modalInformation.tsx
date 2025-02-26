import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modals/modal";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/utils/cn";
import { verifyOTP } from "@/utils/functions/user/signOperation.function";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import UserSignForm from "../SignForm";

type ModalInformationProps = {
  isOpen: boolean;
  onClose: () => void;
  informationData?: any;
  sectionsDataCourse?: any;
  type?: string;
  className?: string;
  sections: any[];
  courseId?: string;
  formSubmitter?: any; // formSubmitter returns a Promise
  showUserSignForm?: boolean;
};

const ModalInformation: React.FC<ModalInformationProps> = ({
  isOpen,
  onClose,
  sections,
  className,
  type,
  courseId,
  formSubmitter,
  showUserSignForm,
}) => {
  const form = useFormContext();
  const acceptance_otp = form.watch("acceptance_otp");
  const { toast } = useToast();

  // State for loading status
  const [isLoading, setIsLoading] = useState(false);

  // Reset OTP field when the modal is closed
  useEffect(() => {
    if (!isOpen) {
      form.resetField("acceptance_otp");
    }
  }, [isOpen]);

  const verify = async () => {
    setIsLoading(true); // Set loading to true before starting verification
    const otpVerification = await verifyOTP(
      { otp: acceptance_otp },
      form.watch("mobile"),
      toast
    );

    if (otpVerification?.success) {
      try {
        await formSubmitter(); // Await formSubmitter to ensure loading covers the entire process
        onClose();
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: error.msg || "خطا در ثبت اطلاعات",
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: otpVerification?.msg,
        position: "top-right",
      });
      // onClose();
    }
    setIsLoading(false); // Reset loading after verification attempt
  };

  const renderSection = (section: any) => {
    // Handle array of sections (like sectionsDataInformation)
    if (Array.isArray(section)) {
      return section.map((subSection, subIndex) => (
        <div
          key={`${subSection.sectionTitle}-${subIndex}`}
          className='space-y-4'
        >
          <h3 className='text-lg font-medium'>{subSection.sectionTitle}</h3>
          {subSection.sectionComponent({ type, courseId })}
        </div>
      ));
    }

    // Handle single section objects
    return (
      <div key={section.sectionTitle} className='space-y-4'>
        {section.sectionComponent({ type, courseId })}
      </div>
    );
  };

  return (
    <Modal
      open={isOpen}
      onOpenChange={onClose}
      size='2xl'
      className={cn(
        "flex flex-col space-y-2 overflow-y-auto overflow-x-hidden p-0 pt-2 md:max-h-[90vh] md:p-0",
        className
      )}
      showGrip={true}
      asDrawerInMobile={true}
    >
      <div className='relative px-2 md:px-4'>
        <h3 className='py-4 text-center text-xl font-semibold text-blue-900'>
          تایید اطلاعات وارد شده
        </h3>

        {sections.map((section, index) => (
          <div key={`section-${index}`} className='pb-6'>
            {renderSection(section)}
          </div>
        ))}
      </div>
      <div className='sticky bottom-0 z-10 w-full bg-background'>
        {showUserSignForm && UserSignForm && (
          <UserSignForm
            name='acceptance_otp'
            containerClassName={"space-y-0.5"}
            //otp
            styleButtonOtp={"my-1 flex justify-center gap-1"}
            containerOtpClassName={
              "my-1 flex flex-col items-center justify-center space-y-1"
            }
            otpGroupClassName={"gap-1"}
            styleItemOtp={"border-slate-600 p-1 h-9 w-9 "}
            otpPosition='right'
          />
        )}
        <div className='flex items-center justify-center p-2'>
          {!!acceptance_otp ? (
            <Button
              disabled={!acceptance_otp || isLoading} // Disable if loading or OTP is empty
              onClick={verify}
              className='h-9 w-28'
            >
              {isLoading ? (
                <Loader2 className='ml-2 h-4 w-4 animate-spin' />
              ) : (
                "ثبت"
              )}
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalInformation;
