'use client';

import MobileItem from '@/app/components/sidebar/mobile-item';
import useConversation from '@/app/hooks/use-conversation';
import useRoutes from '@/app/hooks/use-routes';

export default function MobileFooter() {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div className='fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t lg:hidden'>
      {routes.map((route) => (
        <MobileItem
          key={route.label}
          href={route.href}
          label={route.label}
          icon={route.icon}
          active={route.active}
          onClick={route.onClick}
        />
      ))}
    </div>
  );
}
