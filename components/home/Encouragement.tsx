import { EncouragementCard } from "./encouragement-cards";
import { encouragementData } from "@/constant/home/encouragement.constant";

interface EncouragementProps {
  className: string;
}

export default function Encouragement({ className }: EncouragementProps) {
  return (
    <div className={className}>
      <h1 className='mb-12 mt-14 text-center text-2xl font-black text-blue-800 lg:text-3xl lg:tracking-[-0.03rem] xl:text-4xl 2xl:text-5xl'>
        با دروس آنلاین و حضـوری مهـارت های خـود را افـزایش دهید
      </h1>
      <div className='mx-auto -mb-36 grid max-w-screen-xl grid-cols-3-auto justify-around gap-20 pl-6 pr-5 lg:pl-24 lg:pr-20'>
        {encouragementData.map((item) => (
          <EncouragementCard
            key={item.title}
            image={item.image}
            title={item.title}
          />
        ))}
      </div>
    </div>
  );
}
