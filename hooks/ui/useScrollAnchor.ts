import { useEffect, useRef, useState } from "react";

export function useScrollAnchor() {
	const scrollRef = useRef<HTMLDivElement>(null);
	const messagesRef = useRef<HTMLDivElement>(null);
	const visibilityRef = useRef<HTMLDivElement>(null);
	const [isAtBottom, setIsAtBottom] = useState(true);

	const scrollToBottom = () => {
		visibilityRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => setIsAtBottom(entry.isIntersecting),
			{ threshold: 1.0 }
		);
		if (visibilityRef.current) {
			observer.observe(visibilityRef.current);
		}
		return () => {
			if (visibilityRef.current) {
				observer.unobserve(visibilityRef.current);
			}
		};
	}, []);

	return { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom };
}

// import { useEffect, useRef } from "react";

// export function useScrollAnchor() {
// 	// ref
// 	const messagesRef = useRef<HTMLDivElement | null>(null);
// 	const scrollRef = useRef<HTMLDivElement | null>(null);
// 	const visibilityRef = useRef<HTMLDivElement | null>(null);

// 	// finish div
// 	const isAtBottom = (): boolean => {
// 		if (!messagesRef.current) return false;
// 		return (
// 			messagesRef.current.scrollHeight - messagesRef.current.scrollTop ===
// 			messagesRef.current.clientHeight
// 		);
// 	};

// 	// scroll to finnish div
// 	const scrollToBottom = (): void => {
// 		if (messagesRef.current) {
// 			messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
// 		}
// 	};

// 	useEffect(() => {
// 		const handleScroll = () => {
// 			if (isAtBottom()) {
// 				scrollToBottom();
// 			}
// 		};

// 		const ref = messagesRef.current;
// 		if (ref) {
// 			ref.addEventListener("scroll", handleScroll);
// 		}
// 		return () => {
// 			if (ref) {
// 				ref.removeEventListener("scroll", handleScroll);
// 			}
// 		};
// 	}, []);

// 	return {
// 		messagesRef,
// 		scrollRef,
// 		visibilityRef,
// 		isAtBottom,
// 		scrollToBottom,
// 	};
// }
