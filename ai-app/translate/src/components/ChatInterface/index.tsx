/**
 * 聊天界面主组件
 * 整合消息展示和输入区域，提供聊天应用体验
 */
import React, { useRef, useEffect } from 'react';
import { useAtom } from 'jotai';
import { messagesAtom, streamingMessageIdAtom } from '../../store/atoms';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { WelcomeScreen } from './WelcomeScreen';

export const ChatInterface: React.FC = () => {
  const [messages] = useAtom(messagesAtom);
  const [streamingMessageId] = useAtom(streamingMessageIdAtom);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingMessageId]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex items-center justify-center">
          <WelcomeScreen />
        </div>
        <ChatInput />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <MessageList />
        <div ref={messagesEndRef} />
      </div>
      
      {/* 输入区域 */}
      <ChatInput />
    </div>
  );
};
