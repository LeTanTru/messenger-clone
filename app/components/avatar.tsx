'use client';

import useActiveList from '@/app/hooks/use-active-list';
import { User } from '@/generated/prisma/client';
import Image from 'next/image';

type AvatarProps = {
  user: User | null;
};

export default function Avatar({ user }: AvatarProps) {
  const { members } = useActiveList();
  const isActive = user?.email && members.indexOf(user?.email) !== -1;

  return (
    <div className='relative flex items-center justify-center'>
      <div className='relative inline-block rounded-full overflow-hidden size-9 md:size-11 flex items-center justify-center'>
        <Image
          src={user?.image || '/images/placeholder.jpg'}
          alt='Avatar'
          fill
        />
      </div>
      {isActive && (
        <span className='absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 size-2 md:size-3' />
      )}
    </div>
  );
}
