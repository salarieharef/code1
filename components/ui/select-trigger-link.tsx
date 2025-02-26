import { useState } from "react";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./select";
import SelectLinkItem from "./select-link-item";
import { Loader2 } from "lucide-react";

type SelectedTriggerLinkProps = {
	selectedTabParam?: any;
	handleSelected: (value: string) => void;
	TabAds: { type: string; title: string; show: boolean }[];
	placeholder?: string; // Placeholder parameter
};

const SelectedTriggerLink: React.FC<SelectedTriggerLinkProps> = ({
	selectedTabParam,
	handleSelected,
	TabAds,
	placeholder,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleValueChange = (value: string) => {
		handleSelected(value);
		setIsOpen(false);
	};

	const selectedTabTitle = TabAds?.find(
		(tab) => tab?.type === selectedTabParam
	)?.title;

	return (
		<>
			<Select
				dir='rtl'
				value={selectedTabParam}
				onValueChange={handleValueChange}
				open={isOpen}
				onOpenChange={setIsOpen}
			>
				<SelectTrigger className='w-max gap-2 rounded-full border-0 bg-primary text-xs text-primary-foreground focus:ring-0 focus:ring-offset-0 md:text-sm'>
					<SelectValue placeholder={placeholder}>
						{selectedTabTitle}
					</SelectValue>
				</SelectTrigger>
				<SelectContent position='popper'>
					{TabAds?.length ? (
						TabAds.map((tab, i) =>
							tab.show ? (
								<SelectLinkItem
									key={i}
									href={`?type_ads=${tab.type}`}
									isActive={selectedTabParam === tab?.type}
									onClick={() => handleValueChange(tab?.type)}
								>
									{tab.title}
								</SelectLinkItem>
							) : null
						)
					) : (
						<div className='flex justify-center py-4 '>
							<Loader2 className='ml-2 h-4 w-4 animate-spin' />
						</div>
					)}
				</SelectContent>
			</Select>
		</>
	);
};

export default SelectedTriggerLink;
