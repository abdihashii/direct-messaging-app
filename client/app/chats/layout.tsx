import { getUser } from '@/lib/supabaseServerClient';
import { getUserName } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SignOut from '../auth/SignOut';
import { redirect } from 'next/navigation';

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

  const userName = await getUserName(user?.id);

  return (
    <main className="flex flex-col h-[100vh] w-full gap-6">
      <section className="items-center w-full flex flex-row gap-2 py-8 px-8 border-b-2 border-b-gray-500">
        <div className="flex flex-row items-center gap-2">
          <Avatar>
            <AvatarFallback>TU</AvatarFallback>
          </Avatar>
          <p className="text-sm">{userName}</p>
        </div>

        <p className="ml-auto">Settings</p>

        {user && <SignOut />}
      </section>

      {children}
    </main>
  );
}
