"use client";
import Link from "next/link";

// Component imports
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Form imports
import { useFormContext } from "react-hook-form";

type RulesAgreeCheckboxType = {
	label?: string;
	name?: string;
	disabled?: boolean;
	required?: boolean;
};

export default function RulesAgreeCheckbox({
	label = "نام:",
	name = "rules_agreed",
	disabled,
	required,
}: RulesAgreeCheckboxType) {
	const form = useFormContext();

	return (
		<FormField
			control={form.control}
			name={name}
			disabled={disabled}
			render={({ field }) => (
				<FormItem>
					<div className="flex items-center gap-x-1">
						<FormControl>
							<Checkbox
								{...field}
								id="terms"
								onCheckedChange={(v) => {
									form.setValue(name, v);
								}}
							/>
						</FormControl>
						<FormLabel
							htmlFor="terms"
							className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							با{" "}
							<Link href="#" className="text-primary underline">
								شرایط و قوانین
							</Link>{" "}
							کاتب موافق هستم.
							{required ? <span className="text-destructive">*</span> : null}
						</FormLabel>
					</div>
					<FormMessage className="text-xs" />
				</FormItem>
			)}
		/>
	);
}
