'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';

const schema = yup
  .object()
  .shape({
    chatName: yup.string().required(),
  })
  .required();

const NewChatForm = () => {
  const supabase = createClientComponentClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCreateChatRoom = async (formData: { chatName: string }) => {
    try {
      const { error } = await supabase.from('chats').insert([
        {
          chat_name: formData.chatName,
        },
      ]);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(error);
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
        <Input type="text" id="chat-name" {...register('chatName')} />
        <p className="text-red-500">{errors.chatName?.message}</p>
      </section>

      <Button className="w-full" type="submit">
        Create Chat
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
