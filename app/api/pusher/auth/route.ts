import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { pusherServer } from '@/lib/pusher';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const formData = await req.formData();

  const socketId = formData.get('socket_id') as string;
  const channel = formData.get('channel_name') as string;

  const data = {
    user_id: session.user.email,
  };

  const authResponse = pusherServer.authorizeChannel(socketId, channel, data);

  return NextResponse.json(authResponse);
}
