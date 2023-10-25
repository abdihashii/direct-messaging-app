'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input } from '@/components/ui/input';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';
import { Loader2, SendHorizonal } from 'lucide-react';

const schema = yup
  .object()
  .shape({
    content: yup.string().required(),
  })
  .required();

const ChatActions = ({
  chatId,
  senderId,
}: {
  chatId: string;
  senderId: string;
}) => {
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const supabase = createClientComponentClient();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: { content: string }) => {
    setIsLoading(true);

    if (!data.content) {
      setIsLoading(false);
      alert('Please enter a message');
      return;
    }

    try {
      const { data: messages, error } = await supabase
        .from('messages')
        .insert([
          {
            chat_id: chatId,
            sender_id: senderId,
            content: data.content,
          },
        ])
        .select();

      if (error) throw new Error(error.message);

      alert(JSON.stringify(messages, null, 2));
    } catch (error: any) {
      alert(error.message);
    } finally {
      reset();
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-auto w-full py-6 px-5 border-t-2 border-t-gray-500">
      <form
        className="w-full flex flex-row gap-2 h-fit"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          className="text-black px-4 py-3"
          type="text"
          placeholder="Message"
          autoComplete="off"
          {...register('content')}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 rounded ml-auto hover:bg-green-700 transition-colors duration-200 w-fit"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <SendHorizonal size={20} />
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatActions;
