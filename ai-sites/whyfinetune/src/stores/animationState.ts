/**
 * 动画状态管理
 * 控制页面中各种动画效果的触发和状态
 */
import { atom } from 'jotai';

export const isAnimatingAtom = atom<boolean>(false);
export const visibleSectionsAtom = atom<Set<string>>(new Set());
