// Component imports
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function AnalysisTimestamp({ setTimestamp, timestamp }: any) {
	const timeStamps = [
		{
			title: "۳۰ روز",
			value: "30",
		},
		{
			title: "۶۰ روز",
			value: "60",
		},
		{
			title: "۹۰ روز",
			value: "90",
		},
		{
			title: "۶ ماه",
			value: "182",
		},
		{
			title: "۱۲ ماه",
			value: "365",
		},
	];

	return (
		<div>
			<Select dir="rtl" value={`${timestamp}`} onValueChange={setTimestamp}>
				<SelectTrigger className="flex gap-2 rounded-full bg-primary text-white focus:ring-0 focus:ring-offset-0 sm:hidden">
					<SelectValue />
				</SelectTrigger>
				<SelectContent position="popper">
					{timeStamps.map((timestamp, i) => (
						<SelectItem value={timestamp.value} key={i}>
							{timestamp.title}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			<RadioGroup
				className="hidden sm:flex"
				value={`${timestamp}`}
				onValueChange={setTimestamp}
			>
				{timeStamps.map((timestamp, i) => (
					<div className="flex items-center" key={i}>
						<RadioGroupItem
							className="peer hidden"
							value={timestamp.value}
							id={timestamp.value}
						/>
						<Label
							className="flex flex-col rounded-full border-2 border-blue-400 px-4 py-2 font-normal transition-colors duration-200 hover:cursor-pointer peer-aria-checked:bg-blue-400 peer-aria-checked:font-medium peer-aria-checked:text-white"
							htmlFor={timestamp.value}
						>
							<span>{timestamp.title}</span>
						</Label>
					</div>
				))}
			</RadioGroup>
		</div>
	);
}
