/**
 * RAG学习网站的全局状态管理
 * 管理当前学习进度、动画状态、用户交互等全局状态
 */
import { atom } from 'jotai';

// 当前学习阶段
export const currentStageAtom = atom<'overview' | 'workflow' | 'architecture' | 'simulation' | 'summary'>('overview');

// RAG演示状态
export const ragDemoStateAtom = atom({
  currentStep: 0, // 0: 输入问题, 1: 检索, 2: 增强, 3: 生成
  isPlaying: false,
  userQuery: '',
  retrievedDocs: [] as string[],
  generatedAnswer: ''
});

// 用户学习进度
export const learningProgressAtom = atom({
  completedStages: [] as string[],
  currentScore: 0,
  totalTime: 0
});
