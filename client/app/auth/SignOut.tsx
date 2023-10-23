'use client';

import { Button } from '@/components/ui/button';
import { Database } from '@/types/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';

const SignOut = () => {
  const supabase = createClientComponentClient<Database>();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw new Error(error.message);

      alert('You are being signed out.');

      redirect('/auth/sign-in');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Button className="bg-slate-500 hover:bg-slate-600" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};

export default SignOut;
