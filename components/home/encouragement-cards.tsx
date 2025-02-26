import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import EncouragementIcon from "@/static/icons/encouragement_card_frame.svg?url";

interface EncouragementCardProps {
  image?: StaticImageData;
  title: string;
}

const CARD_STYLES = {
  imageContainer:
    "absolute -bottom-10 rounded-full bg-gradient-to-b from-blue-800 to-blue-400 p-2",
  innerImage: "rounded-full bg-white p-6",
  card: "relative mx-5 mt-8 h-full rounded-3xl border-0 shadow-2xl",
  content: "text-md p-8 text-center lg:text-xl xl:my-8 2xl:my-10 2xl:text-xl",
} as const;

export function EncouragementCard({ image, title }: EncouragementCardProps) {
  return (
    <div className='relative mb-24 flex flex-col'>
      <Image
        src={EncouragementIcon}
        width={100}
        height={100}
        alt='Decorative card frame'
        className='absolute left-0 top-0 w-full'
        priority
      />

      <Card className={CARD_STYLES.card}>
        <CardContent className={CARD_STYLES.content}>{title}</CardContent>
        <CardFooter className='flex w-full justify-center'>
          <div className={CARD_STYLES.imageContainer}>
            <div className={CARD_STYLES.innerImage}>
              {image && (
                <Image
                  width={100}
                  height={100}
                  className='h-full w-full scale-150'
                  src={image}
                  alt={`Icon for ${title}`}
                />
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
