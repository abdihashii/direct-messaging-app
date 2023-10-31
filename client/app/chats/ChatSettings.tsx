'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Ban, Check, Loader2, Pencil, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
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
  const [isUserProfilesLoading, setIsUserProfilesLoading] = useState(false);
  const [isAddUsersToChatLoading, setIsAddUsersToChatLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [chatName, setChatName] = useState(chat.chat_name as string);
  const [userNameValues, setUserNameValues] = useState<string[]>([]);
  const [userProfiles, setUserProfiles] = useState<Profile[]>([]);
  const [selectedUserProfiles, setSelectedUserProfiles] = useState<Profile[]>(
    [],
  );

  const { toast } = useToast();
  const supabase = createClientComponentClient<Database>();

  const handleChatNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatName(e.target.value);
  };

  const handleChatNameSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    // check if user_name is already in userValues, unselect if it is
    if (userNameValues.includes(currentValue)) {
      // remove the user_name from user name values state
      setUserNameValues(userNameValues.filter((user) => user !== currentValue));

      // then remove the user profile from selected user profiles state
      setSelectedUserProfiles(
        selectedUserProfiles.filter(
          (profile) => profile.user_name !== currentValue,
        ),
      );
    } else {
      // add the user name to user name values state
      setUserNameValues([...userNameValues, currentValue]);

      // then add the user profile to selected user profiles state
      const updatedSelectedUserProfiles = userProfiles.filter(
        (profile) => profile.user_name === currentValue,
      );
      setSelectedUserProfiles([
        ...selectedUserProfiles,
        ...updatedSelectedUserProfiles,
      ]);
    }
  };

  const handleAddUsersToChat = async () => {
    setIsAddUsersToChatLoading(true);

    try {
      const { error } = await supabase.from('chat_users').insert(
        selectedUserProfiles.map((profile) => ({
          chat_id: chat.chat_id,
          user_id: profile.user_id,
        })),
      );

      if (error) throw error;
    } catch (error) {
      console.error(error);
    } finally {
      setIsAddUsersToChatLoading(false);

      toast({
        description: 'User(s) have been successfully added to your chat! 🎉',
        duration: 1500,
      });
    }
  };

  useEffect(() => {
    getUserProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <form
        className="flex w-full flex-col gap-2"
        onSubmit={handleChatNameSubmit}
      >
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
              value={userNameValues as string[]}
              readOnly={true}
            />
          </PopoverTrigger>

          <PopoverContent className="w-72 p-0">
            <Command>
              <CommandInput placeholder="Search users..." />
              <CommandEmpty>
                {!isUserProfilesLoading && userProfiles.length === 0 ? (
                  <p className="text-gray-500">
                    No users found. Try searching for a different name.
                  </p>
                ) : (
                  <Loader2 className="animate-spin" />
                )}
              </CommandEmpty>
              <CommandGroup>
                {userProfiles.map((profile) => (
                  <CommandItem
                    key={profile.user_id}
                    value={profile.user_name as string}
                    onSelect={(currentValue) => {
                      handleOnUserNameSelect(currentValue);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        userNameValues.includes(profile.user_name as string)
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                    {profile.user_name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <Button
          variant={'outline'}
          className="w-full bg-green-700 text-white"
          disabled={userNameValues.length === 0}
          onClick={handleAddUsersToChat}
        >
          {!isAddUsersToChatLoading ? (
            `Add user${userNameValues.length > 1 ? 's' : ''} to chat`
          ) : (
            <Loader2 className="animate-spin" />
          )}
        </Button>
      </section>

      {/* <section className="w-full overflow-x-scroll overflow-y-scroll">
        <pre>length: {selectedUserProfiles.length}</pre>

        <pre>
          <code>{JSON.stringify(selectedUserProfiles, null, 2)}</code>
        </pre>
      </section> */}
    </>
  );
};

export default ChatSettings;
