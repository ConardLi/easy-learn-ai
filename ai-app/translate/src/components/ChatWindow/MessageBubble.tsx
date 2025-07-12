/**
 * 消息气泡组件
 * 展示单条翻译消息，支持复制功能
 */
import React, { useState } from 'react';
import { ClipboardIcon, CheckIcon, UserIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { TranslationMessage } from '../../store/atoms';
import { LoadingDots } from './LoadingDots';

interface MessageBubbleProps {
  message: TranslationMessage;
  isStreaming?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isStreaming = false
}) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('复制失败:', error);
    }
  };
  
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const isUser = message.type === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-3xl ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* 头像 */}
        <div className={`flex-shrink-0 ${isUser ? 'ml-3' : 'mr-3'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? 'bg-blue-500' : 'bg-gray-500'
          }`}>
            {isUser ? (
              <UserIcon className="w-4 h-4 text-white" />
            ) : (
              <ComputerDesktopIcon className="w-4 h-4 text-white" />
            )}
          </div>
        </div>
        
        {/* 消息内容 */}
        <div className={`flex-1 ${isUser ? 'text-right' : 'text-left'}`}>
          <div className={`inline-block max-w-full px-4 py-3 rounded-lg ${
            isUser
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-800'
          }`}>
            <div className="whitespace-pre-wrap break-words">
              {message.content}
              {isStreaming && <LoadingDots />}
            </div>
          </div>
          
          {/* 时间和操作 */}
          <div className={`flex items-center mt-1 text-xs text-gray-500 ${
            isUser ? 'justify-end' : 'justify-start'
          }`}>
            <span>{formatTime(message.timestamp)}</span>
            
            {!isUser && message.content && (
              <button
                onClick={handleCopy}
                className="ml-2 p-1 hover:bg-gray-200 rounded transition-colors"
                title="复制翻译结果"
              >
                {copied ? (
                  <CheckIcon className="w-3 h-3 text-green-500" />
                ) : (
                  <ClipboardIcon className="w-3 h-3" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
