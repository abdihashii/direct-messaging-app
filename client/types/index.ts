export type Message = {
  chat_id: string | null;
  content: string;
  is_read: boolean;
  message_id: string;
  sender_id: string;
  sender_user_name: string | null;
  timestamp: string;
};
