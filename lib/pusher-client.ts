'use client';

import PusherImport from 'pusher-js';

type PusherConstructor = typeof PusherImport;

const Pusher =
  typeof PusherImport === 'function'
    ? PusherImport
    : (PusherImport as unknown as { default: PusherConstructor }).default;

let pusherClient: InstanceType<PusherConstructor> | null = null;

export function getPusherClient() {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!pusherClient) {
    pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
      channelAuthorization: {
        endpoint: '/api/pusher/auth',
        transport: 'ajax',
      },
      cluster: 'ap1',
    });
  }

  return pusherClient;
}
