'use client';

import { useState } from 'react';
import type { Message } from '../../types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const Chat = ({
  messagesData,
}: // user,
{
  messagesData: Message[] | null;
  // user: {
  //   id: string;
  //   created_at: Date;
  //   user_name: string;
  //   email: string;
  //   avatar_url: string | null;
  //   updated_at: string | null;
  // } | null;
}) => {
  const [messages, setMessages] = useState<Message[]>(messagesData!);
  // const [message, setMessage] = useState<Message>({});

  const user = {
    user_id: '315624e5-fa13-4590-97ca-b0d4cb5f135b',
  };

  // const handleMessageChange = (event) => {
  //   const message = event.target.value;

  //   setMessage({
  //     id: crypto.randomUUID(),
  //     text: message,
  //     user,
  //     createdAt: Date.now(),
  //   });
  // };

  // const handleSendMessage = (event) => {
  //   event.preventDefault();

  //   if (!message.text) {
  //     alert('Message cannot be empty!');
  //     return;
  //   }

  //   setMessages([...messages, message]);
  //   setMessage({});
  // };

  // const getUserFromMessage = async (id: string) => {
  //   const supabase = createClientComponentClient();

  //   const { data, error } = await supabase
  //     .from('profiles')
  //     .select()
  //     .eq('id', id)
  //     .single();

  //   return data.user_name;
  // };

  return (
    <>
      <section className="flex flex-col gap-3 px-8 w-full mx-auto overflow-y-scroll h-full">
        {messages?.map((m) => {
          // const u = getUserFromMessage(m.sender_id);

          return (
            <div
              className={`w-fit p-2 border rounded-md border-white flex flex-col gap-2 ${
                user.user_id === m.sender_id
                  ? 'items-end ml-auto'
                  : 'items-start justify-start'
              }`}
              key={m.message_id}
            >
              {/* <p className={`text-gray-900 text-sm`}>{user.user_id}</p> */}
              <p>{m.content}</p>
            </div>
          );
        })}
      </section>

      {/* Chat actions */}
      <section className="mt-auto w-full py-8 px-4 border-t border-t-gray-200">
        {/* <pre>
          <code>{JSON.stringify(message, null, 2)}</code>
        </pre> */}

        {/* <form
          className="w-full flex flex-row gap-2"
          onSubmit={handleSendMessage}
        >
          <input
            className="text-black px-4 py-3 rounded-xl w-full"
            type="text"
            placeholder="Message"
            value={message.text}
            onChange={handleMessageChange}
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-3 rounded-xl ml-auto hover:bg-green-700 transition-colors duration-200"
          >
            Send
          </button>
        </form> */}
      </section>
    </>
  );
};

export default Chat;
