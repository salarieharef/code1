import { useEffect, useState } from "react";
import { useIntersectionObserver } from "@/hooks/ui";

export function useFetchOnIntersect(ref: any) {
  const [hasFetched, setHasFetched] = useState(false);
  const isIntersecting = useIntersectionObserver(ref, { threshold: 0.1 });

  useEffect(() => {
    if (isIntersecting && !hasFetched) {
      setHasFetched(true);
    }
  }, [isIntersecting, hasFetched]);

  return hasFetched;
}
