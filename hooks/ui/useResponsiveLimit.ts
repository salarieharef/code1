import { useEffect, useState } from "react";
import { useMediaQuery } from "./use-media-query";

type Props = {
  isXLarge?: number;
  isLarge?: number;
  isMedium?: number;
  isSmall?: number;
};

export function useResponsiveLimit({
  isXLarge = 20,
  isLarge = 20,
  isMedium = 27,
  isSmall = 10,
}: Props = {}) {
  const [limit, setLimit] = useState(20); // Default limit

  // Media queries for different screen sizes
  const matchXLarge = useMediaQuery("(min-width: 1280px)");
  const matchLarge = useMediaQuery(
    "(min-width: 1024px) and (max-width: 1279px)"
  );
  const matchMedium = useMediaQuery(
    "(min-width: 768px) and (max-width: 1023px)"
  );
  const matchSmall = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    if (matchXLarge) setLimit(isXLarge);
    else if (matchLarge) setLimit(isLarge);
    else if (matchMedium) setLimit(isMedium);
    else if (matchSmall) setLimit(isSmall);
  }, [matchXLarge, matchLarge, matchMedium, matchSmall]);

  return limit;
}
