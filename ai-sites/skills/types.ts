import React from 'react';

// Defines the props that every Scene component receives
export interface SceneProps {
  isActive: boolean; // Is this the current scene being displayed?
  step: number;      // The current animation step within this scene
}

// Defines the configuration for a scene in the registry
export interface SceneConfig {
  id: string;
  component: React.FC<SceneProps>;
  title: string;
  totalSteps: number; // How many clicks does this scene consume?
}

// Context for the global presentation state
export interface PresentationContextType {
  currentSceneIndex: number;
  currentStep: number;
  direction: 1 | -1; // For transition direction
  next: () => void;
  prev: () => void;
  goToScene: (index: number) => void;
  scenes: SceneConfig[];
}