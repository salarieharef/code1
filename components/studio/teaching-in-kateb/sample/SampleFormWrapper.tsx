import { WrapperOutlineText } from "../WrapperOutlineText";
import SampleForm from "./SampleForm"; // Adjust the path as needed

const SampleFormWrapper = (props: any) => {
  return (
    <WrapperOutlineText titleBorder='ارسال نمونه ای از درس' type={props?.type}>
      <SampleForm {...props} />
    </WrapperOutlineText>
  );
};

export default SampleFormWrapper;
