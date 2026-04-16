'use client';

import useActiveList from '@/app/hooks/use-active-list';
import { useEffect } from 'react';
import { Members } from 'pusher-js';
import { getPusherClient } from '@/lib/pusher-client';

export default function useActiveChannel() {
  const { set, add, remove } = useActiveList();

  useEffect(() => {
    const pusherClient = getPusherClient();
    if (!pusherClient) {
      return;
    }

    const channel = pusherClient.subscribe('presence-messenger');

    const handleSubscribe = (members: Members) => {
      const initialMembers: string[] = [];

      members.each((member: Record<string, any>) => {
        initialMembers.push(member.id);
      });

      set(initialMembers);
    };

    const handleAdd = (member: Record<string, any>) => {
      add(member.id);
    };

    const handleRemove = (member: Record<string, any>) => {
      remove(member.id);
    };

    channel.bind('pusher:subscription_succeeded', handleSubscribe);
    channel.bind('pusher:member_added', handleAdd);
    channel.bind('pusher:member_removed', handleRemove);

    return () => {
      channel.unbind('pusher:subscription_succeeded', handleSubscribe);
      channel.unbind('pusher:member_added', handleAdd);
      channel.unbind('pusher:member_removed', handleRemove);
      pusherClient.unsubscribe('presence-messenger');
    };
  }, [set, add, remove]);
}
