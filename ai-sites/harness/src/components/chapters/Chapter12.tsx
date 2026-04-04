import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Route, 
  AlertTriangle, 
  Eye, 
  Shield, 
  Wrench, 
  CheckCircle2, 
  XCircle,
  Activity,
  Compass,
  FileText,
  Database
} from 'lucide-react';

export default function Chapter12({ step }: { step: number }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Scene 1: Intro (Step 0) */}
      <AnimatePresence>
        {step === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
          >
            <h2 className="text-5xl font-bold text-[#43302B] text-center leading-relaxed">
              但是，Context Engineering <span className="text-[#EF4444] mx-2">也不是终点</span>。
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 2: The Execution Problem (Step 1) */}
      <AnimatePresence>
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
          >
            <p className="text-3xl text-gray-500 font-medium mb-12">因为后来大家又发现一个更麻烦的问题：</p>
            <h2 className="text-5xl font-bold text-[#43302B] text-center leading-relaxed">
              就算信息给对了<br/>
              模型也不一定能<span className="text-[#EF4444] mx-2">稳定执行对</span>
            </h2>

            <div className="mt-16 flex items-center gap-8">
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 bg-green-100 rounded-2xl flex items-center justify-center border-4 border-green-400">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <span className="font-bold text-green-600">完美的信息输入</span>
              </div>
              
              <motion.div 
                animate={{ x: [0, 20, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Route className="w-12 h-12 text-gray-300" />
              </motion.div>

              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 bg-red-100 rounded-2xl flex items-center justify-center border-4 border-red-400 relative overflow-hidden">
                  <Brain className="w-12 h-12 text-red-500" />
                  <motion.div 
                    animate={{ rotate: [0, 10, -10, 20, -20, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="absolute inset-0 bg-red-500/20 mix-blend-overlay"
                  />
                </div>
                <span className="font-bold text-red-600">混乱的执行过程</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 3: The Path of Execution Failures (Step 2) */}
      <AnimatePresence>
        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
          >
            <h2 className="text-4xl font-bold text-[#43302B] mb-20">它可能在长链路中发生各种意外：</h2>
            
            <div className="relative w-[800px] h-[300px]">
              {/* Target Path (Dashed) */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 300">
                <path 
                  d="M 50 150 L 750 150" 
                  stroke="#E5E7EB" 
                  strokeWidth="4" 
                  strokeDasharray="10 10" 
                  fill="none" 
                />
                
                {/* Actual Path (Solid Red, Deviating) */}
                <motion.path 
                  d="M 50 150 L 200 150 Q 300 150 350 80 T 500 40 Q 600 0 650 120 T 750 250" 
                  stroke="#EF4444" 
                  strokeWidth="6" 
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 4, ease: "linear" }}
                />
              </svg>

              {/* Waypoints & Errors */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="absolute left-[180px] top-[160px] flex flex-col items-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mb-2" />
                <span className="bg-white/90 px-3 py-1 rounded-lg text-sm font-bold text-red-600 shadow-sm border border-red-100 whitespace-nowrap">计划挺好，执行跑偏</span>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute left-[330px] top-[40px] flex flex-col items-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mb-2" />
                <span className="bg-white/90 px-3 py-1 rounded-lg text-sm font-bold text-red-600 shadow-sm border border-red-100 whitespace-nowrap">理解错工具返回</span>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="absolute left-[480px] top-[0px] flex flex-col items-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mb-2" />
                <span className="bg-white/90 px-3 py-1 rounded-lg text-sm font-bold text-red-600 shadow-sm border border-red-100 whitespace-nowrap">一步错，一路错</span>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }} className="absolute left-[700px] top-[260px] flex flex-col items-center">
                <div className="w-6 h-6 bg-red-600 rounded-full mb-2 animate-ping absolute" />
                <div className="w-6 h-6 bg-red-600 rounded-full mb-2 relative z-10" />
                <div className="bg-white/90 px-4 py-2 rounded-xl text-sm font-bold text-red-600 shadow-lg border border-red-200 text-center whitespace-nowrap">
                  状态完全失真<br/>
                  <span className="text-xs text-gray-500 font-normal">(表面自信度: 99%)</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 4: Input vs Execution (Step 3) */}
      <AnimatePresence>
        {step === 3 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-40"
          >
            <h2 className="text-4xl font-bold text-[#43302B] mb-16">你会发现，之前的努力都在解决<span className="text-[#3B82F6] mx-2">输入侧</span>的问题：</h2>
            
            <div className="flex items-stretch gap-12 w-full max-w-5xl">
              {/* Input Side */}
              <div className="flex-1 bg-blue-50/50 rounded-3xl p-8 border-2 border-blue-100 flex flex-col gap-6 relative">
                <div className="absolute -top-4 left-8 bg-blue-500 text-white px-4 py-1 rounded-full font-bold text-sm">输入侧 (Input)</div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-xl"><FileText className="w-6 h-6 text-blue-600" /></div>
                  <div>
                    <div className="text-xl font-bold text-gray-800">Prompt</div>
                    <div className="text-blue-600 font-medium">优化意图表达</div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-xl"><Database className="w-6 h-6 text-blue-600" /></div>
                  <div>
                    <div className="text-xl font-bold text-gray-800">Context</div>
                    <div className="text-blue-600 font-medium">优化信息供给</div>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center">
                <motion.div animate={{ x: [0, 10, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                  <Route className="w-12 h-12 text-gray-300" />
                </motion.div>
              </div>

              {/* Execution Side */}
              <div className="flex-1 bg-red-50/50 rounded-3xl p-8 border-2 border-red-100 flex flex-col items-center justify-center relative">
                <div className="absolute -top-4 left-8 bg-red-500 text-white px-4 py-1 rounded-full font-bold text-sm">执行侧 (Execution)</div>
                
                <Activity className="w-16 h-16 text-red-400 mb-4" />
                <div className="text-2xl font-bold text-red-600 text-center">
                  连续行动中的<br/>不确定性
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 5: The Ultimate Question (Step 4) */}
      <AnimatePresence>
        {step === 4 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-50"
          >
            <p className="text-3xl text-gray-500 font-medium mb-12">但复杂任务还有一个更难的问题：</p>
            <h2 className="text-5xl font-bold text-[#43302B] text-center leading-relaxed mb-16">
              当模型开始连续行动的时候<br/>
              谁来持续...
            </h2>

            <div className="flex gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="bg-white/80 backdrop-blur-md px-10 py-8 rounded-3xl shadow-xl border-2 border-indigo-100 flex flex-col items-center gap-4"
              >
                <Eye className="w-12 h-12 text-indigo-500" />
                <span className="text-3xl font-black text-indigo-600">监督它</span>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, type: 'spring' }}
                className="bg-white/80 backdrop-blur-md px-10 py-8 rounded-3xl shadow-xl border-2 border-amber-100 flex flex-col items-center gap-4"
              >
                <Shield className="w-12 h-12 text-amber-500" />
                <span className="text-3xl font-black text-amber-600">约束它</span>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, type: 'spring' }}
                className="bg-white/80 backdrop-blur-md px-10 py-8 rounded-3xl shadow-xl border-2 border-teal-100 flex flex-col items-center gap-4"
              >
                <Compass className="w-12 h-12 text-teal-500" />
                <span className="text-3xl font-black text-teal-600">纠偏它</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 6: Transition to Stage 3 (Step 5) */}
      <AnimatePresence>
        {step === 5 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-50"
          >
            <motion.div
              animate={{ 
                boxShadow: ['0 0 0px rgba(139,92,246,0)', '0 0 100px rgba(139,92,246,0.5)', '0 0 0px rgba(139,92,246,0)']
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="bg-white px-16 py-10 rounded-[3rem] border-4 border-[#8B5CF6] flex flex-col items-center"
            >
              <p className="text-3xl text-gray-500 font-medium mb-6">这时候，</p>
              <h2 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6]">
                第三阶段就来了
              </h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
