'use client';

import { getPusherClient } from '@/lib/pusher-client';
import MessageBox from './message-box';
import useConversation from '@/app/hooks/use-conversation';
import { FullMessageType } from '@/types';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import find from 'lodash/find';

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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const pusherClient = getPusherClient();
    if (!pusherClient) {
      return;
    }

    pusherClient.subscribe(conversationId);

    const messageHandler = (newMessage: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);
      setMessages((prevMessages) => {
        if (find(prevMessages, { id: newMessage.id })) {
          return prevMessages;
        }

        return [...prevMessages, newMessage];
      });
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((prevMessages) =>
        prevMessages.map((message) => {
          if (message.id === newMessage.id) {
            return newMessage;
          }
          return message;
        }),
      );
    };

    pusherClient.bind('messages:new', messageHandler);
    pusherClient.bind('message:update', updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:new', messageHandler);
      pusherClient.unbind('message:update', updateMessageHandler);
    };
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
