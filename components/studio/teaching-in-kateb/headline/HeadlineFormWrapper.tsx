// Component imports
import { memo } from "react";
import { WrapperOutlineText } from "../WrapperOutlineText";
import HeadlineForm from "./HeadlineForm"; // Adjust the path as needed

const HeadlineFormWrapper = memo((props: any): any => {
  return (
    <WrapperOutlineText titleBorder='سرفصل‌های درس' type={props.type}>
      <HeadlineForm {...props} />
    </WrapperOutlineText>
  );
});

HeadlineFormWrapper.displayName = "HeadlineFormWrapper";

export default HeadlineFormWrapper;
