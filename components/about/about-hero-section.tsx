import Banner from "@/components/home/Banner";

import AboutHeroImage from "@/static/images/about/about-hero-image.webp";
const AboutHeroSection = () => {
  return (
    <div className='relative'>
      <Banner banner_image={AboutHeroImage} />
    </div>
  );
};

export default AboutHeroSection;
