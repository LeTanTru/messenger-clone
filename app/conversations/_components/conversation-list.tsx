'use client';

import { User } from '@/generated/prisma/client';
import ConversationBox from './conversation-box';
import GroupChatModal from './group-chat-modal';
import useConversation from '@/app/hooks/use-conversation';
import { FullConversationType, FullMessageType } from '@/types';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdOutlineGroupAdd } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import { getPusherClient } from '@/lib/pusher-client';

type ConversationListProps = {
  initialItems: FullConversationType[];
  users: User[];
};

export default function ConversationList({
  initialItems,
  users,
}: ConversationListProps) {
  const session = useSession();

  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  const pusherKey = session?.data?.user?.email;

  const normalizeConversation = (
    conversation: FullConversationType,
  ): FullConversationType => ({
    ...conversation,
    users: conversation.users ?? [],
    messages: conversation.messages ?? [],
  });

  useEffect(() => {
    if (!pusherKey) return;

    const pusherClient = getPusherClient();
    if (!pusherClient) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation: FullConversationType) => {
      const normalizedConversation = normalizeConversation(conversation);

      setItems((prevConversation) => {
        const existingConversation = prevConversation.find(
          (currentConversation) =>
            currentConversation.id === normalizedConversation.id,
        );

        if (!existingConversation) {
          return [normalizedConversation, ...prevConversation];
        }

        const mergedConversation = {
          ...existingConversation,
          messages:
            normalizedConversation.messages.length > 0
              ? normalizedConversation.messages
              : existingConversation.messages ?? [],
        };

        return [
          mergedConversation,
          ...prevConversation.filter(
            (currentConversation) =>
              currentConversation.id !== normalizedConversation.id,
          ),
        ];
      });
    };

    const updateHandler = (payload: FullConversationType | FullMessageType) => {
      setItems((prevConversation) => {
        if ('messages' in payload) {
          const updatedConversation = normalizeConversation(payload);

          return prevConversation.map((currentConversation) => {
            if (currentConversation.id === updatedConversation.id) {
              return {
                ...currentConversation,
                messages: updatedConversation.messages,
              };
            }
            return currentConversation;
          });
        }

        const updatedMessage = payload;

        return prevConversation.map((currentConversation) => {
          if (currentConversation.id !== updatedMessage.conversationId) {
            return currentConversation;
          }

          const messages = currentConversation.messages ?? [];
          const messageIndex = messages.findIndex(
            (message) => message.id === updatedMessage.id,
          );

          if (messageIndex === -1) {
            return {
              ...currentConversation,
              messages: [...messages, updatedMessage],
            };
          }

          const nextMessages = [...messages];
          nextMessages[messageIndex] = updatedMessage;

          return {
            ...currentConversation,
            messages: nextMessages,
          };
        });
      });
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((prevConversation) =>
        prevConversation.filter((c) => c.id !== conversation.id),
      );

      if (conversationId === conversation.id) {
        router.push('/conversations');
      }
    };

    pusherClient.bind('conversation:new', newHandler);
    pusherClient.bind('conversation:update', updateHandler);
    pusherClient.bind('conversation:remove', removeHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind('conversation:new', newHandler);
      pusherClient.unbind('conversation:update', updateHandler);
      pusherClient.unbind('conversation:remove', removeHandler);
    };
  }, [conversationId, pusherKey, router]);

  return (
    <>
      <GroupChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        users={users}
      />
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

            <div
              className='rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition-all ease-linear duration-200'
              onClick={() => setIsModalOpen(true)}
            >
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
    </>
  );
}
