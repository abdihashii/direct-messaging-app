'use client';

import Modal from '@/components/Modal';
import { AnimatePresence } from 'framer-motion';
import { Settings } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import ChatSettings from './ChatSettings';
import { useRouter } from 'next/navigation';

const Chat = ({
  chat,
}: {
  chat: {
    chat_id: string;
    chat_name: string | null;
    created_at: string;
    last_message_at: string | null;
  };
}) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    router.refresh();
  };

  return (
    <li className="flex flex-row justify-between w-full border border-black rounded-md p-4">
      <Link href={`/chat/${chat.chat_id}`} className="line-clamp-1 w-10/12">
        {chat.chat_name}
      </Link>

      <Settings onClick={handleShowModal} />

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showModal && (
          <Modal title="Chat Settings" handleClose={handleClose}>
            <ChatSettings chat={chat} />
          </Modal>
        )}
      </AnimatePresence>
    </li>
  );
};

export default Chat;
