import { LucideIcon } from 'lucide-react';

export interface SectionProps {
  id: string;
  className?: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ExpertModel {
  name: string;
  creator: string;
  description: string;
  tags: string[];
}

export interface SimulationExpert {
  id: number;
  name: string;
  specialty: string;
  color: string;
  active: boolean;
}