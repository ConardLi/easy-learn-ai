import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, 
  Brain, 
  ThumbsUp, 
  SearchCheck, 
  Server, 
  TestTube2, 
  LineChart, 
  Bug,
  CheckCircle2
} from 'lucide-react';

export default function Chapter20({ step }: { step: number }) {
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
              <Eye className="w-12 h-12 text-emerald-600" />
            </div>
            <h2 className="text-6xl font-black text-[#43302B] mb-6">第五层：评估与观测</h2>
            <p className="text-3xl text-gray-500 font-medium">
              很多团队最容易忽略的一层
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 2: The "Feeling Good" Problem (Step 1) */}
      <AnimatePresence>
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
          >
            <h3 className="text-4xl font-bold text-[#43302B] mb-8 text-center leading-relaxed">
              很多系统不是“生成不出来”<br/>
              而是“生成完了以后，<span className="text-emerald-600 mx-2 font-black">根本不知道自己做得好不好</span>”
            </h3>

            <div className="relative w-[600px] h-[300px] flex items-center justify-center mt-8">
              {/* Blindfolded Brain */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="w-48 h-48 bg-white rounded-full shadow-2xl border-4 border-gray-200 flex flex-col items-center justify-center relative z-10"
              >
                <Brain className="w-20 h-20 text-gray-400 mb-2" />
                {/* Blindfold */}
                <div className="absolute top-1/2 -translate-y-1/2 w-full h-8 bg-gray-800 flex items-center justify-center -rotate-12">
                  <span className="text-xs text-white font-bold tracking-widest">BLIND</span>
                </div>
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -right-6 -top-6 bg-emerald-100 p-3 rounded-full border-2 border-emerald-300 shadow-lg"
                >
                  <ThumbsUp className="w-8 h-8 text-emerald-500" />
                </motion.div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-12 text-2xl font-bold text-gray-500 bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100"
              >
                长期停留在“自我感觉良好”的状态
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 3: The 5 Components (Steps 2-7) */}
      <AnimatePresence>
        {step >= 2 && step <= 7 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
          >
            <h2 className="text-4xl font-bold text-[#43302B] mb-12 text-center">
              这一层通常包括：
            </h2>
            
            <div className="flex flex-wrap justify-center gap-6 max-w-5xl px-8">
              {/* Item 1 */}
              <AnimatePresence>
                {step >= 3 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="w-64 bg-white p-6 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4">
                      <SearchCheck className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-black text-gray-800">输出验收</h3>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Item 2 */}
              <AnimatePresence>
                {step >= 4 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="w-64 bg-white p-6 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-4">
                      <Server className="w-8 h-8 text-teal-500" />
                    </div>
                    <h3 className="text-xl font-black text-gray-800">环境验证</h3>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Item 3 */}
              <AnimatePresence>
                {step >= 5 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="w-64 bg-white p-6 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 bg-cyan-50 rounded-2xl flex items-center justify-center mb-4">
                      <TestTube2 className="w-8 h-8 text-cyan-500" />
                    </div>
                    <h3 className="text-xl font-black text-gray-800">自动测试</h3>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Item 4 */}
              <AnimatePresence>
                {step >= 6 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="w-64 bg-white p-6 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
                      <LineChart className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-black text-gray-800">日志和指标</h3>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Item 5 */}
              <AnimatePresence>
                {step >= 7 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="w-64 bg-white p-6 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
                      <Bug className="w-8 h-8 text-indigo-500" />
                    </div>
                    <h3 className="text-xl font-black text-gray-800">错误归因</h3>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 4: Conclusion (Step 8) */}
      <AnimatePresence>
        {step === 8 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-40"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="bg-white p-12 rounded-[3rem] shadow-2xl border-4 border-emerald-100 flex flex-col items-center text-center max-w-4xl"
            >
              <CheckCircle2 className="w-24 h-24 text-emerald-500 mb-8" />
              <h2 className="text-5xl font-bold text-gray-800 leading-relaxed">
                也就是说，系统不仅要<span className="text-emerald-600 font-black mx-2">会做</span>，<br/>
                还要知道自己<span className="text-emerald-600 font-black mx-2">有没有真的做对</span>。
              </h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
