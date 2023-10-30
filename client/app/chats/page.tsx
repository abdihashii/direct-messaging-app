import {
  createServerSupabaseClient,
  getUser,
} from '@/lib/supabaseServerClient';
import { Settings } from 'lucide-react';
import Link from 'next/link';
import NewChatButton from './NewChatButton';

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
          {chats?.map((chat) => (
            <li
              key={chat.chat_id}
              className="flex flex-row justify-between w-full border border-black rounded-md p-4"
            >
              <Link
                href={`/chat/${chat.chat_id}`}
                className="line-clamp-1 w-10/12"
              >
                {chat.chat_name}
              </Link>
              <Settings />
            </li>
          ))}
        </ul>
      </section>

      <NewChatButton userId={user!.id} />
    </div>
  );
}
