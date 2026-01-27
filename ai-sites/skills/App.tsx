import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SCENE_REGISTRY, COLORS } from './constants';
import { ProgressBar } from './components/ProgressBar';
import { TextureOverlay } from './components/TextureOverlay';
import { HelpTip } from './components/HelpTip';

export default function App() {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const currentSceneConfig = SCENE_REGISTRY[currentSceneIndex];

  // Logic to advance the presentation
  const next = useCallback(() => {
    const scene = SCENE_REGISTRY[currentSceneIndex];
    if (currentStep < scene.totalSteps - 1) {
      // Advance step within current scene
      setCurrentStep((s) => s + 1);
    } else if (currentSceneIndex < SCENE_REGISTRY.length - 1) {
      // Advance to next scene
      setDirection(1);
      setCurrentSceneIndex((prev) => prev + 1);
      setCurrentStep(0);
    }
  }, [currentSceneIndex, currentStep]);

  // Logic to go back
  const prev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    } else if (currentSceneIndex > 0) {
      setDirection(-1);
      setCurrentSceneIndex((prev) => prev - 1);
      // When going back to previous scene, start at its end? 
      // Simplified: Start at beginning of previous scene to avoid confusion
      setCurrentStep(0); 
    }
  }, [currentSceneIndex, currentStep]);

  const goToScene = (index: number) => {
    setDirection(index > currentSceneIndex ? 1 : -1);
    setCurrentSceneIndex(index);
    setCurrentStep(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        next();
      } else if (e.key === 'ArrowLeft') {
        prev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev]);

  const CurrentSceneComponent = currentSceneConfig.component;

  return (
    <div 
      className="relative w-full h-screen overflow-hidden selection:bg-yellow-200 selection:text-black cursor-pointer"
      style={{ backgroundColor: COLORS.bg }}
      onClick={next}
    >
      {/* Background Texture */}
      <TextureOverlay />

      {/* Main Stage */}
      <div className="relative w-full h-full flex items-center justify-center p-8 md:p-16">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSceneIndex}
            custom={direction}
            initial={{ x: direction * 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full h-full max-w-6xl mx-auto flex flex-col items-center justify-center"
            // Stop click propagation on the scene content if interactable elements exist, 
            // but here we want the whole screen to be a clicker.
          >
             <CurrentSceneComponent 
                isActive={true} 
                step={currentStep} 
             />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* UI Controls */}
      <div onClick={(e) => e.stopPropagation()}>
        <HelpTip />
        <ProgressBar 
          scenes={SCENE_REGISTRY}
          currentIndex={currentSceneIndex}
          onSeek={goToScene}
        />
      </div>
    </div>
  );
}