'use client';

import Button from '@/app/components/button';
import Input from '@/app/components/input/input';
import Modal from '@/app/components/modal';
import { User } from '@/generated/prisma/client';
import axios from 'axios';
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type SettingsModalProps = {
  currentUser: User | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function SettingsModal({
  currentUser,
  isOpen,
  onClose,
}: SettingsModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch('image');

  const handleUpload = (result: CloudinaryUploadWidgetResults) => {
    if (typeof result?.info === 'object' && 'secure_url' in result.info) {
      setValue('image', result.info.secure_url, { shouldValidate: true });
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post('/api/settings', data)
      .then(() => {
        router.refresh();
        onClose();
        toast.success('Profile updated successfully!');
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-12'>
          <div className='border-b border-b-gray-200 pb-8'>
            <h2 className='text-base font-semibold'>Profile</h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Edit your public information.
            </p>
            <div className='mt-4 flex flex-col gap-y-4'>
              <Input
                errors={errors}
                id='name'
                label='Name'
                register={register}
                required
                disabled={isLoading}
                placeholder='Name'
              />
              <div>
                <label className='block text-sm font-medium leading-6 text-gray-900'>
                  Photo
                </label>
                <div className='mt-2 flex items-center gap-x-3'>
                  <Image
                    width={48}
                    height={48}
                    className='rounded-full shrink-0 aspect-square object-cover size-12'
                    src={
                      image || currentUser?.image || '/images/placeholder.jpg'
                    }
                    alt={currentUser?.name || 'Avatar'}
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onSuccess={handleUpload}
                    uploadPreset={
                      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                    }
                  >
                    <Button disabled={isLoading} secondary type='button'>
                      Change
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-6 flex items-center justify-end gap-x-6'>
            <Button disabled={isLoading} secondary onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isLoading} type='submit'>
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
