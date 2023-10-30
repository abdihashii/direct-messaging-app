import {
  createServerSupabaseClient,
  getUser,
} from '@/lib/supabaseServerClient';
import NewChatButton from './NewChatButton';
import Chat from './Chat';

export default async function ChatsPage() {
  const supabase = createServerSupabaseClient();
  const user = await getUser();

  const { data: chats, error } = await supabase
    .from('chats')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="py-10 flex flex-col h-full">
      <section className="px-8 w-full flex flex-col gap-4 overflow-y-scroll max-h-[70vh]">
        {error && <p className="text-red-500">{error.message}</p>}

        <ul className="flex flex-col gap-4">
          {chats?.map((chat) => <Chat key={chat.chat_id} chat={chat} />)}
        </ul>
      </section>

      <NewChatButton userId={user!.id} />
    </div>
  );
}
