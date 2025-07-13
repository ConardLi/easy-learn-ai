/**
 * 现代化消息气泡组件
 * 支持流式显示、文档翻译状态和下载链接
 */
import React from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { TranslationMessage } from '../../store/atoms';

interface ModernMessageBubbleProps {
  message: TranslationMessage;
  isStreaming?: boolean;
}

export const ModernMessageBubble: React.FC<ModernMessageBubbleProps> = ({ 
  message, 
  isStreaming = false 
}) => {
  const isUser = message.type === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`
          max-w-[80%] rounded-2xl px-4 py-3 shadow-sm
          ${isUser 
            ? 'bg-blue-500 text-white ml-12' 
            : 'bg-white border border-gray-200 mr-12'
          }
        `}
      >
        {/* 消息内容 */}
        <div className={`text-sm whitespace-pre-wrap break-words ${isUser ? 'text-white' : 'text-gray-800'}`}>
          {message.content}
          {isStreaming && (
            <span className="inline-block w-2 h-4 bg-current animate-pulse ml-1" />
          )}
        </div>

        {/* 翻译状态指示器 */}
        {message.isDocTranslation && message.translationStatus && (
          <div className="mt-2 flex items-center space-x-2">
            <div className={`
              w-2 h-2 rounded-full
              ${message.translationStatus === 'pending' ? 'bg-yellow-400 animate-pulse' :
                message.translationStatus === 'processing' ? 'bg-blue-400 animate-spin' :
                message.translationStatus === 'success' ? 'bg-green-400' :
                'bg-red-400'}
            `} />
            <span className={`text-xs ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
              {message.translationStatus === 'pending' ? '准备中' :
               message.translationStatus === 'processing' ? '翻译中' :
               message.translationStatus === 'success' ? '已完成' :
               '失败'}
            </span>
          </div>
        )}

        {/* 下载链接 */}
        {message.downloadLinks && message.downloadLinks.length > 0 && (
          <div className="mt-3 space-y-2 border-t pt-3">
            <h4 className="text-sm font-medium text-gray-700">文件下载：</h4>
            <div className="grid grid-cols-1 gap-2">
              {message.downloadLinks.map((link, index) => {
                // 从URL中提取文件名用于显示
                const urlParams = new URLSearchParams(link.url.split('?')[1] || '');
                const ufileattname = urlParams.get('ufileattname');
                const filename = ufileattname ? decodeURIComponent(ufileattname) : 'download.pdf';
                
                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors text-sm group/download no-underline"
                  >
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <ArrowDownTrayIcon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <span className="text-gray-700 truncate flex-1">{link.label}</span>
                      <span className={`px-2 py-0.5 rounded text-xs flex-shrink-0 ${
                        link.type === 'original' ? 'bg-blue-100 text-blue-700' :
                        link.type === 'translated' ? 'bg-green-100 text-green-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {link.type === 'original' ? '原文' :
                         link.type === 'translated' ? '译文' : '双语'}
                      </span>
                    </div>
                    <ArrowDownTrayIcon className="w-3 h-3 text-gray-400 group-hover/download:text-blue-500 transition-colors flex-shrink-0" />
                  </a>
                );
              })}
            </div>
            {/* 调试信息 */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
                <details>
                  <summary className="cursor-pointer text-yellow-700">调试信息</summary>
                  <pre className="mt-1 text-yellow-600 whitespace-pre-wrap overflow-auto">
                    {JSON.stringify(message.downloadLinks, null, 2)}
                  </pre>
                </details>
              </div>
            )}
          </div>
        )}

        {/* 时间戳 */}
        <div className={`text-xs mt-2 ${isUser ? 'text-blue-100' : 'text-gray-400'}`}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};