"use client";
import { useState } from "react";

// Component imports
import AnalysisTabs from "@/components/studio/dashboard/AnalysisTabs";
import AnalysisTimestamp from "@/components/studio/dashboard/analysis-timestamp";
import { Separator } from "@/components/ui/separator";

// Icon imports
import { LayoutDashboard } from "lucide-react";

export default function Dashboard() {
	const [timestamp, setTimstamp] = useState(30);

	return (
		<div className="mb-10 w-full rounded-md bg-white px-4 py-8 shadow-xl dark:bg-slate-900 sm:mt-10 sm:px-12">
			<div className="flex items-center justify-between">
				<div className="flex gap-2">
					<LayoutDashboard className="text-blue-400 sm:h-10 sm:w-10" />

					<div>
						<h1 className="flex gap-x-2 text-2xl font-medium text-blue-900 sm:text-3xl">
							داشبورد
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
