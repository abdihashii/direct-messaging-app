'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  Ban,
  // Check,
  Loader2,
  Pencil,
  Save,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
// import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { Database } from '@/types/database.types';
import type { Profile } from '@/types';

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
  const [open, setOpen] = useState(false);
  const [userValues, setUserValues] = useState<string[]>([]);
  const [userProfiles, setUserProfiles] = useState<Profile[]>([]);
  const [isUserProfilesLoading, setIsUserProfilesLoading] = useState(false);
  const { toast } = useToast();
  const supabase = createClientComponentClient<Database>();

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

  const getUserProfiles = async () => {
    setIsUserProfilesLoading(true);

    try {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*');

      if (error) throw error;

      setUserProfiles(profiles);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUserProfilesLoading(false);
    }
  };

  const handleOnUserNameSelect = (currentValue: string) => {
    // check if user_name is already in userValues
    if (userValues.includes(currentValue)) {
      toast({
        description: 'User already added.',
        duration: 1500,
      });
    } else {
      setUserValues([...userValues, currentValue]);
    }

    setOpen(false);
  };

  useEffect(() => {
    getUserProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      <section className="flex w-full flex-col gap-2">
        <Label>Add People</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Input
              type="text"
              placeholder="Find and add people to your chat..."
              value={userValues as string[]}
              readOnly={true}
            />
          </PopoverTrigger>

          <PopoverContent className="w-72 p-0">
            <Command>
              <CommandInput placeholder="Search users..." />
              <CommandEmpty>User not found.</CommandEmpty>
              <CommandGroup>
                {userProfiles.map((profile) => (
                  <CommandItem
                    key={profile.user_id}
                    value={profile.user_name as string}
                    onSelect={(currentValue) => {
                      handleOnUserNameSelect(currentValue);
                    }}
                  >
                    {/* <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        userValue === profile.user_name
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    /> */}
                    {profile.user_name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </section>

      <section className="w-full overflow-x-scroll overflow-y-scroll">
        <pre>{JSON.stringify(userValues, null, 2)}</pre>
      </section>
    </>
  );
};

export default ChatSettings;
