import { getUser } from '@/lib/supabaseServerClient';
import SignOut from '../../auth/SignOut';
import { redirect } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getChatName } from '@/lib/utils';

export default async function ChatLayout({
  params,
  children,
}: {
  params: {
    chat_id: string;
  };
  children: React.ReactNode;
}) {
  const user = await getUser();

  // If there is no user, redirect to the sign in page
  if (!user) {
    redirect('/auth/sign-in');
  }

  // Gets the chat name
  const chatName = await getChatName(params.chat_id);

  console.log(chatName);

  return (
    <div
      className="grid h-screen max-h-screen w-screen"
      style={{
        gridTemplateRows: 'auto 1fr',
      }}
    >
      <header className="h-24 flex flex-row justify-between items-center gap-2 border-b-2 border-b-gray-500 p-8">
        <Link href="/chats">
          <Button size={'icon'}>
            <ChevronLeft />
          </Button>
        </Link>

        <h1 className="text-xl text-center">{'group chat name goes here'}</h1>

        {/* <p className="ml-auto">Settings</p> */}

        {user && <SignOut />}
      </header>

      <main className="flex flex-auto flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
}
