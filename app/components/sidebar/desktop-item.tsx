'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { IconType } from 'react-icons';

type DeskTopItemProps = {
  href: string;
  label: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
};

export default function DeskTopItem({
  href,
  label,
  icon: Icon,
  active,
  onClick,
}: DeskTopItemProps) {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100 transition-all ease-linear duration-200',
          {
            'bg-gray-100 text-black': active,
          },
        )}
        title={label}
      >
        <Icon className='size-6 shrink-0' />
        <span className='sr-only'>{label}</span>
      </Link>
    </li>
  );
}
