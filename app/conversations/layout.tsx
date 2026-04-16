import getConversations from '@/app/actions/get-conversations';
import getUsers from '@/app/actions/get-users';
import Sidebar from '@/app/components/sidebar/sidebar';
import ConversationList from '@/app/conversations/_components/conversation-list';

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <Sidebar>
      <div className='h-full'>
        <ConversationList initialItems={conversations} users={users} />
        {children}
      </div>
    </Sidebar>
  );
}
