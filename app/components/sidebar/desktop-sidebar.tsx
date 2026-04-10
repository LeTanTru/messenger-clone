'use client';

import Avatar from '@/app/components/avatar';
import DeskTopItem from '@/app/components/sidebar/desktop-item';
import useRoutes from '@/app/hooks/use-routes';
import { User } from '@/generated/prisma/client';
import { useState } from 'react';

type DesktopSidebarProps = {
  currentUser: User | null;
};

export default function DesktopSidebar({ currentUser }: DesktopSidebarProps) {
  const routes = useRoutes();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 lg:overflow-y-auto lg:bg-white lg:border-r lg:pb-4 lg:flex lg:flex-col justify-between lg:border-r-gray-200'>
      <nav className='mt-4 flex flex-col justify-between'>
        <ul role='list' className='flex flex-col items-center space-y-1'>
          {routes.map((route) => (
            <DeskTopItem
              key={route.label}
              href={route.href}
              label={route.label}
              icon={route.icon}
              active={route.active}
              onClick={route.onClick}
            />
          ))}
        </ul>
      </nav>
      <nav className='mt-4 flex flex-col justify-between items-center'>
        <div
          className='cursor-pointer hover:opacity-75 transition-all ease-linear duration-200'
          onClick={() => setIsOpen(true)}
        >
          <Avatar user={currentUser} />
        </div>
      </nav>
    </div>
  );
}
