import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, 
  Eye, 
  Target, 
  Scissors, 
  Box, 
  AlertTriangle, 
  Focus,
  Brain
} from 'lucide-react';

export default function Chapter16({ step }: { step: number }) {
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
              <Layers className="w-12 h-12 text-purple-600" />
            </div>
            <h2 className="text-6xl font-black text-[#43302B] mb-6">第一层：上下文管理</h2>
            <p className="text-3xl text-gray-500 font-medium">
              站在 Harness 视角重新看 Context
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 2: The Boundary (Step 1) */}
      <AnimatePresence>
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
          >
            <h3 className="text-4xl font-bold text-gray-500 text-center leading-relaxed mb-16">
              模型能不能稳定发挥，很多时候不取决于它“聪不聪明”<br/>
              而取决于它<span className="text-[#8B5CF6] mx-2 font-black">看到了什么</span>
            </h3>

            <div className="relative w-[600px] h-[300px] flex items-center justify-center">
              {/* Boundary Box */}
              <motion.div 
                initial={{ width: 0, height: 0, opacity: 0 }}
                animate={{ width: '100%', height: '100%', opacity: 1 }}
                transition={{ duration: 1, type: 'spring' }}
                className="absolute border-4 border-dashed border-[#8B5CF6] rounded-3xl bg-purple-50/30 flex items-center justify-center"
              >
                <div className="absolute -top-5 bg-white px-4 py-1 border-2 border-[#8B5CF6] rounded-full text-[#8B5CF6] font-bold">
                  正确的信息边界
                </div>
              </motion.div>

              {/* Brain inside boundary */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="w-32 h-32 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-purple-200 z-10 relative"
              >
                <Brain className="w-16 h-16 text-purple-500" />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -right-4 -top-4"
                >
                  <Focus className="w-10 h-10 text-purple-600" />
                </motion.div>
              </motion.div>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-16 text-3xl font-bold text-[#43302B] bg-white px-8 py-4 rounded-full shadow-md"
            >
              Harness 的第一职责：让模型在边界内思考
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 3: The Three Pillars (Steps 2-4) */}
      <AnimatePresence>
        {step >= 2 && step <= 4 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
          >
            <h2 className="text-4xl font-bold text-[#43302B] mb-16">这一层通常包括三件事：</h2>
            
            <div className="flex gap-8 max-w-6xl w-full px-8">
              {/* Pillar 1 */}
              <AnimatePresence>
                {step >= 2 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                      <Target className="w-10 h-10 text-blue-500" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800 mb-4">1. 角色和目标定义</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">
                      模型要知道自己是谁、任务是什么、成功标准是什么。
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pillar 2 */}
              <AnimatePresence>
                {step >= 3 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
                      <Scissors className="w-10 h-10 text-amber-500" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800 mb-4">2. 信息选择和裁剪</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">
                      上下文不是越多越好，而是<span className="text-amber-600 font-bold">越相关越好</span>。
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pillar 3 */}
              <AnimatePresence>
                {step >= 4 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 bg-teal-50 rounded-2xl flex items-center justify-center mb-6">
                      <Box className="w-10 h-10 text-teal-500" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800 mb-4">3. 结构化组织</h3>
                    <p className="text-gray-500 font-medium leading-relaxed text-sm">
                      固定规则放哪里，当前任务放哪里，运行状态放哪里，外部证据放哪里，最好分层清楚。
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 4: The Chaos Warning (Step 5) */}
      <AnimatePresence>
        {step === 5 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-40"
          >
            <div className="relative w-full max-w-4xl h-[400px] flex items-center justify-center">
              
              {/* Chaos Elements */}
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0], 
                    scale: [0.5, 1.5, 0.5],
                    x: (Math.random() - 0.5) * 600,
                    y: (Math.random() - 0.5) * 400,
                    rotate: Math.random() * 360
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
                  className="absolute text-red-300/50 font-mono text-xl"
                >
                  {['[Rule]', '{State}', '<Task>', 'Evidence', 'Prompt'][Math.floor(Math.random() * 5)]}
                </motion.div>
              ))}

              {/* Warning Card */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="bg-white/90 backdrop-blur-xl p-12 rounded-[3rem] shadow-2xl border-4 border-red-400 flex flex-col items-center text-center relative z-10"
              >
                <AlertTriangle className="w-20 h-20 text-red-500 mb-8 animate-pulse" />
                <h2 className="text-4xl font-bold text-gray-800 mb-6">因为信息一旦乱，模型就很容易：</h2>
                <div className="flex flex-col gap-4">
                  <span className="text-3xl font-black text-red-600 bg-red-50 px-6 py-2 rounded-xl">漏重点</span>
                  <span className="text-3xl font-black text-red-600 bg-red-50 px-6 py-2 rounded-xl">忘约束</span>
                  <span className="text-3xl font-black text-red-600 bg-red-50 px-6 py-2 rounded-xl">甚至自我污染</span>
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
