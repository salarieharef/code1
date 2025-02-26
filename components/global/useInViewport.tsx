import { useEffect, useRef, useState } from "react";

export function useInViewport(
	callback: () => void
): React.MutableRefObject<any> {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isIntersecting, setIsIntersecting] = useState(false);

	useEffect(() => {
		const handleIntersect = (entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				setIsIntersecting(entry.isIntersecting);
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
	}, []);

	useEffect(() => {
		if (isIntersecting) {
			callback();
		}
	}, [isIntersecting, callback]);

	return containerRef;
}
