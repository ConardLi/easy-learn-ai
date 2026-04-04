import { motion, AnimatePresence } from 'motion/react';
import { 
  Lightbulb, 
  Brain, 
  Sparkles, 
  ArrowRight, 
  Settings, 
  ShieldCheck, 
  Compass,
  Rocket
} from 'lucide-react';

export default function Chapter30({ step }: { step: number }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Scene 1: The Reality (Step 0) */}
      <AnimatePresence>
        {step === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
          >
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="mb-8"
            >
              <Lightbulb className="w-24 h-24 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
            </motion.div>
            <h2 className="text-5xl font-black text-[#43302B] tracking-wide">
              到了现在这个阶段呢
            </h2>
            <h3 className="text-4xl font-bold text-gray-500 mt-6">
              我们也看清了一个<span className="text-amber-600 mx-2">现实</span>
            </h3>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 2: The Core Challenge (Step 1) */}
      <AnimatePresence>
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
          >
            <div className="bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
              <h1 className="text-7xl font-black tracking-widest drop-shadow-sm">
                AI 落地的核心挑战
              </h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 3: The Paradigm Shift (Steps 2-3) */}
      <AnimatePresence>
        {step >= 2 && step <= 3 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
          >
            <h2 className="text-4xl font-black text-gray-800 mb-16">核心挑战正在发生<span className="text-indigo-600 mx-2">转移</span></h2>
            
            <div className="flex items-center gap-8 w-full max-w-6xl px-12">
              
              {/* From: Look Smart */}
              <AnimatePresence>
                {step >= 2 && (
                  <motion.div 
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex-1 bg-purple-50 p-10 rounded-[3rem] border-4 border-purple-200 shadow-xl flex flex-col items-center text-center relative overflow-hidden group"
                  >
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-20 bg-gradient-to-tr from-purple-200 to-pink-200 opacity-30 blur-2xl group-hover:opacity-50 transition-opacity"
                    />
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="relative mb-6">
                        <Brain className="w-20 h-20 text-purple-500" />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute -top-2 -right-2"
                        >
                          <Sparkles className="w-8 h-8 text-pink-400" />
                        </motion.div>
                      </div>
                      <span className="text-2xl font-bold text-purple-400 mb-2">过去</span>
                      <h3 className="text-4xl font-black text-purple-800 leading-tight">
                        让模型看起来<br/>聪明
                      </h3>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Arrow */}
              <AnimatePresence>
                {step >= 3 && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center"
                  >
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-16 h-16 text-gray-400" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* To: Work Stably */}
              <AnimatePresence>
                {step >= 3 && (
                  <motion.div 
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex-1 bg-emerald-50 p-10 rounded-[3rem] border-4 border-emerald-400 shadow-2xl flex flex-col items-center text-center relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="flex items-center gap-2 mb-6">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
                          <Settings className="w-12 h-12 text-emerald-600" />
                        </motion.div>
                        <ShieldCheck className="w-16 h-16 text-emerald-500" />
                      </div>
                      <span className="text-2xl font-bold text-emerald-500 mb-2">现在与未来</span>
                      <h3 className="text-4xl font-black text-emerald-800 leading-tight">
                        让模型在真实世界里<br/>稳定工作
                      </h3>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 4: Final Message (Step 4) */}
      <AnimatePresence>
        {step === 4 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-40 bg-[#FDFBF7]"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", bounce: 0.4, duration: 1 }}
              className="bg-white p-16 rounded-[4rem] shadow-2xl border-2 border-gray-100 flex flex-col items-center text-center max-w-5xl relative overflow-hidden"
            >
              {/* Decorative background elements */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-emerald-400 to-amber-400" />
              <Compass className="absolute -bottom-10 -right-10 w-64 h-64 text-gray-50 opacity-50 rotate-12" />
              
              <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-8 relative z-10">
                <Rocket className="w-12 h-12 text-indigo-500" />
              </div>
              
              <h2 className="text-5xl font-black text-[#43302B] leading-relaxed relative z-10">
                如果你最近也在做 <span className="text-indigo-600 bg-indigo-50 px-4 py-1 rounded-xl">Agent</span>
              </h2>
              
              <p className="text-3xl font-bold text-gray-500 mt-8 relative z-10">
                我觉得这件事，值得你<span className="text-emerald-600 font-black mx-2 border-b-4 border-emerald-300 pb-1">尽早想明白</span>。
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
