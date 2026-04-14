'use client';

import ConversationBox from '@/app/conversations/_components/conversation-box';
import useConversation from '@/app/hooks/use-conversation';
import { FullConversationType } from '@/types';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdOutlineGroupAdd } from 'react-icons/md';

type ConversationListProps = {
  initialItems: FullConversationType[];
};

export default function ConversationList({
  initialItems,
}: ConversationListProps) {
  const [items, setItems] = useState(initialItems);
  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  return (
    <aside
      className={clsx(
        'fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200',
        {
          'hidden': isOpen,
          'block w-full left-0': !isOpen,
        },
      )}
    >
      <div className='px-5'>
        <div className='flex justify-between mb-4 pt-4'>
          <div className='text-xl font-bold text-neutral-800'>Messages</div>
          <div className='rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition-all ease-linear duration-200'>
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        {items.map((item) => (
          <ConversationBox
            key={item.id}
            data={item}
            selected={conversationId === item.id}
          />
        ))}
      </div>
    </aside>
  );
}
