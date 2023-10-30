import {
  createServerSupabaseClient,
  getUser,
} from '@/lib/supabaseServerClient';
import SignOut from '../../auth/SignOut';
import { redirect } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
      <header className="flex h-24 flex-row items-center justify-between gap-2 border-b-2 border-b-gray-500 p-8">
        <Link href="/chats">
          <Button size={'icon'}>
            <ChevronLeft />
          </Button>
        </Link>

        <h1 className="text-center text-lg leading-6 line-clamp-2">
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
