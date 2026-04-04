import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  HelpCircle, 
  ListTodo, 
  MessageSquareText, 
  HardDrive,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function Chapter19({ step }: { step: number }) {
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
            <div className="w-24 h-24 bg-rose-100 rounded-2xl flex items-center justify-center mb-8 border-4 border-rose-300">
              <Database className="w-12 h-12 text-rose-600" />
            </div>
            <h2 className="text-6xl font-black text-[#43302B] mb-6">第四层：状态与记忆</h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 2: The Amnesia Problem (Step 1) */}
      <AnimatePresence>
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
          >
            <h3 className="text-5xl font-bold text-[#43302B] mb-16 text-center leading-relaxed">
              没有状态的 Agent，<br/>
              每一轮都像<span className="text-rose-500 mx-2 font-black">失忆</span>。
            </h3>

            <div className="relative w-[600px] h-[300px] flex items-center justify-center">
              <motion.div 
                animate={{ opacity: [1, 0.5, 1], scale: [1, 0.95, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-40 h-40 bg-gray-100 rounded-full flex items-center justify-center border-4 border-gray-300 shadow-inner relative"
              >
                <HelpCircle className="w-20 h-20 text-gray-400" />
                
                {/* Floating questions */}
                <motion.div 
                  initial={{ opacity: 0, x: -50, y: -50 }}
                  animate={{ opacity: [0, 1, 0], x: -100, y: -100 }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                  className="absolute whitespace-nowrap text-lg font-bold text-gray-500 bg-white px-4 py-2 rounded-xl shadow-md border border-gray-200"
                >
                  刚做了什么？
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 50, y: -50 }}
                  animate={{ opacity: [0, 1, 0], x: 100, y: -80 }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute whitespace-nowrap text-lg font-bold text-gray-500 bg-white px-4 py-2 rounded-xl shadow-md border border-gray-200"
                >
                  哪些结论已确认？
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: [0, 1, 0], y: 100 }}
                  transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                  className="absolute whitespace-nowrap text-lg font-bold text-gray-500 bg-white px-4 py-2 rounded-xl shadow-md border border-gray-200"
                >
                  哪些问题没解决？
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 3: The 3 Categories (Steps 2-5) */}
      <AnimatePresence>
        {step >= 2 && step <= 5 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
          >
            <h2 className="text-4xl font-bold text-[#43302B] mb-16 text-center">
              所以 Harness 还必须管理状态。<br/>
              这里至少要分清<span className="text-rose-600 mx-2 font-black">三类东西</span>：
            </h2>
            
            <div className="flex gap-8 max-w-6xl w-full px-8">
              {/* Category 1 */}
              <AnimatePresence>
                {step >= 3 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 bg-white p-8 rounded-3xl shadow-xl border-t-8 border-blue-400 flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                      <ListTodo className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800 mb-4">当前任务状态</h3>
                    <div className="flex flex-col gap-2 w-full text-left mt-4">
                      <div className="flex items-center gap-2 text-gray-500 bg-gray-50 p-2 rounded-lg"><CheckCircle2 className="w-4 h-4 text-green-500"/> 步骤 1 完成</div>
                      <div className="flex items-center gap-2 text-gray-800 bg-blue-50 p-2 rounded-lg font-bold"><AlertCircle className="w-4 h-4 text-blue-500"/> 步骤 2 进行中</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Category 2 */}
              <AnimatePresence>
                {step >= 4 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 bg-white p-8 rounded-3xl shadow-xl border-t-8 border-amber-400 flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-6">
                      <MessageSquareText className="w-8 h-8 text-amber-500" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800 mb-4">会话中间结果</h3>
                    <div className="flex flex-col gap-2 w-full text-left mt-4">
                      <div className="text-sm text-gray-600 bg-amber-50 p-3 rounded-lg border border-amber-100">
                        "刚才查到的 API 文档地址是 https://..."
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Category 3 */}
              <AnimatePresence>
                {step >= 5 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 bg-white p-8 rounded-3xl shadow-xl border-t-8 border-rose-400 flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-6">
                      <HardDrive className="w-8 h-8 text-rose-500" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800 mb-4">长期记忆与偏好</h3>
                    <div className="flex flex-col gap-2 w-full text-left mt-4">
                      <div className="text-sm text-gray-600 bg-rose-50 p-3 rounded-lg border border-rose-100">
                        "用户喜欢用 Python 写脚本"
                        <br/>"代码风格要求带类型提示"
                      </div>
                    </div>
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
            <h2 className="text-4xl font-bold text-[#43302B] mb-12 text-center leading-relaxed">
              这三类如果混在一起，系统会越来越乱。<br/>
              分清楚以后，Agent 才会越来越像一个<span className="text-rose-600 mx-2 font-black text-5xl">稳定协作者</span>。
            </h2>

            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="bg-white p-10 rounded-3xl shadow-2xl border-4 border-rose-100 flex flex-col items-center w-[600px]"
            >
              <div className="flex gap-4 w-full mb-8">
                <div className="flex-1 h-12 bg-blue-100 rounded-xl flex items-center justify-center font-bold text-blue-600">任务状态</div>
                <div className="flex-1 h-12 bg-amber-100 rounded-xl flex items-center justify-center font-bold text-amber-600">中间结果</div>
                <div className="flex-1 h-12 bg-rose-100 rounded-xl flex items-center justify-center font-bold text-rose-600">长期记忆</div>
              </div>
              <div className="w-full h-32 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center">
                <span className="text-2xl font-black text-gray-400 tracking-widest">STABLE AGENT</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
