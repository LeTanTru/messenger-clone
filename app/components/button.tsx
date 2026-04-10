'use client';

import clsx from 'clsx';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset' | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
};

export default function Button({
  type = 'button',
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={clsx(
        'flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all ease-linear duration-200 text-white cursor-pointer',
        {
          'opacity-50 cursor-not-allowed': disabled,
          'w-full': fullWidth,
          'text-gray-900': secondary,
          'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600':
            danger,
          'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600':
            !secondary && !danger,
        },
      )}
    >
      {children}
    </button>
  );
}
