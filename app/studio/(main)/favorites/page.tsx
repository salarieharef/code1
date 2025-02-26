// Component imports
import LikedCourses from "@/components/studio/favorites/LikedCourses";
import LikedLessons from "@/components/studio/favorites/LikedLessons";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Icon imports
import { Heart } from "lucide-react";

export default function TeacherStudioVideos() {
	return (
		<div className="mb-10 w-full rounded-md bg-white p-4 shadow-xl sm:mt-10 sm:px-12 sm:py-8">
			<h1 className="flex gap-x-2 text-xl font-medium text-blue-900 sm:text-3xl">
				<Heart className="text-blue-400 sm:h-10 sm:w-10" />
				پسندیدن
			</h1>

			<Separator orientation="horizontal" className="my-4" />

			<Tabs defaultValue="liked_courses" dir="rtl" className="w-full">
				<div className="flex justify-center">
					<TabsList className="h-auto overflow-hidden border border-blue-500 bg-transparent p-0">
						<TabsTrigger
							value="liked_courses"
							className="rounded-none border-blue-500 font-normal text-slate-600 data-[state=active]:bg-blue-500 data-[state=active]:font-medium data-[state=active]:text-white sm:px-10 sm:text-lg"
						>
							دروس مورد علاقه
						</TabsTrigger>
						<TabsTrigger
							value="liked_lessons"
							className="rounded-none border-blue-500 font-normal text-slate-600 data-[state=active]:bg-blue-500 data-[state=active]:font-medium data-[state=active]:text-white sm:px-10 sm:text-lg"
						>
							جلسات مورد علاقه
						</TabsTrigger>
					</TabsList>
				</div>
				<TabsContent value="liked_courses">
					<LikedCourses />
				</TabsContent>
				<TabsContent value="liked_lessons">
					<LikedLessons />
				</TabsContent>
			</Tabs>
		</div>
	);
}
