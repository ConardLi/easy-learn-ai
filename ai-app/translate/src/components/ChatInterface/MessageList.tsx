/**
 * 消息列表组件
 * 展示所有翻译消息
 */
import React from 'react';
import { useAtom } from 'jotai';
import { messagesAtom, streamingMessageIdAtom } from '../../store/atoms';
import { ModernMessageBubble } from './ModernMessageBubble';

export const MessageList: React.FC = () => {
  const [messages] = useAtom(messagesAtom);
  const [streamingMessageId] = useAtom(streamingMessageIdAtom);

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <ModernMessageBubble
          key={message.id}
          message={message}
          isStreaming={message.id === streamingMessageId}
        />
      ))}
    </div>
  );
};
