"use client";
import { memo, useMemo } from "react";

// Component imports
import VideoPlayer from "@/components/class/video-player";

const VideoPreview = memo(({ fileValue }: any) => {
	const videoUrl = useMemo(
		() =>
			fileValue?.length
				? typeof fileValue == "string"
					? fileValue
					: URL.createObjectURL(fileValue[0])
				: "",
		[fileValue]
	);
	VideoPreview.displayName = "VideoPreview";

	return <VideoPlayer src={{ src: videoUrl, type: "video/mp4" }} />;
});

export default VideoPreview;
