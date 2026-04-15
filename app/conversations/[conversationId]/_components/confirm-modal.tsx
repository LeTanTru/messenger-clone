'use client';

import Button from '@/app/components/button';
import Modal from '@/app/components/modal';
import useConversation from '@/app/hooks/use-conversation';
import { DialogTitle } from '@headlessui/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiAlertTriangle } from 'react-icons/fi';

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ConfirmModal({ isOpen, onClose }: ConfirmModalProps) {
  const router = useRouter();

  const { conversationId } = useConversation();
  console.log('🚀 ~ ConfirmModal ~ conversationId:', conversationId);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = () => {
    setIsLoading(true);

    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        router.push('/conversations');
        router.refresh();
        toast.success('Conversation deleted');
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='sm:flex sm:items-start'>
        <div className='mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10'>
          <FiAlertTriangle className='text-rose-500 size-5' />
        </div>
        <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
          <DialogTitle
            as='h3'
            className='text-base font-semibold leading-6 text-gray-900'
          >
            Delete conversation
          </DialogTitle>
          <div className='mt-1'>
            <p className='text-sm text-gray-500'>
              Are you sure you want to delete this conversation ? <br />
              This action cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-2'>
        <Button danger onClick={handleDelete} disabled={isLoading}>
          Delete
        </Button>
        <Button onClick={onClose} disabled={isLoading} secondary>
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
