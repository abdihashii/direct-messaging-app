'use client';

import { getUserName } from '@/lib/utils';
import { Message } from '@/types';

const Messages = ({
  messages,
  userId,
}: {
  messages: Message[];
  userId: string;
}) => {
  return messages?.map(async (m) => {
    const userName = await getUserName(m.sender_id);
    const iAmTheSender = userId === m.sender_id;

    return (
      <li
        className={`max-w-[50%] p-2 border rounded-md border-gray-500 flex flex-col gap-2 ${
          iAmTheSender ? 'items-end ml-auto' : 'items-start justify-start'
        }`}
        key={m.message_id}
      >
        <p
          className={`text-sm ${
            iAmTheSender ? 'text-green-700' : 'text-blue-700'
          }`}
        >
          {userName}
        </p>
        <p>{m.content}</p>
      </li>
    );
  });
};

export default Messages;
