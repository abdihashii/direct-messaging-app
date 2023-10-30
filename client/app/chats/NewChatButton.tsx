'use client';

import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import NewChatForm from './NewChatForm';

const NewChatButton = ({ userId }: { userId: string }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <section className="mt-auto flex flex-col w-full gap-4 px-8">
      <Button
        className="w-full bg-blue-500 hover:bg-blue-600"
        onClick={handleShowModal}
      >
        New Chat
      </Button>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showModal && (
          <Modal title="Create a chat" handleClose={handleClose}>
            <NewChatForm userId={userId} />
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
};

export default NewChatButton;
