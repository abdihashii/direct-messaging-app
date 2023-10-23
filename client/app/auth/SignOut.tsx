'use client';

import { Button } from '@/components/ui/button';
import { Database } from '@/types/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignOut = () => {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw new Error(error.message);

      alert('You are being signed out.');

      router.refresh();
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <section className="flex flex-row gap-4">
      <Link href="/chats">
        <Button className="bg-blue-500 hover:bg-blue-600">Go to chats</Button>
      </Link>
      <Button
        className="bg-slate-500 hover:bg-slate-600"
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
    </section>
  );
};

export default SignOut;
