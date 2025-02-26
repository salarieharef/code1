// Component imports
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import RulesAgreeCheckbox from "./form/rules-agree-checkbox";
import NameInput from "./form/name-input";
import FamilyNameInput from "./form/family-name-input";

// Icon imports
import { Loader2 } from "lucide-react";

export default function TeacherSignupForm({ form, submitFunction }: any) {
	return (
		<Form {...form}>
			<form
				className="flex w-full flex-col gap-y-4 pt-2"
				onSubmit={form.handleSubmit(submitFunction)}
			>
				{/* First name */}
				<NameInput required={true} />

				{/* Last name */}
				<FamilyNameInput required={true} />

				{/* Rules agreed */}
				<RulesAgreeCheckbox required={true} />

				<Button
					className="rounded-full px-6 text-lg font-bold"
					type="submit"
					disabled={form.formState.isSubmitting}
					name="Sign up"
				>
					{form.formState.isSubmitting && (
						<Loader2 className="ml-2 h-4 w-4 animate-spin" />
					)}
					ثبت نام
				</Button>
			</form>
		</Form>
	);
}
