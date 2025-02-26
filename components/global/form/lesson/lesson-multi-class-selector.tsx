// Component imports
import CourseAutocomplete from "@/components/global/form/course-autocomplete";

// Form imports
import { useFieldArray, useFormContext } from "react-hook-form";

type LessonMultiClassSelectorType = {
	valueLoading?: boolean;
	label?: string;
	placeholder?: string;
	name?: string;
};

export default function LessonMultiClassSelector({
	label = "درس:",
	placeholder = "لطفا درس خود را انتخاب کنید...",
}: LessonMultiClassSelectorType) {
	const form = useFormContext();

	const control = form.control;
	const { fields, append, remove } = useFieldArray<any>({
		control,
		name: "courses",
	});

	return (
		<div className="col-span-full grid items-end gap-2 md:grid-cols-2 xl:grid-cols-3">
			{fields.map((field, index) => (
				<div className="flex items-end gap-2" key={field.id}>
					{/* <div>
            <Button
              size="icon"
              variant="destructive"
              type="button"
              onClick={() => remove(index)}
            >
              <Trash2 />
            </Button>
          </div> */}

					<CourseAutocomplete
						key={field.id}
						placeholder={placeholder}
						label={label}
						required={true}
						name={`courses.${index}`}
					/>
				</div>
			))}
			{/* <Button size="icon" type="button" onClick={() => append({})}>
        <Plus />
      </Button> */}
		</div>
	);
}
