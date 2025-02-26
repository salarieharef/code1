// AccessModal.tsx
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modals/modal";
import contentByType from "@/constant/teaching-in-kateb/contentByType";
import { getUserFullName } from "@/utils/functions/getUserFullName";
import React from "react";
import { useFormContext } from "react-hook-form";

type AccessModalType = "trackingCode" | "pendingRequest" | "contractSubmission";

interface AccessModalProps {
  type?: AccessModalType;
  isAccessModalOpen: boolean;
  setAccessModalOpen: (isOpen: boolean) => void;
  children?: React.ReactNode;
  courseId?: any;
  step?: number;
}

const AccessModal: React.FC<AccessModalProps> = ({
  children,
  type,
  isAccessModalOpen,
  setAccessModalOpen,
  courseId,
  step,
}) => {
  const form = useFormContext();

  const firstName = form.watch("first_name");
  const lastName = form.watch("last_name");
  const gender = form.watch("gender");
  const courseName = form.watch("name");
  const userFullName = getUserFullName(firstName, lastName, gender);

  if (!type) return null;

  const { introduction, title, description } = contentByType[type];

  return (
    <Modal open={isAccessModalOpen} onOpenChange={setAccessModalOpen} size='lg'>
      <div className='flex flex-col space-y-2 p-4'>
        <p className='text-center text-lg font-bold text-green-900 md:text-xl'>
          {introduction(userFullName)}
        </p>
        <p className='text-center text-lg font-bold text-success md:text-xl'>
          {title(courseId, courseName)}
        </p>
        <p className='text-center text-sm md:text-lg'>{description(step)}</p>
        {children}
      </div>
      <div className='mx-auto'>
        <Button onClick={() => setAccessModalOpen(false)}>متوجه شدم</Button>
      </div>
    </Modal>
  );
};

export default AccessModal;
