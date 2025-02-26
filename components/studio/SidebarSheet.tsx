import { PropsWithChildren } from "react";

// Component imports
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Icon imports
import { Menu } from "lucide-react";

interface SidebarSheetProps extends PropsWithChildren {
	buttonClass?: string;
}

export function SidebarSheet({
	children,
	buttonClass = "text-white",
}: SidebarSheetProps) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className={buttonClass}>
					<Menu />
				</Button>
			</SheetTrigger>

			<SheetContent className="p-0">
				<div className="h-full overflow-y-scroll">{children}</div>
			</SheetContent>
		</Sheet>
	);
}
