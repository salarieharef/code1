"use client";
import { useState } from "react";

// Component imports
import { Separator } from "@/components/ui/separator";

// Icon imports
import { LineChart } from "lucide-react";
import AnalysisTabs from "@/components/studio/class/analytics/AnalysisTabs";
import AnalysisTimestamp from "@/components/studio/dashboard/analysis-timestamp";

export default function Dashboard() {
	const [timestamp, setTimstamp] = useState(30);

	return (
		<div className="mb-10 w-full rounded-md bg-white p-4 shadow-xl sm:mt-10 sm:px-12 sm:py-8">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<LineChart className="text-blue-400 sm:h-10 sm:w-10" />

					<div>
						<h1 className="flex gap-x-2 text-xl font-medium text-blue-900 sm:text-3xl">
							تجزیه و تحلیل درس
						</h1>
						<p className="text-xs text-muted-foreground sm:text-base">
							جهت نمایش نمودار روی آمارها کلیک کنید
						</p>
					</div>
				</div>

				<AnalysisTimestamp setTimestamp={setTimstamp} timestamp={timestamp} />
			</div>

			<Separator orientation="horizontal" className="my-4" />

			<AnalysisTabs timestamp={timestamp} />
		</div>
	);
}
