"use client";

// Component imports
import RecommendedClasses from "./recommended-classes";
import Transcript from "./transcript";

// Context imports
import { useContext } from "react";

export default function Navbar({ courseDetails, seekVideoToSub }: any) {
  return (
    <nav className='col-span-4 hidden overflow-hidden bg-ocean-700 lg:block'>
      <div className='mt-8 px-4'>
        <Transcript onSubSelected={seekVideoToSub} />
      </div>

      <div className='mb-4 mt-2 px-8'>
        <h2 className='text-xl font-bold text-white'>دروس مشابه</h2>

        <div>
          <RecommendedClasses
            type='related-courses'
            courseDetails={courseDetails}
          />
        </div>
      </div>
    </nav>
  );
}
