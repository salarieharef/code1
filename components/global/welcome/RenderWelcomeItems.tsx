import { UserType } from "@/types/welcome.types";
import React from "react";
import { welcomeItems } from "./welcomeItemsConfig";

interface RenderWelcomeItemsProps {
  userType: UserType;
}

const RenderWelcomeItems: React.FC<RenderWelcomeItemsProps> = ({
  userType,
}) => {
  return (
    <>
      {welcomeItems[userType].map((item, index) => (
        <div key={index} className='flex items-center gap-x-2 gap-y-2 '>
          <div>{item.icon}</div>
          <p className='text-sm'>{item.text}</p>
        </div>
      ))}
    </>
  );
};

export default RenderWelcomeItems;
