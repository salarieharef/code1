import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function OnlineClassFilter() {
	return (
		<form className="flex flex-col justify-end md:items-end">
			<RadioGroup
				defaultValue="online-classes"
				dir="rtl"
				className="flex gap-0"
			>
				<div className="flex items-center gap-0">
					<Label htmlFor="online-classes">
						<RadioGroupItem
							value="online-classes"
							id="online-classes"
							className="peer hidden"
						/>

						<div className="mx-0 cursor-pointer rounded-br-sm rounded-tr-sm border border-blue-500 bg-transparent px-4 py-1 text-lg text-slate-600 peer-aria-checked:bg-blue-500 peer-aria-checked:text-white">
							دروس آنلاین
						</div>
					</Label>
				</div>
				<div className="flex items-center gap-0">
					<Label htmlFor="offline-classes">
						<RadioGroupItem
							value="offline-classes"
							id="offline-classes"
							className="peer hidden"
						/>

						<div className="mx-0 cursor-pointer rounded-bl-sm rounded-tl-sm border border-blue-500 bg-transparent px-4 py-1 text-lg text-slate-600 peer-aria-checked:bg-blue-500 peer-aria-checked:text-white">
							دروس آفلاین
						</div>
					</Label>
				</div>
			</RadioGroup>
		</form>
	);
}
