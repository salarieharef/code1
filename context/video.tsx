"use client";

import { ReactNode, createContext, useState } from "react";

export const video_context = createContext({});

export default function VideoContextProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [showTranscript, setShowTranscript] = useState(false);
	const [selectedLesson, setSelectedLesson] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [currentTimeBeforeAdStart, setCurrentTimeBeforeAdStart] = useState(0);
	const [subtitle, setSubtitle] = useState(0);
	const [haveSubtitle, setHaveSubtitle] = useState(false);

	return (
		<video_context.Provider
			value={{
				showTranscript,
				setShowTranscript,
				selectedLesson,
				setSelectedLesson,
				currentTime,
				setCurrentTime,
				subtitle,
				setSubtitle,
				haveSubtitle,
				setHaveSubtitle,
				currentTimeBeforeAdStart,
				setCurrentTimeBeforeAdStart,
			}}
		>
			{children}
		</video_context.Provider>
	);
}
