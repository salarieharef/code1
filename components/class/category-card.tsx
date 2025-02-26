import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function CategoryCard({ image, title, selected }: any) {
	return (
		<>
			<div className="flex w-max flex-col items-center">
				{image && (
					<Image
						width={100}
						height={100}
						className="p-4 lg:p-2"
						src={image}
						alt={title}
					/>
				)}
				<Button
					variant="outline"
					className={`rounded-full px-6 text-base font-bold lg:px-8 lg:text-xl ${
						!selected && "bg-transparent text-white"
					}`}
					name={title}
				>
					{title}
				</Button>
			</div>
		</>
	);
}
