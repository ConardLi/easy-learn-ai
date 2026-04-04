import { motion, AnimatePresence } from 'motion/react';
import { 
  UserX, 
  Zap, 
  BrainCircuit, 
  ShieldCheck, 
  AlertOctagon, 
  ArrowRightLeft, 
  Settings, 
  RefreshCcw,
  BookOpen,
  Cpu
} from 'lucide-react';

export default function Chapter28({ step }: { step: number }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Scene 1: Intro & Problem (Step 0 & 1) */}
      <AnimatePresence>
        {step <= 1 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
          >
            <h2 className="text-5xl font-black text-[#43302B] mb-16 text-center leading-tight">
              OpenAI 不是只靠<span className="text-rose-500 mx-2">人类 Code Review</span>来兜质量
            </h2>

            <AnimatePresence>
              {step === 1 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-16"
                >
                  {/* Agent Fast Submit */}
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 bg-blue-100 rounded-3xl flex items-center justify-center relative overflow-hidden border-4 border-blue-300">
                      <Zap className="w-16 h-16 text-blue-500 relative z-10" />
                      <motion.div 
                        animate={{ y: [100, -100] }}
                        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-30"
                      >
                        <div className="w-20 h-4 bg-blue-400 rounded" />
                        <div className="w-16 h-4 bg-blue-400 rounded" />
                        <div className="w-24 h-4 bg-blue-400 rounded" />
                      </motion.div>
                    </div>
                    <span className="mt-4 text-2xl font-bold text-blue-700">Agent 提交极快</span>
                  </div>

                  {/* VS */}
                  <div className="text-4xl font-black text-gray-300 italic">VS</div>

                  {/* Human Overwhelmed */}
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 bg-rose-100 rounded-3xl flex items-center justify-center relative border-4 border-rose-300">
                      <motion.div
                        animate={{ rotate: [-10, 10, -10] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        <UserX className="w-16 h-16 text-rose-500" />
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], y: -30, x: 30 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute top-0 right-0 text-rose-600 font-black text-2xl"
                      >
                        !?
                      </motion.div>
                    </div>
                    <span className="mt-4 text-2xl font-bold text-rose-700">人类盯不过来</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 2: Experience to Rules (Step 2) */}
      <AnimatePresence>
        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
          >
            <h3 className="text-4xl font-bold text-[#43302B] mb-12 text-center">
              把<span className="text-indigo-600 mx-2">资深工程师的经验</span>直接写成系统规则
            </h3>

            <div className="flex items-center gap-8">
              {/* Experience */}
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-indigo-50 p-8 rounded-3xl border-4 border-indigo-200 flex flex-col items-center"
              >
                <BrainCircuit className="w-16 h-16 text-indigo-500 mb-4" />
                <span className="text-2xl font-black text-indigo-700">人类经验</span>
              </motion.div>

              {/* Arrow with flowing particles */}
              <div className="relative w-32 h-8 flex items-center justify-center">
                <div className="absolute w-full h-2 bg-gray-200 rounded-full" />
                <motion.div 
                  className="absolute left-0 w-8 h-8 bg-indigo-400 rounded-full blur-sm"
                  animate={{ x: [0, 128] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* System Rules */}
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-emerald-50 p-8 rounded-3xl border-4 border-emerald-300 shadow-xl flex flex-col gap-4 w-80"
              >
                <div className="flex items-center gap-3 text-emerald-700 font-bold text-xl border-b-2 border-emerald-200 pb-2">
                  <ShieldCheck className="w-8 h-8" />
                  系统规则
                </div>
                <ul className="space-y-3 text-emerald-800 font-medium">
                  <li className="flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full"/> 模块怎么分层</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full"/> 依赖限制</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full"/> 拦截条件</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full"/> 修复建议</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 3: The Feedback Loop (Step 3) */}
      <AnimatePresence>
        {step === 3 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
          >
            <h3 className="text-4xl font-bold text-[#43302B] mb-16 text-center leading-relaxed">
              重点是：这些规则不是只负责报错，<br/>
              而是会把<span className="text-amber-500 font-black mx-2">“怎么修”</span>也一起反馈给 Agent
            </h3>

            <div className="relative w-[800px] h-[300px] flex items-center justify-between px-12">
              {/* Rule Engine */}
              <div className="bg-rose-50 p-6 rounded-3xl border-4 border-rose-300 flex flex-col items-center z-10 w-64">
                <AlertOctagon className="w-16 h-16 text-rose-500 mb-4" />
                <span className="text-xl font-bold text-rose-700">发现问题 (报错)</span>
              </div>

              {/* Feedback Payload */}
              <motion.div 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: [0, 300], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-[250px] bg-amber-100 px-6 py-3 rounded-full border-2 border-amber-300 flex items-center gap-3 shadow-lg z-20"
              >
                <Settings className="w-6 h-6 text-amber-600" />
                <span className="font-bold text-amber-700">附带“怎么修”的建议</span>
              </motion.div>

              {/* Agent Context */}
              <div className="bg-blue-50 p-6 rounded-3xl border-4 border-blue-300 flex flex-col items-center z-10 w-64">
                <RefreshCcw className="w-16 h-16 text-blue-500 mb-4" />
                <span className="text-xl font-bold text-blue-700 text-center">进入下一轮<br/>上下文</span>
              </div>

              {/* Connecting Line */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-2 bg-gray-200 rounded-full -z-0" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 4: Conclusion (Step 4) */}
      <AnimatePresence>
        {step === 4 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-40"
          >
            <div className="flex flex-col items-center gap-12">
              <div className="flex items-center gap-8 text-4xl font-black">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative flex items-center gap-4 text-gray-400"
                >
                  <BookOpen className="w-12 h-12" />
                  <span>传统代码规范</span>
                  {/* Strike through */}
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '110%' }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    className="absolute top-1/2 -left-[5%] h-2 bg-red-500 rounded-full"
                  />
                </motion.div>

                <ArrowRightLeft className="w-12 h-12 text-gray-300" />

                <motion.div 
                  initial={{ scale: 0.8, opacity: 0, x: 20 }}
                  animate={{ scale: 1, opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, type: 'spring' }}
                  className="flex items-center gap-4 text-emerald-600 bg-emerald-50 px-8 py-4 rounded-3xl border-4 border-emerald-200 shadow-2xl"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Cpu className="w-12 h-12" />
                  </motion.div>
                  <span>自动治理系统</span>
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="bg-indigo-600 text-white px-10 py-5 rounded-full shadow-xl text-3xl font-bold tracking-widest"
              >
                这也是 Harness 的典型形态
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
