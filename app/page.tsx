"use client";
import { FC } from "react";

// Component imports
import {
  Banner,
  ClassInfo,
  FAQ,
  FeatureSection,
  Recommendations,
  SiteStats,
  TopContent,
} from "@/components/home";

const Home: FC = () => {
  return (
    <main>
      <Banner />
      <Recommendations />
      <TopContent />
      <SiteStats />
      <FeatureSection />
      <FAQ className='hidden md:block' />
      <ClassInfo />
    </main>
  );
};

export default Home;
