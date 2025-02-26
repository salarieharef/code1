import { getImageUrl, getImageUrlBase } from "@/utils/imageUtils";
import { cn } from "@/utils/cn";
import Image from "next/image";
import React, { useState } from "react";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  containerClassName?: string;
  placeholderClassName?: string;
  imageClassName?: string;
  sizes?: string;
  blur?: number;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  containerClassName,
  placeholderClassName,
  imageClassName,
  sizes = "(max-width: 400px) 300px,(max-width: 640px) 500px, (max-width: 1024px) 700px, 700px",
  blur = 0,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  // Check if the path starts with either "/static/" or "@/public/static";

  // const isSServerImage = src?.includes("serve?");
  const isServerImage = typeof src === "string" && src.includes("/serve/");

  if (!isServerImage) {
    return (
      <div
        className={cn(
          "relative aspect-[5/4] h-full w-full md:aspect-square",
          containerClassName
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={cn("object-cover", imageClassName)}
        />
      </div>
    );
  }

  const imagePlaceholderBlur = process.env.NEXT_PUBLIC_IMAGE_PLACEHOLDER;

  const placeholderSrc =
    imagePlaceholderBlur == "true" ? getImageUrl(src, 10, 10) : "";
  const baseSrc = getImageUrlBase(src);

  const loader = ({
    src,
    width,
    quality,
  }: {
    src?: string;
    width?: number;
    quality?: number;
  }) => {
    return `${baseSrc}&w=${width}&h=${width}&blur=${blur}`;
  };

  return (
    <div className={cn("relative h-full w-full ", containerClassName)}>
      {isLoading && imagePlaceholderBlur && (
        <Image
          sizes='10px'
          src={placeholderSrc || ""}
          alt={alt}
          fill
          priority
          className={cn(
            "absolute inset-0 rounded-lg object-cover",
            placeholderClassName
          )}
        />
      )}

      <Image
        loader={loader}
        src={baseSrc || ""}
        fill
        alt={alt}
        sizes={sizes}
        className={cn(
          "object-cover transition-opacity duration-300 ease-in",
          {
            "opacity-100": !isLoading,
            "opacity-0": isLoading,
          },
          imageClassName
        )}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
};

export default ResponsiveImage;
