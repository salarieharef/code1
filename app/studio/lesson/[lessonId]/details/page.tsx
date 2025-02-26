// Component imports
import EditLesson from "@/components/studio/lesson/EditLesson";
import { Separator } from "@/components/ui/separator";
import { Edit2 } from "lucide-react";

export default function StudioLessonDetails() {
	return (
		<div className="mb-10 w-full rounded-md bg-white p-4 shadow-xl sm:mt-10 sm:px-12 sm:py-8">
			<div className="flex items-center justify-between">
				<h1 className="flex text-xl font-medium text-blue-900 sm:text-3xl">
					<Edit2 className="text-blue-400 sm:h-10 sm:w-10" />
					جزئیات جلسه
				</h1>
			</div>

			<Separator orientation="horizontal" className="my-4" />

			<EditLesson />
		</div>
	);
}
