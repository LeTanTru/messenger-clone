'use client';

import Avatar from '@/app/components/avatar';
import useOtherUser from '@/app/hooks/use-other-user';
import { Conversation, User } from '@/generated/prisma/client';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { format } from 'date-fns';
import { IoClose, IoTrash } from 'react-icons/io5';
import { Fragment } from 'react/jsx-runtime';

type ProfileDrawerProps = {
  data: Conversation & {
    users: User[];
  };
  isOpen: boolean;
  onClose: () => void;
};

export default function ProfileDrawer({
  data,
  isOpen,
  onClose,
}: ProfileDrawerProps) {
  const otherUser = useOtherUser(data);

  const joinedDate = format(new Date(data.createdAt), 'p PP');

  const title = data.name || otherUser.name;

  const statusText = data.isGroup ? `${data.users.length} members` : 'Active';

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/50' onClick={onClose} />
        </TransitionChild>
        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <TransitionChild
                as={Fragment}
                enter='transform transition ease-in-out duration-200'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-200'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <DialogPanel className='pointer-events-auto w-screen max-w-md'>
                  <div className='flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl'>
                    <div className='px-4 sm:px-6'>
                      <div className='flex items-start justify-end'>
                        <div className='ml-3 flex h-7 items-center'>
                          <button
                            className='rounded-md bg-white text-gray-400 hover:text-rose-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 cursor-pointer transition-all ease-linear duration-200'
                            type='button'
                            onClick={onClose}
                          >
                            <span className='sr-only'>Close panel</span>
                            <IoClose size={24} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className='relative mt-6 flex-1 px-4 sm:px-6'>
                      <div className='flex flex-col items-center'>
                        <div className='mb-2'>
                          <Avatar user={otherUser} />
                        </div>
                        <div className='text-lg font-medium'>{title}</div>
                        <div className='text-sm text-gray-500'>
                          {statusText}
                        </div>
                        <div className='flex gap-10 my-8'>
                          <div
                            className='flex flex-col gap-3 items-center cursor-pointer hover:opacity-75 transition-all ease-linear duration-200'
                            onClick={() => {}}
                          >
                            <div className='size-10 bg-neutral-100 rounded-full flex items-center justify-center hover:text-rose-500 transition-all ease-linear duration-200'>
                              <IoTrash size={20} />
                            </div>
                            <div className='text-sm font-light text-neutral-600 hover:text-rose-500 transition-all ease-linear duration-200'>
                              Delete
                            </div>
                          </div>
                        </div>
                        <div className='w-full py-5 sm:px-0 sm:pt-0'>
                          <dl className='space-y-8 px-4 sm:space-y-6 sm:px-6'>
                            {!data.isGroup && (
                              <div>
                                <dt className='text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0'>
                                  Email
                                </dt>
                                <dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
                                  {otherUser.email}
                                </dd>
                              </div>
                            )}
                            {!data.isGroup && (
                              <>
                                <div className='bg-gray-200 h-px w-full' />
                                <div>
                                  <dt className='text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0'>
                                    Joined
                                  </dt>
                                  <dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
                                    {/* {format(
                                      new Date(otherUser.createdAt),
                                      'p PP',
                                    )} */}
                                    <time dateTime={joinedDate}>
                                      {joinedDate}
                                    </time>
                                  </dd>
                                </div>
                              </>
                            )}
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
