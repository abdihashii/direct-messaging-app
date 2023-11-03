export type Message = {
  chat_id: string | null;
  content: string;
  is_read: boolean;
  message_id: string;
  sender_id: string;
  sender_user_name: string | null;
  timestamp: string;
};

export type Profile = {
  avatar_url: string | null;
  created_at: string;
  email: string;
  updated_at: string | null;
  user_color: string | null;
  user_id: string;
  user_name: string | null;
};

export type UserColorsMap = Record<string, string>;
