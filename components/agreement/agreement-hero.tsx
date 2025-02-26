import Banner from "@/components/home/Banner";

import AgreementHeroImg from "@/static/images/agreement/agreement_hero.webp";
const AgreementHero = () => {
  return (
    <div className='relative'>
      <div className='absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 pb-4 text-xl font-bold text-slate-800 md:pb-0 md:text-3xl lg:text-4.5xl'>
        قوانین و مقررات کاتب
      </div>
      <Banner banner_image={AgreementHeroImg} />
    </div>
  );
};

export default AgreementHero;
