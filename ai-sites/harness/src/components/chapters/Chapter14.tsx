import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  MessageSquare, 
  FolderOpen, 
  ShieldCheck, 
  CheckSquare, 
  Radio, 
  RefreshCcw, 
  CheckCircle,
  FileText,
  Target
} from 'lucide-react';

export default function Chapter14({ step }: { step: number }) {
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
            <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mb-8 border-4 border-blue-100">
              <Briefcase className="w-16 h-16 text-blue-500" />
            </div>
            <h2 className="text-4xl font-bold text-gray-500 mb-6">这里我想用一个特别适合的例子：</h2>
            <p className="text-5xl font-black text-[#43302B] leading-relaxed text-center">
              假设你要让一个新人<br/>
              去完成一次很重要的<span className="text-blue-600 mx-2">客户拜访</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 2: Prompt Engineering (Step 1) */}
      <AnimatePresence>
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
          >
            <div className="flex items-center gap-4 mb-12">
              <MessageSquare className="w-12 h-12 text-[#8B5CF6]" />
              <h2 className="text-5xl font-black text-[#8B5CF6]">Prompt Engineering</h2>
            </div>
            
            <p className="text-3xl text-gray-500 font-medium mb-8">你先把任务讲清楚：</p>
            
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-purple-100 max-w-3xl text-center mb-12">
              <p className="text-3xl font-bold text-gray-800 leading-relaxed">
                “见面先寒暄，再介绍方案，<br/>再问需求，最后确认下一步。”
              </p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-purple-50 border-2 border-purple-200 px-10 py-4 rounded-full"
            >
              <p className="text-3xl font-bold text-purple-700">重点是：<span className="text-purple-900">把话说明白</span></p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 3: Context Engineering (Step 2) */}
      <AnimatePresence>
        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
          >
            <div className="flex items-center gap-4 mb-12">
              <FolderOpen className="w-12 h-12 text-[#10B981]" />
              <h2 className="text-5xl font-black text-[#10B981]">Context Engineering</h2>
            </div>
            
            <p className="text-3xl text-gray-500 font-medium mb-8">你再把资料准备齐：</p>
            
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mb-12">
              {[
                { icon: Target, text: '客户背景' },
                { icon: FileText, text: '过往沟通记录' },
                { icon: Briefcase, text: '产品报价' },
                { icon: ShieldCheck, text: '竞品情况' },
                { icon: CheckCircle, text: '这次会议目标' }
              ].map((item, i) => (
                <motion.div 
                  key={item.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white px-6 py-4 rounded-2xl shadow-md border border-green-100 flex items-center gap-3"
                >
                  <item.icon className="w-6 h-6 text-green-500" />
                  <span className="text-2xl font-bold text-gray-800">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-green-50 border-2 border-green-200 px-10 py-4 rounded-full"
            >
              <p className="text-3xl font-bold text-green-700">重点是：<span className="text-green-900">把信息给对</span></p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 4: Harness Engineering (Step 3) */}
      <AnimatePresence>
        {step === 3 && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-40"
          >
            <div className="flex items-center gap-4 mb-10">
              <ShieldCheck className="w-12 h-12 text-[#3B82F6]" />
              <h2 className="text-5xl font-black text-[#3B82F6]">Harness Engineering</h2>
            </div>
            
            <p className="text-3xl text-gray-500 font-medium mb-8">如果这个会真的很重要，你还会继续做很多事：</p>
            
            <div className="flex flex-col gap-4 max-w-3xl w-full mb-10">
              {[
                { icon: CheckSquare, text: '让他带着 checklist 去' },
                { icon: Radio, text: '要求关键节点实时回报' },
                { icon: FileText, text: '会后核对纪要和录音' },
                { icon: RefreshCcw, text: '如果发现偏差，马上纠正' },
                { icon: CheckCircle, text: '最后按明确标准验收结果' }
              ].map((item, i) => (
                <motion.div 
                  key={item.text}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-blue-100 flex items-center gap-4"
                >
                  <div className="p-2 bg-blue-50 rounded-lg"><item.icon className="w-6 h-6 text-blue-500" /></div>
                  <span className="text-2xl font-bold text-gray-800">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="bg-blue-50 border-2 border-blue-200 px-10 py-4 rounded-full text-center"
            >
              <p className="text-2xl font-bold text-blue-800">
                重点已经不是“说清楚”和“资料齐不齐”了，而是：<br/>
                <span className="text-3xl text-blue-900 mt-2 inline-block">有没有一套持续观测、持续纠偏、最终验收的机制</span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 5: The Relationship (Steps 4-5) */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-50"
          >
            <motion.h2 
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: step === 5 ? -300 : -250 }}
              className="text-4xl font-bold text-[#43302B] text-center"
            >
              所以这三者不是替代关系，而是<span className="text-[#3B82F6] mx-2 text-5xl font-black">包含关系</span>
            </motion.h2>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full max-w-6xl mt-10">
              
              {/* Concentric Circles */}
              <div className="relative w-[500px] h-[500px] flex items-center justify-center shrink-0">
                {/* Harness (Outer) */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, type: 'spring' }}
                  className="absolute inset-0 bg-blue-50 border-4 border-blue-400 rounded-full flex items-start justify-center pt-12 shadow-[0_0_60px_rgba(59,130,246,0.2)]"
                >
                  <span className="text-3xl font-black text-blue-500 tracking-widest">HARNESS</span>
                </motion.div>

                {/* Context (Middle) */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, type: 'spring' }}
                  className="absolute w-[340px] h-[340px] bg-green-50 border-4 border-green-400 rounded-full flex items-start justify-center pt-10 shadow-lg"
                >
                  <span className="text-2xl font-black text-green-500 tracking-widest">CONTEXT</span>
                </motion.div>

                {/* Prompt (Inner) */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6, type: 'spring' }}
                  className="absolute w-[200px] h-[200px] bg-purple-50 border-4 border-purple-400 rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-2xl font-black text-purple-500 tracking-widest">PROMPT</span>
                </motion.div>
              </div>

              {/* Definitions (Step 5) */}
              <AnimatePresence>
                {step === 5 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="ml-16 flex flex-col gap-8"
                  >
                    <div className="bg-white p-6 rounded-2xl shadow-lg border-l-8 border-purple-500">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Prompt</h3>
                      <p className="text-xl text-gray-600">是对<span className="text-purple-600 font-bold mx-1">“指令”</span>的工程化</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg border-l-8 border-green-500">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Context</h3>
                      <p className="text-xl text-gray-600">是对<span className="text-green-600 font-bold mx-1">“输入环境”</span>的工程化</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg border-l-8 border-blue-500">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Harness</h3>
                      <p className="text-xl text-gray-600">是对<span className="text-blue-600 font-bold mx-1">“整个运行控制系统”</span>的工程化</p>
                    </div>

                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="mt-4 text-3xl font-black text-[#43302B] bg-amber-100 px-6 py-3 rounded-xl inline-block self-start"
                    >
                      边界是一层比一层大的。
                    </motion.div>
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
