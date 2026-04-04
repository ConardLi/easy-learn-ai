import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Database, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Rocket, 
  Anchor, 
  Target,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function Chapter29({ step }: { step: number }) {
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
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Target className="w-24 h-24 text-amber-500 mb-8" />
            </motion.div>
            <h2 className="text-5xl font-black text-[#43302B] mb-6 text-center leading-tight">
              如果把今天的内容<br/>
              <span className="text-amber-600">全部压缩成一句话</span>
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 2: The Three Pillars (Steps 1-3) */}
      <AnimatePresence>
        {step >= 1 && step <= 3 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
          >
            <div className="flex flex-col gap-6 w-full max-w-4xl">
              {/* Prompt */}
              <AnimatePresence>
                {step >= 1 && (
                  <motion.div 
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="bg-blue-50 border-l-8 border-blue-500 p-8 rounded-2xl shadow-lg flex items-center gap-8"
                  >
                    <div className="bg-blue-100 p-4 rounded-xl">
                      <MessageSquare className="w-10 h-10 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-blue-800 mb-2">Prompt Engineering</h3>
                      <p className="text-2xl text-gray-600 font-bold">解决的是 <span className="text-blue-600 bg-blue-100 px-3 py-1 rounded-lg">怎么把任务讲清楚</span></p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Context */}
              <AnimatePresence>
                {step >= 2 && (
                  <motion.div 
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="bg-purple-50 border-l-8 border-purple-500 p-8 rounded-2xl shadow-lg flex items-center gap-8"
                  >
                    <div className="bg-purple-100 p-4 rounded-xl">
                      <Database className="w-10 h-10 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-purple-800 mb-2">Context Engineering</h3>
                      <p className="text-2xl text-gray-600 font-bold">解决的是 <span className="text-purple-600 bg-purple-100 px-3 py-1 rounded-lg">怎么把信息给对</span></p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Harness */}
              <AnimatePresence>
                {step >= 3 && (
                  <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-emerald-50 border-l-8 border-emerald-500 p-8 rounded-2xl shadow-2xl flex items-center gap-8 relative overflow-hidden"
                  >
                    <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-200 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/4" />
                    <div className="bg-emerald-100 p-4 rounded-xl relative z-10">
                      <ShieldCheck className="w-12 h-12 text-emerald-600" />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-4xl font-black text-emerald-800 mb-2">Harness Engineering</h3>
                      <p className="text-2xl text-gray-600 font-bold">解决的是 <span className="text-emerald-700 bg-emerald-200 px-4 py-1 rounded-lg shadow-sm">怎么让模型在真实执行中持续做对</span></p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 3: The Boundary (Step 4) */}
      <AnimatePresence>
        {step === 4 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
          >
            <h3 className="text-4xl font-bold text-[#43302B] mb-16 text-center leading-relaxed">
              Harness 不是在取代 Prompt，也不是在取代 Context。<br/>
              它是在<span className="text-emerald-600 font-black mx-2">更大的系统边界上</span>，把前两者都包含进来。
            </h3>

            <div className="relative w-[600px] h-[600px] flex items-center justify-center">
              {/* Harness Boundary */}
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, type: "spring" }}
                className="absolute inset-0 border-8 border-emerald-400 bg-emerald-50/50 rounded-[3rem] flex flex-col items-center pt-12 shadow-2xl"
              >
                <span className="text-3xl font-black text-emerald-600 tracking-widest">Harness Engineering</span>
                <span className="text-emerald-500 font-bold mt-2">系统边界 / 执行保障</span>
              </motion.div>

              {/* Context Boundary */}
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3, type: "spring" }}
                className="absolute w-[450px] h-[350px] bottom-12 border-4 border-purple-400 bg-purple-50/80 rounded-3xl flex flex-col items-center pt-8 shadow-lg"
              >
                <span className="text-2xl font-black text-purple-600 tracking-widest">Context Engineering</span>
                <span className="text-purple-500 font-bold mt-1">信息供给 / 知识检索</span>
              </motion.div>

              {/* Prompt Boundary */}
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.6, type: "spring" }}
                className="absolute w-[300px] h-[150px] bottom-20 border-4 border-blue-400 bg-blue-50 rounded-2xl flex flex-col items-center justify-center shadow-md"
              >
                <span className="text-xl font-black text-blue-600 tracking-widest">Prompt Engineering</span>
                <span className="text-blue-500 font-bold mt-1">意图表达 / 任务设定</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 4: Progression Timeline (Step 5) */}
      <AnimatePresence>
        {step === 5 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-40"
          >
            <div className="flex flex-col gap-12 w-full max-w-5xl px-8">
              {/* Node 1 */}
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-8"
              >
                <div className="w-1/2 text-right">
                  <h4 className="text-3xl font-bold text-gray-700">当任务还只是<span className="text-blue-600 font-black mx-2">单轮生成</span>时</h4>
                </div>
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center border-4 border-blue-300 z-10">
                  <MessageSquare className="w-8 h-8 text-blue-600" />
                </div>
                <div className="w-1/2">
                  <div className="bg-blue-50 px-6 py-3 rounded-xl inline-block border-2 border-blue-200">
                    <span className="text-2xl font-black text-blue-700">Prompt 很重要</span>
                  </div>
                </div>
              </motion.div>

              {/* Node 2 */}
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-8 relative"
              >
                {/* Connecting Line */}
                <div className="absolute left-1/2 top-[-60px] bottom-[60px] w-1 bg-gray-200 -translate-x-1/2 -z-10" />
                
                <div className="w-1/2 text-right">
                  <h4 className="text-3xl font-bold text-gray-700">当任务开始依赖<span className="text-purple-600 font-black mx-2">外部知识和运行时信息</span>时</h4>
                </div>
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center border-4 border-purple-300 z-10">
                  <Database className="w-8 h-8 text-purple-600" />
                </div>
                <div className="w-1/2">
                  <div className="bg-purple-50 px-6 py-3 rounded-xl inline-block border-2 border-purple-200">
                    <span className="text-2xl font-black text-purple-700">Context 很关键</span>
                  </div>
                </div>
              </motion.div>

              {/* Node 3 */}
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-8 relative"
              >
                {/* Connecting Line */}
                <div className="absolute left-1/2 top-[-60px] bottom-[30px] w-1 bg-gray-200 -translate-x-1/2 -z-10" />

                <div className="w-1/2 text-right">
                  <h4 className="text-3xl font-bold text-gray-700">但当模型真的进入<span className="text-emerald-600 font-black mx-2">长链路、可执行、低容错</span>的真实场景时</h4>
                </div>
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center border-4 border-emerald-400 z-10 shadow-lg">
                  <ShieldCheck className="w-10 h-10 text-emerald-600" />
                </div>
                <div className="w-1/2">
                  <div className="bg-emerald-500 px-8 py-4 rounded-2xl inline-block shadow-xl">
                    <span className="text-3xl font-black text-white tracking-wide">Harness 几乎不可避免</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 5: The Grand Finale (Step 6) */}
      <AnimatePresence>
        {step === 6 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-[#FDFBF7]"
          >
            <h3 className="text-3xl font-bold text-gray-500 mb-16 text-center">
              这也是为什么同一个模型，在不同产品里，表现差距会这么大。
            </h3>

            <div className="flex flex-col items-center gap-16 w-full max-w-4xl">
              
              {/* The Ceiling (Model) */}
              <motion.div 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-2xl opacity-40"
                  />
                  <div className="w-24 h-24 bg-white rounded-full shadow-2xl flex items-center justify-center relative z-10 border-4 border-blue-100">
                    <Sparkles className="w-12 h-12 text-blue-500" />
                  </div>
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mt-8 text-center">
                  真正决定<span className="text-blue-600 font-black mx-2 text-5xl">上限</span>的，也许是模型
                </h2>
              </motion.div>

              {/* Divider */}
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
              />

              {/* The Foundation (Harness) */}
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="flex flex-col items-center"
              >
                <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center leading-relaxed">
                  但真正决定<span className="text-emerald-600 font-black mx-2 text-5xl">能不能落地、能不能稳定交付</span>的<br/>
                  往往是
                </h2>
                <div className="relative group">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -inset-4 bg-emerald-400 rounded-3xl blur-xl opacity-50"
                  />
                  <div className="bg-emerald-600 text-white px-16 py-6 rounded-3xl shadow-2xl relative z-10 flex items-center gap-6 border-4 border-emerald-400">
                    <Anchor className="w-12 h-12 text-emerald-200" />
                    <span className="text-6xl font-black tracking-widest">Harness</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
