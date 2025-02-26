// Icon imports
import { Edit2 } from "lucide-react";

// Component imports
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LessonLinksTab from "@/components/studio/lesson/files/LessonLinksTab";
import LessonFilesTab from "@/components/studio/lesson/files/LessonFilesTab";

export default function LessonFiles({}: any) {
	return (
		<div className="mb-10 min-h-screen w-full rounded-xl bg-white p-4 shadow-xl sm:my-10 sm:px-12 sm:py-8 md:rounded-md">
			<h1 className="flex gap-2 text-xl font-medium text-blue-900 sm:text-3xl">
				<Edit2 className="text-blue-400 sm:h-10 sm:w-10" />
				موارد مرتبط با این جلسه
			</h1>

			<Separator orientation="horizontal" className="my-4" />

			<Tabs defaultValue="links" className="w-full" dir="rtl">
				<div className="flex justify-center">
					<TabsList className="h-auto divide-x-1 divide-x-reverse overflow-hidden border border-blue-500 bg-transparent p-0">
						<TabsTrigger
							value="links"
							className={`rounded-none border-blue-500 font-normal text-slate-600 data-[state=active]:bg-blue-500 data-[state=active]:font-medium data-[state=active]:text-white sm:px-10 sm:text-lg`}
						>
							لینک‌ها
						</TabsTrigger>
						<TabsTrigger
							value="files"
							className={`rounded-none border-blue-500 font-normal text-slate-600 data-[state=active]:bg-blue-500 data-[state=active]:font-medium data-[state=active]:text-white sm:px-10 sm:text-lg`}
						>
							فایل‌ها
						</TabsTrigger>
					</TabsList>
				</div>
				<TabsContent value="links">
					<LessonLinksTab />
				</TabsContent>
				<TabsContent value="files">
					<LessonFilesTab />
				</TabsContent>
			</Tabs>
		</div>
	);
}
