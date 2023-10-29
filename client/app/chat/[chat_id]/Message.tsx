import { Message as MessageType } from '@/types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const Message = ({
  message,
  userId,
}: {
  message: MessageType;
  userId: string;
}) => {
  const iAmTheSender = userId === message.sender_id;
  const bgColor = iAmTheSender ? 'bg-green-700' : 'bg-blue-700';

  return (
    <li
      className={`flex max-w-[50%] flex-col gap-2 rounded-md border border-gray-500 p-2 ${
        iAmTheSender ? 'ml-auto items-end' : 'items-start'
      }`}
      key={message.message_id}
    >
      <p className={`${bgColor} rounded-md px-2 py-1 text-sm text-white`}>
        {message.sender_user_name}
      </p>
      <p>{message.content}</p>
    </li>
  );
};

export default Message;
