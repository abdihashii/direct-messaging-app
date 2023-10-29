'use client';

import { Message } from '@/types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useRef, useEffect, useState } from 'react';

const Messages = ({
  messages: serverMessages,
  userId,
}: {
  messages: Message[];
  userId: string;
}) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(serverMessages);

  useEffect(() => {
    setMessages(serverMessages);
  }, [serverMessages]);

  useEffect(() => {
    // Scroll to bottom
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }

    // Listen to inserts
    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages([...messages, payload.new as Message]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [messages, supabase, router]);

  return (
    <div
      ref={chatContainerRef}
      className="flex flex-col items-center gap-8 overflow-y-scroll p-5"
    >
      <ul className="flex w-full flex-col gap-4">
        {messages?.map((m) => {
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
                {m.sender_user_name}
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
