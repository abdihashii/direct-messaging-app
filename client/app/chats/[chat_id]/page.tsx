import {
  createServerSupabaseClient,
  getUser,
} from '@/lib/supabaseServerClient';
import ChatActions from './ChatActions';
import Messages from './Messages';

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
    <section className="flex flex-col h-full">
      <div className="flex flex-col gap-8 p-5 items-center overflow-y-scroll">
        <h1 className="text-2xl font-semibold">{chat.chat_name}</h1>

        <ul className="w-full flex flex-col gap-4">
          <Messages messages={messages} userId={user!.id} />
        </ul>
      </div>

      <ChatActions chatId={params.chat_id} senderId={user!.id} />
    </section>
  );
}
