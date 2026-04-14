'use client';

import EmptyState from '@/app/components/empty-state';
import useConversation from '@/app/hooks/use-conversation';
import clsx from 'clsx';

export default function ConversationPage() {
  const { isOpen } = useConversation();
  return (
    <div
      className={clsx('lg:pl-80 h-full lg:block', {
        block: isOpen,
        hidden: !isOpen,
      })}
    >
      <EmptyState />
    </div>
  );
}
