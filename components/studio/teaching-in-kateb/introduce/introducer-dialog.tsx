import { useContext } from "react";

// Context imports
import { global_context } from "@/context/global";

// Component imports
import Stepper from "./stepper/Stepper";
import Modal from "@/components/ui/modals/modal";

// Constant imports
import { introducer_list } from "@/constant/teaching-in-kateb/introducer-list.constant";

const IntroducerDialog = () => {
  const { teachingHelpDialog, setTeachingHelpDialog }: any =
    useContext(global_context);

  return (
    <>
      <Modal
        open={teachingHelpDialog}
        onOpenChange={setTeachingHelpDialog}
        size='md'
        asDrawerInMobile={true}
        showGrip={true}
        closeBtnDrawer={false}
      >
        <Stepper steps={introducer_list} />
      </Modal>
    </>
  );
};

export default IntroducerDialog;
