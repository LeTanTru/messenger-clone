'use client';

import Avatar from '@/app/components/avatar';
import useOtherUser from '@/app/hooks/use-other-user';
import { FullConversationType } from '@/types';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type ConversationBoxProps = {
  data: FullConversationType;
  selected: boolean;
};

export default function ConversationBox({
  data,
  selected,
}: ConversationBoxProps) {
  const otherUser = useOtherUser(data);

  const session = useSession();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/conversations/${data.id}`);
  };

  const lastMessage = data.messages[data.messages.length - 1];

  const userEmail = session.data?.user?.email;

  const hasSeen = !!lastMessage?.seen?.some((seen) => seen.email === userEmail);

  const lastMessageText = lastMessage?.image
    ? 'Sent an image'
    : lastMessage?.body
      ? lastMessage.body
      : 'Started a conversation';

  return (
    <div
      className={clsx(
        'w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition-all cursor-pointer p-3',
        {
          'bg-neutral-100': selected,
          'bg-white': !selected,
        },
      )}
      onClick={handleClick}
    >
      <Avatar user={otherUser} />
      <div className='min-w-0 flex-1'>
        <div className='focus:outline-none'>
          <div className='flex justify-between items-start'>
            <p className='text-base font-medium text-gray-900'>
              {data.name || otherUser?.name}
            </p>
            {lastMessage?.createdAt && (
              <p
                className={clsx('text-xs text-gray-400 font-light', {
                  'text-gray-900 font-medium': !hasSeen,
                })}
              >
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>
          <p
            className={clsx('text-sm truncate', {
              'text-gray-500': hasSeen,
              'text-black font-medium': !hasSeen,
            })}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
}
