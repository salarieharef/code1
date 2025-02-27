"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

export function Combobox({
	data,
	onChange,
	placeholder = "Select items...",
}: any) {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [open, setOpen] = React.useState(false);
	const [selected, setSelected] = React.useState<any[]>([]);
	const [inputValue, setInputValue] = React.useState("");

	const handleUnselect = React.useCallback((item: any) => {
		setSelected((prev) => prev.filter((s) => s.value !== item.value));
	}, []);

	const handleKeyDown = React.useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			const input = inputRef.current;
			if (input) {
				if (e.key === "Delete" || e.key === "Backspace") {
					if (input.value === "") {
						setSelected((prev) => {
							const newSelected = [...prev];
							newSelected.pop();
							return newSelected;
						});
					}
				}
				// This is not a default behaviour of the <input /> field
				if (e.key === "Escape") {
					input.blur();
				}
			}
		},
		[]
	);

	const selectables = data.filter((items: any) => !selected.includes(items));

	return (
		<Command
			onKeyDown={handleKeyDown}
			className="overflow-visible bg-transparent"
		>
			<div className="group rounded-md bg-secondary px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
				<div className="flex flex-wrap gap-1">
					{selected.map((item) => {
						return (
							<Badge
								key={item.value}
								variant="secondary"
								className="bg-slate-200"
							>
								{item.label}
								<button
									className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											handleUnselect(item);
										}
									}}
									onMouseDown={(e) => {
										e.preventDefault();
										e.stopPropagation();
									}}
									onClick={() => handleUnselect(item)}
								>
									<X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
								</button>
							</Badge>
						);
					})}

					{/* Avoid having the "Search" Icon */}
					<CommandPrimitive.Input
						ref={inputRef}
						value={inputValue}
						onValueChange={setInputValue}
						onBlur={() => setOpen(false)}
						onFocus={() => setOpen(true)}
						placeholder={placeholder}
						className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
					/>
				</div>
			</div>
			<div className="relative mt-2">
				{open && selectables.length > 0 ? (
					<div className="absolute top-0 z-20 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
						<CommandGroup className="h-full overflow-auto">
							{selectables.map((item: any) => {
								return (
									<CommandItem
										key={item.value}
										onMouseDown={(e) => {
											e.preventDefault();
											e.stopPropagation();
										}}
										onSelect={(value) => {
											setInputValue("");
											setSelected((prev) => [...prev, item]);

											onchange ? onChange(selected) : null;
										}}
										className={"cursor-pointer"}
									>
										{item.label}
									</CommandItem>
								);
							})}
						</CommandGroup>
					</div>
				) : null}
			</div>
		</Command>
	);
}
