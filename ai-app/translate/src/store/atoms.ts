/**
 * 全局状态管理
 * 使用 jotai 管理应用的全局状态，包括用户配置、翻译历史等
 */
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// 用户配置
export interface UserConfig {
  apiKey: string;
  sourceLang: string;
  targetLang: string;
  strategy: string;
}

// 翻译消息
export interface TranslationMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: number;
  isStreaming?: boolean;
  isDocTranslation?: boolean; // 新增：标识是否为专业文档翻译
  asyncId?: string; // 新增：异步任务ID
  translationStatus?: 'pending' | 'processing' | 'success' | 'failed'; // 新增：翻译状态
  downloadLinks?: Array<{ // 新增：下载链接
    url: string;
    type: 'original' | 'translated' | 'bilingual';
    label: string;
  }>;
}

// 翻译策略
export interface TranslationStrategy {
  id: string;
  name: string;
  description: string;
}

// 异步翻译任务状态
export interface DocTranslationTask {
  id: string;
  asyncId: string;
  fileName: string;
  status: 'pending' | 'processing' | 'success' | 'failed';
  startTime: number;
  endTime?: number;
  downloadLinks?: Array<{
    url: string;
    type: 'original' | 'translated' | 'bilingual';
    label: string;
  }>;
  error?: string;
}

// 持久化用户配置
export const userConfigAtom = atomWithStorage<UserConfig>('user-config', {
  apiKey: '',
  sourceLang: 'auto',
  targetLang: 'zh-CN',
  strategy: 'general'
});

// 翻译历史消息
export const messagesAtom = atom<TranslationMessage[]>([]);

// 当前是否正在翻译
export const isTranslatingAtom = atom<boolean>(false);

// 当前上传的文件
export const uploadedFileAtom = atom<File | null>(null);

// 当前流式响应的消息ID
export const streamingMessageIdAtom = atom<string | null>(null);

// 专业文档翻译任务列表
export const docTranslationTasksAtom = atom<DocTranslationTask[]>([]);