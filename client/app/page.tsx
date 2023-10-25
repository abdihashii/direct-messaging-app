import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col h-screen justify-center items-center gap-8">
      <h1 className="font-semibold text-4xl">Home Page</h1>

      <Link href="/auth/sign-in">
        <Button>Sign In</Button>
      </Link>
    </main>
  );
}
