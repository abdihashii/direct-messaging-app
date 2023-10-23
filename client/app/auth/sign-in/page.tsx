import SignInForm from '../SignInForm';

export default function SignInPage() {
  return (
    <main className="h-screen justify-center gap-8 flex flex-col items-center mx-auto w-10/12">
      <h1 className="text-4xl font-semibold">Welcome Back!</h1>

      <SignInForm />
    </main>
  );
}
