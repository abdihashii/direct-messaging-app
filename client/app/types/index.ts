export type Message = {
	message_id: number | string;
	chat_id: number | string;
	message_content: string;
	sender_id: string;
	timestamp: Date;
	is_read: boolean;
}