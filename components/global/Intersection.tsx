import { Fragment, useEffect, useRef, useState } from "react";

export interface IntersectionProps {
  id: any;
  onIntersect: (id: any) => void;
  children: any;
  once?: boolean; // Added new prop to control single or multiple intersection requests
}

export function Intersection({
  id,
  children,
  onIntersect,
  once = false,
}: IntersectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false); // State to track initial intersection

  useEffect(() => {
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (once) {
            setHasIntersected(true); // Record initial intersection if once is true
          }
          setIsIntersecting(true);
        } else {
          setIsIntersecting(false);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 1,
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [once]);

  useEffect(() => {
    if (isIntersecting && (!once || !hasIntersected)) {
      onIntersect(id);
    }
  }, [isIntersecting, id, onIntersect, once, hasIntersected]);

  return <span ref={containerRef}>{children}</span>;
}

//usage
{
  /* <Intersection id={"2"} onIntersect={(id) => handleOnIntersect(id)}  /> */
}
