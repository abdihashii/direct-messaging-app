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
      <section className="flex flex-col items-center gap-4 px-8">
        <p className="text-center text-xl">{error?.message}</p>
      </section>
    );
  }

  return (
    <section className="flex h-full flex-col">
      <Messages
        messages={messages}
        userId={user!.id}
        chatName={chat.chat_name as string}
      />

      <ChatActions chatId={params.chat_id} senderId={user!.id} />
    </section>
  );
}
