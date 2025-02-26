import faqBackgroundImage from "@/static/images/agreement/faq-hero-background.jpg";
import Image from "next/image";
import FaqSearch from "@/components/faq/faq-search";

const FaqHeroSection = () => {
  return (
    <div className='relative h-[300px] md:h-[400px]'>
      <Image
        alt=''
        src={faqBackgroundImage}
        className='h-full w-full object-cover'
        layout='fill'
      />
      <div className='absolute inset-0 flex w-full items-center justify-center md:top-40 md:w-auto lg:right-32'>
        <FaqSearch />
      </div>
    </div>
  );
};

export default FaqHeroSection;
