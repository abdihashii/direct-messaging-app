import { getUser } from '@/lib/supabaseServerClient';
import SignOut from '../auth/SignOut';
import { redirect } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getUserName } from '@/lib/utils';

export default async function ChatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  // If there is no user, redirect to the sign in page
  if (!user) {
    redirect('/auth/sign-in');
  }

  const userName = getUserName(user.id);

  return (
    <div
      className="grid h-screen max-h-screen w-screen"
      style={{
        gridTemplateRows: 'auto 1fr',
      }}
    >
      <header className="h-24 flex flex-row justify-between items-center gap-2 border-b-2 border-b-gray-500 p-8">
        <h1 className="text-2xl">Chats</h1>

        {/* <p className="ml-auto">Settings</p> */}

        <p>{userName}</p>

        {user && <SignOut />}
      </header>

      <main className="flex flex-auto flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
}
