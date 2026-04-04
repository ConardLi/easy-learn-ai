import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  TrendingUp, 
  Bot, 
  Sparkles, 
  Code2, 
  Zap, 
  Clock, 
  Music,
  Gamepad2
} from 'lucide-react';

export default function Chapter22({ step }: { step: number }) {
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
              <Trophy className="w-12 h-12 text-indigo-600" />
            </div>
            <h2 className="text-6xl font-black text-[#43302B] mb-6">一线公司的真实实践</h2>
            <p className="text-3xl text-gray-500 font-medium">
              从概念走向生产环境
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 2: Not just theory (Step 1) */}
      <AnimatePresence>
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
          >
            <h3 className="text-4xl font-bold text-[#43302B] mb-8 text-center leading-relaxed">
              Harness 突然火起来，<span className="text-indigo-600 font-black">不是大家在空谈方法论</span>
            </h3>
            <p className="text-3xl text-gray-500 mb-12 text-center leading-relaxed">
              而是 OpenAI、Anthropic、LangChain 这些公司<br/>
              都已经把它做进<span className="text-gray-800 font-bold">产品和工程体系</span>里了。
            </p>
            <div className="flex gap-6">
              <span className="px-6 py-3 bg-gray-100 text-gray-600 font-black text-2xl rounded-xl border-2 border-gray-200">LangChain</span>
              <span className="px-6 py-3 bg-gray-100 text-gray-600 font-black text-2xl rounded-xl border-2 border-gray-200">OpenAI</span>
              <span className="px-6 py-3 bg-gray-100 text-gray-600 font-black text-2xl rounded-xl border-2 border-gray-200">Anthropic</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 3: The 3 Cases (Steps 2-4) */}
      <AnimatePresence>
        {step >= 2 && step <= 4 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
          >
            <h2 className="text-4xl font-bold text-[#43302B] mb-12 text-center">
              我们看看他们都用 Harness 做成了啥：
            </h2>
            
            <div className="flex gap-8 max-w-7xl w-full px-8">
              
              {/* Case 1: LangChain */}
              <AnimatePresence>
                {step >= 2 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 bg-white p-8 rounded-3xl shadow-xl border-t-8 border-blue-500 flex flex-col relative overflow-hidden"
                  >
                    <div className="absolute -right-10 -top-10 opacity-5">
                      <TrendingUp className="w-64 h-64" />
                    </div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                        <TrendingUp className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-3xl font-black text-gray-800">LangChain</h3>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-xl text-gray-600 font-medium leading-relaxed">
                        在底层模型<span className="text-blue-600 font-bold">完全不变</span>的情况下，仅仅通过改造和迭代 Harness。
                      </p>
                    </div>

                    <div className="mt-auto bg-blue-50 p-6 rounded-2xl border border-blue-100">
                      <p className="text-sm text-blue-600 font-bold mb-2">Terminal Bench 2.0 排名</p>
                      <div className="flex items-end gap-4">
                        <span className="text-3xl font-black text-gray-400 line-through">30+</span>
                        <motion.div 
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.5, type: "spring" }}
                          className="flex items-center gap-2 text-blue-600"
                        >
                          <Zap className="w-6 h-6 fill-current" />
                          <span className="text-5xl font-black">Top 5</span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Case 2: OpenAI */}
              <AnimatePresence>
                {step >= 3 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 bg-white p-8 rounded-3xl shadow-xl border-t-8 border-emerald-500 flex flex-col relative overflow-hidden"
                  >
                    <div className="absolute -right-10 -top-10 opacity-5">
                      <Bot className="w-64 h-64" />
                    </div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center">
                        <Bot className="w-8 h-8 text-emerald-600" />
                      </div>
                      <h3 className="text-3xl font-black text-gray-800">OpenAI</h3>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-xl text-gray-600 font-medium leading-relaxed">
                        仅几名人类工程师，用 Agent 从零构建了<span className="text-emerald-600 font-bold">超百万行代码</span>的生产级应用。
                      </p>
                    </div>

                    <div className="mt-auto flex flex-col gap-3">
                      <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex items-center gap-4">
                        <Code2 className="w-8 h-8 text-emerald-500" />
                        <div>
                          <p className="text-sm text-emerald-600 font-bold">代码编写</p>
                          <p className="text-2xl font-black text-gray-800">100% 由智能体完成</p>
                        </div>
                      </div>
                      <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex items-center gap-4">
                        <Clock className="w-8 h-8 text-emerald-500" />
                        <div>
                          <p className="text-sm text-emerald-600 font-bold">开发耗时</p>
                          <p className="text-2xl font-black text-gray-800">仅为人工的 1/10</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Case 3: Anthropic */}
              <AnimatePresence>
                {step >= 4 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 bg-white p-8 rounded-3xl shadow-xl border-t-8 border-purple-500 flex flex-col relative overflow-hidden"
                  >
                    <div className="absolute -right-10 -top-10 opacity-5">
                      <Sparkles className="w-64 h-64" />
                    </div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-purple-600" />
                      </div>
                      <h3 className="text-3xl font-black text-gray-800">Anthropic</h3>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-xl text-gray-600 font-medium leading-relaxed">
                        构建了完全自主编码系统。凭<span className="text-purple-600 font-bold">一句自然语言</span>，无需人工干预连续运行数小时。
                      </p>
                    </div>

                    <div className="mt-auto bg-purple-50 p-6 rounded-2xl border border-purple-100">
                      <p className="text-sm text-purple-600 font-bold mb-4">最终交付成果</p>
                      <div className="flex flex-col gap-3">
                        <motion.div 
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.6 }}
                          className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm"
                        >
                          <Gamepad2 className="w-6 h-6 text-purple-500" />
                          <span className="text-lg font-bold text-gray-800">完整的游戏编辑器</span>
                        </motion.div>
                        <motion.div 
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.8 }}
                          className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm"
                        >
                          <Music className="w-6 h-6 text-purple-500" />
                          <span className="text-lg font-bold text-gray-800">数字音频工作站 (DAW)</span>
                        </motion.div>
                      </div>
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
