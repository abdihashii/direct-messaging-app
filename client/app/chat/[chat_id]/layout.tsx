import {
  createServerSupabaseClient,
  getUser,
} from '@/lib/supabaseServerClient';
import SignOut from '../../auth/SignOut';
import { redirect } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

import Link from 'next/link';

export default async function ChatLayout({
  params,
  children,
}: {
  params: {
    chat_id: string;
  };
  children: React.ReactNode;
}) {
  const supabase = createServerSupabaseClient();
  const user = await getUser();

  // If there is no user, redirect to the sign in page
  if (!user) {
    redirect('/auth/sign-in');
  }

  const getChatName = async (chat_id: string) => {
    if (!chat_id) return '';
    try {
      const { data, error } = await supabase
        .from('chats')
        .select('chat_name')
        .eq('chat_id', chat_id)
        .single();

      if (error) throw error;
      return data.chat_name || '';
    } catch (error) {
      return '';
    }
  };

  // Gets the chat name
  const chatName = await getChatName(params.chat_id);

  return (
    <div
      className="grid h-screen max-h-screen w-screen"
      style={{
        gridTemplateRows: 'auto 1fr',
      }}
    >
      <header className="flex h-24 flex-row items-center justify-between gap-8 border-b-2 border-b-gray-500 bg-black px-6 py-8 text-white">
        <Link href="/chats" className="w-1/4">
          <ChevronLeft />
        </Link>

        <h1 className="line-clamp-2 w-fit rounded-md border-2 border-gray-500 px-2 py-1 text-center text-lg leading-6">
          {chatName}
        </h1>

        {user && <SignOut />}
      </header>

      <main className="flex flex-auto flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
}
