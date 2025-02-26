import { useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function DeleteAlert({
	children,
	title,
	message,
	onAccept,
	open,
	onOpenChange,
}: {
	children?: React.ReactNode;
	title?: string;
	message?: string;
	onAccept?: any;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}) {
	const [isOpen, setIsOpen] = useState(open || false);

	const handleOpenChange = (open: boolean) => {
		setIsOpen(open);
		if (onOpenChange) {
			onOpenChange(open);
		}
	};

	const handleAccept = () => {
		if (onAccept) {
			onAccept();
		}
		handleOpenChange(false);
	};

	return (
		<AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent dir="rtl">
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{message}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => handleOpenChange(false)}>
						لغو
					</AlertDialogCancel>
					<AlertDialogAction
						className="bg-destructive hover:bg-destructive"
						onClick={handleAccept}
					>
						حذف
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
