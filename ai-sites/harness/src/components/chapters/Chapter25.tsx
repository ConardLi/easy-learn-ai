import { motion, AnimatePresence } from 'motion/react';
import { 
  Lightbulb, 
  Code2, 
  Blocks, 
  Puzzle, 
  Settings2, 
  RefreshCw,
  Quote,
  Zap
} from 'lucide-react';

export default function Chapter25({ step }: { step: number }) {
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
            <div className="w-24 h-24 bg-emerald-100 rounded-2xl flex items-center justify-center mb-8 border-4 border-emerald-300">
              <Lightbulb className="w-12 h-12 text-emerald-600" />
            </div>
            <h2 className="text-6xl font-black text-[#43302B] mb-6">OpenAI 的工程哲学</h2>
            <p className="text-3xl text-gray-500 font-medium">
              重新定义“工程师在 Agent 时代的工作”
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 2: The Paradigm Shift (Step 1) */}
      <AnimatePresence>
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
          >
            <h3 className="text-5xl font-bold text-[#43302B] mb-16 text-center">
              他们有个非常有意思的思路：
            </h3>

            <div className="flex items-center gap-12">
              {/* Old Paradigm */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 0.4, x: 0 }}
                className="bg-gray-100 p-10 rounded-3xl border-4 border-gray-200 flex flex-col items-center w-80 relative"
              >
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-full h-2 bg-red-500 -rotate-12" />
                </div>
                <Code2 className="w-20 h-20 text-gray-400 mb-6" />
                <h4 className="text-3xl font-black text-gray-500">人类写代码</h4>
              </motion.div>

              <div className="text-4xl font-black text-gray-300">VS</div>

              {/* New Paradigm */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="bg-emerald-50 p-10 rounded-3xl shadow-2xl border-4 border-emerald-400 flex flex-col items-center w-96 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-emerald-100/50" />
                <Blocks className="w-20 h-20 text-emerald-600 mb-6 relative z-10" />
                <h4 className="text-3xl font-black text-emerald-700 relative z-10 text-center leading-relaxed">
                  人类主要负责<br/>设计环境
                </h4>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 3: The 3 Tasks (Steps 2-4) */}
      <AnimatePresence>
        {step >= 2 && step <= 4 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
          >
            <h2 className="text-4xl font-bold text-[#43302B] mb-16 text-center">
              具体来说，工程师的工作变成<span className="text-emerald-600 font-black mx-2">三件事</span>：
            </h2>
            
            <div className="flex gap-8 max-w-6xl w-full px-8">
              {/* Task 1 */}
              <AnimatePresence>
                {step >= 2 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 bg-white p-8 rounded-3xl shadow-xl border-t-8 border-blue-400 flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                      <Puzzle className="w-10 h-10 text-blue-500" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800 mb-4">拆解任务</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">
                      把产品目标拆成<br/>
                      <span className="text-blue-600 font-bold">Agent 能理解的小任务</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Task 2 */}
              <AnimatePresence>
                {step >= 3 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 bg-white p-8 rounded-3xl shadow-xl border-t-8 border-amber-400 flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
                      <Settings2 className="w-10 h-10 text-amber-500" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800 mb-4">补充能力</h3>
                    <p className="text-gray-500 font-medium leading-relaxed text-sm">
                      Agent 失败时，不是让它“再努力一点”，而是问<br/>
                      <span className="text-amber-600 font-bold">“环境里缺了什么能力”</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Task 3 */}
              <AnimatePresence>
                {step >= 4 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 bg-white p-8 rounded-3xl shadow-xl border-t-8 border-emerald-400 flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
                      <RefreshCw className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800 mb-4">建立反馈</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">
                      建立反馈回路，让 Agent<br/>
                      <span className="text-emerald-600 font-bold">真能看到自己工作的结果</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 4: The Quote (Step 5) */}
      <AnimatePresence>
        {step === 5 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-40"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              className="relative max-w-4xl bg-white p-16 rounded-[3rem] shadow-2xl border border-gray-100"
            >
              <Quote className="absolute top-8 left-8 w-16 h-16 text-emerald-200 rotate-180" />
              <Quote className="absolute bottom-8 right-8 w-16 h-16 text-emerald-200" />
              
              <h3 className="text-4xl font-bold text-gray-800 leading-relaxed text-center relative z-10">
                当 Agent 出问题时，<br/>
                修复方案几乎从来不是<span className="text-red-500 line-through mx-2">“更努力”</span>，<br/>
                而是<span className="text-emerald-600 font-black text-5xl mx-2 bg-emerald-50 px-4 py-2 rounded-xl">“缺了什么结构性的能力”</span>。
              </h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 5: Conclusion (Step 6) */}
      <AnimatePresence>
        {step === 6 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-50"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-32 h-32 bg-indigo-50 rounded-full flex items-center justify-center mb-8 shadow-lg border-4 border-indigo-200">
                <Zap className="w-16 h-16 text-indigo-500" />
              </div>
              <h2 className="text-6xl font-black text-[#43302B] tracking-wider">
                这其实就是 <span className="text-indigo-600">Harness 思维</span>。
              </h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
