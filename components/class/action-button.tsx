// Component imports
import Link from "next/link";
import { Button } from "../ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";

export default function ActionButton({
	icon,
	onClick,
	tooltip,
	loading,
	link,
}: any) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					{link ? (
						<Button
							size="icon"
							className="h-6 w-6 rounded-full bg-blue-100 p-2 hover:bg-blue-200 md:h-8 md:w-8"
						>
							<Link href={link||""}>{icon}</Link>
						</Button>
					) : (
						<Button
							size="icon"
							className="h-6 w-6 rounded-full bg-blue-100 p-1 hover:bg-blue-200 md:h-8 md:w-8"
							onClick={onClick}
							disabled={loading}
						>
							{icon}
						</Button>
					)}
				</TooltipTrigger>
				<TooltipContent side="bottom">{tooltip}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
