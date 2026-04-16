'use client';

import Avatar from '@/app/components/avatar';
import ImageModal from './image-modal';
import { FullMessageType } from '@/types';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

type MessageBoxProps = {
  data: FullMessageType;
  isLast: boolean;
};

export default function MessageBox({ data, isLast }: MessageBoxProps) {
  const session = useSession();

  const [imageModalOpen, setImageModalOpen] = useState(false);

  const isOwn = data.sender.email === session.data?.user?.email;

  const seenList = (data.seen || [])
    .filter((user) => user.email !== data.sender.email)
    .map((user) => user.name);

  const container = clsx('flex gap-3 p-4', {
    'justify-end': isOwn,
  });

  const avatar = clsx({
    'order-2': isOwn,
  });

  const body = clsx('flex flex-col gap-2', {
    'items-end': isOwn,
  });

  const message = clsx('text-sm w-fit overflow-hidden', {
    'bg-sky-500 text-white rounded-md rounded-tr-none': isOwn,
    'bg-gray-100': !isOwn,
    'rounded-md p-0': data.image,
    'py-2 px-3': !data.image,
  });

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className='flex items-center gap-1'>
          <div className='text-sm text-gray-500'>{data.sender.name}</div>
          <div className='text-xs text-gray-400'>
            {format(new Date(data.createdAt), 'p')}
          </div>
        </div>
        <div className={message}>
          <ImageModal
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
            src={data.image}
          />
          {data.image ? (
            <Image
              onClick={() => setImageModalOpen(true)}
              src={data.image}
              alt='Image'
              width='288'
              height='288'
              className='object-cover cursor-pointer hover:scale-105 transition-all ease-linear duration-200'
            />
          ) : (
            data.body
          )}
        </div>
        {isLast && isOwn && seenList && (
          <div
            className='text-xs font-light text-gray-500'
            title={seenList.join(', ')}
          >
            Seen by {seenList.slice(0, 3).join(', ')}
            {seenList.length > 3 && ` and ${seenList.length - 3} others`}
          </div>
        )}
      </div>
    </div>
  );
}
