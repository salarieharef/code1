import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export enum FeatureImagePos {
	left = "left",
	right = "right",
}

export function FeatureCard({
	image,
	imagePos = FeatureImagePos.right,
	title,
	description,
	btnLink,
	btnText,
}: any) {
	return (
		<>
			<div
				className={`flex flex-col ${
					imagePos == FeatureImagePos.right
						? "md:flex-row"
						: "md:flex-row-reverse"
				} pt-8`}
			>
				<div className="flex min-w-[45%] flex-col items-center">
					{image && <Image className="p-2" src={image} alt={title} />}
				</div>
				<div
					className={`flex min-w-[55%] flex-col ${
						imagePos == FeatureImagePos.right ? "items-start" : "items-end"
					} justify-center`}
				>
					<div
						className={`flex ${
							imagePos == FeatureImagePos.right
								? "flex-row"
								: "flex-row-reverse"
						}`}
					>
						<div className="flex-col">
							<div
								className={`h-full w-1 rounded-2xl bg-slate-300 ${
									imagePos == FeatureImagePos.right ? "ml-2" : "mr-2"
								}`}
							></div>
						</div>
						<div className="flex-col">
							<h2
								className={`text-2xl font-medium text-blue-900 dark:text-blue-500 lg:text-3xl ${
									imagePos == FeatureImagePos.left && "text-left"
								}`}
							>
								{title}
							</h2>
							<p
								className={`lg:text:2xl text-xl leading-8 ${
									imagePos == FeatureImagePos.left && "text-left"
								}`}
							>
								{description}
							</p>
						</div>
					</div>
					<Button
						asChild
						className="mt-4 rounded-full bg-gradient-to-b from-blue-50/40 to-primary px-8 text-base hover:from-primary hover:to-blue-50/40 dark:from-blue-400 dark:to-blue-700 dark:hover:from-blue-700/80 dark:hover:to-blue-400/80 md:text-lg"
					>
						<Link href={btnLink||""}>{btnText}</Link>
					</Button>
				</div>
			</div>
		</>
	);
}
