import getConversationById from '@/app/actions/get-conversation-by-id';
import getMessages from '@/app/actions/get-messages';
import EmptyState from '@/app/components/empty-state';
import Body from './_components/body';
import Form from './_components/form';
import Header from './_components/header';

export default async function ConversationDetailPage({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) {
  const { conversationId } = await params;

  const conversation = await getConversationById(conversationId);

  const messages = await getMessages(conversationId);

  if (!conversation) {
    return (
      <div className='lg:pl-80 h-full'>
        <div className='h-full flex flex-col'>
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className='lg:pl-80 h-full'>
      <div className='h-full flex flex-col'>
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
}
