import React from "react";
import { Loader2 } from "lucide-react";

interface MobileNumberDisplayProps {
  mobileNumber: string | undefined;
  isLoading: boolean;
}

export const MobileNumberDisplay: React.FC<MobileNumberDisplayProps> = ({
  mobileNumber,
  isLoading,
}) => (
  <span>
    {isLoading ? (
      <Loader2 className='ml-2 inline h-4 w-4 animate-spin' />
    ) : (
      mobileNumber || "__"
    )}
  </span>
);
