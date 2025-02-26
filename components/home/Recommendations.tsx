"use client";

import { useSession } from "next-auth/react";
// Component imports
import Encouragement from "./Encouragement";
import RecommendedClasses from "./recommended-classes";

import RecommendationImg from "@/static/images/global/recommendations.webp";

export default function Recommendations() {
  const { data: session }: any = useSession();

  return (
    <>
      {session?.user ? (
        <div className='md:my-16'>
          {/* Desktop top classes */}
          <RecommendedClasses className='hidden md:flex' sectionTitle={true} />

          {/* Mobile top classes */}
          <RecommendedClasses
            subtitle='دروس مورد'
            title='علاقـــه شمــــــــا'
            imageSrc={RecommendationImg}
            className='mt-3 flex md:hidden'
            section='recommendation'
          />
        </div>
      ) : (
        <Encouragement className='hidden md:block' />
      )}
    </>
  );
}
