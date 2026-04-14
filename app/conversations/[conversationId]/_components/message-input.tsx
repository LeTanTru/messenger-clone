'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

type MessageInputProps = {
  id: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  required?: boolean;
  placeholder?: string;
};

export default function MessageInput({
  id,
  register,
  errors,
  required,
  placeholder,
}: MessageInputProps) {
  return (
    <div className='relative w-full'>
      <input
        id={id}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className='text-black font-light py-2 px-4 bg-neutral-100 transition-all ease-linear duration-200 border-gray-200 w-full rounded-md focus:outline-none'
      />
    </div>
  );
}
