'use client';

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Fragment } from 'react/jsx-runtime';
import { ClipLoader } from 'react-spinners';

export default function LoadingModal() {
  return (
    <Transition show as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={() => {}}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
        >
          <div className='fixed inset-0 bg-gray-100/50' />
        </TransitionChild>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <DialogPanel>
              <ClipLoader size={40} color='#0284c7' />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
