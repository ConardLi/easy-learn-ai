import { ReactNode } from 'react';

export enum SlideType {
  TITLE = 'TITLE',
  CONTENT_TEXT = 'CONTENT_TEXT',
  GRID_CARDS = 'GRID_CARDS',
  LIST_FEATURES = 'LIST_FEATURES',
  COMPARISON = 'COMPARISON',
  PROCESS = 'PROCESS',
  CONCLUSION = 'CONCLUSION'
}

export interface SlideData {
  id: string;
  type: SlideType;
  title: string;
  subtitle?: string;
  content?: ReactNode; // For custom complex layouts
  items?: any[]; // Flexible data for lists/grids
}

export interface NavigationProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
}