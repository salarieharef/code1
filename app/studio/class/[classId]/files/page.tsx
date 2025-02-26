// Icon imports
import { Edit2 } from "lucide-react";

// Component imports
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ClassFilesTab from "@/components/studio/class/files/ClassFilesTab";
import ClassLinksTab from "@/components/studio/class/files/ClassLinksTab";

export default function ClassFiles({}: any) {
	return (
		<div className="mb-10 w-full rounded-xl bg-white p-4 shadow-xl sm:mt-10 sm:px-12 sm:py-8 md:rounded-md">
			<div className="flex flex-row items-center justify-between">
				<h1 className="flex text-xl font-medium text-blue-900 sm:text-3xl">
					<Edit2 className="text-blue-400 sm:h-10 sm:w-10" />
					موارد مرتبط با این درس
				</h1>
			</div>

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
					<ClassLinksTab />
				</TabsContent>
				<TabsContent value="files">
					<ClassFilesTab />
				</TabsContent>
			</Tabs>
		</div>
	);
}
