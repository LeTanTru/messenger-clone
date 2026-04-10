'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { IconType } from 'react-icons';

type MobileItemProps = {
  href: string;
  label: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
};

export default function MobileItem({
  href,
  label,
  icon: Icon,
  active,
  onClick,
}: MobileItemProps) {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link
      href={href}
      className={clsx(
        'group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:bg-gray-100 transition-all ease-linear duration-200',
        {
          'bg-gray-100 text-black': active,
        },
      )}
      onClick={handleClick}
    >
      <Icon className='size-6' />
      <span className='sr-only'>{label}</span>
    </Link>
  );
}
