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

    return data.user_name || '';
  } catch (error) {
    return '';
  }
}

export const conver24hourTo12hour = (hour: number) => {
  if (hour === 0) return 12;
  if (hour > 12) return hour - 12;
  return hour;
};

export const convertTimeStampToTime = (timestamp: string) => {
  const date = new Date(timestamp);

  const hours = ('0' + conver24hourTo12hour(date.getHours())).slice(-2);
  const minutes = ('0' + conver24hourTo12hour(date.getMinutes())).slice(-2);

  const isPm = date.getHours() >= 12;

  return `${hours}:${minutes} ${isPm ? 'PM' : 'AM'}`;
};
