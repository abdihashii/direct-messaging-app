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
    <div className="flex h-full flex-col py-10">
      <section className="flex max-h-[70vh] w-full flex-col gap-4 overflow-y-scroll px-8">
        {error && <p className="text-red-500">{error.message}</p>}

        <ul className="flex flex-col gap-4">
          {chats?.map((chat) => <Chat key={chat.chat_id} chat={chat} />)}
        </ul>
      </section>

      <NewChatButton userId={user!.id} />
    </div>
  );
}
