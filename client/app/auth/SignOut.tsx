'use client';

import { Button } from '@/components/ui/button';
import { Database } from '@/types/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Loader2 } from 'lucide-react';
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

  return (
    <Button className="bg-slate-500 hover:bg-slate-600" onClick={handleSignOut}>
      {isLoading ? (
        <Loader2 className="animate-spin inline-block" size={16} />
      ) : (
        'Sign Out'
      )}
    </Button>
  );
};

export default SignOut;
