import getCurrentUser from '@/app/actions/get-current-user';
import { prisma } from '@/lib/prisma';

export default async function getConversationById(conversationId: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.email) {
      return null;
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    return conversation;
  } catch (error) {
    console.error('Error fetching conversation:', error);
    return null;
  }
}
