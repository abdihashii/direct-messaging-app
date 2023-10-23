import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getUserName(userId: string | undefined | null) {
  if (!userId) return '';

  const supabase = createClientComponentClient();

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('user_name')
      .eq('user_id', userId)
      .single();

    if (error) throw error;

    return data.user_name;
  } catch (error) {
    return '';
  }
}
