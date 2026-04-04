import { motion, AnimatePresence } from 'motion/react';
import { 
  BrainCircuit, 
  ArchiveRestore, 
  RefreshCcw, 
  Cpu, 
  Power, 
  FileSymlink,
  AlertTriangle,
  Zap
} from 'lucide-react';

export default function Chapter23({ step }: { step: number }) {
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
            <div className="w-24 h-24 bg-purple-100 rounded-2xl flex items-center justify-center mb-8 border-4 border-purple-300">
              <BrainCircuit className="w-12 h-12 text-purple-600" />
            </div>
            <h2 className="text-6xl font-black text-[#43302B] mb-6">长程任务的深度洞察</h2>
            <p className="text-3xl text-gray-500 font-medium">
              Anthropic 发现的第一个典型问题
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 2: Context Anxiety (Step 1) */}
      <AnimatePresence>
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
          >
            <h3 className="text-5xl font-bold text-[#43302B] mb-12 text-center">
              这个问题叫：<span className="text-purple-600 font-black mx-2">上下文焦虑</span>
            </h3>

            <div className="flex items-center gap-16">
              {/* Context Window Visual */}
              <div className="relative w-64 h-80 border-4 border-gray-300 rounded-3xl p-4 flex flex-col justify-end overflow-hidden bg-gray-50">
                <div className="absolute top-2 left-0 w-full text-center text-gray-400 font-bold text-sm">上下文窗口</div>
                
                {/* Filling blocks */}
                <motion.div 
                  initial={{ height: "0%" }}
                  animate={{ height: "95%" }}
                  transition={{ duration: 2, ease: "linear" }}
                  className="w-full bg-gradient-to-t from-purple-400 to-rose-500 rounded-xl relative"
                >
                  {/* Shaking effect when full */}
                  <motion.div
                    animate={{ x: [-2, 2, -2, 2, 0], y: [-1, 1, -1, 1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: 1.8 }}
                    className="absolute inset-0 bg-rose-500/30 rounded-xl"
                  />
                </motion.div>
              </div>

              <div className="flex flex-col gap-6">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white p-4 rounded-2xl shadow-md border-l-4 border-rose-400 text-xl font-bold text-gray-700 flex items-center gap-3"
                >
                  <AlertTriangle className="text-rose-500 w-6 h-6" /> 丢细节、丢重点
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 }}
                  className="bg-white p-4 rounded-2xl shadow-md border-l-4 border-rose-500 text-xl font-bold text-gray-700 flex items-center gap-3"
                >
                  <AlertTriangle className="text-rose-600 w-6 h-6" /> 感觉装不下，着急收尾
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 3: Context Compaction (Step 2) */}
      <AnimatePresence>
        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
          >
            <h3 className="text-4xl font-bold text-[#43302B] mb-12 text-center">
              常规解法：<span className="text-blue-600 font-black mx-2">Context Compaction</span>
            </h3>

            <div className="flex items-center gap-16">
              {/* Compaction Visual */}
              <div className="relative w-64 h-80 border-4 border-gray-300 rounded-3xl p-4 flex flex-col justify-end overflow-hidden bg-gray-50">
                <motion.div 
                  initial={{ height: "95%" }}
                  animate={{ height: "40%" }}
                  transition={{ duration: 1, type: "spring" }}
                  className="w-full bg-slate-700 rounded-xl flex items-center justify-center relative overflow-hidden"
                >
                  <ArchiveRestore className="text-slate-400 w-12 h-12 absolute opacity-50" />
                </motion.div>
                {/* Still shaking slightly to show burden */}
                <motion.div
                  animate={{ x: [-1, 1, -1] }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                  className="absolute bottom-4 left-4 right-4 h-[40%] bg-rose-900/20 rounded-xl pointer-events-none"
                />
              </div>

              <div className="flex flex-col gap-6 max-w-md">
                <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-blue-100">
                  <p className="text-2xl font-bold text-gray-800 mb-2">把历史压缩一下继续跑</p>
                  <p className="text-lg text-gray-500">但 Anthropic 发现，这还不够。</p>
                </div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="bg-rose-50 p-6 rounded-2xl shadow-md border-2 border-rose-200"
                >
                  <p className="text-xl font-bold text-rose-700">
                    压缩只是“变短了”，<br/>不代表那种负担感真的消失了。
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 4: Context Reset (Step 3) */}
      <AnimatePresence>
        {step === 3 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-40"
          >
            <h3 className="text-4xl font-bold text-[#43302B] mb-16 text-center">
              Anthropic 的激进解法：<span className="text-emerald-600 font-black mx-2">Context Reset</span>
            </h3>

            <div className="flex items-center justify-center gap-8 w-full max-w-5xl">
              {/* Old Agent */}
              <motion.div 
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 0.3, scale: 0.9, filter: "grayscale(100%)" }}
                transition={{ delay: 1, duration: 1 }}
                className="w-64 h-80 bg-white rounded-3xl shadow-xl border-4 border-gray-200 flex flex-col items-center justify-center relative"
              >
                <BrainCircuit className="w-20 h-20 text-gray-400 mb-4" />
                <span className="text-xl font-bold text-gray-500">旧 Agent (已满载)</span>
              </motion.div>

              {/* Handover */}
              <div className="flex flex-col items-center relative w-48">
                <motion.div 
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 50, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="absolute z-10 bg-emerald-100 p-4 rounded-full shadow-lg border-2 border-emerald-300 flex items-center justify-center"
                >
                  <FileSymlink className="w-10 h-10 text-emerald-600" />
                </motion.div>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-6 overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="h-full bg-emerald-400"
                  />
                </div>
                <span className="text-emerald-600 font-bold mt-4 text-lg">交接工作状态</span>
              </div>

              {/* New Agent */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1, type: "spring" }}
                className="w-64 h-80 bg-white rounded-3xl shadow-2xl border-4 border-emerald-400 flex flex-col items-center justify-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-emerald-50/50" />
                <RefreshCcw className="w-20 h-20 text-emerald-500 mb-4 relative z-10" />
                <span className="text-xl font-bold text-emerald-700 relative z-10">新 Agent (干净上下文)</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 5: The Analogy (Step 4) */}
      <AnimatePresence>
        {step === 4 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-50"
          >
            <h3 className="text-4xl font-bold text-[#43302B] mb-16 text-center">
              这个思路特别像什么？
            </h3>

            <div className="flex gap-12 items-center">
              <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-gray-100 flex flex-col items-center w-80">
                <Cpu className="w-16 h-16 text-rose-500 mb-6" />
                <h4 className="text-2xl font-black text-gray-800 mb-2">遇到内存泄漏</h4>
                <p className="text-gray-500 font-medium">系统越来越卡顿</p>
              </div>

              <div className="flex flex-col gap-6">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-gray-50 p-6 rounded-2xl border-2 border-gray-200 flex items-center gap-4 opacity-50 relative"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-1 bg-gray-400 -rotate-6" />
                  </div>
                  <ArchiveRestore className="w-8 h-8 text-gray-500" />
                  <span className="text-xl font-bold text-gray-600">继续清缓存 (Compaction)</span>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-emerald-50 p-6 rounded-2xl border-2 border-emerald-400 flex items-center gap-4 shadow-lg"
                >
                  <Power className="w-8 h-8 text-emerald-600" />
                  <span className="text-2xl font-black text-emerald-700">直接重启进程 (Reset)</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 6: Conclusion (Step 5) */}
      <AnimatePresence>
        {step === 5 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-50"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="bg-white p-12 rounded-[3rem] shadow-2xl border-4 border-indigo-100 flex flex-col items-center text-center max-w-4xl relative overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 opacity-5">
                <Zap className="w-64 h-64 text-indigo-500" />
              </div>
              <h2 className="text-5xl font-bold text-gray-800 leading-relaxed relative z-10">
                这其实就是一个非常典型的<br/>
                <span className="text-indigo-600 font-black text-7xl mt-4 block">Harness 设计</span>
              </h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
