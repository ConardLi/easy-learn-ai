import { motion, AnimatePresence } from 'motion/react';
import { 
  GitMerge, 
  Search, 
  FileText, 
  Code, 
  ArrowRight, 
  RotateCcw,
  CheckCircle2,
  BrainCircuit,
  User
} from 'lucide-react';

export default function Chapter18({ step }: { step: number }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Scene 1: Intro (Step 0) */}
      <AnimatePresence>
        {step === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
          >
            <div className="w-24 h-24 bg-indigo-100 rounded-2xl flex items-center justify-center mb-8 border-4 border-indigo-300">
              <GitMerge className="w-12 h-12 text-indigo-600" />
            </div>
            <h2 className="text-6xl font-black text-[#43302B] mb-6">第三层：执行编排</h2>
            <p className="text-3xl text-gray-500 font-medium">
              解决核心问题：模型下一步该干什么
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 2: The Disconnected Problem (Step 1) */}
      <AnimatePresence>
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
          >
            <h3 className="text-4xl font-bold text-[#43302B] mb-8 text-center leading-relaxed">
              很多 Agent 的问题，不是某一步不会<br/>
              而是<span className="text-indigo-600 mx-2 font-black">不会把步骤串起来</span>
            </h3>
            <p className="text-2xl text-gray-500 mb-16">整个过程像想到哪做到哪，最后交出来一堆半成品</p>

            <div className="relative w-[600px] h-[300px]">
              {/* Randomly floating disconnected nodes */}
              <motion.div 
                animate={{ x: [0, 50, -20, 0], y: [0, -30, 40, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 left-10 bg-white p-4 rounded-2xl shadow-lg border-2 border-gray-200 flex items-center gap-3"
              >
                <Search className="text-blue-500" /> <span className="font-bold text-gray-600">搜索</span>
              </motion.div>
              
              <motion.div 
                animate={{ x: [0, -40, 30, 0], y: [0, 50, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-20 bg-white p-4 rounded-2xl shadow-lg border-2 border-gray-200 flex items-center gap-3"
              >
                <FileText className="text-amber-500" /> <span className="font-bold text-gray-600">总结</span>
              </motion.div>

              <motion.div 
                animate={{ x: [0, 30, -50, 0], y: [0, 20, -40, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-1/2 bg-white p-4 rounded-2xl shadow-lg border-2 border-gray-200 flex items-center gap-3"
              >
                <Code className="text-teal-500" /> <span className="font-bold text-gray-600">写代码</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 3: The Orchestration Track (Steps 2-5) */}
      <AnimatePresence>
        {step >= 2 && step <= 5 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
          >
            <h2 className="text-4xl font-bold text-[#43302B] mb-16">一个完整任务，通常至少要有这样的<span className="text-indigo-600 mx-2 font-black">轨道</span>：</h2>
            
            <div className="flex items-center justify-center gap-4 max-w-7xl w-full px-4 relative">
              
              {/* Node 1: Understand */}
              <AnimatePresence>
                {step >= 2 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5, x: -50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    className="flex flex-col items-center z-10"
                  >
                    <div className="w-24 h-24 bg-white rounded-full shadow-xl border-4 border-indigo-400 flex items-center justify-center mb-4 relative">
                      <span className="text-2xl font-black text-indigo-600">1</span>
                    </div>
                    <span className="text-xl font-bold text-gray-700">理解目标</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Arrow 1 */}
              <AnimatePresence>
                {step >= 3 && (
                  <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 60, opacity: 1 }} className="overflow-hidden flex items-center">
                    <ArrowRight className="text-indigo-300 w-12 h-12" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Node 2 & 3: Check Info & Fetch */}
              <AnimatePresence>
                {step >= 3 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5, x: -50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    className="flex flex-col items-center relative z-10"
                  >
                    <div className="w-24 h-24 bg-white rounded-full shadow-xl border-4 border-blue-400 flex items-center justify-center mb-4">
                      <span className="text-2xl font-black text-blue-600">2</span>
                    </div>
                    <span className="text-xl font-bold text-gray-700">判断信息</span>
                    
                    {/* Loop: Fetch more */}
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ delay: 0.5 }}
                      className="absolute -top-24 flex flex-col items-center"
                    >
                      <span className="text-sm font-bold text-blue-500 bg-blue-50 px-3 py-1 rounded-full mb-2 border border-blue-200">3. 不够就去补</span>
                      <RotateCcw className="text-blue-400 w-8 h-8 animate-spin-slow" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Arrow 2 */}
              <AnimatePresence>
                {step >= 4 && (
                  <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 60, opacity: 1 }} className="overflow-hidden flex items-center">
                    <ArrowRight className="text-indigo-300 w-12 h-12" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Node 4 & 5: Analyze & Generate */}
              <AnimatePresence>
                {step >= 4 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5, x: -50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    className="flex flex-col items-center z-10"
                  >
                    <div className="w-24 h-24 bg-white rounded-full shadow-xl border-4 border-amber-400 flex items-center justify-center mb-4">
                      <span className="text-2xl font-black text-amber-600">4</span>
                    </div>
                    <span className="text-xl font-bold text-gray-700">继续分析</span>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="absolute -bottom-16 flex flex-col items-center"
                    >
                      <span className="text-sm font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">5. 生成输出</span>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Arrow 3 */}
              <AnimatePresence>
                {step >= 5 && (
                  <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 60, opacity: 1 }} className="overflow-hidden flex items-center">
                    <ArrowRight className="text-indigo-300 w-12 h-12" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Node 6 & 7: Check & Retry */}
              <AnimatePresence>
                {step >= 5 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5, x: -50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    className="flex flex-col items-center relative z-10"
                  >
                    <div className="w-24 h-24 bg-white rounded-full shadow-xl border-4 border-teal-400 flex items-center justify-center mb-4">
                      <span className="text-2xl font-black text-teal-600">6</span>
                    </div>
                    <span className="text-xl font-bold text-gray-700">检查输出</span>
                    
                    {/* Loop: Retry */}
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ delay: 0.5 }}
                      className="absolute -top-24 flex flex-col items-center"
                    >
                      <span className="text-sm font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full mb-2 border border-teal-200">7. 不满足就修正</span>
                      <RotateCcw className="text-teal-400 w-8 h-8 animate-spin-slow" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 4: Conclusion (Step 6) */}
      <AnimatePresence>
        {step === 6 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-40"
          >
            <h2 className="text-5xl font-bold text-[#43302B] mb-16 text-center leading-relaxed">
              你会发现，这其实已经非常像<span className="text-indigo-600 mx-2 font-black">人在工作</span>了。
            </h2>

            <div className="flex gap-12">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-10 rounded-3xl shadow-2xl border-2 border-gray-100 flex flex-col items-center w-80"
              >
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                  <User className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="text-3xl font-black text-gray-800 mb-4">人</h3>
                <p className="text-2xl font-bold text-blue-600 bg-blue-50 px-6 py-2 rounded-xl">靠经验</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-10 rounded-3xl shadow-2xl border-2 border-indigo-200 flex flex-col items-center w-80 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-indigo-50/50" />
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6 relative z-10">
                  <BrainCircuit className="w-10 h-10 text-indigo-600" />
                </div>
                <h3 className="text-3xl font-black text-gray-800 mb-4 relative z-10">Agent</h3>
                <p className="text-2xl font-bold text-indigo-600 bg-indigo-100 px-6 py-2 rounded-xl border border-indigo-200 relative z-10">靠 Harness</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
