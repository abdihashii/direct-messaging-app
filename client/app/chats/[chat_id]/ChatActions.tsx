'use client';

import { Input } from '@/components/ui/input';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';
import { Loader2, SendHorizonal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Message } from '@/types';

const ChatActions = ({
  chatId,
  senderId,
}: // setMessagesState,
{
  chatId: string;
  senderId: string;
  // setMessagesState: React.Dispatch<React.SetStateAction<Partial<Message>[]>>;
}) => {
  const supabase = createClientComponentClient();
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    // setMessagesState((prev) => [
    //   ...prev,
    //   {
    //     chat_id: chatId,
    //     sender_id: senderId,
    //     content,
    //   },
    // ]);

    try {
      const { data: messages, error } = await supabase
        .from('messages')
        .insert([
          {
            chat_id: chatId,
            sender_id: senderId,
            content,
          },
        ])
        .select();

      if (error) throw new Error(error.message);

      // alert(JSON.stringify(messages, null, 2));
    } catch (error: any) {
      alert(error.message);
    } finally {
      setContent('');
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-auto w-full border-t-2 border-t-gray-500 px-5 py-6">
      <form
        className="flex h-fit w-full flex-row gap-2"
        onSubmit={handleSubmit}
      >
        <Input
          className="px-4 py-3 text-black"
          type="text"
          placeholder="Message"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          autoComplete="off"
        />
        <Button
          type="submit"
          className="ml-auto w-fit rounded bg-green-600 px-4 text-white transition-colors duration-200 hover:bg-green-700"
          disabled={isLoading || content === ''}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <SendHorizonal size={20} />
          )}
        </Button>
      </form>
    </div>
  );
};

export default ChatActions;
