import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  FileSignature, 
  SplitSquareHorizontal, 
  Map, 
  Hammer, 
  SearchCheck, 
  MonitorPlay, 
  Repeat, 
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export default function Chapter24({ step }: { step: number }) {
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
              <FileSignature className="w-12 h-12 text-rose-600" />
            </div>
            <h2 className="text-6xl font-black text-[#43302B] mb-6">长程任务的深度洞察</h2>
            <p className="text-3xl text-gray-500 font-medium">
              Anthropic 发现的第二个典型问题
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 2: Self-Evaluation Distortion (Step 1) */}
      <AnimatePresence>
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
          >
            <h3 className="text-5xl font-bold text-[#43302B] mb-12 text-center">
              这个问题叫：<span className="text-rose-600 font-black mx-2">自评失真</span>
            </h3>

            <div className="flex items-center gap-16">
              {/* Brain grading itself */}
              <motion.div 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="relative w-64 h-64 bg-white rounded-full shadow-2xl border-4 border-gray-200 flex items-center justify-center"
              >
                <Brain className="w-24 h-24 text-gray-400" />
                
                {/* A+ Paper */}
                <motion.div 
                  initial={{ opacity: 0, y: 20, rotate: -10 }}
                  animate={{ opacity: 1, y: -20, rotate: 10 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="absolute -right-8 -top-8 bg-yellow-100 p-4 rounded-xl border-2 border-yellow-300 shadow-lg transform rotate-12"
                >
                  <span className="text-4xl font-black text-rose-500">A+</span>
                  <div className="text-xs text-yellow-700 font-bold mt-1">Perfect!</div>
                </motion.div>
              </motion.div>

              <div className="flex flex-col gap-6 max-w-md">
                <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-rose-400 text-xl font-bold text-gray-700">
                  模型自己给自己打分，往往会<span className="text-rose-500">偏乐观</span>。
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-orange-400 text-lg font-medium text-gray-600">
                  尤其是设计、体验、产品完整度这类<span className="text-orange-600 font-bold">没有标准答案</span>的问题，偏差更明显。
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 3: The Separation Concept (Step 2) */}
      <AnimatePresence>
        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
          >
            <h3 className="text-4xl font-bold text-[#43302B] mb-12 text-center">
              所以他们采用了一个非常关键的思路：
            </h3>

            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="bg-indigo-50 p-10 rounded-[3rem] shadow-xl border-4 border-indigo-200 flex flex-col items-center text-center"
            >
              <SplitSquareHorizontal className="w-20 h-20 text-indigo-500 mb-6" />
              <h2 className="text-5xl font-black text-indigo-700">
                把干活的人和验收的人拆开
              </h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 4: The 3 Roles (Steps 3-5) */}
      <AnimatePresence>
        {step >= 3 && step <= 5 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-40"
          >
            <h2 className="text-4xl font-bold text-[#43302B] mb-16 text-center">
              也就是分为三个独立角色：
            </h2>
            
            <div className="flex gap-8 max-w-6xl w-full px-8">
              {/* Role 1: Planner */}
              <AnimatePresence>
                {step >= 3 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 bg-white p-8 rounded-3xl shadow-xl border-t-8 border-blue-400 flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                      <Map className="w-10 h-10 text-blue-500" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800 mb-4">Planner</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">
                      负责把模糊需求扩成<br/>
                      <span className="text-blue-600 font-bold">完整规格</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Role 2: Generator */}
              <AnimatePresence>
                {step >= 4 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 bg-white p-8 rounded-3xl shadow-xl border-t-8 border-amber-400 flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
                      <Hammer className="w-10 h-10 text-amber-500" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800 mb-4">Generator</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">
                      负责具体的<br/>
                      <span className="text-amber-600 font-bold">代码实现</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Role 3: Evaluator */}
              <AnimatePresence>
                {step >= 5 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 bg-white p-8 rounded-3xl shadow-xl border-t-8 border-emerald-400 flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
                      <SearchCheck className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800 mb-4">Evaluator</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">
                      负责像 QA 一样去<br/>
                      <span className="text-emerald-600 font-bold">真实测试</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 5: Real Testing (Step 6) */}
      <AnimatePresence>
        {step === 6 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-50"
          >
            <h3 className="text-4xl font-bold text-[#43302B] mb-12 text-center leading-relaxed">
              最关键的是，这个 Evaluator <span className="text-red-500 font-black">不是只看代码</span>。
            </h3>

            <div className="flex items-center gap-12">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-8 rounded-3xl shadow-xl border-2 border-emerald-100 flex flex-col items-center w-80"
              >
                <MonitorPlay className="w-20 h-20 text-emerald-500 mb-6" />
                <ul className="text-xl font-bold text-gray-700 space-y-4 text-center">
                  <li className="flex items-center justify-center gap-2"><CheckCircle2 className="w-6 h-6 text-emerald-500"/> 操作页面</li>
                  <li className="flex items-center justify-center gap-2"><CheckCircle2 className="w-6 h-6 text-emerald-500"/> 看交互</li>
                  <li className="flex items-center justify-center gap-2"><CheckCircle2 className="w-6 h-6 text-emerald-500"/> 检查结果</li>
                </ul>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-emerald-50 p-8 rounded-3xl border-2 border-emerald-200 flex flex-col justify-center max-w-md h-full"
              >
                <p className="text-3xl font-black text-emerald-700 leading-relaxed">
                  也就是说，它不是抽象审查，而是<span className="bg-emerald-200 px-2 py-1 rounded-lg">带环境的验证</span>。
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 6: Core Principle (Step 7) */}
      <AnimatePresence>
        {step === 7 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-50"
          >
            <h3 className="text-3xl font-bold text-gray-500 mb-8 text-center">
              这件事特别重要，因为它背后其实是一个很硬的工程原则：
            </h3>

            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="bg-white p-12 rounded-[3rem] shadow-2xl border-4 border-indigo-500 flex flex-col items-center text-center"
            >
              <ShieldCheck className="w-24 h-24 text-indigo-500 mb-6" />
              <h2 className="text-6xl font-black text-indigo-700 tracking-wider">
                生产和验收必须分离
              </h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 7: The Loop (Step 8) */}
      <AnimatePresence>
        {step === 8 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-50"
          >
            <h3 className="text-4xl font-bold text-[#43302B] mb-16 text-center leading-relaxed">
              只要评估者足够独立，<br/>
              系统就能形成一个<span className="text-teal-600 font-black mx-2">真正有效的循环</span>：
            </h3>

            <div className="relative w-[600px] h-[300px] flex items-center justify-center">
              {/* Circular Loop Animation */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute w-[400px] h-[400px] border-4 border-dashed border-teal-300 rounded-full"
              />
              
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-3 rounded-2xl shadow-lg border-2 border-teal-200 font-black text-2xl text-teal-700">
                生成
              </div>
              
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-white px-6 py-3 rounded-2xl shadow-lg border-2 border-teal-200 font-black text-2xl text-teal-700">
                检查
              </div>
              
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white px-6 py-3 rounded-2xl shadow-lg border-2 border-teal-200 font-black text-2xl text-teal-700">
                修复
              </div>
              
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-3 rounded-2xl shadow-lg border-2 border-teal-200 font-black text-2xl text-teal-700">
                再检查
              </div>

              <Repeat className="w-24 h-24 text-teal-400" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
