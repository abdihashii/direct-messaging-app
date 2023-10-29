'use client';

import { Message as MessageType } from '@/types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useRef, useEffect, useState } from 'react';
import Message from './Message';

const Messages = ({
  messages: serverMessages,
  userId,
}: {
  messages: MessageType[];
  userId: string;
}) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [messages, setMessages] = useState<MessageType[]>(serverMessages);

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
          setMessages([...messages, payload.new as MessageType]);
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
          return <Message key={m.message_id} message={m} userId={userId} />;
        })}
      </ul>
    </div>
  );
};

export default Messages;
