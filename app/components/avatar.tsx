'use client';

import { User } from '@/generated/prisma/client';
import Image from 'next/image';

type AvatarProps = {
  user: User | null;
};

export default function Avatar({ user }: AvatarProps) {
  return (
    <div className='relative'>
      <div className='relative inline-block rounded-full overflow-hidden size-9 md:size-11'>
        <Image
          src={user?.image || '/images/placeholder.jpg'}
          alt='Avatar'
          fill
        />
      </div>
      <span className='absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 size-2 md:size-3' />
    </div>
  );
}
