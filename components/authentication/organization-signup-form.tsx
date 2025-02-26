// Component imports
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import OrganNameInput from "./form/organ-name-input";
import OrganTypeSelector from "./form/organ-type-selector";
import RulesAgreeCheckbox from "./form/rules-agree-checkbox";

// Icon imports
import { Loader2 } from "lucide-react";

export default function OrganizationSignupForm({ form, submitFunction }: any) {
	return (
		<Form {...form}>
			<form
				className="flex w-full flex-col gap-y-4 pt-2"
				onSubmit={form.handleSubmit(submitFunction)}
			>
				{/* Organization type */}
				<OrganTypeSelector required={true} />

				{/* Organization name */}
				<OrganNameInput required={true} />

				{/* Rules agreed */}
				<RulesAgreeCheckbox required={true} />

				<Button
					className="rounded-full px-6 text-lg font-bold"
					type="submit"
					name="Sign up"
					disabled={form.formState.isSubmitting}
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
