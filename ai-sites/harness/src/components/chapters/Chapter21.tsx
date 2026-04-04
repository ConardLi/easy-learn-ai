import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Clock, 
  FileWarning, 
  Brain, 
  Lock,
  RefreshCw,
  ShieldCheck,
  ScanSearch,
  LifeBuoy,
  XCircle
} from 'lucide-react';

export default function Chapter21({ step }: { step: number }) {
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
            <div className="w-24 h-24 bg-orange-100 rounded-2xl flex items-center justify-center mb-8 border-4 border-orange-300">
              <ShieldAlert className="w-12 h-12 text-orange-600" />
            </div>
            <h2 className="text-6xl font-black text-[#43302B] mb-6">第六层：约束、校验与失败恢复</h2>
            <p className="text-3xl text-gray-500 font-medium">
              真正决定系统能不能上线的部分
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 2: Failure is the norm (Step 1-2) */}
      <AnimatePresence>
        {step >= 1 && step <= 2 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
          >
            <h3 className="text-4xl font-bold text-[#43302B] mb-16 text-center leading-relaxed">
              因为真实环境里，<br/>
              失败不是例外，而是<span className="text-orange-600 mx-2 font-black text-6xl">常态</span>。
            </h3>

            <div className="relative w-[800px] h-[400px] flex items-center justify-center">
              {/* Errors popping up */}
              <AnimatePresence>
                {step >= 2 && (
                  <>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0, x: -200, y: -100 }}
                      animate={{ opacity: 1, scale: 1, x: -200, y: -100 }}
                      transition={{ type: 'spring', bounce: 0.6, delay: 0.1 }}
                      className="absolute bg-white p-4 rounded-2xl shadow-xl border-2 border-red-200 flex items-center gap-3"
                    >
                      <AlertTriangle className="text-red-500" /> <span className="font-bold text-gray-700">搜索不准</span>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, scale: 0, x: 200, y: -120 }}
                      animate={{ opacity: 1, scale: 1, x: 200, y: -120 }}
                      transition={{ type: 'spring', bounce: 0.6, delay: 0.3 }}
                      className="absolute bg-white p-4 rounded-2xl shadow-xl border-2 border-orange-200 flex items-center gap-3"
                    >
                      <Clock className="text-orange-500" /> <span className="font-bold text-gray-700">API 超时</span>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, scale: 0, x: -250, y: 50 }}
                      animate={{ opacity: 1, scale: 1, x: -250, y: 50 }}
                      transition={{ type: 'spring', bounce: 0.6, delay: 0.5 }}
                      className="absolute bg-white p-4 rounded-2xl shadow-xl border-2 border-amber-200 flex items-center gap-3"
                    >
                      <FileWarning className="text-amber-500" /> <span className="font-bold text-gray-700">文档格式乱</span>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, scale: 0, x: 220, y: 80 }}
                      animate={{ opacity: 1, scale: 1, x: 220, y: 80 }}
                      transition={{ type: 'spring', bounce: 0.6, delay: 0.7 }}
                      className="absolute bg-white p-4 rounded-2xl shadow-xl border-2 border-purple-200 flex items-center gap-3"
                    >
                      <Brain className="text-purple-500" /> <span className="font-bold text-gray-700">模型误解任务</span>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, scale: 0, x: 0, y: 120 }}
                      animate={{ opacity: 1, scale: 1, x: 0, y: 120 }}
                      transition={{ type: 'spring', bounce: 0.6, delay: 0.9 }}
                      className="absolute bg-white p-4 rounded-2xl shadow-xl border-2 border-rose-200 flex items-center gap-3"
                    >
                      <Lock className="text-rose-500" /> <span className="font-bold text-gray-700">工具权限不够</span>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 3: Start from scratch (Step 3) */}
      <AnimatePresence>
        {step === 3 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
          >
            <h2 className="text-4xl font-bold text-[#43302B] mb-16 text-center">
              如果没有恢复机制，<br/>
              Agent 每次出错就只能<span className="text-red-500 mx-2 font-black">从头再来</span>。
            </h2>

            <div className="w-[800px] bg-gray-100 h-16 rounded-full overflow-hidden relative shadow-inner border-2 border-gray-200">
              <motion.div 
                animate={{ width: ['0%', '85%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="h-full bg-gradient-to-r from-blue-400 to-indigo-500"
              />
              <motion.div 
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", times: [0, 0.85, 1] }}
                className="absolute top-1/2 -translate-y-1/2 right-[15%] text-red-500"
              >
                <XCircle className="w-10 h-10 bg-white rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 4: The 3 Solutions (Steps 4-7) */}
      <AnimatePresence>
        {step >= 4 && step <= 7 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-40"
          >
            <h2 className="text-4xl font-bold text-[#43302B] mb-16 text-center">
              所以成熟的 Harness 一定要包含<span className="text-orange-600 mx-2 font-black">三件事</span>：
            </h2>
            
            <div className="flex gap-8 max-w-6xl w-full px-8">
              {/* Solution 1 */}
              <AnimatePresence>
                {step >= 5 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 bg-white p-8 rounded-3xl shadow-xl border-t-8 border-rose-400 flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 bg-rose-50 rounded-2xl flex items-center justify-center mb-6">
                      <ShieldCheck className="w-10 h-10 text-rose-500" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800 mb-4">约束</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">
                      哪些能做，<br/>
                      <span className="text-rose-600 font-bold">哪些不能做</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Solution 2 */}
              <AnimatePresence>
                {step >= 6 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 bg-white p-8 rounded-3xl shadow-xl border-t-8 border-amber-400 flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
                      <ScanSearch className="w-10 h-10 text-amber-500" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800 mb-4">校验</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">
                      输出前<br/>
                      <span className="text-amber-600 font-bold">怎么检查</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Solution 3 */}
              <AnimatePresence>
                {step >= 7 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 bg-white p-8 rounded-3xl shadow-xl border-t-8 border-orange-400 flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
                      <LifeBuoy className="w-10 h-10 text-orange-500" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800 mb-4">恢复</h3>
                    <p className="text-gray-500 font-medium leading-relaxed text-sm">
                      失败以后怎么<span className="text-orange-600 font-bold">重试、切路径、回滚</span>到稳定状态
                    </p>
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
