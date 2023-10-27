import { Button } from '@/components/ui/button';
import { createServerSupabaseClient } from '@/lib/supabaseServerClient';
import Link from 'next/link';

export default async function ChatsPage() {
  const supabase = createServerSupabaseClient();

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
              className="w-full border border-black rounded-md p-4"
            >
              <Link href={`/chats/${chat.chat_id}`} className="block">
                {chat.chat_name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-auto flex flex-col w-full gap-4 px-8">
        <Link href="/chats/new">
          <Button className="w-full bg-blue-500 hover:bg-blue-600">
            New Chat
          </Button>
        </Link>
      </section>
    </div>
  );
}
