import MainGroupMultiselector from "@/components/global/form/main-group-multiselector";
import SideGroupMultiselector from "@/components/global/form/side-group-multiselector";

// Helper function for skill-based fields
const RenderSkillFields = ({ disabled }: any) => {
  return (
    <>
      <MainGroupMultiselector
        disabled={disabled}
        required={true}
        placeholder='گروه اصلی خود را انتخاب کنید...'
      />

      <SideGroupMultiselector
        disabled={disabled}
        required={true}
        placeholder='گروه فرعی خود را انتخاب کنید...'
      />
    </>
  );
};
export default RenderSkillFields;
