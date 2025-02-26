"use client";

// Component imports
import Transcript from "./transcript";

export default function MobileTranscript({ seekVideoToSub }: any) {
  return (
    <div className='mt-2 flex md:hidden'>
      <Transcript onSubSelected={seekVideoToSub} />
    </div>
  );
}
