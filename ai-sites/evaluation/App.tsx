import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import { SLIDES } from './constants';
import { SlideRenderer } from './components/SlideRenderer';

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const totalSlides = SLIDES.length;
  const currentSlideData = SLIDES[currentSlideIndex];

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Handle Drag / Click on Progress Bar
  const handleProgressInteract = useCallback((clientX: number) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    // Calculate percentage, clamp between 0 and 1
    const percentage = Math.max(0, Math.min(1, x / width));
    // Map to slide index range [0, totalSlides - 1]
    const newIndex = Math.round(percentage * (totalSlides - 1));
    
    if (newIndex !== currentSlideIndex) {
      setCurrentSlideIndex(newIndex);
    }
  }, [totalSlides, currentSlideIndex]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handleProgressInteract(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      handleProgressInteract(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  // Calculate width based on completion (0-indexed to 1-indexed visual)
  const progressPercentage = ((currentSlideIndex + 1) / totalSlides) * 100;

  return (
    <div className="relative w-screen h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans selection:bg-blue-500 selection:text-white">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute top-[30%] left-[30%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[100px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      {/* Main Content Area */}
      <main className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <SlideRenderer key={currentSlideIndex} data={currentSlideData} />
        </AnimatePresence>
      </main>

      {/* Controls UI */}
      <div className="absolute bottom-0 left-0 w-full p-6 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          
          {/* Progress Indicator (Draggable) */}
          <div className="flex items-center gap-4 text-sm font-mono text-gray-500 select-none">
             <span>{currentSlideIndex + 1 < 10 ? `0${currentSlideIndex + 1}` : currentSlideIndex + 1}</span>
             
             {/* Interactive Bar Container */}
             <div 
                ref={progressBarRef}
                className="w-32 h-8 flex items-center cursor-pointer group"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                title="Drag to seek"
             >
                <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden relative transition-all group-hover:h-1.5 group-active:h-1.5">
                   <motion.div 
                     className="h-full bg-blue-500 group-hover:bg-blue-400"
                     initial={false}
                     animate={{ width: `${progressPercentage}%` }}
                     transition={{ duration: isDragging ? 0.05 : 0.3, ease: "easeOut" }}
                   />
                </div>
             </div>

             <span>{totalSlides < 10 ? `0${totalSlides}` : totalSlides}</span>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button 
              onClick={prevSlide}
              disabled={currentSlideIndex === 0}
              className="p-3 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              disabled={currentSlideIndex === totalSlides - 1}
              className="p-3 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              aria-label="Next Slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
           {/* Fullscreen Toggle */}
           <div className="hidden md:block">
            <button 
                onClick={toggleFullscreen}
                className="p-3 rounded-full hover:bg-white/10 transition-colors text-gray-500 hover:text-white"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default App;