/**
 * 输入面板主组件
 * 包含文本输入和文件上传功能
 */
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { messagesAtom, userConfigAtom, isTranslatingAtom, streamingMessageIdAtom } from '../../store/atoms';
import { TranslationService, ApiError } from '../../services/translationService';
import { TextInput } from './TextInput';
import { FileUpload } from './FileUpload';
import { TranslationMessage } from '../../store/atoms';
import { ErrorToast } from '../common/ErrorToast';

export const InputPanel: React.FC = () => {
  const [config] = useAtom(userConfigAtom);
  const [messages, setMessages] = useAtom(messagesAtom);
  const [isTranslating, setIsTranslating] = useAtom(isTranslatingAtom);
  const [, setStreamingMessageId] = useAtom(streamingMessageIdAtom);
  const [inputText, setInputText] = useState('');
  const [currentError, setCurrentError] = useState<ApiError | null>(null);
  
  const handleTranslate = async (text?: string, fileId?: string) => {
    if ((!text?.trim() && !fileId) || !config.apiKey) return;
    
    // 清除之前的错误
    setCurrentError(null);
    
    // 添加用户消息
    const userMessage: TranslationMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: fileId ? '📄 上传的文件' : text || '',
      timestamp: Date.now()
    };
    
    // 添加助手消息占位符
    const assistantMessage: TranslationMessage = {
      id: `assistant-${Date.now()}`,
      type: 'assistant',
      content: '',
      timestamp: Date.now(),
      isStreaming: true
    };
    
    setMessages(prev => [...prev, userMessage, assistantMessage]);
    setIsTranslating(true);
    setStreamingMessageId(assistantMessage.id);
    
    // 开始流式翻译
    await TranslationService.streamTranslation(
      {
        text: text,
        fileId: fileId,
        sourceLang: config.sourceLang,
        targetLang: config.targetLang,
        strategy: config.strategy,
        apiKey: config.apiKey
      },
      (chunk) => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === assistantMessage.id
              ? { ...msg, content: msg.content + chunk }
              : msg
          )
        );
      },
      () => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === assistantMessage.id
              ? { ...msg, isStreaming: false }
              : msg
          )
        );
        setIsTranslating(false);
        setStreamingMessageId(null);
      },
      (error: ApiError) => {
        // 显示结构化错误信息
        setCurrentError(error);
        
        setMessages(prev => 
          prev.map(msg => 
            msg.id === assistantMessage.id
              ? { 
                  ...msg, 
                  content: `❌ ${error.getErrorType()}: ${error.message}`, 
                  isStreaming: false 
                }
              : msg
          )
        );
        setIsTranslating(false);
        setStreamingMessageId(null);
      }
    );
    
    setInputText('');
  };
  
  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="space-y-4">
          <TextInput
            value={inputText}
            onChange={setInputText}
            onTranslate={(text) => handleTranslate(text)}
            disabled={isTranslating || !config.apiKey}
          />
          
          <div className="border-t pt-4">
            <FileUpload onTranslate={handleTranslate} />
          </div>
        </div>
      </div>

      {/* 错误提示Toast */}
      <ErrorToast 
        error={currentError} 
        onClose={() => setCurrentError(null)} 
      />
    </>
  );
};