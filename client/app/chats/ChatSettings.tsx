'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Ban, Loader2, Pencil, Save } from 'lucide-react';
import { useState } from 'react';

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
    }
  };

  return (
    <>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <section className="flex flex-col gap-2">
          <Label htmlFor="chat-name">Chat Name</Label>
          <Input
            id="chat-name"
            disabled={!editChatName}
            value={chatName}
            onChange={handleChatNameChange}
          />
        </section>

        <section>
          {!editChatName ? (
            <Pencil
              type="button"
              onClick={() => setEditChatName(!editChatName)}
            />
          ) : isChatNameLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <Button variant={'outline'} className="">
                <Save type="submit" className="" />
              </Button>
              <Button variant={'outline'} className="">
                <Ban
                  type="button"
                  onClick={() => setEditChatName(!editChatName)}
                />
              </Button>
            </>
          )}
        </section>
      </form>
    </>
  );
};

export default ChatSettings;
