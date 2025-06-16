/**
 * GPT 学习网站的全局状态管理
 * 管理当前学习进度、选中的概念、动画状态等
 */
import { atom } from 'jotai';

export interface GPTConcept {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface LearningProgress {
  currentSection: string;
  completedConcepts: string[];
  totalConcepts: number;
}

// 当前学习进度状态
export const learningProgressAtom = atom<LearningProgress>({
  currentSection: 'overview',
  completedConcepts: [],
  totalConcepts: 12
});

// 当前选中的 GPT 概念
export const selectedConceptAtom = atom<string>('decoder-only');

// 动画播放状态
export const animationPlayingAtom = atom<boolean>(false);

// GPT 模型数据
export const gptModelsDataAtom = atom([
  {
    name: 'GPT-1',
    params: 0.12,
    layers: 12,
    hiddenSize: 3072,
    heads: 12,
    dataSize: 5,
    year: 2018
  },
  {
    name: 'GPT-2',
    params: 1.5,
    layers: 48,
    hiddenSize: 6400,
    heads: 25,
    dataSize: 40,
    year: 2019
  },
  {
    name: 'GPT-3',
    params: 175,
    layers: 96,
    hiddenSize: 49152,
    heads: 96,
    dataSize: 570,
    year: 2020
  }
]);
