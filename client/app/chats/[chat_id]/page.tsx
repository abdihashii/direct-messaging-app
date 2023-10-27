import {
  createServerSupabaseClient,
  getUser,
} from '@/lib/supabaseServerClient';
import Messages from './Messages';
import ChatActions from './ChatActions';

export default async function ChatPage({
  params,
}: {
  params: {
    chat_id: string;
  };
}) {
  const supabase = createServerSupabaseClient();
  const user = await getUser();

  const { data: chat, error: chatError } = await supabase
    .from('chats')
    .select('chat_name')
    .eq('chat_id', params.chat_id)
    .single();

  const { data: messages, error: messagesError } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_id', params.chat_id)
    .order('timestamp', { ascending: true });

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
        userId={user!.id} // at this point, user should be defined
        chatName={chat.chat_name!} // at this point, chat name should be defined
      />

      <ChatActions chatId={params.chat_id} senderId={user!.id} />
    </section>
  );
}
