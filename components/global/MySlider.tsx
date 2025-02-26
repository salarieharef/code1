import React, { useState } from "react";
import { useInViewport } from "./useInViewport";

interface SlideProps {
	id: string;
	content: string;
}

function MySlider() {
	const [slides] = useState<SlideProps[]>([
		{ id: "1", content: "Slide 1" },
		{ id: "2", content: "Slide 2" },
		{ id: "3", content: "Slide 3" },
	]);

	return (
		<div>
			{slides.map((slide, index) => (
				<Slide key={index} id={slide.id} content={slide.content} />
			))}
		</div>
	);
}

function Slide({ id, content }: SlideProps) {
	const containerRef = useInViewport(() => {
		console.log(`Slide with id ${id} is in viewport. Content:`, content);
	});

	return (
		<div
			style={{ padding: "20px", border: "1px solid black" }}
			ref={containerRef}
		>
			{content}
		</div>
	);
}

export default MySlider;
