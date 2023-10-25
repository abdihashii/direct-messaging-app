import { Button } from '@/components/ui/button';
import {
  createServerSupabaseClient,
  getUser,
} from '@/lib/supabaseServerClient';
import Link from 'next/link';
import ChatActions from './ChatActions';

export default async function ChatPage({
  params,
}: {
  params: {
    chat_id: string;
  };
}) {
  const supabase = createServerSupabaseClient();
  const user = await getUser();

  if (!user) {
    return (
      <section className="flex flex-col gap-4 px-8 items-center">
        <p className="text-xl text-center">
          You must be signed in to view this page.
        </p>

        <Link href="/auth/sign-in">
          <Button className="bg-blue-500 hover:bg-blue-600">Sign In</Button>
        </Link>
      </section>
    );
  }

  const { data: messages, error } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_id', params.chat_id);

  if (error) {
    return (
      <section className="flex flex-col gap-4 px-8 items-center">
        <p className="text-xl text-center">{error.message}</p>
      </section>
    );
  }

  return (
    <section className="flex flex-col flex-grow">
      <div className="flex flex-col gap-8 px-8 items-center">
        <h1 className="text-4xl font-semibold">Chat Page</h1>

        <ul className="w-full flex flex-col gap-4">
          {messages?.map((m) => {
            return (
              <div
                className={`w-fit p-2 border rounded-md border-gray-500 flex flex-col gap-2 ${
                  user.id === m.sender_id
                    ? 'items-end ml-auto'
                    : 'items-start justify-start'
                }`}
                key={m.message_id}
              >
                {/* <p className={`text-gray-900 text-sm`}>{user.user_id}</p> */}
                <p>{m.content}</p>
              </div>
            );
          })}
        </ul>
      </div>

      <ChatActions />
    </section>
  );
}
