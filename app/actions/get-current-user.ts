import getSession from '@/app/actions/get-session';
import { prisma } from '@/lib/prisma';

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error) {
    console.log('[CURRENT_USER_GET]', error);
    return null;
  }
}
