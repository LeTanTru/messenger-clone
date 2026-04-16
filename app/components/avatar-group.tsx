'use client';

import { User } from '@/generated/prisma/client';
import clsx from 'clsx';
import Image from 'next/image';

type AvatarGroupProps = {
  users: User[];
};

export default function AvatarGroup({ users = [] }: AvatarGroupProps) {
  const slicedUsers = users.slice(0, 3);

  const positionMap = {
    0: 'top-0 left-1/2 -translate-x-1/2',
    1: 'bottom-0',
    2: 'bottom-0 right-0',
  };

  return (
    <div className='relative size-11'>
      {slicedUsers.map((user, index) => (
        <div
          key={user.id}
          className={clsx(
            'absolute inline-block rounded-full overflow-hidden size-5.25',
            positionMap[index as keyof typeof positionMap],
          )}
        >
          <Image
            fill
            src={user.image || '/images/placeholder.jpg'}
            alt='Avatar'
          />
        </div>
      ))}
    </div>
  );
}
