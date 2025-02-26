import { useEffect, useRef, useState, ChangeEvent, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";

export default function OTPInput({ field, setValue }: any) {
	const [otp, setOTP] = useState<string[]>(new Array(5).fill(""));

	const [activeInputIndex, setActiveInputIndex] = useState<number>(0);
	const currentInputRef = useRef<HTMLInputElement>(null);

	const handleChange = (
		{ target }: ChangeEvent<HTMLInputElement>,
		inputIndex: number
	): void => {
		const { value } = target;
		const digit = value.substring(value.length - 1);
		const newOTP: string[] = [...otp];
		newOTP[inputIndex] = digit;
		if (!value) {
			setActiveInputIndex(inputIndex - 1);
		} else {
			setActiveInputIndex(inputIndex + 1);
		}
		setOTP(newOTP);
		setValue(field.name, newOTP.join(""));
	};

	const handleKeyUp = (
		{ key }: KeyboardEvent<HTMLInputElement>,
		inputIndex: number
	): void => {
		if (key === "Backspace" && otp[inputIndex].length === 0)
			setActiveInputIndex(inputIndex - 1);
	};

	// handle on paste
	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		const pastedData = e.clipboardData.getData("text");
		const newOTP: string[] = [...otp];
		pastedData.split("").forEach((char, index) => {
			if (index < 5) {
				newOTP[index] = char;
			}
		});
		setOTP(newOTP);
		setValue(field.name, newOTP.join(""));
	};

	useEffect(() => {
		currentInputRef.current?.focus();
	}, [activeInputIndex]);

	return (
		<div className="flex flex-row-reverse items-center justify-center space-x-8">
			{otp.map((_, index) => {
				return (
					<Input
						{...field}
						ref={index === activeInputIndex ? currentInputRef : null}
						type="text" // Change type to "text" to allow pasting alphanumeric characters
						className="spin-button-none h-12 w-12 rounded border-2 border-slate-400 bg-transparent text-center text-xl font-semibold text-slate-400 outline-none transition focus:border-slate-700 focus:text-slate-700"
						onChange={(e) => handleChange(e, index)}
						onKeyUp={(e) => handleKeyUp(e, index)}
						onPaste={handlePaste} // Add onPaste event handler
						value={otp[index]}
						key={index}
					/>
				);
			})}
		</div>
	);
}
