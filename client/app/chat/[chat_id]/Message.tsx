'use client';

import { Message as MessageType } from '@/types';
import { Loader2, MoreVertical, Trash2 } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { convertTimeStampToTime } from '@/lib/utils';
import Modal from '@/components/Modal';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/database.types';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';

const Message = ({
  message,
  userId,
  userColor,
}: {
  message: MessageType;
  userId: string;
  userColor: string;
}) => {
  const iAmTheSender = userId === message.sender_id;
  const bgColor = `bg-${userColor}-500`;
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleDeleteMessage = async () => {
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('message_id', message.message_id);

      if (error) {
        throw error;
      }

      toast({
        title: 'Message deleted',
        description: 'Your message has been deleted',
      });

      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <li
      className={`flex max-w-[60%] flex-col gap-2 rounded-md border border-gray-500 p-2 ${
        iAmTheSender ? 'ml-auto items-end' : 'items-start'
      }`}
      key={message.message_id}
    >
      <div className="flex flex-row items-center w-full">
        <p
          className={`${bgColor} rounded-md px-2 py-1 text-sm text-white w-fit`}
        >
          {message.sender_user_name}
        </p>
        {iAmTheSender && (
          <Popover>
            <PopoverTrigger asChild>
              <MoreVertical className="ml-auto" />
            </PopoverTrigger>
            <PopoverContent className="w-fit">
              <ul className="flex flex-col gap-4">
                <li
                  className="flex flex-row gap-2"
                  onClick={() => setOpen(true)}
                >
                  Delete <Trash2 />
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        )}
      </div>
      <p>{message.content}</p>
      <p className="text-xs text-gray-500">
        {convertTimeStampToTime(message.timestamp)}
      </p>

      {open && (
        <Modal
          title="Are you sure you want to delete this message?"
          handleClose={() => setOpen(false)}
        >
          <div className="flex flex-col gap-4">
            <p>
              This action cannot be undone. This will permanetly deleter your
              message and remove it from our servers.
            </p>

            <div className="flex flex-row gap-2 justify-end w-full">
              <Button
                variant={'outline'}
                onClick={() => setOpen(false)}
                className="w-1/4"
              >
                Cancel
              </Button>
              <Button
                variant={'destructive'}
                onClick={handleDeleteMessage}
                className="w-1/4"
              >
                {!isLoading ? 'Delete' : <Loader2 className="animate-spin" />}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </li>
  );
};

export default Message;
