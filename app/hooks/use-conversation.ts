import { useParams } from 'next/navigation';

const useConversation = () => {
  const params = useParams();
  const conversationId = params.conversationId || '';

  const isOpen = !!conversationId;

  return {
    conversationId,
    isOpen,
  };
};

export default useConversation;
