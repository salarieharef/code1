// Component imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Icon imports
import { Search } from "lucide-react";

export default function SearchForm() {
	return (
		<form
			className={`flex w-full items-center overflow-hidden rounded-full bg-white/30 text-white shadow md:w-1/2`}
		>
			<Input
				type="text"
				placeholder="سوال خود را جستجو کنید..."
				className="rounded-full border-0 bg-transparent text-white placeholder:text-white focus-visible:ring-0 focus-visible:ring-offset-0"
			/>

			<Button
				variant="ghost"
				size="icon"
				className="mx-2 hover:bg-transparent"
				name="Search"
			>
				<Search className="stroke-[1.5] text-white" />
			</Button>
		</form>
	);
}
