export interface Message {
	id: string;
	content: string;
	type?: string;
	size?: number;
	urlFile?: string;
	sender: "user" | "bot";
}
