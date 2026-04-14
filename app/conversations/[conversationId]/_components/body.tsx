'use client';

import MessageBox from './message-box';
import useConversation from '@/app/hooks/use-conversation';
import { FullMessageType } from '@/types';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

type BodyProps = {
  initialMessages: FullMessageType[];
};

export default function Body({ initialMessages }: BodyProps) {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  const messageCount = messages.length;

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className='flex-1 overflow-y-auto'>
      {messages.map((message, index) => (
        <MessageBox
          key={message.id}
          isLast={index === messageCount - 1}
          data={message}
        />
      ))}
      <div ref={bottomRef} className='pt-24' />
    </div>
  );
}
