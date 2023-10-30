'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const schema = yup
  .object()
  .shape({
    chatName: yup.string().required(),
  })
  .required();

const NewChatForm = ({ userId }: { userId: string }) => {
  const supabase = createClientComponentClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreateChatRoom = async (formData: { chatName: string }) => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('chats')
        .insert([
          {
            chat_name: formData.chatName,
            created_by: userId,
          },
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // navigate to the new chat room
      router.push(`/chat/${data.chat_id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data: { chatName: string }) => {
    handleCreateChatRoom(data);
  };

  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <section className="flex flex-col gap-2">
        <Label htmlFor="chat-name">Chat Name</Label>
        <Input
          type="text"
          id="chat-name"
          autoComplete="off"
          {...register('chatName')}
        />
        <p className="text-red-500">{errors.chatName?.message}</p>
      </section>

      <Button className="w-full bg-blue-500" type="submit">
        {isLoading ? <Loader2 className="animate-spin" /> : 'Create chat'}
      </Button>

      <Link href="/chats" className="w-full">
        <Button type="button" variant={'outline'} className="w-full">
          Back to Chats
        </Button>
      </Link>
    </form>
  );
};

export default NewChatForm;
