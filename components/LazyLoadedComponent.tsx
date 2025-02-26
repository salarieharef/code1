import { useRef, useState, useEffect } from "react";
import useSWR from "swr";
import { useIntersectionObserver } from "@/hooks/ui";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface LazyLoadComponentProps {
  url: string;
}

const LazyLoadComponent: React.FC<LazyLoadComponentProps> = ({ url }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hasFetched, setHasFetched] = useState(false);
  const isIntersecting = useIntersectionObserver(ref, { threshold: 0.1 });

  const { data, error } = useSWR(hasFetched ? url : null, fetcher);

  useEffect(() => {
    if (isIntersecting && !hasFetched) {
      setHasFetched(true);
    }
  }, [isIntersecting, hasFetched]);

  if (error) return <div>Error loading data...</div>;
  if (!data) return <div ref={ref}>Loading...</div>;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default LazyLoadComponent;
