'use client';

import useActiveChannel from '@/app/hooks/use-active-channel';

export default function ActiveStatus() {
  useActiveChannel();
  return null;
}
