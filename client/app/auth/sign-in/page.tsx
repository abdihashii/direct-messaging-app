import SignInForm from '../SignInForm';
import { getUser } from '@/lib/supabaseServerClient';
import SignOut from '../SignOut';

export default async function SignInPage() {
  const user = await getUser();

  if (user) {
    return (
      <main className="h-screen justify-center gap-8 flex flex-col items-center mx-auto w-10/12">
        <h1 className="text-4xl font-semibold">Welcome Back!</h1>

        <p>You are already signed in.</p>

        <SignOut />
      </main>
    );
  }

  return (
    <main className="h-screen justify-center gap-8 flex flex-col items-center mx-auto w-10/12">
      <h1 className="text-4xl font-semibold">Welcome Back!</h1>

      <SignInForm />
    </main>
  );
}
