/**
 * 聊天输入组件
 * 现代化的底部输入区域
 */
import React, { useState, useRef } from 'react';
import { useAtom } from 'jotai';
import { 
  PaperAirplaneIcon, 
  PaperClipIcon,
  XMarkIcon,
  DocumentIcon,
  TrashIcon
} from '@heroicons/react/24/solid';
import { messagesAtom, userConfigAtom, isTranslatingAtom, streamingMessageIdAtom, docTranslationTasksAtom } from '../../store/atoms';
import { TranslationService, ApiError } from '../../services/translationService';
import { TranslationMessage, DocTranslationTask } from '../../store/atoms';
import { ErrorToast } from '../common/ErrorToast';

export const ChatInput: React.FC = () => {
  const [config] = useAtom(userConfigAtom);
  const [messages, setMessages] = useAtom(messagesAtom);
  const [isTranslating, setIsTranslating] = useAtom(isTranslatingAtom);
  const [streamingMessageId, setStreamingMessageId] = useAtom(streamingMessageIdAtom);
  const [docTasks, setDocTasks] = useAtom(docTranslationTasksAtom);
  const [inputText, setInputText] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [currentError, setCurrentError] = useState<ApiError | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 语言映射函数
  const getLanguageName = (langCode: string): string => {
    const langMap: Record<string, string> = {
      'auto': 'Any Language',
      'zh-CN': 'Simplified Chinese',
      'zh-TW': 'Traditional Chinese',
      'en': 'English',
      'ja': 'Japanese',
      'ko': 'Korean',
      'fr': 'French',
      'de': 'German',
      'es': 'Spanish',
      'ru': 'Russian',
      'ar': 'Arabic',
      'pt': 'Portuguese',
      'it': 'Italian'
    };
    return langMap[langCode] || langCode;
  };

  // 专业文档翻译
  const handleProfessionalDocTranslation = async (file: File) => {
    if (!config.apiKey) return;
    
    setCurrentError(null);
    
    try {
      // 创建任务记录
      const taskId = `doc-task-${Date.now()}`;
      const newTask: DocTranslationTask = {
        id: taskId,
        asyncId: '',
        fileName: file.name,
        status: 'pending',
        startTime: Date.now()
      };
      
      // 创建用户消息
      const userMessage: TranslationMessage = {
        id: `user-${Date.now()}`,
        type: 'user',
        content: `📄 ${file.name}`,
        timestamp: Date.now()
      };
      
      // 创建助手消息（专业文档翻译）
      const assistantMessage: TranslationMessage = {
        id: `assistant-${Date.now()}`,
        type: 'assistant',
        content: '正在上传文件并创建专业翻译任务...',
        timestamp: Date.now(),
        isDocTranslation: true,
        translationStatus: 'pending'
      };
      
      setMessages(prev => [...prev, userMessage, assistantMessage]);
      setIsTranslating(true);
      
      // 1. 上传文件
      const uploadResult = await TranslationService.uploadFile(file, config.apiKey);
      
      // 检查上传结果 - 修正字段名
      if (!uploadResult.id) {
        throw new ApiError({
          code: 400,
          msg: '文件上传失败：未获取到文件ID',
          success: false
        });
      }
      
      console.log('文件上传成功:', {
        fileId: uploadResult.id,
        filename: uploadResult.filename,
        bytes: uploadResult.bytes
      });
      
      // 更新上传完成状态
      setMessages(prev => 
        prev.map(msg => 
          msg.id === assistantMessage.id
            ? { ...msg, content: `文件上传成功（ID: ${uploadResult.id.slice(-8)}），正在创建专业翻译任务...` }
            : msg
        )
      );
      
      // 2. 创建翻译任务 - 使用正确的字段名
      const taskResult = await TranslationService.createDocTranslationTask(
        uploadResult.id,  // 修正：使用 id 而不是 file_id
        getLanguageName(config.sourceLang),
        getLanguageName(config.targetLang),
        config.apiKey,
        true // 翻译图片
      );
      
      console.log('创建翻译任务的完整响应:', taskResult);
      
      // 检查任务创建结果 - 尝试多种可能的字段名
      const asyncId = taskResult.async_id || taskResult.asyncId || taskResult.id || taskResult.task_id;
      if (!asyncId) {
        console.error('任务创建失败，响应数据:', taskResult);
        throw new ApiError({
          code: 400,
          msg: `创建翻译任务失败：未获取到任务ID。响应: ${JSON.stringify(taskResult)}`,
          success: false
        });
      }
      
      console.log('翻译任务创建成功:', {
        asyncId: asyncId,
        status: taskResult.status
      });
      
      // 更新任务状态
      newTask.asyncId = asyncId;
      newTask.status = 'processing';
      setDocTasks(prev => [...prev, newTask]);
      
      // 更新消息状态
      setMessages(prev => 
        prev.map(msg => 
          msg.id === assistantMessage.id
            ? { 
                ...msg, 
                content: `专业翻译任务已创建（ID: ${asyncId.slice(-8)}），正在处理中...`, 
                asyncId: asyncId,
                translationStatus: 'processing'
              }
            : msg
        )
      );
      
      // 3. 开始轮询结果
      TranslationService.pollDocTranslationResult(
        asyncId,
        config.apiKey,
        (status, result) => {
          console.log('轮询状态更新:', { status, asyncId: asyncId });
          
          // 更新任务状态
          setDocTasks(prev => 
            prev.map(task => 
              task.id === taskId
                ? { ...task, status: status as any }
                : task
            )
          );
          
          // 更新消息状态
          if (status === 'success' && result?.choices?.[0]?.messages?.[0]?.content) {
            const downloadLinks = result.choices[0].messages[0].content
              .filter(item => item.type === 'file_url')
              .map(item => ({
                url: item.file_url,
                type: item.tag_en === 'originalFileUrl' ? 'original' as const :
                      item.tag_en === 'translatedFileUrl' ? 'translated' as const :
                      'bilingual' as const,
                label: item.tag_cn
              }));
            
            console.log('解析到的下载链接:', downloadLinks);
            
            setMessages(prev => 
              prev.map(msg => 
                msg.id === assistantMessage.id
                  ? { 
                      ...msg, 
                      content: '✅ 专业文档翻译完成！您可以下载以下文件：', 
                      translationStatus: 'success',
                      downloadLinks
                    }
                  : msg
              )
            );
            
            // 更新任务完成状态
            setDocTasks(prev => 
              prev.map(task => 
                task.id === taskId
                  ? { 
                      ...task, 
                      status: 'success', 
                      endTime: Date.now(),
                      downloadLinks
                    }
                  : task
              )
            );
          } else if (status === 'processing' || status === 'pending') {
            setMessages(prev => 
              prev.map(msg => 
                msg.id === assistantMessage.id
                  ? { 
                      ...msg, 
                      content: `📊 专业文档翻译进行中...（状态：${status}）` 
                    }
                  : msg
              )
            );
          }
        }
      ).catch((error: ApiError) => {
        console.error('轮询失败:', error);
        setCurrentError(error);
        setMessages(prev => 
          prev.map(msg => 
            msg.id === assistantMessage.id
              ? { 
                  ...msg, 
                  content: `❌ 专业翻译失败: ${error.message}`, 
                  translationStatus: 'failed'
                }
              : msg
          )
        );
        
        setDocTasks(prev => 
          prev.map(task => 
            task.id === taskId
              ? { ...task, status: 'failed', endTime: Date.now(), error: error.message }
              : task
          )
        );
      }).finally(() => {
        setIsTranslating(false);
      });
      
    } catch (error) {
      console.error('专业翻译过程出错:', error);
      setCurrentError(error instanceof ApiError ? error : new ApiError({
        code: 0,
        msg: `专业文档翻译失败: ${(error as Error).message}`,
        success: false
      }));
      setIsTranslating(false);
    }
    
    // 清理文件状态
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 普通文本翻译（保持原有逻辑）
  const handleTextTranslation = async (text: string) => {
    if (!text || !text.trim() || !config.apiKey) return;
    
    setCurrentError(null);
    
    const userMessage: TranslationMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: text,
      timestamp: Date.now()
    };
    
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
    
    const handleChunk = (chunk: string) => {
      setMessages((prev: TranslationMessage[]) => 
        prev.map(msg => 
          msg.id === assistantMessage.id
            ? { ...msg, content: msg.content + chunk }
            : msg
        )
      );
    };

    const handleComplete = () => {
      setMessages((prev: TranslationMessage[]) => 
        prev.map(msg => 
          msg.id === assistantMessage.id
            ? { ...msg, isStreaming: false }
            : msg
        )
      );
      setIsTranslating(false);
      setStreamingMessageId(null);
    };

    const handleError = (error: ApiError) => {
      setCurrentError(error);
      setMessages((prev: TranslationMessage[]) => 
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
    };

    await TranslationService.streamTranslation(
      {
        text: text,
        sourceLang: config.sourceLang,
        targetLang: config.targetLang,
        strategy: config.strategy,
        apiKey: config.apiKey
      },
      handleChunk,
      handleComplete,
      handleError
    );
    
    setInputText('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!config.apiKey) {
      setCurrentError(new ApiError({
        code: 400,
        msg: '请先配置 API 密钥',
        success: false
      }));
      return;
    }

    if (uploadedFile) {
      // 文档上传直接使用专业翻译，无需选择模式
      await handleProfessionalDocTranslation(uploadedFile);
    } else if (inputText.trim()) {
      await handleTextTranslation(inputText);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        setCurrentError(new ApiError({
          code: 400,
          msg: '文件大小不能超过 100MB',
          success: false
        }));
        return;
      }
      
      setUploadedFile(file);
      setInputText('');
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const canSubmit = (inputText.trim() || uploadedFile) && !isTranslating && config.apiKey;

  return (
    <>
      <div className="border-t border-gray-200 bg-white/80 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto p-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* 文件预览 - 简化显示，去掉翻译模式选择 */}
            {uploadedFile && (
              <div className="flex items-center justify-between bg-purple-50 border border-purple-200 rounded-lg px-3 py-2">
                <div className="flex items-center space-x-2">
                  <DocumentIcon className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-purple-700 truncate">{uploadedFile.name}</span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded flex items-center space-x-1">
                    <span>专业翻译</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  disabled={isTranslating}
                  className="text-purple-500 hover:text-purple-700 transition-colors disabled:text-gray-400"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* 输入区域 */}
            <div className="flex items-end">
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  placeholder={
                    uploadedFile 
                      ? "点击发送开始专业文档翻译" 
                      : "输入要翻译的文本..."
                  }
                  rows={3}
                  disabled={isTranslating || !config.apiKey || !!uploadedFile}
                  className="w-full px-4 py-3 pr-28 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none disabled:bg-gray-50 disabled:text-gray-500"
                  style={{ minHeight: '80px', maxHeight: '160px' }}
                />
                
                {/* 文件上传按钮 */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.json,.epub,.po,.srt,.html,.htm,.xhtml,.xml,.zip,.xlf,.xliff,.webp,.md,.odt,.ods,.odp,.csv,.yml,.yaml,.php,.ai,.indd,.wav,.mp3,.wma,.m4a,.amr"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                {!uploadedFile && (
                  <>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isTranslating || !config.apiKey}
                      className="absolute right-20 bottom-3 p-2 text-gray-400 hover:text-gray-600 disabled:text-gray-300 transition-colors"
                    >
                      <PaperClipIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMessages([]);
                        setDocTasks([]);
                        setInputText('');
                        setUploadedFile(null);
                        setCurrentError(null);
                      }}
                      disabled={isTranslating}
                      className="absolute right-12 bottom-3 p-2 text-gray-400 hover:text-red-500 disabled:text-gray-300 transition-colors"
                      title="清空消息"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </>
                )}
                
                {/* 发送按钮 */}
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={
                    `absolute right-3 bottom-3 p-2 rounded-lg transition-all duration-200 ${
                      canSubmit 
                        ? 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 shadow-md' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`
                  }
                >
                  {isTranslating ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <PaperAirplaneIcon className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* 提示文本 */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>按 Enter 发送，Shift + Enter 换行</span>
              <div className="flex items-center space-x-2">
                {!config.apiKey && (
                  <span className="text-amber-600">请先配置 API 密钥</span>
                )}
                {uploadedFile && !isTranslating && (
                  <span className="text-purple-600">专业文档翻译</span>
                )}
                {isTranslating && (
                  <span className="text-blue-600">
                    {uploadedFile ? '专业文档翻译中...' : '翻译中...'}
                  </span>
                )}
              </div>
            </div>
          </form>
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