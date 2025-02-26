"use client";

// Component imports

// Icon imports
import {
	Ban,
	EyeOff,
	FileMinus,
	MenuIcon,
	Share,
	UserMinus,
} from "lucide-react";

// Auth imports
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";

// Config imports
import { Button } from "../ui/button";

export default function ProfileDropdown() {
	const { data: session }: any = useSession();

	return (
		<DropdownMenu dir="rtl">
			<DropdownMenuTrigger asChild className="cursor-pointer">
				<Button className="px-0" variant="link">
					<MenuIcon className="mb-1 h-7 w-7 text-white md:h-8 md:w-8 xl:h-10 xl:w-10" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="mx-4 w-auto">
				<DropdownMenuItem
					onClick={() => {
						// console.log("item clicked");
					}}
					className="flex cursor-pointer items-center gap-x-4 whitespace-nowrap py-2 text-base md:text-lg "
				>
					<Ban className="h-6 w-6 text-black" />
					کاربر را از دید من پنهان کنید
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						// console.log("item clicked");
					}}
					className="flex cursor-pointer items-center gap-x-4 whitespace-nowrap py-2 text-base md:text-lg "
				>
					<EyeOff className="h-6 w-6 text-black" />
					گزارش عکس پروفایل اکانت
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						// console.log("item clicked");
					}}
					className="flex cursor-pointer items-center gap-x-4 whitespace-nowrap py-2 text-base md:text-lg "
				>
					<FileMinus className="h-6 w-6 text-black" />
					گزارش محتوا اکانت
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						// console.log("item clicked");
					}}
					className="flex cursor-pointer items-center gap-x-4 whitespace-nowrap py-2 text-base md:text-lg "
				>
					<UserMinus className="h-6 w-6 text-black" />
					گزارش اکانت
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						// console.log("item clicked");
					}}
					className="flex cursor-pointer items-center gap-x-4 whitespace-nowrap py-2 text-base md:text-lg "
				>
					<Share className="h-6 w-6 text-black" />
					به اشتراک گذاشتن اکانت
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
