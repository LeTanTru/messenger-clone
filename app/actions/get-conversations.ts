import getCurrentUser from '@/app/actions/get-current-user';
import { prisma } from '@/lib/prisma';

export default async function getConversations() {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: 'desc',
      },
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });
    return conversations;
  } catch (error) {
    console.log('Error in getConversation: ', error);
    return [];
  }
}
