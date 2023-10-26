'use client';

import { Message } from '@/types';
import ChatActions from './ChatActions';
import Messages from './Messages';
import { useState } from 'react';

const ChatRoom = ({
  messages,
  userId,
  chatId,
  chatName,
}: {
  messages: Message[];
  userId: string;
  chatId: string;
  chatName: string;
}) => {
  const [messagesState, setMessagesState] =
    useState<Partial<Message>[]>(messages);

  return (
    <section className="flex h-full flex-col">
      <Messages
        messagesState={messagesState}
        userId={userId}
        chatName={chatName}
      />

      <ChatActions
        chatId={chatId}
        senderId={userId}
        setMessagesState={setMessagesState}
      />
    </section>
  );
};

export default ChatRoom;
