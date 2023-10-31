'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Ban, Loader2, Pencil, Save } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const ChatSettings = ({
  chat,
}: {
  chat: {
    chat_id: string;
    chat_name: string | null;
    created_at: string;
    last_message_at: string | null;
  };
}) => {
  const [editChatName, setEditChatName] = useState(false);
  const [isChatNameLoading, setIsChatNameLoading] = useState(false);
  const [chatName, setChatName] = useState(chat.chat_name as string);
  const { toast } = useToast();
  const supabase = createClientComponentClient();

  const handleChatNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsChatNameLoading(true);

    try {
      const { error } = await supabase
        .from('chats')
        .update({ chat_name: chatName })
        .match({ chat_id: chat.chat_id });

      if (error) throw error;
    } catch (error) {
      console.error(error);
    } finally {
      setIsChatNameLoading(false);
      setEditChatName(false);

      toast({
        description: 'Your chat name has been successfully updated! 🎉',
        duration: 1500,
      });
    }
  };

  return (
    <>
      <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit}>
        <Label htmlFor="chat-name">Chat Name</Label>
        <section className="flex flex-row items-center gap-2">
          <Input
            id="chat-name"
            disabled={!editChatName}
            value={chatName}
            onChange={handleChatNameChange}
            autoComplete="off"
          />
          {!editChatName && (
            <Pencil
              type="button"
              onClick={() => setEditChatName(!editChatName)}
            />
          )}
        </section>

        {editChatName && (
          <section className="flex flex-row gap-4">
            <Button
              variant={'outline'}
              className="w-1/2 bg-green-700 text-white"
              type="submit"
              disabled={isChatNameLoading}
            >
              {isChatNameLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Save type="submit" />
              )}
            </Button>
            <Button
              variant={'outline'}
              className="w-1/2 bg-orange-700 text-white"
            >
              <Ban
                type="button"
                onClick={() => setEditChatName(!editChatName)}
              />
            </Button>
          </section>
        )}
      </form>
    </>
  );
};

export default ChatSettings;
