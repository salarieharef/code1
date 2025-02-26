import React from "react";
import CartContent from "./CartContent";

const YourCartContent: React.FC = () => {
  return (
    <CartContent
      showAddToCartButton={true}
      showNextCartButton={true}
    />
  );
};

export default YourCartContent;
