'use client';

import Avatar from '@/app/components/avatar';
import ProfileDrawer from './profile-drawer';
import useOtherUser from '@/app/hooks/use-other-user';
import { Conversation, User } from '@/generated/prisma/client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { HiChevronLeft } from 'react-icons/hi';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import AvatarGroup from '@/app/components/avatar-group';

type HeaderProps = {
  conversation: Conversation & {
    users: User[];
  };
};

export default function Header({ conversation }: HeaderProps) {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return 'Active';
  }, [conversation.isGroup, conversation.users.length]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div className='bg-white w-full flex border-b sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm border-b-gray-200'>
        <div className='flex gap-3 items-center'>
          <Link
            className='lg:hidden block text-sky-500 hover:text-sky-600 transition-all ease-linear duration-200 cursor-pointer'
            href='/conversations'
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className='flex flex-col'>
            <div>{conversation.name || otherUser.name}</div>
            <div className='text-sm  text-gray-500'>{statusText}</div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          onClick={() => setDrawerOpen(true)}
          className='text-sky-500 cursor-pointer hover:text-sky-600 transition-all ease-linear duration-200'
        />
      </div>
    </>
  );
}
