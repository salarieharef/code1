// Component imports
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function AnalysisTimestamp({ setTimestamp, timestamp }: any) {
	return (
		<RadioGroup
			className="flex"
			value={`${timestamp}`}
			onValueChange={setTimestamp}
		>
			<div className="flex items-center">
				<RadioGroupItem className="peer hidden" value="30" id="30" />
				<Label
					className="flex flex-col rounded-full border-2 border-blue-400 px-4 py-2 font-normal transition-colors duration-200 hover:cursor-pointer peer-aria-checked:bg-blue-400 peer-aria-checked:font-medium peer-aria-checked:text-white"
					htmlFor="30"
				>
					<span>۳۰ روز</span>
				</Label>
			</div>
			<div className="flex items-center">
				<RadioGroupItem className="peer hidden" value="60" id="60" />
				<Label
					className="flex flex-col rounded-full border-2 border-blue-400 px-4 py-2 font-normal transition-colors duration-200 hover:cursor-pointer peer-aria-checked:bg-blue-400 peer-aria-checked:text-white"
					htmlFor="60"
				>
					<span>۶۰ روز</span>
				</Label>
			</div>
			<div className="flex items-center">
				<RadioGroupItem className="peer hidden" value="90" id="90" />
				<Label
					className="flex flex-col rounded-full border-2 border-blue-400 px-4 py-2 font-normal transition-colors duration-200 hover:cursor-pointer peer-aria-checked:bg-blue-400 peer-aria-checked:text-white"
					htmlFor="90"
				>
					<span>۹۰ روز</span>
				</Label>
			</div>
			<div className="flex items-center">
				<RadioGroupItem className="peer hidden" value="182" id="182" />
				<Label
					className="flex flex-col rounded-full border-2 border-blue-400 px-4 py-2 font-normal transition-colors duration-200 hover:cursor-pointer peer-aria-checked:bg-blue-400 peer-aria-checked:text-white"
					htmlFor="182"
				>
					<span>۶ ماه</span>
				</Label>
			</div>
			<div className="flex items-center">
				<RadioGroupItem className="peer hidden" value="365" id="365" />
				<Label
					className="flex flex-col rounded-full border-2 border-blue-400 px-4 py-2 font-normal transition-colors duration-200 hover:cursor-pointer peer-aria-checked:bg-blue-400 peer-aria-checked:text-white"
					htmlFor="365"
				>
					<span>۱۲ ماه</span>
				</Label>
			</div>
		</RadioGroup>
	);
}
