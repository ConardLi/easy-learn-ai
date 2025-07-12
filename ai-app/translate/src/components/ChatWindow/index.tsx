/**
 * 聊天窗口主组件
 * 展示翻译历史和当前翻译进度
 */
import React, { useRef, useEffect } from 'react';
import { useAtom } from 'jotai';
import { messagesAtom, streamingMessageIdAtom } from '../../store/atoms';
import { MessageBubble } from './MessageBubble';
import { EmptyState } from './EmptyState';

export const ChatWindow: React.FC = () => {
  const [messages] = useAtom(messagesAtom);
  const [streamingMessageId] = useAtom(streamingMessageIdAtom);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingMessageId]);
  
  if (messages.length === 0) {
    return <EmptyState />;
  }
  
  return (
    <div className="bg-white rounded-xl shadow-lg">
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-800">翻译记录</h2>
        <p className="text-sm text-gray-500">共 {Math.floor(messages.length / 2)} 条翻译记录</p>
      </div>
      
      <div className="h-96 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isStreaming={message.id === streamingMessageId}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
