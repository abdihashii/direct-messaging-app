'use client';

import { Message as MessageType } from '@/types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useRef, useEffect, useState } from 'react';
import Message from './Message';
import type { UserColorsMap } from '@/types';
import { Database } from '@/types/database.types';

const Messages = ({
  messages: serverMessages,
  userId,
}: {
  messages: MessageType[];
  userId: string;
}) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [messages, setMessages] = useState<MessageType[]>(serverMessages);
  const [userColors, setUserColors] = useState<UserColorsMap>({}); // State to hold user colors keyed by user id

  useEffect(() => {
    async function fetchUserColors() {
      // Get a list of all user ids from the messages
      const userIds = Array.from(
        new Set(serverMessages.map((m) => m.sender_id)),
      );

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('user_id, user_color')
          .in('user_id', userIds);

        if (error) throw error;

        // Process the data into a map of user id to user color
        const colorsMap = data.reduce((acc, profile) => {
          acc[profile.user_id] = profile.user_color;
          return acc;
        }, {} as UserColorsMap);

        setUserColors(colorsMap);
      } catch (error) {
        console.error(`Error fetching user colors: ${error}`);
      }
    }

    fetchUserColors();
  }, [serverMessages, supabase]);

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
        {messages.map((m) => {
          return (
            <Message
              key={m.message_id}
              message={m}
              userId={userId}
              userColor={userColors[m.sender_id] || 'blue'}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Messages;
