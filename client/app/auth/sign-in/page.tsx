import SignInForm from '../SignInForm';
import { getSession } from '@/lib/supabaseServerClient';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  const session = await getSession();

  if (session) {
    redirect('/chats');
  }

  return (
    <main className="h-screen justify-center gap-8 flex flex-col items-center mx-auto w-10/12">
      <h1 className="text-4xl font-semibold">Welcome Back!</h1>

      <SignInForm />
    </main>
  );
}
