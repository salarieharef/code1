import { MoreVertical, Search } from "lucide-react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Button } from "../../ui/button";

export default function EditButtons({ className = "" }) {
	return (
		<div
			className={`${className} flex flex-row flex-nowrap items-center justify-between gap-2`}
		>
			<Button
				variant="ghost"
				size="icon"
				className="h-8 w-8 rounded border border-slate-800 bg-transparent bg-opacity-0"
				name="Search"
			>
				<MoreVertical className="h-4 w-4 stroke-[1.5] text-slate-800" />
			</Button>
			<Button
				className="h-8 w-24 rounded bg-red-500 text-lg
                    font-bold text-white hover:bg-red-600"
				name="Cancel"
			>
				لغو
			</Button>
			<Button
				className="h-8 w-24 rounded bg-blue-400
                    text-lg font-bold text-white"
				name="Save"
			>
				ذخیره
			</Button>
		</div>
	);
}
