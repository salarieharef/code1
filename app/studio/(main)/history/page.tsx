// Component imports
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Icon imports
import { History } from "lucide-react";
import HistoryCourses from "@/components/studio/history/HistoryCourses";
import HistoryLessons from "@/components/studio/history/HistoryLessons";

export default function TeacherStudioVideos() {
	return (
		<div className="mb-10 w-full rounded-md bg-white p-4 shadow-xl sm:mt-10 sm:px-12 sm:py-8">
			<h1 className="flex gap-x-2 text-xl font-medium text-blue-900 sm:text-3xl">
				<History className="text-blue-400 sm:h-10 sm:w-10" />
				تاریخچه
			</h1>

			<Separator orientation="horizontal" className="my-4" />

			<Tabs defaultValue="history_courses" dir="rtl" className="w-full">
				<div className="flex justify-center">
					<TabsList className="h-auto overflow-hidden border border-blue-500 bg-transparent p-0">
						<TabsTrigger
							value="history_courses"
							className="rounded-none border-blue-500 font-normal text-slate-600 data-[state=active]:bg-blue-500 data-[state=active]:font-medium data-[state=active]:text-white sm:px-10 sm:text-lg"
						>
							دروس مشاهده شده
						</TabsTrigger>
						<TabsTrigger
							value="history_lessons"
							className="rounded-none border-blue-500 font-normal text-slate-600 data-[state=active]:bg-blue-500 data-[state=active]:font-medium data-[state=active]:text-white sm:px-10 sm:text-lg"
						>
							جلسات مشاهده شده
						</TabsTrigger>
					</TabsList>
				</div>
				<TabsContent value="history_courses">
					<HistoryCourses />
				</TabsContent>
				<TabsContent value="history_lessons">
					<HistoryLessons />
				</TabsContent>
			</Tabs>
		</div>
	);
}
