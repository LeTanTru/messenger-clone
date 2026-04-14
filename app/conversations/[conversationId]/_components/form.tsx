'use client';

import MessageInput from './message-input';
import useConversation from '@/app/hooks/use-conversation';
import axios from 'axios';
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HiPhoto } from 'react-icons/hi2';
import { RiTelegram2Fill } from 'react-icons/ri';

export default function Form() {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });

    axios.post('/api/messages', {
      ...data,
      conversationId,
    });
  };

  const handleUpload = (result: CloudinaryUploadWidgetResults) => {
    if (typeof result?.info === 'object' && 'secure_url' in result.info) {
      axios.post('/api/messages', {
        image: result.info.secure_url,
        conversationId,
      });
    }
  };

  return (
    <div className='py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full border-t-gray-200'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex items-center gap-2 lg:gap-4 w-full'
      >
        <CldUploadButton
          options={{ maxFiles: 1 }}
          onSuccess={handleUpload}
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          className='cursor-pointer'
        >
          <HiPhoto
            size={30}
            className='text-sky-500 hover:text-sky-600 transition-all ease-linear duration-200'
          />
        </CldUploadButton>
        <MessageInput
          id='message'
          register={register}
          errors={errors}
          required
          placeholder='Type a message...'
        />
        <button
          type='submit'
          className='rouded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition-all ease-linear duration-200 rounded-full flex items-center justify-center'
        >
          <RiTelegram2Fill size={18} className='text-white' />
        </button>
      </form>
    </div>
  );
}
