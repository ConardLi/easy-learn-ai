/**
 * 导航状态管理
 * 管理当前激活的页面/部分，用于导航高亮和页面切换
 */
import { atom } from 'jotai';

export type NavigationSection = 'home' | 'concepts' | 'comparison' | 'details';

export const activeNavigationAtom = atom<NavigationSection>('home');
export const selectedConceptAtom = atom<'longtext' | 'knowledge' | 'finetune' | null>(null);
