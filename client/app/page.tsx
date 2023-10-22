import Chat from './components/Chat';
import type { Database } from './types/database.types';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  let { data: chats, error } = await supabase
    .from('chats')
    .select()
    .eq('chat_id', '1dfb9e26-4711-4ba3-98ca-da893894745d');

  if (error) console.error(error);

  if (!chats)
    return (
      <>
        <p>Please create a chat to get started!</p>
      </>
    );

  const [chat] = chats;
  const { chat_id, chat_name } = chat;

  const { data: messages, error: messageError } = await supabase
    .from('messages')
    .select()
    .eq('chat_id', chat_id);

  if (messageError) console.error(messageError);

  if (!messages)
    return (
      <>
        <p>
          There are no messages in this chat yet. Send a message to get started!
        </p>
      </>
    );

  const { data: chat_users, error: chatUsersError } = await supabase
    .from('chat_users')
    .select()
    .eq('chat_id', chat_id);

  console.log(chat_users);

  if (chatUsersError) console.error(chatUsersError);

  return (
    <>
      {/* Chat */}

      {/* <pre>{JSON.stringify(messages, null, 2)}</pre>

      {chat_users?.map((chat_user) => {
        return <p>{chat_user.user_id}</p>;
      })} */}
      <Chat messagesData={messages} />
    </>
  );
}
