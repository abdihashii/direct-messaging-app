'use client';

import { getUserName } from '@/lib/utils';
import { Message } from '@/types';
import { useRef, useEffect, useState } from 'react';

const Messages = ({
  messages,
  userId,
  chatName,
}: {
  messages: Message[];
  userId: string;
  chatName: string;
}) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [messagesState, setMessagesState] = useState<Message[]>(messages);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messagesState]);

  return (
    <div
      ref={chatContainerRef}
      className="flex flex-col items-center gap-8 overflow-y-scroll scroll-smooth p-5"
    >
      <h1 className="text-2xl font-semibold">{chatName}</h1>

      <ul className="flex w-full flex-col gap-4">
        {messagesState?.map(async (m) => {
          const userName = await getUserName(m.sender_id);
          const iAmTheSender = userId === m.sender_id;

          return (
            <li
              className={`flex max-w-[50%] flex-col gap-2 rounded-md border border-gray-500 p-2 ${
                iAmTheSender ? 'ml-auto items-end' : 'items-start justify-start'
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
        })}
      </ul>
    </div>
  );
};

export default Messages;
