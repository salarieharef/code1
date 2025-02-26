"use client";

import { ReactNode, createContext, useState } from "react";

export const university_context = createContext({});

export default function UniversityContextProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [search, setSearch] = useState("");
	const [universityIdForDetail, setUniversityIdForDetail] = useState(0);
	const [showUniversityDetail, setShowUniversityDetail] = useState(false);
	const [position, setPosition]: any = useState([32.4279, 53.688]);
	const [bounds, setBounds]: any = useState();
	const [zoom, setZoom]: any = useState(6);
	const [isImageDetailOpen, setIsImageDetailOpen] = useState(false);
	const [openMobileDrawer, setOpenMobileDrawer] = useState(false);

	const [selectedImage, setSelectedImage] = useState(0);

	return (
		<university_context.Provider
			value={{
				search,
				setSearch,
				universityIdForDetail,
				setUniversityIdForDetail,
				showUniversityDetail,
				setShowUniversityDetail,
				position,
				setPosition,
				bounds,
				setBounds,
				zoom,
				setZoom,
				isImageDetailOpen,
				setIsImageDetailOpen,
				selectedImage,
				setSelectedImage,
				openMobileDrawer,
				setOpenMobileDrawer,
			}}
		>
			{children}
		</university_context.Provider>
	);
}
