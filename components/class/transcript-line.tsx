import { forwardRef } from "react";

type TranscriptLineAdditionalProps = {
	id?: string;
	time?: string;
	line?: any;
	isCurrent: boolean;
	onClick?: () => void;
};
type TranscriptLineProps =
	React.PropsWithChildren<TranscriptLineAdditionalProps>;

const TranscriptLine = forwardRef<HTMLBaseElement, TranscriptLineProps>(
	(props: TranscriptLineProps, ref: any) => {
		return (
			<div
				ref={ref}
				id={props.id}
				onClick={props.onClick}
				className={`${
					props.isCurrent ? "bg-blue-100" : "cursor-pointer hover:bg-accent"
				} items-right flex flex-row rounded-md p-2`}
			>
				<span className="h-max w-20 flex-none rounded-full bg-blue-200 py-1 text-center text-sm font-normal text-primary">
					{props.time}
				</span>
				<p
					className="mr-2.5 text-right font-normal text-slate-800"
					dangerouslySetInnerHTML={{ __html: props.line }}
				></p>
			</div>
		);
	}
);
TranscriptLine.displayName = "TranscriptLine";

export default TranscriptLine;
