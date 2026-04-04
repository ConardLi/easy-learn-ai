import { motion, AnimatePresence } from 'motion/react';
import { 
  Link, 
  Brain, 
  Shield, 
  Anchor, 
  RefreshCcw, 
  Settings, 
  Bot 
} from 'lucide-react';

export default function Chapter13({ step }: { step: number }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Scene 1: Etymology (Step 0) */}
      <AnimatePresence>
        {step === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
          >
            <Link className="w-24 h-24 text-[#8B5CF6] mb-8" />
            <h2 className="text-8xl font-black text-[#43302B] tracking-widest uppercase mb-8">Harness</h2>
            <p className="text-4xl text-gray-500 tracking-[0.5em] font-medium">
              缰绳 · 马具 · 约束装置
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 2: The Shift (Steps 1-2) */}
      <AnimatePresence>
        {step >= 1 && step <= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
          >
            <motion.h3
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: step === 2 ? -250 : 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="text-4xl font-bold text-gray-500 text-center leading-relaxed"
            >
              当模型从“回答问题”走向“执行任务”<br/>
              <AnimatePresence>
                {step === 2 && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-5xl font-black text-[#43302B] block mt-6"
                  >
                    系统不能只负责喂信息，还要负责<span className="text-[#8B5CF6] mx-2">驾驭过程</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.h3>

            {/* Orbit Animation */}
            <AnimatePresence>
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-10 w-[400px] h-[400px] flex items-center justify-center"
                >
                  {/* Center System */}
                  <div className="w-24 h-24 bg-gray-800 rounded-full z-10 flex items-center justify-center shadow-2xl border-4 border-gray-700">
                    <Settings className="text-white w-12 h-12 animate-[spin_4s_linear_infinite]" />
                  </div>
                  
                  {/* Orbiting Agent */}
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }} 
                    className="absolute inset-0"
                  >
                    {/* Tether */}
                    <div className="absolute top-1/2 left-1/2 w-1/2 h-2 bg-gradient-to-r from-gray-800 to-[#8B5CF6] origin-left -translate-y-1/2" />
                    {/* Agent */}
                    <div className="absolute top-1/2 right-0 w-20 h-20 bg-[#8B5CF6] rounded-full -translate-y-1/2 flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.6)] border-4 border-white">
                      <Bot className="text-white w-10 h-10" />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 3: Comparison (Steps 3-4) */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
          >
            <motion.h2 
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-black text-[#43302B] mb-16"
            >
              这就是 Harness Engineering 的出发点
            </motion.h2>

            <div className="flex w-full max-w-6xl gap-12">
              {/* Left: Previous Gens */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1 bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col items-center text-center"
              >
                <h3 className="text-2xl text-gray-500 font-bold mb-12">前两代工程方法<br/>(Prompt & Context)</h3>
                <div className="flex-1 flex flex-col items-center justify-center gap-8">
                  <div className="relative">
                    <Brain className="w-32 h-32 text-blue-500 relative z-10" />
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-blue-400 rounded-full blur-xl"
                    />
                  </div>
                  <p className="text-4xl font-bold text-[#43302B]">
                    怎么让模型<br/><span className="text-blue-500 text-5xl mt-4 inline-block">更会想</span>
                  </p>
                </div>
              </motion.div>

              {/* Right: Harness */}
              <AnimatePresence>
                {step >= 4 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex-1 bg-gradient-to-br from-[#8B5CF6]/10 to-[#3B82F6]/10 p-12 rounded-[3rem] shadow-2xl border-4 border-[#8B5CF6] flex flex-col items-center text-center relative overflow-hidden"
                  >
                    <h3 className="text-2xl text-[#8B5CF6] font-black mb-12 uppercase tracking-wider">Harness Engineering</h3>
                    <p className="text-3xl font-bold text-[#43302B] mb-10">怎么让模型：</p>
                    
                    <div className="flex flex-col gap-6 w-full">
                      <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-md">
                        <div className="p-3 bg-teal-100 rounded-xl"><Shield className="text-teal-600 w-8 h-8"/></div>
                        <span className="text-3xl font-bold text-gray-800">别跑偏</span>
                      </motion.div>
                      
                      <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-md">
                        <div className="p-3 bg-blue-100 rounded-xl"><Anchor className="text-blue-600 w-8 h-8"/></div>
                        <span className="text-3xl font-bold text-gray-800">跑得稳</span>
                      </motion.div>
                      
                      <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-md">
                        <div className="p-3 bg-amber-100 rounded-xl"><RefreshCcw className="text-amber-600 w-8 h-8"/></div>
                        <span className="text-3xl font-bold text-gray-800">出了错还能拉回来</span>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
