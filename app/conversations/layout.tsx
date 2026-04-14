import getConversations from '@/app/actions/get-conversations';
import Sidebar from '@/app/components/sidebar/sidebar';
import ConversationList from '@/app/conversations/_components/conversation-list';

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();

  return (
    <Sidebar>
      <div className='h-full'>
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
}
