import {
  createServerSupabaseClient,
  getUser,
} from '@/lib/supabaseServerClient';
import ChatActions from './ChatActions';
import { getUserName } from '@/lib/utils';

export default async function ChatPage({
  params,
}: {
  params: {
    chat_id: string;
  };
}) {
  const supabase = createServerSupabaseClient();
  const user = await getUser();

  const { data: messages, error: messagesError } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_id', params.chat_id);

  const { data: chat, error: chatError } = await supabase
    .from('chats')
    .select('chat_name')
    .eq('chat_id', params.chat_id)
    .single();

  if (messagesError || chatError) {
    const error = messagesError || chatError;

    return (
      <section className="flex flex-col gap-4 px-8 items-center">
        <p className="text-xl text-center">{error?.message}</p>
      </section>
    );
  }

  return (
    <section className="flex flex-col flex-grow">
      <div className="flex flex-col gap-8 px-5 items-center">
        <h1 className="text-2xl font-semibold">{chat.chat_name}</h1>

        <ul className="w-full flex flex-col gap-4">
          {messages?.map((m) => {
            const userName = getUserName(m.sender_id);

            return (
              <div
                className={`w-fit p-2 border rounded-md border-gray-500 flex flex-col gap-2 ${
                  user?.id === m.sender_id
                    ? 'items-end ml-auto'
                    : 'items-start justify-start'
                }`}
                key={m.message_id}
              >
                <p className="text-gray-600 text-sm">{userName}</p>
                <p>{m.content}</p>
              </div>
            );
          })}
        </ul>
      </div>

      <ChatActions />
    </section>
  );
}
