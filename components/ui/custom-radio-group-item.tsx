"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "./radio-group";
import { Label } from "./label";

const CustomRadioGroupItem = React.forwardRef<
	React.ElementRef<typeof RadioGroupPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ children, className, id, ...props }, ref) => {
	return (
		<div>
			<RadioGroupItem {...props} id={id} className="peer hidden" />
			<Label className={className} htmlFor={id}>
				{children}
			</Label>
		</div>
	);
});
CustomRadioGroupItem.displayName = "CustomRadioGroupItem";

export { CustomRadioGroupItem };
