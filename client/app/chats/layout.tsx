import { getUser } from '@/lib/supabaseServerClient';
import SignOut from '../auth/SignOut';
import { redirect } from 'next/navigation';
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
      <header className="flex h-24 flex-row items-center justify-between gap-8 border-b-2 border-b-gray-500 bg-black px-6 py-8 text-white">
        <h1 className="w-1/4 text-2xl">Chats</h1>

        <p className="line-clamp-1 w-fit rounded-md border-2 border-gray-500 px-2 py-1">
          {userName}
        </p>

        {user && <SignOut />}
      </header>

      <main className="flex flex-auto flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
}
