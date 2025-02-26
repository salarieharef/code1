"use client";

import Image from "next/image";
// Component imports

import { MoveLeft } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import { Button } from "../ui/button";
import Link from "next/link";

export default function SwiperBanner({
	className,
	title,
	subtitle,
	imageSrc,
	children,
	id,
	section,
}: any) {
	return (
		<div className={`flex flex-col items-center justify-evenly ${className}`}>
			<div className="text-center mt-2">
				<h3 className="text-sm text-nowrap font-bold text-white">{subtitle}</h3>
				<p className="md:text-2xl text-nowrap text-sm font-bold text-white">{title}</p>
			</div>

			<Image
				src={imageSrc}
				alt="University Icon"
				width={256}
				height={256}
				className="w-24 h-24 aspect-square block"
			/>

			<Link href={`/category?section=${section}`}>
				<Button
					variant="link"
					className=" flex items-center justify-center gap-x-0.5 px-0 text-xs text-white font-semibold"
				>
					مشاهده همه
					<MoveLeft className="h-3 w-3" />
				</Button>
			</Link>
		</div>
	);
}
