'use client';

import Modal from '@/app/components/modal';
import Image from 'next/image';

type ImageModalProps = {
  src: string | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function ImageModal({ src, isOpen, onClose }: ImageModalProps) {
  if (!src) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='size-80'>
        <Image alt='Image' className='object-cover' src={src} fill />
      </div>
    </Modal>
  );
}
