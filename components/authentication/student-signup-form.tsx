// Component imports
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FamilyNameInput from "./form/family-name-input";
import NameInput from "./form/name-input";
import RulesAgreeCheckbox from "./form/rules-agree-checkbox";

// Icon imports
import { Info, Loader2 } from "lucide-react";

export default function StudentSignupForm({ form, submitFunction }: any) {
	return (
		<div>
			<div className="mb-2 flex items-start gap-1 text-xs">
				<Info className="h-4 w-4 stroke-1.5" />
				<span>
					وارد کردن نام و نام خانوادگی الزامی نیست. اما پیشنهاد می‌شود تکمیل
					گردد.
				</span>
			</div>
			<Form {...form}>
				<form
					className="flex w-full flex-col gap-y-4 pt-2"
					onSubmit={form.handleSubmit(submitFunction)}
				>
					{/* First name */}
					<NameInput />

					{/* Last name */}
					<FamilyNameInput />

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
		</div>
	);
}
