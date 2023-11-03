'use client';

import { Button } from '@/components/ui/button';
import { Database } from '@/types/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Loader2, LogOut } from 'lucide-react';
import { useState } from 'react';

const SignOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClientComponentClient<Database>();

  const handleSignOut = async () => {
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw new Error(error.message);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Loader2 className="inline-block w-1/4 animate-spin" />
  ) : (
    <LogOut className="w-1/4" onClick={handleSignOut} />
  );
};

export default SignOut;
