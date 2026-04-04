import { motion, AnimatePresence } from 'motion/react';
import { User, Bot, Sparkles, Frown, Zap } from 'lucide-react';

export default function Chapter5({ step }: { step: number }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      
      {/* Header Section (Steps 0-5) */}
      <AnimatePresence>
        {step <= 5 && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="absolute top-20 flex flex-col items-center z-10"
          >
            <h2 className="text-3xl font-bold text-gray-400 mb-6 tracking-wider">
              最早大模型火起来的时候...
            </h2>
            <AnimatePresence>
              {step >= 1 && (
                <motion.h1 
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
                  className="text-5xl font-black text-[#43302B] tracking-wide"
                >
                  同一个模型，换一种说法，<span className="text-[#8B5CF6] mx-2">结果可能差很多</span>
                </motion.h1>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison Area */}
      <motion.div 
        className="w-full max-w-6xl flex justify-center items-stretch gap-16 mt-32 z-0 relative"
        animate={{ 
          filter: step === 6 ? 'blur(16px)' : 'blur(0px)',
          opacity: step === 6 ? 0.2 : 1,
          scale: step === 6 ? 0.95 : 1
        }}
        transition={{ duration: 0.6 }}
      >
        
        {/* VS Badge */}
        <AnimatePresence>
          {step >= 4 && step <= 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white p-4 rounded-full shadow-2xl border-4 border-[#FDFBF7]"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#8B5CF6] to-[#14B8A6] rounded-full flex items-center justify-center text-white font-black text-2xl shadow-inner">
                VS
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Left Side: Basic Prompt */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 flex flex-col gap-8"
            >
              {/* User Input */}
              <div className="bg-white p-8 rounded-[2rem] rounded-tl-none shadow-lg border border-gray-100 relative">
                <div className="absolute -top-6 -left-6 bg-gray-200 p-3 rounded-full border-4 border-[#FDFBF7]">
                  <User className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-3xl text-gray-600 font-medium leading-relaxed">
                  “帮我总结这篇文章。”
                </p>
              </div>

              {/* Model Output */}
              <AnimatePresence>
                {step >= 3 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-100/50 p-8 rounded-[2rem] rounded-tr-none border border-gray-200 relative ml-12"
                  >
                    <div className="absolute -top-6 -right-6 bg-gray-300 p-3 rounded-full border-4 border-[#FDFBF7]">
                      <Bot className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="flex items-center gap-4 text-gray-400">
                      <Frown className="w-8 h-8" />
                      <p className="text-2xl font-medium">一个很平的总结...</p>
                    </div>
                    <div className="mt-6 space-y-3 opacity-30">
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Side: Advanced Prompt */}
        <AnimatePresence>
          {step >= 4 && (
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 flex flex-col gap-8"
            >
              {/* User Input */}
              <div className="bg-[#8B5CF6]/10 p-8 rounded-[2rem] rounded-tr-none shadow-xl border border-[#8B5CF6]/20 relative">
                <div className="absolute -top-6 -right-6 bg-[#8B5CF6] p-3 rounded-full border-4 border-[#FDFBF7] shadow-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl text-[#8B5CF6] font-bold leading-relaxed">
                  “请以<span className="bg-[#8B5CF6]/20 px-2 py-1 rounded">资深技术编辑</span>的身份，用<span className="bg-[#8B5CF6]/20 px-2 py-1 rounded">三段结构</span>总结这篇文章，先讲核心观点，再讲论证方式，最后讲局限性，每段<span className="bg-[#8B5CF6]/20 px-2 py-1 rounded">不超过 150 字</span>。”
                </p>
              </div>

              {/* Model Output */}
              <AnimatePresence>
                {step >= 5 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-[#14B8A6]/10 to-[#14B8A6]/5 p-8 rounded-[2rem] rounded-tl-none border border-[#14B8A6]/30 relative mr-12 shadow-lg"
                  >
                    <div className="absolute -top-6 -left-6 bg-[#14B8A6] p-3 rounded-full border-4 border-[#FDFBF7] shadow-lg">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-4 text-[#14B8A6] mb-6">
                      <Zap className="w-8 h-8" />
                      <p className="text-3xl font-bold">效果马上就不一样了！</p>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-white/60 p-4 rounded-xl border border-[#14B8A6]/20 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#14B8A6]"></div>
                        <span className="text-lg font-bold text-[#43302B]">核心观点</span>
                        <div className="h-2 bg-[#14B8A6]/20 rounded w-1/2 ml-auto"></div>
                      </div>
                      <div className="bg-white/60 p-4 rounded-xl border border-[#14B8A6]/20 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#14B8A6]"></div>
                        <span className="text-lg font-bold text-[#43302B]">论证方式</span>
                        <div className="h-2 bg-[#14B8A6]/20 rounded w-1/3 ml-auto"></div>
                      </div>
                      <div className="bg-white/60 p-4 rounded-xl border border-[#14B8A6]/20 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#14B8A6]"></div>
                        <span className="text-lg font-bold text-[#43302B]">局限性</span>
                        <div className="h-2 bg-[#14B8A6]/20 rounded w-2/3 ml-auto"></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>

      {/* Overlay: Conclusion (Step 6) */}
      <AnimatePresence>
        {step === 6 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
            className="absolute z-50 text-center bg-white/95 backdrop-blur-2xl p-20 rounded-[4rem] shadow-2xl border border-[#8B5CF6]/20 max-w-5xl"
          >
            <p className="text-4xl text-gray-500 font-medium mb-8 tracking-wide">
              所以那个阶段，大家都相信一件事：
            </p>
            <h2 className="text-6xl font-black text-[#43302B] leading-[1.4] tracking-tight">
              模型不是不会，<br/>
              而是你<span className="text-[#8B5CF6] mx-2 underline decoration-[#8B5CF6]/30 decoration-8 underline-offset-8">没有把问题说清楚</span>。
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
