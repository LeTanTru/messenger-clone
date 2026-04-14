import { prisma } from '@/lib/prisma';

export default async function getMessages(conversationId: string) {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return messages;
  } catch (error) {
    console.log('Error fetching messages:', error);
    return [];
  }
}
